export type SlotState = number[][];

export function generateSlotState(): SlotState {
  const numRows = 3;
  const numCols = 5;
  const arr = Array(numRows)
    .fill([])
    .map(() => Array(numCols).fill(0).map(getRandomSlot));
  return arr;
}

export function getRandomSlot(): number {
  return Math.floor(Math.random() * 5);
}
