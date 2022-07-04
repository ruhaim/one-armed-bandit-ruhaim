import * as React from 'react';
import { generateSlotState, PlayState, SlotState } from '../utils/slot-utils';
import PlaySession from '../utils/SlotStrategy';
import {
  slotRowAmountWinStrategy1,
  slotRowAmountWinStrategy2,
} from '../utils/win-calc-strategies';
import PlayStateStats from './PlayStateStats';
import SlotResult from './SlotResult';

const playSessions = [
  new PlaySession(slotRowAmountWinStrategy1),
  new PlaySession(slotRowAmountWinStrategy2),
];

const initSlotState = generateSlotState();

export default function SlotMachine(): React.ReactElement {
  const [slotState, setSlotState] = React.useState<SlotState>(initSlotState);

  const [playStates, setPlayStates] = React.useState<PlayState[]>([]);

  function registerSlotState(slotState: SlotState) {
    return playSessions.map((playSession) =>
      playSession.registerWithPlayState(slotState)
    );
  }

  function resetPlayStates() {
    setPlayStates(
      playSessions.map((playSession) => {
        return playSession.resetPlayState();
      })
    );
  }
  return (
    <React.Fragment>
      <SlotResult
        slotState={slotState}
        winState={playStates[0]?.lastWinState}
      />
      <button
        onClick={() => {
          const slotState = generateSlotState();
          setSlotState(slotState);
          setPlayStates(registerSlotState(slotState));
        }}
      >
        SPIN 🚀
      </button>
      <button
        onClick={() => {
          resetPlayStates();
        }}
      >
        Reset
      </button>
      {playStates?.map((playState) => (
        <PlayStateStats playState={playState} />
      ))}
    </React.Fragment>
  );
}
