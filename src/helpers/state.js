import { has } from './class-name';

export function isShown(elem, settings) {
  return has(elem, settings.shownClass);
}

export function isShowing(elem, settings) {
  return has(elem, settings.enterActiveClass) || has(elem, settings.enterFromClass);
}

export function isHidden(elem, settings) {
  return has(elem, settings.hiddenClass);
}

export function isHiding(elem, settings) {
  return has(elem, settings.leaveActiveClass) || has(elem, settings.leaveFromClass);
}
