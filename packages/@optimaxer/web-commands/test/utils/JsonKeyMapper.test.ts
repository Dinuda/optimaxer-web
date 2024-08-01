import { expect, test } from 'vitest';
import { JsonKeyMapper } from '../../src/utils/JsonKeyMapper';


test('Get Prompt Template', () => {
    const deleteParams = {
        "order_id": "Extract the id of the order"
    }
    const mockLLMOutput = {
        "id": '88'
    }
    const response: { [key: string]: string } = JsonKeyMapper.mapKeysAndExtractValues(deleteParams, mockLLMOutput);
    expect(response).toEqual({"order_id": "88"});
});