import cl from '../helpers/class-list';
import { CoreSettings } from '../types';
import { clearAnimationStatus, setAnimationStatus } from '../helpers/state';
import { AnimationStatus } from '../helpers/enum';

export function setFromState(elem: HTMLElement, classNames: CoreSettings['classNames']) {
  const { initial, from, active, to, final } = classNames;

  cl.remove(elem, initial, active, to, final);
  cl.add(elem, from);

  setAnimationStatus(elem, AnimationStatus.START);
}

export function setToState(elem: HTMLElement, classNames: CoreSettings['classNames']) {
  const { initial, from, active, to, final } = classNames;

  cl.remove(elem, initial, from, final);
  cl.add(elem, active, to);

  setAnimationStatus(elem, AnimationStatus.ANIMATING);
}

export function setFinalState(elem: HTMLElement, classNames: CoreSettings['classNames']) {
  const { initial, from, active, to, final } = classNames;

  cl.remove(elem, initial, from, active, to);
  cl.add(elem, final);

  clearAnimationStatus(elem);
}
