const ANIMATION_STATUS_ATTRIBUTE = 'data-el-animate-status';

export enum AnimationStatus {
  START = 'start',
  ANIMATING = 'animating',
}

export function setAnimationStatus(elem: HTMLElement, status: AnimationStatus) {
  elem.setAttribute(ANIMATION_STATUS_ATTRIBUTE, status);
}

export function getAnimationStatus(elem: HTMLElement) {
  return elem.getAttribute(ANIMATION_STATUS_ATTRIBUTE);
}

export function clearAnimationStatus(elem: HTMLElement) {
  elem.removeAttribute(ANIMATION_STATUS_ATTRIBUTE);
}
