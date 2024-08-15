/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

// Importing necessary classes and types from the web-core library and local project files.
import { AbstractLLMInferenceEngine, MediaPipeInferenceEngine, WebLLMInferenceEngine, ChatMessage, HumanChatMessage, Response } from "@optimaxer/web-core";
import { WebLLMModel, MediaPipeModel } from "../types/LLMModel";
import { LLMEngine, availableLLMEngines } from "../types/InferenceEngines";

export class InferenceEngine {
    // Singleton instance of AbstractLLMInferenceEngine to ensure only one instance is used throughout the application.
    private static llmInstance: AbstractLLMInferenceEngine | null = null;

    /**
     * init
     * This function initializes the LLM instance based on the provided model name and inference engine.
     * @param modelName - The name of the LLM model to be used for inference.
     * @param llmInferenceEngine -  The inference engine to be used for LLM inference.
     * @returns Promise<Response> - The response indicating the success or failure of the LLM instance creation.
     */
    static async init(modelName: WebLLMModel | MediaPipeModel, llmInferenceEngine: LLMEngine): Promise<Response> {
        // Creating an instance of the LLMInferenceEngine based on the provided inference
        if (!InferenceEngine.llmInstance) {
            if (llmInferenceEngine === availableLLMEngines.MediaPipe) {
                console.log("Setting up Media pipe engine.");
                InferenceEngine.llmInstance = await MediaPipeInferenceEngine.init(modelName=='gemma'?'gemma-gpu':modelName as MediaPipeModel, false);
            } else if (llmInferenceEngine === availableLLMEngines.WebLLM) {
                console.log("Setting up WebLLM engine.");
                InferenceEngine.llmInstance = await WebLLMInferenceEngine.init(modelName as WebLLMModel);
            } else {
                return new Response(400, 'Invalid LLM Engine');
            }
        }
        return new Response(201, 'LLM Instance Created Successfully');
    }

    /**
     * generateInference
     * This function generates an inference based on the provided formatted prompt.
     * @param formattedPrompt - The prompt string formatted for LLM inference.
     * @returns Promise<string> - The inference result as a string.
     */
    static async generateInference(formattedPrompt: string): Promise<string> {

        // Executing the inference based on the type of LLMInferenceEngine instance.
        if (InferenceEngine.llmInstance instanceof MediaPipeInferenceEngine) {
            return await InferenceEngine.getInferenceFromCompletion(formattedPrompt);
        } else if (InferenceEngine.llmInstance instanceof WebLLMInferenceEngine) {
            return await InferenceEngine.getInferenceFromChat(formattedPrompt);
        } else {
            throw new Error('Unsupported LLM Instance');
        }
    }

    /**
     * Executes a chat-based inference using the provided formatted prompt.
     * 
     * @param formattedPrompt - The prompt string formatted for chat inference.
     * @returns A promise that resolves to the inference result as a string.
     */
    private static async getInferenceFromChat(formattedPrompt: string): Promise<string> {
        const chatMsg: ChatMessage[] = [new HumanChatMessage(formattedPrompt)];
        console.time("LLM_call_Chat");
        const llmOutput: ChatMessage[] = await InferenceEngine.llmInstance!.runChatInference(chatMsg);
        console.timeEnd("LLM_call_Chat");
        return llmOutput[1].content;
    }

    /**
     * Executes a completion-based inference using the provided formatted prompt.
     * 
     * @param formattedPrompt - The prompt string formatted for completion inference.
     * @returns A promise that resolves to the inference result as a string.
     */
    private static async getInferenceFromCompletion(formattedPrompt: string): Promise<string> {
        console.time("LLM_call_Completion");
        const llmOutput: string = await InferenceEngine.llmInstance!.runCompletionInference(formattedPrompt);
        console.timeEnd("LLM_call_Completion");
        return llmOutput;
    }
}
