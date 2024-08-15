/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

/**
 * JsonDocument Interface
 * 
 * This interface defines the structure of a JSON document, which includes an optional ID,
 * the main content as a string, and associated metadata.
 */
export interface JsonDocument {
    /**
     * An optional unique identifier for the JSON document.
     */
    id?: number;

    /**
     * The main content of the JSON document, represented as a string.
     */
    content: string;

    /**
     * Metadata associated with the JSON document, structured as an object.
     */
    metadata: Metadata;
}

/**
 * Metadata Interface
 * 
 * This interface represents the structure of the metadata object, which can contain 
 * nested objects, strings, numbers, booleans, or arrays.
 */
interface Metadata {
    [key: string]: Metadata | string | number | boolean | any[];
}

/**
 * ExampleConfig Interface
 * 
 * This interface defines the structure of a configuration object for an example application.
 * It includes a version number and an array of data objects.
 */
export interface ExampleConfig {
    version: string;
    data: any[];
}

export interface Example{
    command: string;
    output: any;
    metadata: Metadata;
}