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