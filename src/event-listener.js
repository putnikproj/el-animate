import { has, add, remove } from './helpers/class-name';
import { getEventName } from './helpers/utils';

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
export function addAnimationendEventListener(elem, settings) {
  if (elem.getAttribute('data-el-animate-has-listener') === 'true') {
    return;
  }

  const eventName = getEventName(settings.animationType);

  const handler = () => {
    elem.setAttribute('data-el-animate-should-wait', true);
    const shouldRemoveEventListener = animationEndHandler(elem, settings);

    if (shouldRemoveEventListener) {
      elem.removeEventListener(eventName, handler);
      elem.setAttribute('data-el-animate-has-listener', false);
    }

    elem.setAttribute('data-el-animate-should-wait', false);
  };

  elem.setAttribute('data-el-animate-has-listener', true);
  elem.addEventListener(eventName, handler);
}
