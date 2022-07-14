import { Config, getConfig } from './config';
import { nextFrame } from '../helpers/utils';

import createAnimationEndHandler from './animation-end-handler';
import { getAnimationStatus } from './animation-status';
import { setFinalState, setFromState, setToState } from './state';

export default function animate(elem: HTMLElement, userConfig: Partial<Config>) {
  const config = getConfig(userConfig);

  // Don't execute animation function, if we should block multiClick
  if (config.multiCallHandling === 'block' && getAnimationStatus(elem) !== null) {
    return;
  }

  // It's easier to handle 'replaceToState' separately
  if (config.multiCallHandling === 'replaceToState' && getAnimationStatus(elem) === 'animating') {
    createAnimationEndHandler(elem, config, () => {
      setFinalState(elem, config.classNames);
      config.callbacks.afterEnd(elem, config);
    });

    setToState(elem, config.classNames);
    config.callbacks.toStateSet(elem, config);

    return;
  }

  // Before animation started
  config.callbacks.beforeStart(elem, config);

  // Animation start, 1st frame, adding animation end handling
  setFromState(elem, config.classNames);

  createAnimationEndHandler(elem, config, () => {
    setFinalState(elem, config.classNames);
    config.callbacks.afterEnd(elem, config);
  });

  config.callbacks.fromStateSet(elem, config);

  // 2nd frame, switching 'from' -> 'to' classname
  nextFrame(() => {
    setToState(elem, config.classNames);
    config.callbacks.toStateSet(elem, config);
  });
}
