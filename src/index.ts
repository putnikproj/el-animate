import animate from './animate/core';

import { setInitialState } from './helpers/utils';

/**
 * * More about concept: https://v3.vuejs.org/guide/transitions-enterleave.html
 * .hidden
 * .enter-from   (on: 1st frame, off: 2nd frame)
 * .enter-to     (on: 2nd frame, off: last frame)
 * .enter-active (on: 1st or 2nd frame, off: last frame)
 * .shown
 * .leave-from   (on: 1st frame, off: 2nd frame)
 * .leave-to     (on: 2nd frame, off: last frame)
 * .leave-active (on: 1st or 2nd frame, off: last frame)
 * .hidden
 */

export { animate, setInitialState };
