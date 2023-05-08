import { ResolvedConfig } from './config';

const ANIMATION_END_HANDLER_PROPERTY = '__elAnimateAnimationEndHandler';
const ANIMATION_END_PROPERTY_SETTINGS: PropertyDescriptor = {
  configurable: true,
  enumerable: true,
  writable: true,
};

type AnimationEndHandler = (evt: AnimationEvent | TransitionEvent) => void;

type EventListenerHandler = {
  function: AnimationEndHandler;
  eventName: AnimationEndEvent;
};

type AnimationInformation = {
  handlers: EventListenerHandler[];
  classNames: ResolvedConfig['classNames'];
};

export enum AnimationEndEvent {
  TRANSITION = 'transitionend',
  ANIMATION = 'animationend',
}

export function setAnimationInformation(elem: HTMLElement, information: AnimationInformation) {
  Object.defineProperty(elem, ANIMATION_END_HANDLER_PROPERTY, {
    value: information,
    ...ANIMATION_END_PROPERTY_SETTINGS,
  });
}

export function getAnimationInformation(elem: HTMLElement): AnimationInformation | undefined {
  return Object.getOwnPropertyDescriptor(elem, ANIMATION_END_HANDLER_PROPERTY)?.value;
}

export function clearAnimationInformation(elem: HTMLElement) {
  Object.defineProperty(elem, ANIMATION_END_HANDLER_PROPERTY, {
    value: undefined,
    ...ANIMATION_END_PROPERTY_SETTINGS,
  });
}
