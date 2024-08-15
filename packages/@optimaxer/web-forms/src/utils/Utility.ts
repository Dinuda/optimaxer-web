/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
**/

export class Utility{
    /**
     * extractJsonFromLlmResponse
     * This function extracts the JSON object from the given LLM response.
     * @param input - The LLM response string
     * @returns The JSON object extracted from the LLM response
     * @throws Error if no valid JSON object found in the string
     **/
    static extractJsonFromLlmResponse(input: string): { [key: string]: any } {
        try {
            // Check if the string contains '{' and '}'
            const hasCurlyBraces = input.includes('{') && input.includes('}');
            // Check if the string contains '[' and ']'
            const hasSquareBraces = input.includes('[') && input.includes(']');
            
            let jsonString = input;
            
            // If no curly braces but has square braces, replace the first '[' with '{' and last ']' with '}'
            if (!hasCurlyBraces && hasSquareBraces) {
                const firstSquareIndex = input.indexOf('[');
                const lastSquareIndex = input.lastIndexOf(']');
                if (firstSquareIndex !== -1 && lastSquareIndex !== -1) {
                    jsonString = input.substring(0, firstSquareIndex) + '{' + input.substring(firstSquareIndex + 1, lastSquareIndex) + '}' + input.substring(lastSquareIndex + 1);
                }
            }
            
            // Find the first '{' and the last '}' to extract the JSON object
            const firstBraceIndex = jsonString.indexOf('{');
            const lastBraceIndex = jsonString.lastIndexOf('}');
            
            if (firstBraceIndex !== -1 && lastBraceIndex !== -1) {
                // Extract the JSON substring
                const jsonSubString = jsonString.substring(firstBraceIndex, lastBraceIndex + 1);
                // Parse the JSON string
                return JSON.parse(jsonSubString);
            } else {
                throw new Error("No valid JSON object found in the string.");
            }
        } catch (error) {
            console.log("Error: Incorrect JSON Format;", error);
            return {};
        }
    }
    
    /**
     * flattenJsonObject
     * This function flattens a JSON object.
     * @param obj - The JSON object to be flattened
     * @param parentKey - The parent key of the object
     * @param result - The result object
     * @returns The flattened JSON object
     **/
    static flattenJsonObject(obj: { [key: string]: any }, parentKey: string = '', result: { [key: string]: any } = {}): { [key: string]: any } {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                const newKey = parentKey ? `${parentKey}_${key}` : key;
    
                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    // Recursive call for nested objects
                    Utility.flattenJsonObject(value, newKey, result);
                } else {
                    // Assign the value to the flattened key
                    result[newKey] = value;
                }
            }
        }
        return result;
    }
}