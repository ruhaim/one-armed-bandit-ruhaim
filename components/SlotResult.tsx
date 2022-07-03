import * as React from 'react';
import { SlotState } from '../utils/slot-utils';

interface SlotResultProps {
  state: SlotState;
}

export default function SlotResult({
  state,
}: SlotResultProps): React.ReactElement {
  return (
    <div>
      {state?.map((row) => (
        <div>
          {row.map((col) => (
            <span>{col}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
