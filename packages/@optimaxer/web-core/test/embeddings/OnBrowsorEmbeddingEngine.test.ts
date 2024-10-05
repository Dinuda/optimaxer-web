import { Document } from '../../src/types/Document';
import { VectorDocument } from '../../src/types/VectorDocument';
import { OnBrowserEmbeddingEngine } from '../../src/embeddings/OnBrowserEmbeddingEngine';

import { expect, test } from 'vitest';

const documents: Document[] = [
    new Document({content: 'This is a test document 0', metadata: {id: '0'}}),
    new Document({content: 'This is a test document 1', metadata: {id: '1'}}),
    new Document({content: 'This is a test document 2', metadata: {id: '2'}}),
    new Document({content: 'This is a test document 3', metadata: {id: '3'}}),
    new Document({content: 'This is a test document 4', metadata: {id: '4'}})
];

test("[ Browser/Node ] Run OnBrowserEmbedding", async () => {
    // Initialize the embedding engine asynchronously
    const onBrowserEmbedding: OnBrowserEmbeddingEngine = await OnBrowserEmbeddingEngine.init('gte-small');

    // Embed the documents
    const vectorDocuments: VectorDocument[] = await onBrowserEmbedding.embedDocuments(documents);

    // Check that we got the correct number of embedded documents
    expect(vectorDocuments.length).toBe(5);

    // Optionally, check the contents of the first vectorDocument
    expect(vectorDocuments[0].content).toBe('This is a test document 0');
    expect(vectorDocuments[0].metadata.id).toBe('0');
});
