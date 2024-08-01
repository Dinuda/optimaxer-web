'use strict';

const webUi = require('..');
const assert = require('assert').strict;

assert.strictEqual(webUi(), 'Hello from webUi');
console.info('webUi tests passed');
