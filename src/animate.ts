import { getCoreConfig } from './config';
import { CoreSettings } from './types';

import createAnimation from './core/core';

export default function animate(elem: HTMLElement, options: Partial<CoreSettings> = {}) {
  const coreSettings = getCoreConfig(options);

  createAnimation(elem, coreSettings);
}
