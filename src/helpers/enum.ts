//! IN PROGRESS
export const State = {
  shown: 'shown',
  hidden: 'hidden',
  enterFrom: 'enter-from',
  enterActive: 'enter-active',
  enterTo: 'enter-to',
  leaveFrom: 'leave-from',
  leaveActive: 'leave-active',
  leaveTo: 'leave-to',
} as const;

export const Event = {
  ANIMATIONEND: 'animationend',
  TRANSITIONEND: 'transitionend',
} as const;
