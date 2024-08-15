/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { Example } from "../types/JsonDocument";
import { PromptTemplate } from "../types/PromptTemplate";

export class GemmaModelPromptTemplate implements PromptTemplate {
    /**
     * formatPromptWithoutExamples
     * @param params - An object containing parameters for formatting the prompt.
     * @returns string
     * 
     * This function formats the prompt based on the provided parameters. It generates a string
     * that includes instructions to extract details from a user question and return them as a 
     * JSON object. The output strictly adheres to the provided keys and format.
     * 
     * Example usage:
     * const params = { userCommand: "What is the weather like?", outputFormat: "{ \"question\": \"string\" }" };
     * const formattedPrompt = new GemmaModelPromptTemplate().format(params);
     * 
     * @param params.userCommand - The user's command or question to be processed.
     * @param params.outputFormat - The expected JSON format for the output.
     */
    formatPromptWithoutExamples(params: Record<string, any>): string {
        return `
        Extract details from the following user question and return it as a JSON object. 
        Ensure the output strictly adheres to the provided keys and format without any variations.

        User question: ${params.userCommand}

        Output should be strictly in the following JSON format:
        ${params.outputFormat}

        Output only the JSON object without any other details.
        JSON:
        `;
    }

    /**
     * formatPromptWithExamples
     * 
     * @param params 
     * @param examples 
     * @returns 
     * 
     * This function formats the prompt based on the provided parameters and examples. 
     * It generates a string that includes instructions to extract details from a user question and return them as a JSON object. 
     * The output strictly adheres to the provided keys and format.
     */
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
    
        Examples (for reference only):

        Example 1:
        ${example1}
        
        Example 2:
        ${example2}
    
        Output only the JSON object exactly in the specified format. No extra text or keys.
    
        User question: ${params.userCommand}
    
        Output format:
        ${params.outputFormat}
    
        JSON:
        `;
    }
    
}
