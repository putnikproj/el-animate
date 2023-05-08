import cl from '../helpers/class-list';
import { ResolvedConfig } from './config';
import { clearAnimationStatus, setAnimationStatus, AnimationStatus } from './animation-status';

export function setFromState(elem: HTMLElement, classNames: ResolvedConfig['classNames']) {
  const { initial, from, active, to, final } = classNames;

  cl.remove(elem, initial, active, to, final);
  cl.add(elem, from);

  setAnimationStatus(elem, AnimationStatus.START);
}

export function setToState(elem: HTMLElement, classNames: ResolvedConfig['classNames']) {
  const { initial, from, active, to, final } = classNames;

  cl.remove(elem, initial, from, final);
  cl.add(elem, active, to);

  setAnimationStatus(elem, AnimationStatus.ANIMATING);
}

export function setFinalState(elem: HTMLElement, classNames: ResolvedConfig['classNames']) {
  const { initial, from, active, to, final } = classNames;

  cl.remove(elem, initial, from, active, to);
  cl.add(elem, final);

  clearAnimationStatus(elem);
}

export function setIdleState(elem: HTMLElement, classNames: ResolvedConfig['classNames']) {
  const { initial, from, active, to, final } = classNames;

  cl.remove(elem, initial, from, active, to, final);

  clearAnimationStatus(elem);
}
