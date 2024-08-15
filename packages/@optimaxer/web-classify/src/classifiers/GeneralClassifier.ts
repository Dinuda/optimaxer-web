/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { AbstractClassifier } from "./AbstractClassifier";
import { InferenceEngine } from "../inferences/InferenceEngine";
import { Utility } from "../utils/Utility";
import { GeneralPromptTemplate } from "../promptTemplates/GeneralClassifierPromptTemplate";
import { VectorClassifier } from "./VectorClassifier";

export class GeneralClassifier extends AbstractClassifier {

    /**
     * classify
     * This function classifies the user text into a category. This is invoked only for the general classifier usecases.
     * @param userText - The user text to be classified. 
     * @param categories - The categories that the user text can be classified into.
     * @returns Promise<string> - The category that the user text belongs to. 
     */
    async classify(userText: string, categories: string[]): Promise<string> {
        const promptTemplate = new GeneralPromptTemplate();
        const formattedPrompt = promptTemplate.formatPrompt({userText: userText, availableCategories: categories});
        console.log("formattedPrompt", formattedPrompt);
        // generating inference
        const sentimentResponse = await InferenceEngine.generateInference(formattedPrompt);
        console.log("sentiment Inference", sentimentResponse);
        const sentiment = Utility.findTheCategory(sentimentResponse, categories);
        // If sentiment is detected, return the sentiment
        if(sentiment){
            return sentiment
        }
        // If sentiment is not detected, try the Vector Classifier
        else{
            console.log("No sentiment detected from SLM model, trying Vector Classifier");
            const classifier = new VectorClassifier();
            const category = await classifier.classify(userText, categories);
            return category
        }
    }
}