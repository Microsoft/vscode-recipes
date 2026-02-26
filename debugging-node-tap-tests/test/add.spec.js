const t = require('tap');
const { add } = require('../lib/calc');

t.test('1 + 2 = 3', t => {
  t.plan(1);
  const result = add(1, 2);
  t.strictEqual(result, 3);
});