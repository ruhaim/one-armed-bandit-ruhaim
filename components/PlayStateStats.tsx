import { PlayState } from '../utils/slot-utils';

import * as React from 'react';
import CurrencyDisplay from './CurrencyDisplay';
interface PlayStateStatsProp {
  playState: PlayState;
}
export default function PlayStateStats({ playState }: PlayStateStatsProp) {
  const { numAttempts, winTotal, spinCost, lastWinState } = playState;

  return (
    <div>
      <h3>{playState.name} Stats</h3>
      <div>
        This Attempt: <CurrencyDisplay value={lastWinState?.winAmount} />
      </div>
      <div>
        Spin Cost: <CurrencyDisplay value={spinCost} />
      </div>
      <div>Total Attempts: {numAttempts}</div>
      <div>
        Total Won: <CurrencyDisplay value={winTotal} />
      </div>
      <div>
        Total Cost: <CurrencyDisplay value={numAttempts * spinCost} />
      </div>
      <div>
        Total Profit:
        <strong>
          <CurrencyDisplay value={winTotal - numAttempts} />
        </strong>
      </div>
      <div>
        Profit/Loss Percentage:{' '}
        {Math.round(((winTotal - numAttempts) / numAttempts) * 10000) / 100}%
      </div>
    </div>
  );
}
