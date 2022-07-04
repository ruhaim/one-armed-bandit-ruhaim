import * as React from 'react';
import CurrencyDisplay from './CurrencyDisplay';

export default function StrategyStats() {
  return (
    <React.Fragment>
      <div>
        You Won: <CurrencyDisplay value={winState.winAmount} />
      </div>
    </React.Fragment>
  );
}
