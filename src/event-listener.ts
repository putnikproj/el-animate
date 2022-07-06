import {
  AnimationEndHandler,
  clearAnimationEndInformation,
  getAnimationEndInformation,
  setAnimationEndInformation,
} from './helpers/animation-end';
import { AnimationEndEvent, AnimationStatus, AnimationType } from './helpers/enum';
import { getAnimationStatus } from './helpers/state';
import { getEventName } from './helpers/utils';

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
