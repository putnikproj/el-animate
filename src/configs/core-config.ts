import { AnimationType } from '../enum';

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
     * ClassName which element contains during the whole animation
     * @default ''
     */
    active: string;
    /**
     * ClassName which element will contain right after 'from' className
     * (on: 1st or 2nd frame, off: last frame)
     * @default 'el-animate-to'
     */
    to: string;
    /**
     * ClassName which element contains after animation ends
     * (on: 2nd frame, off: last frame)
     * @default ''
     */
    final: string;
  };
  animation: {
    /**
     * When you add animations with css, you can do this either with `transition` or with `animation` property
     * You should choose one of this for correct animation end detecting.
     * *NOTE:* if you have several animation, you can additionally set `animation.name` field in config
     * Then el-animate can properly detect animation end with this animation name.
     * @default 'transition'
     */
    type: AnimationType;
    /**
     * See `animationType` annotation
     */
    // name?: string;
  };
};

export function getCoreConfig(options: Partial<CoreConfig>): CoreConfig {
  return {
    classNames: {
      initial: options.classNames?.initial || '',
      from: options.classNames?.from || '',
      active: options.classNames?.active || '',
      to: options.classNames?.to || `el-animate-to`,
      final: options.classNames?.final || '',
    },
    animation: {
      type: options.animation?.type || AnimationType.TRANSITION,
      // name: options.animation?.name,
    },
  };
}
