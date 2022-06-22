import { AllSettings } from './types';

// Auto-prefixing
/*
const Defaults = {
  prefix: '', //! IN PROGRESS
  shownClass: null,
  hiddenClass: null,
  enterFromClass: null,
  enterActiveClass: null,
  enterToClass: null,
  leaveFromClass: null,
  leaveActiveClass: null,
  leaveToClass: null,
  animationType: 'transition', // 'transition' | 'animation'
  multiClicksHandling: 'block', //! 'block' | 'from-start' | 'from-current' (recommended when .enter-to and .leave-from not in use)
  blockRestart: true, //! IN PROGRESS
  beforeEnterCallback: () => {},
  afterEnterCallback: () => {},
  beforeLeaveCallback: () => {},
  afterLeaveCallback: () => {},
};
*/

const defaults: AllSettings = {
  shownClass: 'shown',
  hiddenClass: 'hidden',
  enterFromClass: 'enter-from',
  enterActiveClass: 'enter-active',
  enterToClass: 'enter-to',
  leaveFromClass: 'leave-from',
  leaveActiveClass: 'leave-active',
  leaveToClass: 'leave-to',
  animationType: 'transition', // 'transition' | 'animation'
  multiClicksHandling: 'block', //! 'block' | 'from-start' | 'from-current' (recommended when .enter-to and .leave-from not in use)
  blockRestart: true, //! IN PROGRESS
  beforeEnterCallback: () => undefined,
  afterEnterCallback: () => undefined,
  beforeLeaveCallback: () => undefined,
  afterLeaveCallback: () => undefined,
};

export default defaults;
