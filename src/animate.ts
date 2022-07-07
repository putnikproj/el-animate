import { getCoreConfig, CoreConfig } from './configs/core-config';

import createAnimation from './core/core';

export default function animate(elem: HTMLElement, options: Partial<CoreConfig> = {}) {
  const coreConfig = getCoreConfig(options);

  createAnimation(elem, coreConfig);
}
