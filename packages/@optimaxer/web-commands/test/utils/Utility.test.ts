import { expect, test } from 'vitest';
import { Utility } from '../../src/utils/Utility';

test('JSON extraction from string', () => {
    const mockLLMOutput = `Here is the extracted object
    {"order_id": "32"}
    Order id is 32.
    `
    const response= Utility.extractJsonFromLlmResponse(mockLLMOutput);
    expect(response).toEqual({"order_id": "32"});
});

test('JSON extraction from array', () => {
    const mockLLMOutput = `Here is the extracted object
    ["order_id": "32"]
    Order id is 32.
    `
    const response= Utility.extractJsonFromLlmResponse(mockLLMOutput);
    expect(response).toEqual({"order_id": "32"});
});

test('JSON extraction from array of object', () => {
    const mockLLMOutput = `Here is the extracted object
    [{"order_id": "32"}]
    Order id is 32.
    `
    const response= Utility.extractJsonFromLlmResponse(mockLLMOutput);
    expect(response).toEqual({"order_id": "32"});
});

test('JSON extraction for missing ]', () => {
    const mockLLMOutput = `Here is the extracted object
    [{"order_id": "32"},{"order_id": "33"}
    Order id is 32.
    `
    const response= Utility.extractJsonFromLlmResponse(mockLLMOutput);
    console.log("response", response);
    expect(response).toEqual({"order_id": "32"});
});