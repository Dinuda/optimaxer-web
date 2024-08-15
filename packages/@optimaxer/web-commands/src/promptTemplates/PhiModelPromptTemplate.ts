/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { Example } from "../types/JsonDocument";
import { PromptTemplate } from "../types/PromptTemplate";

export class PhiModelPromptTemplate implements PromptTemplate {
    /**
     * format
     * @param params - An object containing parameters for formatting the prompt.
     * @returns string
     * 
     * This function formats the prompt based on the provided parameters. It generates a string
     * that includes instructions to extract requested details from a user command and return them 
     * as a JSON object. The output strictly adheres to the provided keys and format.
     * 
     * Example usage:
     * const params = { userCommand: "Get me the details of the latest project.", outputFormat: "{ \"projectDetails\": \"string\" }" };
     * const formattedPrompt = new PhiModelPromptTemplate().format(params);
     * 
     * @param params.userCommand - The user's command to be processed.
     * @param params.outputFormat - The expected JSON format for the output.
     */
    formatPromptWithoutExamples(params: Record<string, any>): string {
        return `
        Extract requested details from a user command and return it as a JSON object. 
        Output only the JSON result without any explanation or additional text.

        User command: ${params.userCommand}

        Output should be strictly in the following JSON format:
        ${params.outputFormat}
        
        JSON:`;
    }
    formatPromptWithExamples(params: Record<string, any>, examples: Example[]): string {
        // Extract the first two examples
        const example1 = examples[0] ? `
        User question: "${examples[0].command}"
        Expected output:
        ${JSON.stringify(examples[0].output, null, 4)}` : '';
    
        const example2 = examples[1] ? `
        User question: "${examples[1].command}"
        Expected output:
        ${JSON.stringify(examples[1].output, null, 4)}` : '';
    
        return `
        Extract details from the following user question and return it as a JSON object. 
        Adhere strictly to the provided keys and format without any variations.
    
        User question: ${params.userCommand}
    
        Output format:
        ${params.outputFormat}
    
        Examples:${example1}${example2}
    
        Output only the JSON object exactly in the specified format. No extra text or keys.
    
        User question: ${params.userCommand}
    
        Output format:
        ${params.outputFormat}
    
        JSON:
        `;
    }
}
