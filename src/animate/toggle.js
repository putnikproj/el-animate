import { isShown, isHidden, isHiding, isShowing } from '../helpers/state';
import { mergeSettings } from '../helpers/utils';

/** Animated showing/hiding for node element depended on shown/hidden state */
export default function toggle(elem, options = {}) {
  const settings = mergeSettings(options);

  if (isHidden(elem, settings) || isHiding(elem, settings)) {
    this.show(elem, settings);
  } else if (isShown(elem, settings) || isShowing(elem, settings)) {
    this.hide(elem, settings);
  }
}
