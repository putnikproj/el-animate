import { AllSettings, UserSettings } from 'src/types';
import { AnimationEndEvent, AnimationType } from './enum';
import cl from './class-list';

import defaults from '../config';

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
  if (animationType === AnimationType.ANIMATION) {
    return AnimationEndEvent.ANIMATION;
  }

  if (animationType === AnimationType.TRANSITION) {
    return AnimationEndEvent.TRANSITION;
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
    cl.remove(elem, settings.shownClass);
    cl.add(elem, settings.hiddenClass);
    return;
  }

  if (state === 'shown') {
    cl.remove(elem, settings.hiddenClass);
    cl.add(elem, settings.shownClass);
    return;
  }

  throw new Error('Incorrect state parameter in setInitialState function');
}
