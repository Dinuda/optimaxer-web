/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { AbstractPromptTemplate } from "./AbstractPromptTemplate";

export class SentimentPromptTemplate extends AbstractPromptTemplate {
    
    /**
     * formatPrompt
     * This function formats the prompt based on the parameters passed.
     * @param params - The parameters that are required to format the prompt.
     * @returns string - The formatted prompt.
     * 
     **/
    formatPrompt(params: any){
        return `
        Determine the sentiment of the following text and select the most appropriate sentiment from the list below.

        Text: "${params.userText}"

        Sentiment Options: ${params.availableCategories}

        Respond with only the chosen sentiment label. Do not include any additional information or explanation.

        Sentiment:
        `
    }
}