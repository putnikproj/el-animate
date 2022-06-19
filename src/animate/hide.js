import { has, add, remove } from '../helpers/class-name';
import { isShown, isHidden, isHiding, isShowing } from '../helpers/state';
import { mergeObjects, nextFrame } from '../helpers/utils';

import { addAnimationendEventListener } from '../event-listener';
import defaults from '../defaults';

/** Animated hiding for node element */
export default function hide(elem, options = {}) {
  const settings = mergeObjects(defaults, options);

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
      //! In Progress
      break;
    default:
      throw new Error('Incorrect multiClicksHandling setting in hide/toggle function');
  }

  elem.setAttribute('data-el-animate-should-wait', true);

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

    elem.setAttribute('data-el-animate-should-wait', false);
  });
}
