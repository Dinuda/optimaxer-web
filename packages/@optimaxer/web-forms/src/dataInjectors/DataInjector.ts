/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
**/

import {GeneralDataInjector} from './GeneralDataInjector';
import { LevenshteinDataInjector } from './LevenshteinDataInjector';

export class DataInjector{
    generalDataInjector: GeneralDataInjector;
    levenshteinDataInjector: LevenshteinDataInjector;
    constructor(){
        this.generalDataInjector = new GeneralDataInjector();
        this.levenshteinDataInjector = new LevenshteinDataInjector();
    }

    /**
     * injectData
     * This function injects data into the schema.
     * @param data The data to be injected.
     * @param schema The schema to inject data into.
     * @returns { [key: string]: any } The schema with the injected data.
     */
    injectData(data:{ [key: string]: any }, schema: { [key: string]: any }): { [key: string]: any } {
        const { remainingDataGeneral,injectedSchemaGeneral } = this.generalDataInjector.injectData(data, schema);
        console.log("general remainingData", remainingDataGeneral);
        console.log("general injectedSchema", injectedSchemaGeneral);
        const {remainingDataLevenshtein, injectedSchemaLevenshtein} = this.levenshteinDataInjector.injectData(remainingDataGeneral, injectedSchemaGeneral);
        console.log("injectedSchemaLevenshtein", injectedSchemaLevenshtein);
        console.log("remainingDataLevenshtein", remainingDataLevenshtein);
        return injectedSchemaLevenshtein
    }
}