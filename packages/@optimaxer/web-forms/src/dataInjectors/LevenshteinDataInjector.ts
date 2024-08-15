/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
**/

export class LevenshteinDataInjector{

    /**
     * injectData
     * @param data - The data object to be injected.
     * @param schema - The schema object to be injected into.
     * @returns { remainingDataLevenshtein: { [key: string]: any }, injectedSchemaLevenshtein: { [key: string]: any } }
     * 
     * This function injects data into a schema object based on the similarity between the keys of the data and schema.
     */
    injectData(data: { [key: string]: any }, schema: { [key: string]: any }): { remainingDataLevenshtein: { [key: string]: any }, injectedSchemaLevenshtein: { [key: string]: any } } {
        // Create a list of schema keys with empty string values
        const emptyKeys = Object.keys(schema).filter(key => schema[key] === '');

        // Store the remaining data and injected schema
        const remainingDataLevenshtein = { ...data };
        const injectedSchemaLevenshtein = { ...schema };

        // For each key in schema that has an empty string, find the most appropriate key from data
        for (const emptyKey of emptyKeys) {
            let bestMatch: string | null = null;
            let bestScore: number = -1;

            for (const dataKey of Object.keys(data)) {
                // Compute similarity between the schema key and data key
                const similarity = this.computeSimilarity(emptyKey, dataKey);
                console.log("Similarity between", emptyKey, "and", dataKey, "is", similarity);
                
                // Update the best match if the current one is better
                if (similarity > bestScore) {
                    bestScore = similarity;
                    bestMatch = dataKey;
                }
            }

            // If the best match score is 0.2 or higher, fill the schema and remove the key from data
            if (bestScore >= 0.5 && bestMatch) {
                console.log("Injecting", data[bestMatch], "into", emptyKey," with similarity score", bestScore);
                injectedSchemaLevenshtein[emptyKey] = data[bestMatch];
                delete remainingDataLevenshtein[bestMatch];
            }
            else{
                injectedSchemaLevenshtein[emptyKey] = "";
            }
        }

        // Return the modified data and schema objects
        return { remainingDataLevenshtein, injectedSchemaLevenshtein };
    }


    computeSimilarity(stringA: string, stringB: string): number {
        const maxLength = Math.max(stringA.length, stringB.length);
        if (maxLength === 0) return 1.0;
        return (maxLength - this.levenshtein(stringA, stringB)) / maxLength;
    }

    /**
     * levenshtein
     * @param stringA - The first string for comparison.
     * @param stringB - The second string for comparison.
     * @returns number
     * 
     * This function computes the Levenshtein distance between two strings. The Levenshtein distance
     * is a metric for measuring the difference between two sequences by counting the minimum number 
     * of operations required to transform one string into the other.
     */
    levenshtein(stringA: string, stringB: string) {
        const matrix = [];

        for (let i = 0; i <= stringB.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= stringA.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= stringB.length; i++) {
            for (let j = 1; j <= stringA.length; j++) {
                if (stringB.charAt(i - 1) === stringA.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                    );
                }
            }
        }

        return matrix[stringB.length][stringA.length];
    }
}