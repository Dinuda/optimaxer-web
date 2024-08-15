/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

export abstract class AbstractPromptTemplate{
    
    /**
     * formatPrompt
     * This function formats the prompt based on the parameters passed.
     * @param params - The parameters that are required to format the prompt.
     */
    abstract formatPrompt(params:any): string;
}