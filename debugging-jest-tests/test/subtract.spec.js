const { subtract } = require('../lib/calc');

describe('When subtracting numbers', () => {
  it('Should return correct result', () => {
    const result = subtract(3, 2);
    expect(result).toEqual(1);
  });
});
