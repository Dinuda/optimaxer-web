/**
 * Author: Srilal S. Siriwardhane
 * Email: SrilalS@99x.io
**/

// @ts-ignore
import { pipeline, Tensor, env, FeatureExtractionPipeline } from '@xenova/transformers';
import { AbstractEmbedderEngine } from './AbstractEmbedderEngine';
import { Document } from '../types/Document';
import { VectorDocument } from '../types/VectorDocument';
import { AvailableModels } from '../types/AvailableModels';
import { Model, ModelInfo } from '../types/Model';

/**
 * EmbedderModel
 * This type is extended by the `Model` Enum to enforce the model type.
 */
type EmbedderModel = Model | 'gte-small';

/**
 * OnBrowserEmbeddingEngine
 * This class is responsible for embedding texts and documents using the transformerJS 
 * in the browser environment.
 */
export class OnBrowserEmbeddingEngine extends AbstractEmbedderEngine{

    embedderModel:EmbedderModel;
    availableModels: AvailableModels = {
        'gte-small': new ModelInfo('Xenova/gte-small'),
    };
    embedder!: FeatureExtractionPipeline;

    /**
     * Constructor
     * @param model EmbedderModel
     */
    constructor(model:EmbedderModel) {
        super();
        env.allowLocalModels = false;
        env.allowRemoteModels = true;
        this.embedderModel = model;
    }

    static async init(model:EmbedderModel):Promise<OnBrowserEmbeddingEngine>{
        const instance = new OnBrowserEmbeddingEngine(model);
        await instance.createEmbedder(instance);
        return instance;
    };

    async createEmbedder(instance:OnBrowserEmbeddingEngine): Promise<void> {
        this.embedder = await pipeline('feature-extraction', instance.getModel());
    }

    async embedTexts(texts: string[]): Promise<number[][]> {

        const batchSize = 50;
        const vectorizedTexts: number[][] = [];

        for (let i = 0; i < texts.length; i += batchSize) {
            console.log(`Vectorizing batch ${i} to ${i + batchSize}...`);

            const batch = texts.slice(i, i + batchSize);
            const output: Tensor = await this.embedder(batch, { pooling: 'mean', normalize: true });

            output.tolist().forEach((vector: number[]) => {
            vectorizedTexts.push(vector);
            });
        }

        return vectorizedTexts;
    }

    async embedDocuments(documents: Document[]): Promise<VectorDocument[]> {

        const processedDocuments:string[] = documents.map(doc => {
            if (typeof(doc.content) === 'object') {
                return JSON.stringify(doc.content);
            } else {
                return doc.content;
            }
        });

        const batchSize = 50;
        const vectorDocuments: VectorDocument[] = [];
        
        for (let i = 0; i < processedDocuments.length; i += batchSize) {
            console.log(`Vectorizing batch ${i} to ${i + batchSize}...`);

            const batch = processedDocuments.slice(i, i + batchSize);
            const output: Tensor = await this.embedder(batch, { pooling: 'mean', normalize: true });

            batch.forEach((doc: string, index: number) => {
            vectorDocuments.push(new VectorDocument(
                doc,
                output.tolist()[index],
                documents[i + index].metadata
            ));
            });
        }

        return vectorDocuments;
    }

    /**
     * getModel
     * This method is responsible for returning the model name.
     * @returns string
     */
    getModel(): string {
        try {
            return this.availableModels[this.embedderModel].name;
        } catch (error) {
            throw new Error("Model not Found or not Supported!")
        }
    }
    
}