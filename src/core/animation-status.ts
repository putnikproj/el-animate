import { EnumValues } from '../utils';

const ANIMATION_STATUS_ATTRIBUTE = 'data-el-animate-status';

export const AnimationStatus = {
  START: 'start',
  ANIMATING: 'animating',
} as const;

type AnimationStatusUnion = EnumValues<typeof AnimationStatus>;

export function setAnimationStatus(elem: HTMLElement, status: AnimationStatusUnion) {
  elem.setAttribute(ANIMATION_STATUS_ATTRIBUTE, status);
}

export function getAnimationStatus(elem: HTMLElement): AnimationStatusUnion | null {
  return elem.getAttribute(ANIMATION_STATUS_ATTRIBUTE) as AnimationStatusUnion;
}

export function clearAnimationStatus(elem: HTMLElement) {
  elem.removeAttribute(ANIMATION_STATUS_ATTRIBUTE);
}
