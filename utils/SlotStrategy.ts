import SlotResult from '../components/SlotResult';
import {
  SlotRowState,
  SlotRowWinState,
  SlotState,
  SlotWinState,
  WinCalcStrategy,
} from './slot-utils';

export default class PlaySession {
  winCalcStrategy: WinCalcStrategy;
  winTotal: number = 0;
  numAttempts: number = 0;
  spinCost: number = 1;
  lastSlotState: SlotWinState | undefined;

  constructor(winCalcStrategy: WinCalcStrategy, spinCost: number = 1) {
    this.winCalcStrategy = winCalcStrategy;
    this.spinCost = 1;
  }

  reset() {
    this.winTotal = 0;
    this.numAttempts = 0;
    this.lastSlotState = undefined;
  }

  addSlotState(slotState: SlotState) {
    this.lastSlotState = getSlotWinState(slotState, this.winCalcStrategy);
    this.winTotal += this.lastSlotState.winAmount;
    this.numAttempts += 1;
  }
}

function getSlotWinState(
  state: SlotState,
  winStrategy: WinCalcStrategy
): SlotWinState {
  const rowWinState: SlotRowWinState[] = [];
  let winAmount = 0;
  let isWin = false;
  state.forEach((rowState) => {
    const winState = getSlotRowWinState(rowState, winStrategy);
    winAmount += winState.winAmount;
    isWin = isWin ? true : winState.isWin;
    rowWinState.push(winState);
  });
  return { rowWinState, winAmount, isWin };
}

function getSlotRowWinState(
  rowState: SlotRowState,
  winStrategy: WinCalcStrategy
): SlotRowWinState {
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
  const winAmount = !isWin ? 0 : winStrategy(sequenceLength, winningNum);

  return { sequenceLength, winningNum, isWin, winAmount };
}
