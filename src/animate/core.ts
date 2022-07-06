import { CoreSettings } from '../types';
import { getCoreConfig } from '../config';
import { nextFrame } from '../helpers/utils';

import createAnimationEndHandler from '../event-listener';
import { setFinalState, setFromState, setToState } from './state';

export default function animate(elem: HTMLElement, options: Partial<CoreSettings> = {}) {
  const settings = getCoreConfig(options);

  setFromState(elem, settings.classNames);

  createAnimationEndHandler(elem, settings.animation.type, () => {
    setFinalState(elem, settings.classNames);
  });

  nextFrame(() => {
    setToState(elem, settings.classNames);
  });
}
