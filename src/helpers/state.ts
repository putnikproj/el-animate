import { AllSettings } from 'src/types';
import { has } from './class-name';

export function isShown(elem: HTMLElement, settings: AllSettings) {
  return has(elem, settings.shownClass);
}

export function isShowing(elem: HTMLElement, settings: AllSettings) {
  return has(elem, settings.enterActiveClass) || has(elem, settings.enterFromClass);
}

export function isHidden(elem: HTMLElement, settings: AllSettings) {
  return has(elem, settings.hiddenClass);
}

export function isHiding(elem: HTMLElement, settings: AllSettings) {
  return has(elem, settings.leaveActiveClass) || has(elem, settings.leaveFromClass);
}
