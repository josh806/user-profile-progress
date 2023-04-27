import { describe, test, expect } from 'vitest';
import { calculatePercentage } from './index';

const mocks = {
  input: [
    [24, 6],
    [578, 43],
    [100, 50],
    [0, 10],
    [1, 1],
  ],
  output: [25, 8, 50, 0, 100],
};

describe('calculatePercentage', () => {
  test('Should return type number', () => {
    expect(calculatePercentage(20, 5)).toBeTypeOf('number');
  });

  test('Result should be <= 100', () => {
    expect(calculatePercentage(5, 20)).toEqual(0); // total less than value to add
  });

  test('Result should be >= 0', () => {
    expect(calculatePercentage(5, -20)).toEqual(0); // values can't be negative
  });

  test('Correctly calculates percentage', () => {
    for (let i = 0; i < mocks.input.length; i++) {
      const [valuesTotal, valueToAdd] = mocks.input[i];
      expect(calculatePercentage(valuesTotal, valueToAdd)).toEqual(
        mocks.output[i]
      );
    }
  });
});
