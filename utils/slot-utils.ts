import SlotResult from '../components/SlotResult';

export type SlotState = SlotRowState[];
export type SlotRowState = number[];

export interface SlotStateWithResult {
  winState: SlotWinState;
  slotState: SlotState;
}
export interface SlotWinState {
  isWin: boolean;
  rowWinState: SlotRowWinState[];
  winAmount: number;
}
export interface SlotRowWinState {
  isWin: boolean;
  sequenceLength?: number;
  winningNum: number;
  winAmount: number;
}

export function generateSlotStateWithResult(): SlotStateWithResult {
  const slotState = generateSlotState();
  return {
    slotState,
    winState: getSlotWinState(slotState),
  };
}

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

export function getSlotWinState(state: SlotState): SlotWinState {
  const rowWinState: SlotRowWinState[] = [];
  let winAmount = 0;
  let isWin = false;
  state.forEach((rowState) => {
    const winState = getSlotRowWinState(rowState);
    winAmount += winState.winAmount;
    isWin = isWin ? true : winState.isWin;
    rowWinState.push(winState);
  });
  return { rowWinState, winAmount, isWin };
}

function getSlotRowWinState(rowState: SlotRowState): SlotRowWinState {
  let sequenceLength = 1;
  const winningNum = rowState[0];
  rowState.some((val, idx, arr) => {
    const nextVal = arr[idx + 1];
    if (nextVal !== val) {
      return true;
    }
    sequenceLength++;
  });
  const isWin = sequenceLength >= 3;
  const winAmount = !isWin
    ? 0
    : calcSlotRowWinAmount(sequenceLength, winningNum);

  return { sequenceLength, winningNum, isWin, winAmount };
}

function calcSlotRowWinAmount(sequenceLength, winningNum): number {
  return sequenceLength * (winningNum + 0.5);
}
