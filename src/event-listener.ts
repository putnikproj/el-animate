import {
  AnimationEndEvent,
  AnimationEndHandler,
  clearAnimationEndInformation,
  getAnimationEndInformation,
  setAnimationEndInformation,
} from './core/animation-end-information';
import { AnimationType } from './enum';
import { getAnimationStatus, AnimationStatus } from './core/animation-status';

function getEventName(animationType: AnimationType) {
  if (animationType === AnimationType.ANIMATION) {
    return AnimationEndEvent.ANIMATION;
  }

  if (animationType === AnimationType.TRANSITION) {
    return AnimationEndEvent.TRANSITION;
  }

  throw new Error('Incorrect animationType setting');
}

function addAnimationEndEventListener(
  elem: HTMLElement,
  eventName: AnimationEndEvent,
  handler: AnimationEndHandler,
) {
  elem.addEventListener(eventName, handler);
  setAnimationEndInformation(elem, handler, eventName);
}

function removeAnimationEndEventListener(elem: HTMLElement) {
  const eventListener = getAnimationEndInformation(elem);

  if (!eventListener) {
    return;
  }

  elem.removeEventListener(eventListener.eventName, eventListener.handler);
  clearAnimationEndInformation(elem);
}

export default function createAnimationEndHandler(
  elem: HTMLElement,
  animationType: AnimationType,
  cb: AnimationEndHandler,
) {
  if (getAnimationStatus(elem) === AnimationStatus.ANIMATING) {
    return;
  }

  // Clear previous animation end handler for the new one
  removeAnimationEndEventListener(elem);

  // Create new handler
  const eventName = getEventName(animationType);

  addAnimationEndEventListener(elem, eventName, () => {
    cb();
    removeAnimationEndEventListener(elem);
  });
}
