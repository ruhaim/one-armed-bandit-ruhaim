import * as React from 'react';
import {
  generateSlotState,
  getSlotWinState,
  SlotState,
  SlotWinState,
} from '../utils/slot-utils';
import {
  slotRowAmountWinStrategy1,
  slotRowAmountWinStrategy2,
} from '../utils/win-calc-strategies';
import SlotResult from './SlotResult';

const calcStrategies = [slotRowAmountWinStrategy1, slotRowAmountWinStrategy2];

export default function SlotMachine(): React.ReactElement {
  const [slotState, setSlotState] = React.useState<SlotState>(
    generateSlotState()
  );

  const [slotWinStates, setSlotWinStates] = React.useState<SlotWinState[]>(
    calcStrategies.map((strategy) => getSlotWinState(slotState, strategy))
  );
  const [numAttempts, setNumAttempts] = React.useState(0);
  const [winAmountSums, setWinAmountSums] = React.useState<number[]>(
    calcStrategies.map(() => 0)
  );

  React.useEffect(() => {
    setSlotWinStates(
      calcStrategies.map((strategy) => getSlotWinState(slotState, strategy))
    );
    setWinAmountSums((sums) => {
      return sums.map((sum, idx) => sum + slotWinStates[idx].winAmount);
    });
  }, [slotState]);
  return (
    <React.Fragment>
      <SlotResult slotState={slotState} winState={slotWinStates[0]} />
      <button
        onClick={() => {
          setSlotState(generateSlotState());
          setNumAttempts((num) => num + 1);
        }}
      >
        SPIN (costs $1)
      </button>
      <button
        onClick={() => {
          setNumAttempts(0);
          setWinAmountSums(calcStrategies.map(() => 0));
        }}
      >
        Reset
      </button>
      <div>
        Stats
        <div>Attempts: {numAttempts}</div>
        <div>Total Won: {winAmountSums}</div>
        <div>Total Cost: {numAttempts}</div>
        <div>Total Profit: {0 - numAttempts}</div>
      </div>
    </React.Fragment>
  );
}
