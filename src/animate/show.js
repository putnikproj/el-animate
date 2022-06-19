import { has, add, remove } from '../helpers/class-name';
import { isShown, isHidden, isHiding, isShowing } from '../helpers/state';
import { mergeObjects, nextFrame } from '../helpers/utils';

import { addAnimationendEventListener } from '../event-listener';
import defaults from '../defaults';

/** Animated showing for node element */
export default function show(elem, options = {}) {
  const settings = mergeObjects(defaults, options);

  // Checks if we can play animation
  if (elem.getAttribute('data-el-animate-should-wait') === 'true') {
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
  if (!has(elem, settings.hiddenClass)) {
    add(elem, settings.enterActiveClass);
    shouldAddEnterActive = false;
  }

  remove(elem, settings.leaveActiveClass);
  remove(elem, settings.leaveToClass);
  remove(elem, settings.hiddenClass);
  add(elem, settings.enterFromClass);

  // 2nd frame
  nextFrame(() => {
    // It is necessary for correct enter-from animation
    if (shouldAddEnterActive) {
      add(elem, settings.enterActiveClass);
    }

    remove(elem, settings.enterFromClass);
    add(elem, settings.enterToClass);

    addAnimationendEventListener(elem, settings);

    elem.setAttribute('data-el-animate-should-wait', false);
  });
}
