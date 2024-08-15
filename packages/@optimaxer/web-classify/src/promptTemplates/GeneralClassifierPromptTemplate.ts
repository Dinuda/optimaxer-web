/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { AbstractPromptTemplate } from "./AbstractPromptTemplate";

export class GeneralPromptTemplate extends AbstractPromptTemplate {

    /**
     * formatPrompt
     * This function formats the prompt based on the parameters passed.
     * @param params - The parameters that are required to format the prompt.
     * @returns string - The formatted prompt.
     * 
     **/
    formatPrompt(params: any){
        return `
        Categorize the following user text into one of the given categories.

        Text: "${params.userText}"

        Select the most appropriate category from the following options:: ${params.availableCategories}

        The best fitting category is:`
    }
}