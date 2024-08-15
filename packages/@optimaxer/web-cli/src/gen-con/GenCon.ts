import { AbstractAction } from "../AbstractAction.js";
import * as cheerio from 'cheerio';
import Sitemapper from 'sitemapper';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import * as fs from 'fs';
import ora from "ora";
import axios from "axios";

import { encodingForModel } from "js-tiktoken";

import { Embedder, VecDoc } from './embedder.js';
import { getProgressBar } from "../utils/ConsoleUtils.js";

export class GenCon extends AbstractAction {
    nhm:NodeHtmlMarkdown = new NodeHtmlMarkdown();

    constructor() {
        super();
    }

    public async run(options:any):Promise<void> {

        const url:string = options.u;
        const class_list:string[] = [];

        if(options.Rs) {
            const data = fs.readFileSync('./' + options.Rs, 'utf8');
            const lines = data.split(/\r?\n/);
            lines.forEach((line) => {
                class_list.push(line);
            });
        }

        this.siteMapExtractor(url,class_list);
    }

    async fetchHTML(url:string):Promise<string> {
        const { data } = await axios.get(url);
        return data;
    }

    async checkForSitemap(url:string):Promise<string|null> {
        const command = ora(`Validating URL...`).start();
        const single_sitemap = "/sitemap.xml";
        const double_sitemap = "/sitemap-index.xml";

        if(url.endsWith('/')) {
            url = url.slice(0, -1);
        }

        const sitemapUrl:string = url + single_sitemap;
        const sitemapIndexUrl:string = url + double_sitemap;

        const hasSingleSitemap:boolean = await axios.get(sitemapUrl).then(() => true).catch(() => false);
        const hasDoubleSitemap:boolean = await axios.get(sitemapIndexUrl).then(() => true).catch(() => false);

        const validURL:string|null = hasSingleSitemap ? sitemapUrl : hasDoubleSitemap ? sitemapIndexUrl : null;

        if(validURL) {
            command.succeed(`URL is Validated!`);
        } else {
            command.fail(`URL is Invalid!`);
        }
        
        return validURL;
    }

    async splitContent(content:string):Promise<string[]> {
        const contentArray:string[] = [];
    
        const enc = encodingForModel('gpt-4o')
        const tok = enc.encode(content);

        const tok_len = tok.length;

        if (tok_len < 256) {
            contentArray.push(content);
        } else if (tok_len > 256 && tok_len < 512) {
            const sentences = content.match(/[^.!?]+[.!?]+/g) || [content];

            let part1 = "";
            let part2 = "";
            let midpoint = Math.floor(sentences.length / 2);

            for (let i = 0; i < sentences.length; i++) {
                if (i < midpoint) {
                    part1 += sentences[i].trim() + " ";
                } else {
                    part2 += sentences[i].trim() + " ";
                }
            }

            contentArray.push(part1);
            contentArray.push(part2);
            
        } else {
            const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
            let currentPart = "";
            let currentWordCount = 0;

            sentences.forEach(sentence => {
                const sentenceWords = sentence.split(/\s+/).length;
                
                if (currentWordCount + sentenceWords > 256) {
                    contentArray.push(currentPart.trim());
                    currentPart = sentence;
                    currentWordCount = sentenceWords;
                } else {
                    currentPart += sentence + " ";
                    currentWordCount += sentenceWords;
                }
            });

            if (currentPart.trim()) {
                contentArray.push(currentPart.trim());
            }
        }
        
        return contentArray;
    }


    async siteMapExtractor(url:string, sections_to_remove:string[]):Promise<void> {
        console.log(`Extracting sitemap from ${url}`)

        const hasSitemap:string|null = await this.checkForSitemap(url);

        if (!hasSitemap) {
            ora("No sitemap found.").fail();
            return;
        }
        
        const sitemapper = new Sitemapper({
            url: hasSitemap,
            timeout: 30000
        });

        const { sites } = await sitemapper.fetch();

        ora(`Found ${sites.length} sites.`).succeed();

        let index:number = 0;
        
        const DEV_MODE_LIM:number = 16;

        const contents:string[] = [];

        const commandSpinner = ora(`Extracting Content ${sites.length} Pages...`).start();
        for (let i = 0; i < sites.length; i++) {
            
            const progress = getProgressBar(index, sites.length);
            commandSpinner.text = `${progress}`;
            

            const html = await this.fetchHTML(sites[i]);
            const $ = cheerio.load(html);

            $('nav').remove();
            $('footer').remove();
            $('header').remove();

            sections_to_remove.forEach((section:string) => {
                $('.'+section).remove();
            });

            
            const mdContent:string = this.nhm.translate($.html());

            if (!fs.existsSync('./content')) {
                fs.mkdirSync('./content');
            }

            if(mdContent.length > 0) {

                this.splitContent(mdContent);
                const splitContent = await this.splitContent(mdContent);
                splitContent.forEach((section:string) => {
                    contents.push(section);
                });

                index++;
            }

        }

        commandSpinner.text = `Extraction Complete!`;
        commandSpinner.succeed();

        const commandSpinner2 = ora(`Embedding Content...`).start();

        const vecDocs:VecDoc[] = await Embedder(contents);

        commandSpinner2.succeed();
        // write to json file

        const commandSpinner3 = ora(`Writing to JSON...`).start();
        const jsonContent = JSON.stringify(vecDocs);
        fs.writeFileSync('./content/content.json', jsonContent);
        
        commandSpinner3.text = `Content written to JSON file "./content/content.json."`;
        commandSpinner3.succeed();
    }
}