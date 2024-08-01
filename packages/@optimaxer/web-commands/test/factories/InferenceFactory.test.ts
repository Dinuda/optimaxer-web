import { expect, test } from 'vitest';
import { InferenceFactory } from '../../src/factories/InferenceFactory';

const userCommand = "Delete Order 14";

const deleteAction = {
    "endpoint": "order/delete/${order_id}",
    "params": {
        "order_id": "Extract the id of the order"
    },
    "functionName": "deleteOrder"
}

test('Generate Inference', async () => {
    const response: string = await InferenceFactory.generateInference(userCommand, deleteAction, 'gemma', 'media-pipe')
    expect(response.length).toBeGreaterThan(0);
});

// test("Skipped", async () => {
    
// });