import * as React from 'react';
import { SlotStateWithResult } from '../utils/slot-utils';

interface SlotResultProps {
  state: SlotStateWithResult;
}

export default function SlotResult({
  state: { slotState, winState },
}: SlotResultProps) {
  const currencyFormatter = React.useRef(
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
  );
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

      <div>You Won: {currencyFormatter.current.format(winState.winAmount)}</div>
    </div>
  );
}
