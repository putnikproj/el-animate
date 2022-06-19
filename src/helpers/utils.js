import { Event } from './enum';
import { remove, add } from './class-name';

import defaults from '../defaults';

/** Fully render frame at first and then run callback */
export function nextFrame(callback) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(callback);
  });
}

export function mergeObjects(first, second) {
  if (typeof second !== 'object') {
    return first;
  }

  return {
    ...first,
    ...second,
  };
}

export function getEventName(animationType) {
  if (animationType === 'animation') {
    return Event.ANIMATIONEND;
  }

  if (animationType === 'transition') {
    return Event.TRANSITIONEND;
  }

  throw new Error('Incorrect animationType setting');
}

/**
 * Method, if you want to set initial element state (shown or hidden) from js, but **you can do this from html**
 * @param {Node} elem
 * @param {'shown' | 'hidden'} state
 */
export function setInitialState(elem, state, options = {}) {
  const settings = mergeObjects(defaults, options);

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
