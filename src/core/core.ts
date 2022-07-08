import { CoreConfig } from '../configs/core-config';
import { nextFrame } from '../utils';

import createAnimationEndHandler from './animation-end-handler';
import { setFinalState, setFromState, setToState } from './state';

export default function createAnimation(elem: HTMLElement, settings: CoreConfig) {
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
