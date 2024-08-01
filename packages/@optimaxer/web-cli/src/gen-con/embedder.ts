import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";

export class VecDoc {
    public id:number;
    public content:string;
    public vector:number[];

    constructor(id:number,content:string,vector:number[]) {
        this.id = id;
        this.content = content;
        this.vector = vector;
    }
}

export async function Embedder(content:string[]):Promise<VecDoc[]> {

    const model = new HuggingFaceTransformersEmbeddings({
        model: "Xenova/all-MiniLM-L6-v2",
    });
    
    const documentRes = await model.embedDocuments(content);
    
    const vecDocs:VecDoc[] = [];
    documentRes.forEach((res,index) => {
        vecDocs.push(new VecDoc(index,content[index],res));
    });

    return vecDocs;
}