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

export default {
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
  beforeEnterCallback: () => {},
  afterEnterCallback: () => {},
  beforeLeaveCallback: () => {},
  afterLeaveCallback: () => {},
};
