import * as React from 'react';
import {
  generateSlotState,
  generateSlotStateWithResult,
  SlotStateWithResult,
} from '../utils/slot-utils';
import SlotResult from './SlotResult';

export default function SlotMachine(): React.ReactElement {
  const [slotState, setSlotState] = React.useState<SlotStateWithResult>(
    generateSlotStateWithResult()
  );
  const [numAttempts, setNumAttempts] = React.useState(0);
  const [winAmountSum, setWinAmountSum] = React.useState(0);

  React.useEffect(() => {
    setWinAmountSum((sum) => {
      return sum + slotState.winState.winAmount;
    });
  }, [slotState]);
  return (
    <React.Fragment>
      <SlotResult state={slotState} />
      <button
        onClick={() => {
          setSlotState(generateSlotStateWithResult());
          setNumAttempts((num) => num + 1);
        }}
      >
        SPIN (costs $1)
      </button>
      <button
        onClick={() => {
          setNumAttempts(0);
          setWinAmountSum(0);
        }}
      >
        Reset
      </button>
      <div>
        Stats
        <div>Attempts: {numAttempts}</div>
        <div>Total Won: {winAmountSum}</div>
        <div>Total Cost: {numAttempts}</div>
        <div>Total Profit: {winAmountSum - numAttempts}</div>
      </div>
    </React.Fragment>
  );
}
