export type AllSettings = {
  shownClass: string;
  hiddenClass: string;
  enterFromClass: string;
  enterActiveClass: string;
  enterToClass: string;
  leaveFromClass: string;
  leaveActiveClass: string;
  leaveToClass: string;
  animationType: 'transition' | 'animation'; // 'transition' | 'animation'
  multiClicksHandling: 'block' | 'from-start' | 'from-current'; //! 'block' | 'from-start' | 'from-current' (recommended when .enter-to and .leave-from not in use)
  blockRestart: boolean; //! IN PROGRESS
  beforeEnterCallback: (elem: HTMLElement) => void;
  afterEnterCallback: (elem: HTMLElement) => void;
  beforeLeaveCallback: (elem: HTMLElement) => void;
  afterLeaveCallback: (elem: HTMLElement) => void;
};

export type UserSettings = Partial<AllSettings>;
