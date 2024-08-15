export class CosineSim {

    private static dotProduct(vectorA: number[], vectorB: number[]): number {
        return vectorA.reduce((sum, value, index) => sum + value * vectorB[index], 0);
    }
    
    private static magnitude(vector: number[]): number {
        return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
    }
    
    public static cosineSimilarity(vectorA: number[], vectorB: number[]): number {
        const dotProd = CosineSim.dotProduct(vectorA, vectorB);
        const magA = CosineSim.magnitude(vectorA);
        const magB = CosineSim.magnitude(vectorB);
    
        return dotProd / (magA * magB);
    }
    
    
    public static testConsineSim() {
        const vectorA = [1, 2, 3];
        const vectorB = [4, 5, 6];
        
        console.log(CosineSim.cosineSimilarity(vectorA, vectorB));
    }
}
