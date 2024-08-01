import { expect, test } from 'vitest';
import { PromptTemplateFactory } from '../../src/factories/PromptTemplateFactory';


test('Get Prompt Template', async () => {
    const actionParams = {
        "order_id": "Extract the id of the order"
    }
    const params: Record<string, any> = { "outputFormat": actionParams, "userCommand": "Delete Order 43" };
    const response = PromptTemplateFactory.getFormattedPrompt('gemma', params);
    expect(response.length).toBeGreaterThan(0);
});