import * as React from 'react';
import { generateSlotState, SlotState } from '../utils/slot-utils';
import SlotResult from './SlotResult';

export default function SlotMachine(): React.ReactElement {
  const [slotState, setSlotState] = React.useState<SlotState>(
    generateSlotState()
  );

  return (
    <React.Fragment>
      <SlotResult state={slotState} />
      <button
        onClick={() => {
          setSlotState(generateSlotState());
        }}
      >
        Generate Random Slot State{' '}
      </button>
    </React.Fragment>
  );
}
