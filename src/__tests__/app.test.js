import { calculateROI } from '../app.js';

test('calculates ROI correctly', () => {
  expect(calculateROI(200, 100)).toBe(100);
});

test('throws on zero cost', () => {
  expect(() => calculateROI(100, 0)).toThrow('Cost cannot be zero');
});
