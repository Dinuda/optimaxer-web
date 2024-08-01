/**
 * Author: Srilal S. Siriwardhane
 * Email: SrilalS@99x.io
**/

import { Document } from '../../src/types/Document';
import { VectorDocument } from '../../src/types/VectorDocument';
import { ClientVectorStoreEngine } from '../../src/vector-stores/ClientVectorStoreEngine';
import { OnBrowserEmbeddingEngine } from '../../src/embeddings/OnBrowserEmbeddingEngine';

import { expect, test } from 'vitest';
import { DetectEnv } from '../../src/utils/DetectEnv';

const clientVectorStore: ClientVectorStoreEngine = new ClientVectorStoreEngine();
const onBrowserEmbedding: OnBrowserEmbeddingEngine = new OnBrowserEmbeddingEngine('gte-small');
const vectorDocuments:VectorDocument[] = [];


const dbName = 'testDB';
const documents: Document[] = [
  new Document({content: 'This is a test document 0', metadata: {id: '0'}}),
  new Document({content: 'This is a test document 1', metadata: {id: '1'}}),
  new Document({content: 'This is a test document 2', metadata: {id: '2'}}),
  new Document({content: 'This is a test document 3', metadata: {id: '3'}}),
  new Document({content: 'This is a test document 4', metadata: {id: '4'}})
];

test.skipIf(DetectEnv.isNode)("[ Browser ] Create and Save VectorStore using 'ClientVectorStore'", async () => {
  const vDocs:VectorDocument[] = await onBrowserEmbedding.embedDocuments(documents);
  vectorDocuments.push(...vDocs);
  expect(vectorDocuments.length).toBe(5);
});

test.skipIf(DetectEnv.isNode)("[ Browser ] Execute a Similarity Search on the created 'ClientVectorStore'", async () => {
  const response:Document[] = await clientVectorStore.searchVectorStore('Document 0', dbName,1);
  expect(response.length).toBeGreaterThan(0);
});

