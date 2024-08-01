/**
 * Author: Srilal S. Siriwardhane
 * Email: SrilalS@99x.io
**/

import { expect, test } from 'vitest';

import { TransformerJSInferenceEngine } from '../../src/llm-inferences/TransformerJSInferenceEngine';
import { ChatMessage, HumanChatMessage, SystemChatMessage } from '../../src/types/ChatMessages';

import { DetectEnv } from '../../src/utils/DetectEnv';

test.skipIf(DetectEnv.isNode)('Run Inference on Test Input', async () => {
    const llmModel: TransformerJSInferenceEngine = new TransformerJSInferenceEngine('tinymistral');

    const chat: ChatMessage[] = [
        new SystemChatMessage('Tell Me about Newton'),
    ];

    llmModel.onStatusChange((status) => {
        console.log(status);
    });

    const response: ChatMessage[] = await llmModel.runChatInference(chat);


    

    expect(response.length).toBe(2);
    expect(response[1].role).toBe('assistant');
    expect(response[1].content).not.toBe('');
});