import * as React from 'react';
import { generateSlotState, PlayState, SlotState } from '../utils/slot-utils';
import PlaySession from '../utils/SlotStrategy';
import {
  slotRowAmountWinStrategy1,
  slotRowAmountWinStrategy2,
} from '../utils/win-calc-strategies';
import SlotResult from './SlotResult';

const playSessions = [
  new PlaySession(slotRowAmountWinStrategy1),
  new PlaySession(slotRowAmountWinStrategy2),
];

export default function SlotMachine(): React.ReactElement {
  const [slotState, setSlotState] = React.useState<SlotState>(
    generateSlotState()
  );

  const [playStates, setPlayStates] = React.useState<PlayState[]>(
    registerSlotState(generateSlotState())
  );

  React.useEffect(() => {
    setPlayStates(registerSlotState(slotState));
  }, [slotState]);

  function registerSlotState(slotState: SlotState) {
    return playSessions.map((playSession) => {
      playSession.addSlotState(slotState);
      return playSession.playState;
    });
  }
  function resetPlayStates() {
    setPlayStates(
      playSessions.map((playSession) => {
        playSession.reset();
        return playSession.playState;
      })
    );
  }
  return (
    <React.Fragment>
      <SlotResult slotState={slotState} winState={playStates[0].lastWinState} />
      <button
        onClick={() => {
          setSlotState(generateSlotState());
        }}
      >
        SPIN (costs $1)
      </button>
      <button
        onClick={() => {
          resetPlayStates();
        }}
      >
        Reset
      </button>
      {playStates.map((playState) => {
        return (
          <div>
            <h3>Stats</h3>
            <div>Attempts: {playState.numAttempts}</div>
            <div>Total Won: {playState.winTotal}</div>
            <div>Total Cost: {playState.numAttempts}</div>
            <div>
              Total Profit: {playState.winTotal - playState.numAttempts}
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
}
