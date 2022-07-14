import { removeAnimationEndEventListener } from './animate/animation-end-handler';
import { getAnimationInformation } from './animate/animation-information';
import { setIdleState } from './animate/state';

export default function cancelAnimation(elem: HTMLElement) {
  const animationInfo = getAnimationInformation(elem);

  if (animationInfo) {
    removeAnimationEndEventListener(elem);
    setIdleState(elem, animationInfo.classNames);
  }
}
