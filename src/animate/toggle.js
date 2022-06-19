import { isShown, isHidden, isHiding, isShowing } from '../helpers/state';
import { mergeObjects } from '../helpers/utils';

import defaults from '../defaults';

/** Animated showing/hiding for node element depended on shown/hidden state */
export default function toggle(elem, options = {}) {
  const settings = mergeObjects(defaults, options);

  if (isHidden(elem, settings) || isHiding(elem, settings)) {
    this.show(elem, settings);
  } else if (isShown(elem, settings) || isShowing(elem, settings)) {
    this.hide(elem, settings);
  }
}
