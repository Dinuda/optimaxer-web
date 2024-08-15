/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/


// Classification Response
export class ClassificationReponse {
    public status:number;
    public result:string;
    public message:string="";

    /**
     * @param status - HTTP status code.
     * @param message - Response message.
    **/
    constructor(status:number, result:string, message:string){
        this.status = status;
        this.result = result;
        this.message = message;
    }
}