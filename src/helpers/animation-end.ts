import { AnimationEndEvent } from './enum';

const ANIMATION_END_HANDLER_PROPERTY = 'elAnimateAnimationEndHandler';
const ANIMATION_END_PROPERTY_SETTINGS = {
  configurable: true,
  enumerable: true,
  writable: true,
};

export type AnimationEndHandler = () => void;

export function setAnimationEndInformation(
  elem: HTMLElement,
  handler: AnimationEndHandler,
  eventName: AnimationEndEvent,
) {
  Object.defineProperty(elem, ANIMATION_END_HANDLER_PROPERTY, {
    value: { handler, eventName },
    ...ANIMATION_END_PROPERTY_SETTINGS,
  });
}

export function getAnimationEndInformation(
  elem: HTMLElement,
): { handler: AnimationEndHandler; eventName: AnimationEndEvent } | undefined {
  return Object.getOwnPropertyDescriptor(elem, ANIMATION_END_HANDLER_PROPERTY)?.value;
}

export function clearAnimationEndInformation(elem: HTMLElement) {
  Object.defineProperty(elem, ANIMATION_END_HANDLER_PROPERTY, {
    value: undefined,
    ...ANIMATION_END_PROPERTY_SETTINGS,
  });
}
