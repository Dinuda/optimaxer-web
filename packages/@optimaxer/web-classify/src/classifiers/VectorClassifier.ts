/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { AbstractClassifier } from "./AbstractClassifier";
import { OnBrowserEmbeddingEngine, CosineSim } from "@optimaxer/web-core";

export class VectorClassifier extends AbstractClassifier {
    private static embeddingEngine: OnBrowserEmbeddingEngine| null = null;

    /**
     * classify 
     * This function classifies the user text into a category using vector embeddings.
     * @param userText - The user text to be classified.
     * @param categories - The categories that the user text can be classified into.
     * @returns Promise<string> - The category that the user text belongs to.
     */
    async classify(userText: string, categories: string[]): Promise<string> {
        const texts = [userText, ...categories];
        if(VectorClassifier.embeddingEngine) {
            const embeddings: number[][] = await VectorClassifier.embeddingEngine.embedTexts(texts);

            // Extract user text embedding
            const userTextEmbedding = embeddings[0];

            // Compute similarity scores
            let maxSimilarity = -1;
            let bestCategory = '';

            for (let i = 0; i < categories.length; i++) {
                const categoryEmbedding = embeddings[i + 1];
                const similarity = CosineSim.cosineSimilarity(userTextEmbedding, categoryEmbedding);

                if (similarity > maxSimilarity) {
                    maxSimilarity = similarity;
                    bestCategory = categories[i];
                }
            }
            console.log('Best Category with vectors:', bestCategory);
            return bestCategory;
        }
        console.log('Embedding Engine not initialized, returning first category');
        return categories[0];
        
    }

    /**
     * initEmbeddingEngine
     * This function initializes the embedding engine for the Vector Classifier.
     * @returns Promise<boolean> - The response indicating the success or failure of the embedding engine initialization.
     */
    static async initEmbeddingEngine(): Promise<boolean> {
        if(VectorClassifier.embeddingEngine === null) {
            console.log('Initializing Embedding Engine');
            VectorClassifier.embeddingEngine = await OnBrowserEmbeddingEngine.init('gte-small');
            console.log('Embedding Engine initialized');
            return true;
        }
        console.log('Embedding Engine already initialized');
        return true
    }
}