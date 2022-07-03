export function slotRowAmountWinStrategy1(sequenceLength, winningNum): number {
  return sequenceLength * (winningNum + 0.5);
}

export function slotRowAmountWinStrategy2(sequenceLength, winningNum): number {
  return sequenceLength * (winningNum + 0.6);
}
