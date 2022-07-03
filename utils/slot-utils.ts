export function generateSlotState(): number[][] {
  const numRows = 3;
  const numCols = 3;
  const arr = Array(numRows)
    .fill([])
    .map(() => Array(numCols).fill(0).map(getRandomSlot));
  return arr;
}

export function getRandomSlot(): number {
  return Math.floor(Math.random() * 5);
}
