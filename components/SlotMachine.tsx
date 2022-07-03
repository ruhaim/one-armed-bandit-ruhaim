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

  return (
    <React.Fragment>
      <SlotResult state={slotState} />
      <button
        onClick={() => {
          setSlotState(generateSlotStateWithResult());
        }}
      >
        Generate Random Slot State{' '}
      </button>
    </React.Fragment>
  );
}
