// Extraction Response
export class ExtractionReponse {
    public status:number;
    public result:{ [key: string]: string };
    public message:string="";

    /**
     * @param status - HTTP status code.
     * @param result - Extracted data.
     * @param message - Response message.
    **/
    constructor(status:number, result:{ [key: string]: string }, message:string){
        this.status = status;
        this.result = result;
        this.message = message;
    }
}