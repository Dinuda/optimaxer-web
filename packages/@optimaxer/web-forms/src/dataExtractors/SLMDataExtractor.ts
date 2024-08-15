/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
**/

import { AbstractDataExtractor } from './AbstractDataExtractor';
import { GemmaExtractorPromptTemplate } from '../promptTemplate/GemmaExtractorPromptTemplate';
import { InferenceEngine } from '../inferences/SLMInferenceEngine';
import { AbstractPromptTemplate } from '../promptTemplate/AbstractPromptTemplate';
import { Utility } from '../utils/Utility';

export class SLMDataExtractor extends AbstractDataExtractor {

  /**
   * extractData
   * This function extracts data from the given text using the SLM model.
   * @param text The text to extract data from.
   * @param schema The schema to extract data based on.
   * @returns Promise<{ [key: string]: any }> - The extracted data.
   */
  async extractData(text: string, schema: { [key: string]: any } = {}): Promise<{ [key: string]: any }> {
    // implementation
    const promptTemplate: AbstractPromptTemplate = new GemmaExtractorPromptTemplate();
    const requiredFields: string[] = Object.keys(schema);
    const formattedPrompt: string = promptTemplate.formatPrompt({userText: text, schema: schema, requiredFields: requiredFields});
    console.log("formattedPrompt:", formattedPrompt);
    const llm_extraction: string = await InferenceEngine.generateInference(formattedPrompt);
    console.log("sentiment Inference", llm_extraction);
    const json_extrcation = Utility.extractJsonFromLlmResponse(llm_extraction)
    return json_extrcation

  }

}