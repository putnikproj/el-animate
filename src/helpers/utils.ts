import { AllSettings, UserSettings } from 'src/types';
import { Event } from './enum';
import { remove, add } from './class-name';

import defaults from '../defaults';

/** Fully render frame at first and then run callback */
export function nextFrame(callback: () => void) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(callback);
  });
}

export function mergeSettings(userSettings: UserSettings): AllSettings {
  return {
    ...defaults,
    ...userSettings,
  };
}

export function getEventName(animationType: AllSettings['animationType']) {
  if (animationType === 'animation') {
    return Event.ANIMATIONEND;
  }

  if (animationType === 'transition') {
    return Event.TRANSITIONEND;
  }

  throw new Error('Incorrect animationType setting');
}

/**
 * If you need so, you can set initial element state (shown or hidden).
 * **Recommended to do this from html**
 */
export function setInitialState(
  elem: HTMLElement,
  state: 'shown' | 'hidden',
  options: UserSettings = {},
) {
  const settings = mergeSettings(options);

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
