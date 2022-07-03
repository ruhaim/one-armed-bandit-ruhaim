import * as React from 'react';
import { SlotWinState, SlotState } from '../utils/slot-utils';
import CurrencyDisplay from './CurrencyDisplay';

interface SlotResultProps {
  slotState: SlotState;
  winState: SlotWinState;
}

export default function SlotResult({ slotState, winState }: SlotResultProps) {
  return (
    <div className="slot-result" data-is-win={winState.isWin}>
      {slotState.map((row, rowIdx) => {
        const { isWin: isRowWin, sequenceLength } =
          winState.rowWinState[rowIdx];
        return (
          <div className={'slot-result--row'} data-is-win={isRowWin}>
            {row.map((col, colIdx) => {
              const isColWin = isRowWin && colIdx < sequenceLength;
              return (
                <span className={'slot-result--col'} data-is-win={isColWin}>
                  {col}
                </span>
              );
            })}
          </div>
        );
      })}

      <div>
        You Won: <CurrencyDisplay value={winState.winAmount} />
      </div>
    </div>
  );
}
