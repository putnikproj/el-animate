import {
  AnimationEndEvent,
  clearAnimationEndInformation,
  getAnimationEndInformation,
  setAnimationEndInformation,
} from './animation-end-information';
import { AnimationType, AnimationTypeUnion } from '../enum';
import { getAnimationStatus, AnimationStatus } from './animation-status';
import { CoreConfig } from '../configs/core-config';

function getEventName(animationType: AnimationTypeUnion) {
  if (animationType === AnimationType.ANIMATION) {
    return AnimationEndEvent.ANIMATION;
  }

  if (animationType === AnimationType.TRANSITION) {
    return AnimationEndEvent.TRANSITION;
  }

  throw new Error('Incorrect animationType setting');
}

function removeAnimationEndEventListener(elem: HTMLElement) {
  const eventListener = getAnimationEndInformation(elem);

  if (!eventListener) {
    return;
  }

  elem.removeEventListener(eventListener.eventName, eventListener.handler);
  clearAnimationEndInformation(elem);
}

function addAnimationEndEventListener(
  elem: HTMLElement,
  animationSettings: CoreConfig['animation'],
  cb: () => void,
) {
  const { name, type } = animationSettings;
  const eventName = getEventName(type);

  const baseHandler = () => {
    cb();
    removeAnimationEndEventListener(elem);
  };

  const cssAnimationHandler = (evt: AnimationEvent) => {
    // If user specified animation name, we should call cb only if event refers to the right animation
    if (evt.animationName && name && evt.animationName !== name) {
      return;
    }

    baseHandler();
  };

  const handler = (evt: TransitionEvent | AnimationEvent) =>
    animationSettings.type === AnimationType.ANIMATION
      ? cssAnimationHandler(evt as AnimationEvent)
      : baseHandler();

  elem.addEventListener(eventName, handler);
  setAnimationEndInformation(elem, handler, eventName);
}

export default function createAnimationEndHandler(
  elem: HTMLElement,
  animationSettings: CoreConfig['animation'],
  cb: () => void,
) {
  if (getAnimationStatus(elem) === AnimationStatus.ANIMATING) {
    return;
  }

  removeAnimationEndEventListener(elem);
  addAnimationEndEventListener(elem, animationSettings, cb);
}
