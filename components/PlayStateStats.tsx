import { PlayState } from '../utils/slot-utils';

import * as React from 'react';
interface PlayStateStatsProp {
  playState: PlayState;
}
export default function PlayStateStats({ playState }: PlayStateStatsProp) {
  return (
    <div>
      <h3>Stats</h3>
      <div>Attempts: {playState.numAttempts}</div>
      <div>Total Won: {playState.winTotal}</div>
      <div>Total Cost: {playState.numAttempts}</div>
      <div>Total Profit: {playState.winTotal - playState.numAttempts}</div>
    </div>
  );
}
