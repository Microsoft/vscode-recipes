const { add } = require('../lib/calc');

describe('When adding numbers', () => {
  it('Should return correct result', () => {
    const result = add(1, 2);
    expect(result).toEqual(3);
  });
});