import { expect, test } from 'vitest';
import { CommandPipeline } from '../../src/pipelines/CommandPipeline.ts';
import { CommandFactory } from '../../src/factories/CommandFactory.ts';
import { Entity } from '../../src/types/Entity.ts';
import { Utility } from '../../src/utils/Utility.ts';
import { ClientVectorStoreEngine } from '@optimaxer/web-core';
import { Action } from '../../src/types/Action.ts';

const actions =
{
    "version": "0.1.3",
    "data": [
        {
            "content": "new",
            "metadata": {
                "name": "new"
            }
        },
        {
            "content": "edit",
            "metadata": {
                "name": "edit"
            }
        },
        {
            "content": "delete",
            "metadata": {
                "name": "delete"
            }
        }
    ]
}

const commands = {
    "version": "0.1.3",
    "data": [
        {
            "content": "Create a new order",
            "metadata": {
                "id": 1
            }
        },
        {
            "content": "I want to place a new order",
            "metadata": {
                "id": 1
            }
        },
        {
            "content": "Delete the order",
            "metadata": {
                "id": 1
            }
        }
    ]
}

const cmdPipeline = new CommandPipeline();
const response = await cmdPipeline.setup(commands, actions);

const config = [
    {
        "name": "Order",
        "id": 1,
        "actions": {
            "new": {
                "endpoint": "",
                "params": {},
                "functionName": "createNewOrder"
            },
            "delete": {
                "endpoint": "order/delete/${order_id}",
                "params": {
                    "order_id": "Extract the id of the order"
                },
                "functionName": "deleteOrder"
            }
        }
    }, {
        "name": "News",
        "id": 2,
        "actions": {
            "new": {
                "endpoint": "news/new",
                "params": {}
            }
        }
    }
]

const deleteAction = {
    "endpoint": "order/delete/${order_id}",
    "params": {
        "order_id": "Extract the id of the order"
    },
    "functionName": "deleteOrder",
    "name": "delete"
}

const examples = {
    "version": "0.1.0",
    "data": [
        {
            "command": "Delete the order with id 55",
            "output": {
                "order_id": 55
            },
            "metadata": {
                "name": "delete",
                "id": 1
            }
        },
        {
            "command": "Remove the order 12",
            "output": {
                "order_id": 12
            },
            "metadata": {
                "name": "remove",
                "id": 1
            }
        }]
}

const userCommand = "Delete the order 53";

test('Entity Identification', async () => {
    const entities: Entity[] = Utility.convertJsonToEntity(config);
    const vectorStore = new ClientVectorStoreEngine();
    const command = await CommandFactory.createCommand(userCommand);
    const response: Entity = await command.getEntity(entities, vectorStore, 'commandDB_0.1.3');
    expect(response.name).toBe('Order');
    expect(response.id).toBe(1);
});

test('Action Identification', async () => {
    const entities: Entity[] = Utility.convertJsonToEntity(config);
    const vectorStore = new ClientVectorStoreEngine();
    const command = await CommandFactory.createCommand(userCommand);
    const response: Action = await command.getAction(entities[0], vectorStore, 'actionDB_0.1.3');
    expect(response.endpoint).toBe("order/delete/${order_id}");
});

test('Entity Extraction', async () => {
    const entities: Entity[] = Utility.convertJsonToEntity(config);
    const command = await CommandFactory.createCommand(userCommand);
    const response = await command.getExtraction(entities[0], deleteAction, "gemma", "media-pipe", examples);
    expect(response["order_id"]).toBe(53);
});

test('Execute', async () => {
    const entities: Entity[] = Utility.convertJsonToEntity(config);
    const command = await CommandFactory.createCommand(userCommand);
    const extraction = { "order_id": "55" }
    const execution = await command.execute(entities[0], deleteAction, extraction, {});
    expect(execution.status).toBe('success');
    expect(execution.url).toBe('order/delete/55');
});
