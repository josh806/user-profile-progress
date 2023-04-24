export function calculatePercentage(valuesTotal: number, valueToAdd = 0) {
  return Math.round((valueToAdd * 100) / valuesTotal);
}
