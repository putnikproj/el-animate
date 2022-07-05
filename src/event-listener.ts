import cl from './helpers/class-list';
import { AnimationStatus, AnimationType } from './helpers/enum';
import { getAnimationStatus } from './helpers/state';
import { getEventName } from './helpers/utils';
import { AllSettings } from './types';

/** @returns should we remove eventListener or not */
function animationEndHandler(elem: HTMLElement, settings: AllSettings) {
  // If handler triggered, but this is the 1st frame, do nothing and don't delete eventListener. Very rare case, but still
  if (cl.has(elem, settings.enterFromClass) || cl.has(elem, settings.leaveFromClass)) {
    return false;
  }

  if (cl.has(elem, settings.enterActiveClass)) {
    cl.remove(elem, settings.enterActiveClass);
    cl.remove(elem, settings.enterToClass);
    cl.add(elem, settings.shownClass);
    settings.afterEnterCallback(elem);
  }

  if (cl.has(elem, settings.leaveActiveClass)) {
    cl.remove(elem, settings.leaveActiveClass);
    cl.remove(elem, settings.leaveToClass);
    cl.add(elem, settings.hiddenClass);
    settings.afterLeaveCallback(elem);
  }

  return true;
}

export function addAnimationendEventListener(elem: HTMLElement, settings: AllSettings) {
  if (elem.getAttribute('data-el-animate-has-listener') === 'true') {
    return;
  }

  const eventName = getEventName(settings.animationType);

  const handler = () => {
    elem.setAttribute('data-el-animate-should-wait', 'true');
    const shouldRemoveEventListener = animationEndHandler(elem, settings);

    if (shouldRemoveEventListener) {
      elem.removeEventListener(eventName, handler);
      elem.setAttribute('data-el-animate-has-listener', 'false');
    }

    elem.setAttribute('data-el-animate-should-wait', 'false');
  };

  elem.setAttribute('data-el-animate-has-listener', 'true');
  elem.addEventListener(eventName, handler);
}

export function createAnimationEndHandler(
  elem: HTMLElement,
  animationType: AnimationType,
  cb: () => void,
) {
  if (getAnimationStatus(elem) === AnimationStatus.ANIMATING) {
    return;
  }

  const eventName = getEventName(animationType);

  const handler = () => {
    cb();
    elem.removeEventListener(eventName, handler);
  };

  elem.addEventListener(eventName, handler);
}
