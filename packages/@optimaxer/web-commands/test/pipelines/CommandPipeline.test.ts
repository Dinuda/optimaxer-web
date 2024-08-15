import { expect, test } from 'vitest';
import { CommandPipeline } from '../../src/pipelines/CommandPipeline.ts'

const actions = {
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

test('Command Pipeline - Setup', async () => {
    const cmdPipeline = new CommandPipeline();
    const response = await cmdPipeline.setup(commands, actions);
    expect(response.status).toBe(201);
});

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
    }
]

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

test('Command Pipeline - Run', async () => {
    const userCommand = "Delete the order 55"
    const cmdPipeline = new CommandPipeline();
    const response = await cmdPipeline.run(userCommand, config, 'gemma', {}, 'media-pipe', examples);
    console.log("Pipeline.run", response)
    expect(response.status).toBe('success');
});

test('Command Pipeline - URL Check', async () => {
    const userCommand = "Delete the order 55"
    const cmdPipeline = new CommandPipeline();
    const response = await cmdPipeline.run(userCommand, config, 'gemma', {}, 'media-pipe',examples);
    console.log(response)
    expect(response.url).toBe('order/delete/55');
});