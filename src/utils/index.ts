export function calculatePercentage(valuesTotal: number, valueToAdd = 0) {
  if (valueToAdd > valuesTotal) return 0;
  const result = Math.ceil((valueToAdd * 100) / valuesTotal);
  return result < 0 ? 0 : result;
}
