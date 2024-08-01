/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { CommandFactory } from "../factories/CommandFactory";
import { Document, Response } from '@optimaxer/web-core';
import { Entity } from "../types/Entity";
import { Action } from "../types/Action";
import { WebLLMModel } from "../types/LLMModel";
import { Utility } from "../utils/Utility";
import { VectorDatabaseManager } from "../utils/VectorDatabaseManager";
import { Pipeline } from "./Pipeline";
import { CommandResponse } from "../types/CommandResponse";
import { LLMEngine } from "../types/InferenceEngines";
import { ExampleConfig } from "../types/JsonDocument";

export class CommandPipeline extends Pipeline {
    commandVecStoreName: string = 'commandDB';
    actionVecStoreName: string = 'actionDB';

    constructor() {
        super();
    }

    /**
     * setupPipeline
     * @param sampleCommands - Array of sample command objects.
     * @param sampleActions - Array of sample action objects.
     * @returns Promise<Response>
     * 
     * This function sets up the pipeline by converting sample commands and actions into
     * Document objects and creating vector stores for them. It returns a Response indicating
     * the success or failure of the vector store creation.
     * 
    **/
    protected async setupPipeline(sampleCommands: ExampleConfig, sampleActions: ExampleConfig): Promise<Response> {
        const commandDBName = `commandDB_${sampleCommands.version}`; 
        const actionDBName = `actionDB_${sampleActions.version}`;

        // Get all versioned DB names for commands and actions
        const commandDBNames = await VectorDatabaseManager.getAllVersionedDBNames('commandDB');
        const actionDBNames = await VectorDatabaseManager.getAllVersionedDBNames('actionDB');

        // Check if the vector stores already exist
        const commandStoreExists = commandDBNames.includes(commandDBName);
        const actionStoreExists = actionDBNames.includes(actionDBName);

        if (!commandStoreExists) {
            console.log("Creating command vector store", commandDBName);
            const commandDocs: Document[] = Utility.convertJsonToDocuments(sampleCommands.data);
            await this.vectorStore.createVectorStore(commandDBName, commandDocs);
        }

        if (!actionStoreExists) {
            console.log("Creating action vector store", actionDBName);
            const actionDocs: Document[] = Utility.convertJsonToDocuments(sampleActions.data);
            await this.vectorStore.createVectorStore(actionDBName, actionDocs);
        }

        return new Response(201, 'Index DB created successfully');
    }

    /**
     * runPipeline
     * @param userCommand - The command input by the user.
     * @param entityConfig - Configuration array for entities.
     * @param modelName - The name of the model to be used for the action extraction.
     * @param functionRegistry - The functions defined by the user and which needs to be executed upon action.
     * @param llmInferenceEngine - The LLM inference engine to be used.
     * @returns Promise<CommandResponse>
     * 
     * This function runs the pipeline by creating a command, retrieving the relevant entity,
     * determining the action, extracting information using the specified model, and executing
     * the command. It returns a CommandResponse indicating the result of the execution.
     * 
    **/
    protected async runPipeline(userCommand: string, entityConfig: any[], modelName: WebLLMModel = "gemma", functionRegistry: { [key: string]: (...args: any[]) => any }, llmInferenceEngine: LLMEngine = "media-pipe"): Promise<CommandResponse> {
        console.time("pipeline");

        // Get the latest versioned database names
        const commandDBName = await VectorDatabaseManager.getLatestVersionedDBName('commandDB');
        const actionDBName = await VectorDatabaseManager.getLatestVersionedDBName('actionDB');
        console.log("Index Databases: ", commandDBName, actionDBName);

        const entities: Entity[] = Utility.convertJsonToEntity(entityConfig);
        const command = await CommandFactory.createCommand(userCommand);
        const entity: Entity = await command.getEntity(entities, this.vectorStore, commandDBName);
        console.log("Relevant Entity: ", entity);
        const action: Action = await command.getAction(entity, this.vectorStore, actionDBName);
        console.log("Action: ", action);
        const extraction: { [key: string]: string } = await command.getExtraction(action, modelName, llmInferenceEngine);
        console.log("Extraction: ", extraction);
        const execution: CommandResponse = await command.execute(entity, action, extraction, functionRegistry);
        console.timeEnd("pipeline");
        return execution;
    }
}
