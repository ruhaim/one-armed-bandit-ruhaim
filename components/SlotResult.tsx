import * as React from 'react';
import { SlotStateWithResult } from '../utils/slot-utils';

interface SlotResultProps {
  state: SlotStateWithResult;
}

export default function SlotResult({
  state: { slotState, winState },
}: SlotResultProps) {
  return (
    <div className="slotResult" data-is-win={winState.isWin}>
      {slotState.map((row, rowIdx) => {
        const { isWin: isRowWin, sequenceLength } =
          winState.rowWinState[rowIdx];
        return (
          <div className={`slotRow`} data-is-win={isRowWin}>
            {row.map((col, colIdx) => {
              const isColWin = isRowWin && colIdx < sequenceLength;
              return (
                <span
                  className={`slotCol`}
                  data-is-win={isColWin}
                  style={{ color: isColWin ? 'red' : 'inherit' }}
                >
                  {col}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
