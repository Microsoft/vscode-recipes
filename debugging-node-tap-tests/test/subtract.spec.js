const t = require('tap');
const { subtract } = require('../lib/calc');

t.test('1 + 2 = 3', t => {
  t.plan(1);
  const result = subtract(3, 2);
  t.strictEqual(result, 1);
});
