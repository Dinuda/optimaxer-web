/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/


/*
* AbstractClassifier
* This class is an abstract class that defines the structure of a classifier.
* The classifier is used to classify user text into a category.
*/
export abstract class AbstractClassifier {

    abstract classify(userText: string, availableCategories: string[]): Promise<string>;

}