import { AnimationType, AnimationTypeUnion } from '../enum';

export type CoreConfig = {
  classNames: {
    /**
     * ClassName which element contains before animation starts and should be deleted when animation starts
     * @default ''
     */
    initial: string;
    /**
     * From wich point animation should be started
     * (Adds: 1st frame, Removes: 2nd frame)
     * @default ''
     */
    from: string;
    /**
     * ClassName which element contains during the whole animation.
     * Usually there you write `animation` or `transition` css properties.
     * (on: 1st or 2nd frame, off: last frame)
     * @default ''
     */
    active: string;
    /**
     * Final animation point
     * (on: 2nd frame, off: last frame)
     * @default ''
     */
    to: string;
    /**
     * ClassName which element contains after animation ends
     * @default ''
     */
    final: string;
  };
  animation: {
    /**
     * When you add animations with css, you can do this either with `transition` or with `animation` property
     * You should choose one of this for correct animation end detecting.
     * *If you have problems with detecting animation end, see `animation.end`*
     * @default 'transition'
     */
    type: AnimationTypeUnion;
    /**
     * if you have several animation, you can additionally set `animation.name` field in config
     * Then el-animate can properly detect animation end with this animation name.
     * You should type the same string as in @keyframes
     */
    name: string | undefined;
  };
};

export function getCoreConfig(options: Partial<CoreConfig>): CoreConfig {
  return {
    classNames: {
      initial: options.classNames?.initial || '',
      from: options.classNames?.from || '',
      active: options.classNames?.active || '',
      to: options.classNames?.to || '',
      final: options.classNames?.final || '',
    },
    animation: {
      type: options.animation?.type || AnimationType.TRANSITION,
      name: options.animation?.name,
    },
  };
}
