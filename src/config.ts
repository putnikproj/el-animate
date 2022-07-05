import { AnimationType } from './helpers/enum';
import { AllSettings, AnimateSettings } from './types';

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

export const getAnimateConfig = (options: Partial<AnimateSettings>): AnimateSettings => {
  const curPrefix = options.classNames?.prefix || 'el-animate';
  return {
    classNames: {
      prefix: curPrefix,
      initial: options.classNames?.initial || `${curPrefix}-initial`,
      from: options.classNames?.from || `${curPrefix}-from`,
      active: options.classNames?.active || `${curPrefix}-active`,
      to: options.classNames?.to || `${curPrefix}-to`,
      final: options.classNames?.final || '',
    },
    animation: {
      type: options.animation?.type || AnimationType.TRANSITION,
      name: options.animation?.name,
    },
  };
};
