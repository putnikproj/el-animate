import { AnimateSettings } from '../types';
import { getAnimateConfig } from '../config';
import cl from '../helpers/class-list';
import { nextFrame } from '../helpers/utils';

import { createAnimationEndHandler } from '../event-listener';

function isAnimating(elem: HTMLElement) {
  return elem.dataset.elAnimateIsAnimating === 'true';
}

function canPlayAnimation(elem: HTMLElement) {
  return !isAnimating(elem);
}

function setAnimationFromValues(elem: HTMLElement, settings: AnimateSettings) {
  cl.remove(elem, settings.classNames.initial);
  cl.add(elem, settings.classNames.from);
}

function setAnimationEndValues(elem: HTMLElement, settings: AnimateSettings) {
  cl.remove(elem, settings.classNames.to);
  cl.remove(elem, settings.classNames.active);
  cl.add(elem, settings.classNames.final);
}

function setAnimationActiveValues(elem: HTMLElement, settings: AnimateSettings) {
  cl.remove(elem, settings.classNames.from);
  cl.add(elem, settings.classNames.active);
  cl.add(elem, settings.classNames.to);
}

export default function animate(elem: HTMLElement, options: Partial<AnimateSettings> = {}) {
  const settings = getAnimateConfig(options);

  if (!canPlayAnimation(elem)) {
    return;
  }

  setAnimationFromValues(elem, settings);
  nextFrame(() => setAnimationActiveValues(elem, settings));
  nextFrame(() =>
    createAnimationEndHandler(elem, settings, () => setAnimationEndValues(elem, settings)),
  );
}
