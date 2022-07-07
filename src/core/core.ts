import { CoreSettings } from '../types';
import { nextFrame } from '../helpers/utils';

import createAnimationEndHandler from '../event-listener';
import { setFinalState, setFromState, setToState } from './state';

export default function createAnimation(elem: HTMLElement, settings: CoreSettings) {
  setFromState(elem, settings.classNames);

  createAnimationEndHandler(elem, settings.animation.type, () => {
    setFinalState(elem, settings.classNames);
  });

  nextFrame(() => {
    setToState(elem, settings.classNames);
  });
}
