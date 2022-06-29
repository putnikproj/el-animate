import cl from '../helpers/class-list';
import { isShown, isHidden, isHiding, isShowing } from '../helpers/state';
import { mergeSettings, nextFrame } from '../helpers/utils';

import { addAnimationendEventListener } from '../event-listener';

/** Animated hiding for node element */
export default function hide(elem, options = {}) {
  const settings = mergeSettings(options);

  // Checks if we can play animation
  if (elem.getAttribute('data-el-animate-should-wait') === 'true') {
    return;
  }
  if (
    isHidden(elem, settings) ||
    isHiding(elem, settings) ||
    cl.has(elem, settings.enterFromClass)
  ) {
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

  // It is necessary for correct leave-from animation and multiclicks handling

  const shouldAddLeaveActive = !cl.has(elem, settings.shownClass);
  if (shouldAddLeaveActive) {
    cl.add(elem, settings.leaveActiveClass);
  }

  cl.remove(elem, settings.enterActiveClass);
  cl.remove(elem, settings.enterToClass);
  cl.remove(elem, settings.shownClass);
  cl.add(elem, settings.leaveFromClass);

  // 2nd frame
  nextFrame(() => {
    // It is necessary for correct leave-from animation and multiclicks handling
    if (!cl.has(elem, settings.leaveActiveClass)) {
      cl.add(elem, settings.leaveActiveClass);
    }

    cl.remove(elem, settings.leaveFromClass);
    cl.add(elem, settings.leaveToClass);

    addAnimationendEventListener(elem, settings);

    elem.setAttribute('data-el-animate-should-wait', false);
  });
}
