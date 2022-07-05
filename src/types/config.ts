import { AnimationType } from 'src/helpers/enum';

export type AllSettings = {
  // End states
  shownClass: string;
  hiddenClass: string;
  // Enter animation states
  enterFromClass: string;
  enterActiveClass: string;
  enterToClass: string;
  // Leave animation states
  leaveFromClass: string;
  leaveActiveClass: string;
  leaveToClass: string;

  animationType: 'transition' | 'animation';
  multiClicksHandling: 'block' | 'from-start' | 'from-current';
  blockRestart: boolean; //! IN PROGRESS
  beforeEnterCallback: (elem: HTMLElement) => void;
  afterEnterCallback: (elem: HTMLElement) => void;
  beforeLeaveCallback: (elem: HTMLElement) => void;
  afterLeaveCallback: (elem: HTMLElement) => void;
};

export type UserSettings = Partial<AllSettings>;

// New animate function, work in progress
export type CoreSettings = {
  classNames: {
    /**
     * ClassName which element contains before animation starts and should be deleted when animation starts
     * @default ''
     */
    initial: string;
    /**
     * ClassName which element contains right after animation starts and will be deleted the next frame
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
     * @default 'el-animate-to'
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
