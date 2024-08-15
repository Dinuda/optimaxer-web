/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

export class Utility{
    /**
     * findTheCategory
     * This function finds the category of the response based on the options passed.
     * @param response - The response to be categorized.
     * @param options - The options to categorize the response.
     * 
     **/
    static findTheCategory(response: string, options: string[]): string | null {
        // Function to remove symbols and convert to lower case
        const normalize = (str: string) => str.replace(/[\W_]/g, ' ').toLowerCase();
      
        // Normalize the response
        const normalizedResponse = normalize(response);
      
        // Initialize the index and match variables
        let firstMatch: string | null = null;
        let firstIndex: number = Infinity;
      
        // Iterate through each option in the array
        for (const option of options) {
          const normalizedOption = normalize(option);
          const index = normalizedResponse.indexOf(normalizedOption);
      
          // If the option is found in the response and its index is smaller than the current firstIndex
          if (index !== -1 && index < firstIndex) {
            firstIndex = index;
            firstMatch = option;
          }
        }
      
        // Return the first matching string or null if no match is found
        return firstMatch;
      }      
      
}