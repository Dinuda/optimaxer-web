/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { Example } from "./JsonDocument";

/**
 * PromptTemplate Interface
 * 
 * This interface defines the structure for prompt templates, which are used to format
 * a prompt string based on provided parameters. Implementing classes should define how 
 * the formatting is done.
 */
export interface PromptTemplate {
    /**
     * format
     * @param params - An object containing parameters used to format the prompt.
     * @returns string
     * 
     * This method takes a record of parameters and returns a formatted prompt string.
     * The implementation specify how the parameters are incorporated into the 
     * resulting string.
     */
    formatPromptWithoutExamples(params: Record<string, any>): string;

    /**
     * formatPromptWithExamples
     * @param params - An object containing parameters used to format the prompt.
     * @param examples - An array of example objects to be included in the prompt.
     * @returns string
     * 
     * This method takes a record of parameters and an array of example objects, and 
     * returns a formatted prompt string. The implementation specify how the parameters 
     * and examples are incorporated into the resulting string.
     */
    formatPromptWithExamples(params: Record<string, any>, examples: Example[]): string;
}
