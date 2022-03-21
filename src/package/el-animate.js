/* eslint-disable no-param-reassign */
import { has, add, remove, nextFrame } from './util';

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

// Old way
const Defaults = {
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

//! IN PROGRESS
const States = {
  shown: 'shown',
  hidden: 'hidden',
  enterFrom: 'enter-from',
  enterActive: 'enter-active',
  enterTo: 'enter-to',
  leaveFrom: 'leave-from',
  leaveActive: 'leave-active',
  leaveTo: 'leave-to',
};

const Events = {
  ANIMATIONEND: 'animationend',
  TRANSITIONEND: 'transitionend',
};

// ------------------------------

function mergeSettings(defaults, extra) {
  if (typeof extra !== 'object') {
    return defaults;
  }

  return {
    ...defaults,
    ...extra,
  };
}

function getEventName(animationType) {
  if (animationType === 'animation') {
    return Events.ANIMATIONEND;
  }

  if (animationType === 'transition') {
    return Events.TRANSITIONEND;
  }

  throw new Error('Incorrect animationType setting');
}

/** @returns should we remove eventListener or not */
function animationEndHandler(elem, settings) {
  // If handler triggered, but this is the 1st frame, do nothing and don't delete eventListener. Very rare case, but still
  if (has(elem, settings.enterFromClass) || has(elem, settings.leaveFromClass)) {
    return false;
  }

  if (has(elem, settings.enterActiveClass)) {
    remove(elem, settings.enterActiveClass);
    remove(elem, settings.enterToClass);
    add(elem, settings.shownClass);
    settings.afterEnterCallback(elem);
    return true;
  }

  if (has(elem, settings.leaveActiveClass)) {
    remove(elem, settings.leaveActiveClass);
    remove(elem, settings.leaveToClass);
    add(elem, settings.hiddenClass);
    settings.afterLeaveCallback(elem);
  }

  return true;
}

/** Similar to "once: true" option in addEventListener */
function addAnimationendEventListener(elem, settings) {
  if (elem.ELAnimate_hasElementEndEventListener) {
    return;
  }

  const eventName = getEventName(settings.animationType);

  const handler = () => {
    elem.ELAnimate_shouldElementWait = true;
    const shouldRemoveEventListener = animationEndHandler(elem, settings);

    if (shouldRemoveEventListener) {
      elem.removeEventListener(eventName, handler);
      elem.ELAnimate_hasElementEndEventListener = false;
    }

    elem.ELAnimate_shouldElementWait = false;
  };

  elem.ELAnimate_hasElementEndEventListener = true;
  elem.addEventListener(eventName, handler);
}

// ------------------------------

function isShown(elem, settings) {
  return has(elem, settings.shownClass);
}

function isShowing(elem, settings) {
  return has(elem, settings.enterActiveClass) || has(elem, settings.enterFromClass);
}

function isHidden(elem, settings) {
  return has(elem, settings.hiddenClass);
}

function isHiding(elem, settings) {
  return has(elem, settings.leaveActiveClass) || has(elem, settings.leaveFromClass);
}

//* Public
/** Animated showing for node element */
function show(elem, options = {}) {
  const settings = mergeSettings(Defaults, options);

  // Checks if we can play animation
  if (elem.ELAnimate_shouldElementWait) {
    return;
  }
  if (isShown(elem, settings) || isShowing(elem, settings) || has(elem, settings.leaveFromClass)) {
    return;
  }
  switch (settings.multiClicksHandling) {
    case 'block':
      if (!isHidden(elem, settings)) {
        return;
      }
      break;
    case 'from-current':
      if (!isHidden(elem, settings) && !isHiding(elem, settings)) {
        return;
      }
      break;
    case 'from-start':
      console.log('soon...');
      break;
    default:
      throw new Error('Incorrect multiClicksHandling setting');
  }

  elem.ELAnimate_shouldElementWait = true;

  // 1st frame
  settings.beforeEnterCallback(elem);
  remove(elem, settings.leaveActiveClass);
  remove(elem, settings.leaveToClass);
  remove(elem, settings.hiddenClass);
  add(elem, settings.enterFromClass);
  add(elem, settings.enterActiveClass);

  // 2nd frame
  nextFrame(() => {
    remove(elem, settings.enterFromClass);
    add(elem, settings.enterToClass);

    addAnimationendEventListener(elem, settings);

    elem.ELAnimate_shouldElementWait = false;
  });
}

/** Animated hiding for node element */
function hide(elem, options = {}) {
  const settings = mergeSettings(Defaults, options);

  // Checks if we can play animation
  if (elem.ELAnimate_shouldElementWait) {
    return;
  }
  if (isHidden(elem, settings) || isHiding(elem, settings) || has(elem, settings.enterFromClass)) {
    return;
  }
  switch (settings.multiClicksHandling) {
    case 'block':
      if (!isShown(elem, settings)) {
        return;
      }
      break;
    case 'from-current':
      if (!isShown(elem, settings) && !isShowing(elem, settings)) {
        return;
      }
      break;
    case 'from-start':
      console.log('soon...');
      break;
    default:
      throw new Error('Incorrect multiClicksHandling setting in hide/toggle function');
  }

  elem.ELAnimate_shouldElementWait = true;

  // 1st frame
  settings.beforeLeaveCallback(elem);

  // It is necessary for correct leave-from animation
  let shouldAddLeaveActive = true;
  if (!has(elem, settings.shownClass)) {
    add(elem, settings.leaveActiveClass);
    shouldAddLeaveActive = false;
  }

  remove(elem, settings.enterActiveClass);
  remove(elem, settings.enterToClass);
  remove(elem, settings.shownClass);
  add(elem, settings.leaveFromClass);

  // 2nd frame
  nextFrame(() => {
    // It is necessary for correct leave-from animation
    if (shouldAddLeaveActive) {
      add(elem, settings.leaveActiveClass);
    }

    remove(elem, settings.leaveFromClass);
    add(elem, settings.leaveToClass);

    addAnimationendEventListener(elem, settings);

    elem.ELAnimate_shouldElementWait = false;
  });
}

/** Animated showing/hiding for node element depended on shown/hidden state */
function toggle(elem, options = {}) {
  const settings = mergeSettings(Defaults, options);

  if (isHidden(elem, settings) || isHiding(elem, settings)) {
    this.show(elem, settings);
  } else if (isShown(elem, settings) || isShowing(elem, settings)) {
    this.hide(elem, settings);
  }
}

/**
 * Method, if you want to set initial element state (shown or hidden) from js, but **you can do this from html**
 * @param {Node} elem
 * @param {'shown' | 'hidden'} state
 */
function setInitialState(elem, state, options = {}) {
  const settings = mergeSettings(Defaults, options);

  if (state === 'hidden') {
    remove(elem, settings.shownClass);
    add(elem, settings.hiddenClass);
    return;
  }

  if (state === 'shown') {
    remove(elem, settings.hiddenClass);
    add(elem, settings.shownClass);
    return;
  }

  throw new Error('Incorrect state parameter in setInitialState function');
}

export { show, hide, toggle, setInitialState };
