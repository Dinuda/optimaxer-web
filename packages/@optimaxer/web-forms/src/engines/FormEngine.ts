import { LLMEngine } from "../types/InferenceEngine";
import { Response } from "@optimaxer/web-core";
import { WebLLMModel, MediaPipeModel } from "../types/LLMModel";
import { InferenceEngine } from "../inferences/SLMInferenceEngine";
import { SLMDataExtractor } from "../dataExtractors/SLMDataExtractor";
import { Utility } from "../utils/Utility";
import { DataInjector } from "../dataInjectors/DataInjector";
import { ExtractionReponse } from "../types/ExtractionResponse";

export class FormEngine {
    private dataExtractor: SLMDataExtractor;
    private dataInjector: DataInjector;
    constructor() {
        this.dataExtractor = new SLMDataExtractor()
        this.dataInjector = new DataInjector()
    }

    /**
     * setup
     * @param modelName 
     * @param llmInferenceEngine 
     * @returns Response
     * 
     * This function initializes the Form Engine by creating an instance of the InferenceEngine.
     */
    async setup(modelName: WebLLMModel | MediaPipeModel, llmInferenceEngine: LLMEngine): Promise<Response> {
        // Initialize the InferenceEngine
        const response  = await InferenceEngine.init(modelName, llmInferenceEngine);
        if(response.status !== 201) {
            return new Response(201, 'Form Engine Setup Successful');
        } else {
            return new Response(400, 'Form Engine Setup Failed');
        }
    }

    /**
     * extract
     * @param formSchema 
     * @param text 
     * @returns { [key: string]: any }
     * 
     * This function extracts data from the given text using the SLM model and injects the extracted data into the form schema.
     */
    async extract(formSchema: { [key: string]: string }, text: string = ''): Promise<ExtractionReponse> {
        try {
            if(text.length < 1){
                // Access the clipboard data
                text = await navigator.clipboard.readText();
                console.log("Clipboard Text", text);
    
                // Ensure the clipboardText is not empty
                if (!text) {
                    console.error("Clipboard is empty or access is denied.");
                    return new ExtractionReponse(400,{}, 'Clipboard is empty or access is denied.');
                }
            }
            const extracted_JSON: { [key: string]: any } = await this.dataExtractor.extractData(text,formSchema);
            const flatten_JSON = Utility.flattenJsonObject(extracted_JSON);
            console.log("Flatten JSON", flatten_JSON);
            const injectedData = this.dataInjector.injectData(flatten_JSON, formSchema);
            return new ExtractionReponse(200, injectedData, 'Data Extraction Successful');
        } catch (error) {
            console.error("Error in data extraction", error);
            return new ExtractionReponse(400,{}, 'Error in data extraction');
        }
        
    }

}