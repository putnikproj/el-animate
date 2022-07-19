import {
  AnimationEndEvent,
  clearAnimationInformation,
  getAnimationInformation,
  setAnimationInformation,
} from './animation-information';
import { AnimationType, AnimationTypeUnion } from '../helpers/enum';
import { Config } from './config';
import { setIdleState } from './state';

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

  animationInfo.handlers.forEach((handler) => {
    elem.removeEventListener(handler.eventName, handler.function);
  });
  setIdleState(elem, animationInfo.classNames);
  clearAnimationInformation(elem);
}

function addAnimationEndEventListener(elem: HTMLElement, config: Config, cb: () => void) {
  const { animation, classNames } = config;
  // Create handlers
  const baseHandler = () => {
    removeAnimationEndEventListener(elem);
    cb();
  };

  const cssAnimationHandler = (evt: AnimationEvent | TransitionEvent) => {
    const animEvt = evt as AnimationEvent;
    // If user specified animation name, we should call cb only if event refers to the right animation
    if (animEvt.animationName && animation.name && animEvt.animationName !== animation.name) {
      return;
    }

    baseHandler();
  };

  // Choose which handlers should add to elem
  if (animation.type === 'both') {
    elem.addEventListener(AnimationEndEvent.TRANSITION, baseHandler);
    elem.addEventListener(AnimationEndEvent.ANIMATION, cssAnimationHandler);
    setAnimationInformation(elem, {
      classNames,
      handlers: [
        {
          eventName: AnimationEndEvent.TRANSITION,
          function: baseHandler,
        },
        {
          eventName: AnimationEndEvent.ANIMATION,
          function: cssAnimationHandler,
        },
      ],
    });
    return;
  }

  const handler = (evt: TransitionEvent | AnimationEvent) =>
    animation.type === AnimationType.ANIMATION
      ? cssAnimationHandler(evt as AnimationEvent)
      : baseHandler();

  const eventName = getEventName(animation.type);
  elem.addEventListener(eventName, handler);
  setAnimationInformation(elem, {
    classNames,
    handlers: [
      {
        eventName,
        function: handler,
      },
    ],
  });
}

export default function createAnimationEndHandler(
  elem: HTMLElement,
  config: Config,
  cb: () => void,
) {
  removeAnimationEndEventListener(elem);
  addAnimationEndEventListener(elem, config, cb);
}
