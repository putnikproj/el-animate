const ANIMATION_END_HANDLER_PROPERTY = 'elAnimateAnimationEndHandler';
const ANIMATION_END_PROPERTY_SETTINGS: PropertyDescriptor = {
  configurable: true,
  enumerable: true,
  writable: true,
};

type AnimationEndHandler = (evt: AnimationEvent | TransitionEvent) => void;

export enum AnimationEndEvent {
  TRANSITION = 'transitionend',
  ANIMATION = 'animationend',
}

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
