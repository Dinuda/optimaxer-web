/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
**/

export class GeneralDataInjector {
    /**
     * injectData
     * This function injects data into the schema based on the schema keys.
     * @param data 
     * @param schema
     * @returns { remainingDataGeneral, injectedSchemaGeneral }
     * remainingDataGeneral - The data that is not injected into the schema.
     * injectedSchemaGeneral - The schema with the injected data.
     * 
     **/
    injectData(data: { [key: string]: any }, schema: { [key: string]: any }): { remainingDataGeneral: { [key: string]: any }, injectedSchemaGeneral: { [key: string]: any } } {
        // Create a case-insensitive key map for the schema
        const schemaKeys = Object.keys(schema).map(key => key.toLowerCase());

        // Iterate over the data keys
        for (const key of Object.keys(data)) {
            // Check if there is a matching schema key ignoring case
            const lowerCaseKey = key.toLowerCase();
            const schemaIndex = schemaKeys.indexOf(lowerCaseKey);
            if (schemaIndex !== -1) {
                // If there's a match, inject data into schema and remove from data
                const schemaKey = Object.keys(schema)[schemaIndex];
                schema[schemaKey] = data[key];
                delete data[key];
            }
        }

        // Return the modified data and schema objects
        return { remainingDataGeneral: data, injectedSchemaGeneral: schema };
    }
}
