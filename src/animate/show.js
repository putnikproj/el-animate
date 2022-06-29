import cl from '../helpers/class-list';
import { isShown, isHidden, isHiding, isShowing } from '../helpers/state';
import { mergeSettings, nextFrame } from '../helpers/utils';

import { addAnimationendEventListener } from '../event-listener';

/** Animated showing for node element */
export default function show(elem, options = {}) {
  const settings = mergeSettings(options);

  // Checks if we can play animation
  if (elem.getAttribute('data-el-animate-should-wait') === 'true') {
    return;
  }
  if (
    isShown(elem, settings) ||
    isShowing(elem, settings) ||
    cl.has(elem, settings.leaveFromClass)
  ) {
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
      //! In progress
      break;
    default:
      throw new Error('Incorrect multiClicksHandling setting');
  }

  elem.setAttribute('data-el-animate-should-wait', true);

  // 1st frame
  settings.beforeEnterCallback(elem);

  // It is necessary for correct enter-from animation
  let shouldAddEnterActive = true;
  if (!cl.has(elem, settings.hiddenClass)) {
    cl.add(elem, settings.enterActiveClass);
    shouldAddEnterActive = false;
  }

  cl.remove(elem, settings.leaveActiveClass);
  cl.remove(elem, settings.leaveToClass);
  cl.remove(elem, settings.hiddenClass);
  cl.add(elem, settings.enterFromClass);

  // 2nd frame
  nextFrame(() => {
    // It is necessary for correct enter-from animation
    if (shouldAddEnterActive) {
      cl.add(elem, settings.enterActiveClass);
    }

    cl.remove(elem, settings.enterFromClass);
    cl.add(elem, settings.enterToClass);

    addAnimationendEventListener(elem, settings);

    elem.setAttribute('data-el-animate-should-wait', false);
  });
}
