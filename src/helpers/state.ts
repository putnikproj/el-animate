import { AllSettings } from 'src/types';
import cl from './class-list';
import { AnimationStatus } from './enum';

const ANIMATION_STATUS_ATTRIBUTE = 'data-el-animate-status';

export function isShown(elem: HTMLElement, settings: AllSettings) {
  return cl.has(elem, settings.shownClass);
}

export function isShowing(elem: HTMLElement, settings: AllSettings) {
  return cl.has(elem, settings.enterActiveClass) || cl.has(elem, settings.enterFromClass);
}

export function isHidden(elem: HTMLElement, settings: AllSettings) {
  return cl.has(elem, settings.hiddenClass);
}

export function isHiding(elem: HTMLElement, settings: AllSettings) {
  return cl.has(elem, settings.leaveActiveClass) || cl.has(elem, settings.leaveFromClass);
}

export function setAnimationStatus(elem: HTMLElement, status: AnimationStatus) {
  elem.setAttribute(ANIMATION_STATUS_ATTRIBUTE, status);
}

export function getAnimationStatus(elem: HTMLElement) {
  elem.getAttribute(ANIMATION_STATUS_ATTRIBUTE);
}
