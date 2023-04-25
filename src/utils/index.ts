export function calculatePercentage(valuesTotal: number, valueToAdd = 0) {
  return Math.ceil((valueToAdd * 100) / valuesTotal);
}
