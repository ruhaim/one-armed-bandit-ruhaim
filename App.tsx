import * as React from 'react';
import SlotMachine from './components/SlotMachine';
import './style.css';
import { generateSlotState } from './utils/slot-utils';

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <div>{generateSlotState()}</div>
      <SlotMachine />
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
