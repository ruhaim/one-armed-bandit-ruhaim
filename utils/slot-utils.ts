import SlotResult from '../components/SlotResult';

export type SlotState = SlotRowState[];
export type SlotRowState = number[];

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

export type WinCalcStrategy = (sequenceLength, winningNum) => number;

export function generateSlotState(): SlotState {
  const numRows = 3;
  const numCols = 5;
  const arr = Array(numRows)
    .fill([])
    .map(() =>
      Array(numCols)
        .fill(0)
        .map(() => Math.floor(Math.random() * 5))
    );
  return arr;
}
