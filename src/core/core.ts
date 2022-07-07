import { CoreConfig } from '../configs/core-config';
import { nextFrame } from '../utils';

import createAnimationEndHandler from '../event-listener';
import { setFinalState, setFromState, setToState } from './state';

export default function createAnimation(elem: HTMLElement, settings: CoreConfig) {
  setFromState(elem, settings.classNames);

  createAnimationEndHandler(elem, settings.animation.type, () => {
    setFinalState(elem, settings.classNames);
  });

  nextFrame(() => {
    setToState(elem, settings.classNames);
  });
}
