/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { AbstractPromptTemplate } from "./AbstractPromptTemplate";

export class GemmaExtractorPromptTemplate extends AbstractPromptTemplate {

    /**
     * formatPrompt
     * This function formats the prompt based on the parameters passed.
     * @param params - The parameters that are required to format the prompt.
     * @returns string - The formatted prompt.
     * 
     **/
    formatPrompt(params: any){
        if (Object.keys(params.schema).length > 0){
            // return `
            // Extract the following data from the provided text and structure it into a JSON object according to the given schema.

            // Text: "${params.userText}"

            // JSON Schema:"${JSON.stringify(params.schema)}"
            // Output only the JSON object with the keys as per the schema, without any explanation.

            // JSON:`
            return `
            Extract the required fields from the provided text and structure them into a JSON object.

            Provided Text: ' ${params.userText} '

            Required Fields: ${params.requiredFields}

            Output: Only the JSON object with the specified keys, without any additional explanation.

            JSON:`

        }else{ 
            return `
            Extract the following data from the provided text and structure it into a JSON object.

            Text: "${params.userText}"

            Output only the JSON object without any explanation.

            JSON:`
        }
    }
}