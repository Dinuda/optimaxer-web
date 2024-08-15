/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
**/

export abstract class AbstractDataExtractor {
  /**
   * extractData
   * This function extracts data from the given text based on the schema.
   * @param text The text to extract data from.
   * @param schema The schema to extract data based on.
   */
  abstract extractData(text: string, schema: { [key: string]: any }): Promise<{ [key: string]: any }>;
}