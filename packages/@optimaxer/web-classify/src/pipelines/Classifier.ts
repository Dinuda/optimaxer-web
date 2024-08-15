/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { Response, OnBrowserEmbeddingEngine } from "@optimaxer/web-core";
import { ClassificationReponse } from "../types/ClassificationResponse";
import { InferenceEngine } from "../inferences/InferenceEngine";
import { MediaPipeModel, WebLLMModel } from "../types/LLMModel";
import { LLMEngine } from "../types/InferenceEngines";
import { ClassificationType } from "../types/ClassificationType";
import { AbstractClassifier } from "../classifiers/AbstractClassifier";
import { SentimentClassifier } from "../classifiers/SentimentClassifier";
import { GeneralClassifier } from "../classifiers/GeneralClassifier";
import { VectorClassifier } from "../classifiers/VectorClassifier";

export class Classifier{ 

    /**
     * setup
     * This function initializes the classifier by creating an instance of the InferenceEngine and VectorClassifier.
     * @param modelName - The name of the LLM model to be used for inference.
     * @param llmInferenceEngine - The inference engine to be used for LLM inference.
     * @returns Promise<Response> - The response indicating the success or failure of the classifier setup.
     */
    async setup(modelName: WebLLMModel | MediaPipeModel, llmInferenceEngine: LLMEngine): Promise<Response> {
        // Initialize the InferenceEngine and VectorClassifier
        const response  = await InferenceEngine.init(modelName, llmInferenceEngine);
        await VectorClassifier.initEmbeddingEngine();
        if(response.status !== 201) {
            return new Response(201, 'Classifier Setup Successful');
        } else {
            return new Response(400, 'Classifier Setup Failed');
        }
    }

    /**
     * classify
     * This function classifies the user text into a category based on the classification type.
     * @param userText - The user text to be classified.
     * @param classificationType - The type of classification to be performed.
     * @param availableCategories - The categories that the user text can be classified into.
     * @returns Promise<ClassificationReponse> - The response indicating the success or failure of the classification.
     */
    async classify(userText: string, classificationType: ClassificationType = 'general', availableCategories:string[] =[],): Promise<ClassificationReponse> {
        let classifier: AbstractClassifier;
        // Check the classification type and create the appropriate classifier instance.
        if(classificationType === 'sentiment') {   
            classifier = new SentimentClassifier();
        } else if(classificationType === 'general') {
            classifier = new GeneralClassifier();
        }
        else{
            return new ClassificationReponse(400,'','Invalid Classification Type');
        }
        const classificationResult = await classifier.classify(userText, availableCategories);
        return new ClassificationReponse(200, classificationResult, 'Classification Successful');
    }
}