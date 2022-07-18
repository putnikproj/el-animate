import { AnimationType, AnimationTypeUnion } from '../helpers/enum';

type Callback = (elem: HTMLElement, currentConfig: Config) => void;

export interface Config {
  classNames: {
    /**
     * If you specify prefix, all classnames except `final` will automatically be generated with this prefix.
     * *You can overwrite any prefixed classname, if you specify it (including that case, when you specify empty classname).*
     * @example
     * prefix: 'animation',
     * classnames.initial: 'animation-initial',
     * classnames.from: 'animation-from'...
     * @default
     * undefined
     */
    prefix?: string;
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
     * Final animation point. Note: If you want the element to have `to` state after animation end, then set `final` classname the same as `to`
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
  /**
   * This property is necessary for correct animation end detecting
   */
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
  callbacks: {
    /**
     * Called before animation start, element has `initial` classname
     */
    beforeStart: Callback;
    /**
     * Called when animation initialized: element has `from` classname, animation end handling added
     */
    fromStateSet: Callback;
    /**
     * Called when element has `to` classname
     */
    toStateSet: Callback;
    /**
     * Called when animation ended, element has `final` classname
     */
    afterEnd: Callback;
  };
  /**
   * You can set what should el-animate do, if new animate function called, but the element is currently animating
   * - `block` means that we should abort new animation calls, while the element is animation
   * - `restart` means that we should stop current animation and start the new one
   * - `replaceToState` means that we only replace final points of animation
   * (el-animate replaces `to` className and animation end handler). **Useful if `animation.type` is `transition`.
   * Then animtion Then the animation continues without interruption (See examples on github)**
   * @default 'restart'
   */
  multiCallHandling: 'block' | 'restart' | 'replaceToState';
}

const defaultCallback: Callback = () => undefined;

export function getConfig(options: Partial<Config>): Config {
  const prefix = options.classNames?.prefix;

  return {
    // prettier-ignore
    classNames: {
      initial: options.classNames?.initial || (prefix ? `${prefix}-initial` : ''),
      from:    options.classNames?.from    || (prefix ? `${prefix}-from`    : ''),
      active:  options.classNames?.active  || (prefix ? `${prefix}-active`  : ''),
      to:      options.classNames?.to      || (prefix ? `${prefix}-to`      : ''),
      final:   options.classNames?.final   || '',
    },
    animation: {
      type: options.animation?.type || AnimationType.TRANSITION,
      name: options.animation?.name,
    },
    callbacks: {
      beforeStart: options.callbacks?.beforeStart || defaultCallback,
      fromStateSet: options.callbacks?.fromStateSet || defaultCallback,
      toStateSet: options.callbacks?.toStateSet || defaultCallback,
      afterEnd: options.callbacks?.afterEnd || defaultCallback,
    },
    multiCallHandling: options.multiCallHandling || 'restart',
  };
}
