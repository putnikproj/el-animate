import { CoreConfig } from '../configs/core-config';
import { nextFrame } from '../utils';

import createAnimationEndHandler from './animation-end-handler';
import { getAnimationStatus } from './animation-status';
import { setFinalState, setFromState, setToState } from './state';

export default function createAnimation(elem: HTMLElement, settings: CoreConfig) {
  // Don't execute animation function, if we should block multiClick
  if (settings.multiClicksHandling === 'block' && getAnimationStatus(elem) !== null) {
    return;
  }

  // It's easier to handle 'replaceToState' separately
  if (
    settings.multiClicksHandling === 'replaceToState' &&
    getAnimationStatus(elem) === 'animating'
  ) {
    createAnimationEndHandler(elem, settings.animation, () => {
      setFinalState(elem, settings.classNames);
      settings.callbacks.afterEnd();
    });

    setToState(elem, settings.classNames);
    settings.callbacks.toStateSet();

    return;
  }

  // Before animation started
  settings.callbacks.beforeStart();

  // Animation start, 1st frame, adding animation end handling
  setFromState(elem, settings.classNames);

  createAnimationEndHandler(elem, settings.animation, () => {
    setFinalState(elem, settings.classNames);
    settings.callbacks.afterEnd();
  });

  settings.callbacks.fromStateSet();

  // 2nd frame, switching 'from' -> 'to' classname
  nextFrame(() => {
    setToState(elem, settings.classNames);
    settings.callbacks.toStateSet();
  });
}
