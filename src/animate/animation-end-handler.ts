import {
  AnimationEndEvent,
  clearAnimationInformation,
  getAnimationInformation,
  setAnimationInformation,
} from './animation-information';
import { AnimationType, AnimationTypeUnion } from '../helpers/enum';
import { Config } from './config';

function getEventName(animationType: AnimationTypeUnion) {
  if (animationType === AnimationType.ANIMATION) {
    return AnimationEndEvent.ANIMATION;
  }

  if (animationType === AnimationType.TRANSITION) {
    return AnimationEndEvent.TRANSITION;
  }

  throw new Error('Incorrect animationType setting');
}

export function removeAnimationEndEventListener(elem: HTMLElement) {
  const animationInfo = getAnimationInformation(elem);

  if (!animationInfo) {
    return;
  }

  elem.removeEventListener(animationInfo.eventName, animationInfo.handler);
  clearAnimationInformation(elem);
}

function addAnimationEndEventListener(elem: HTMLElement, config: Config, cb: () => void) {
  const { animation, classNames } = config;
  const eventName = getEventName(animation.type);

  const baseHandler = () => {
    cb();
    removeAnimationEndEventListener(elem);
  };

  const cssAnimationHandler = (evt: AnimationEvent) => {
    // If user specified animation name, we should call cb only if event refers to the right animation
    if (evt.animationName && animation.name && evt.animationName !== animation.name) {
      return;
    }

    baseHandler();
  };

  const handler = (evt: TransitionEvent | AnimationEvent) =>
    animation.type === AnimationType.ANIMATION
      ? cssAnimationHandler(evt as AnimationEvent)
      : baseHandler();

  elem.addEventListener(eventName, handler);
  setAnimationInformation(elem, { handler, classNames, eventName });
}

export default function createAnimationEndHandler(
  elem: HTMLElement,
  config: Config,
  cb: () => void,
) {
  removeAnimationEndEventListener(elem);
  addAnimationEndEventListener(elem, config, cb);
}
