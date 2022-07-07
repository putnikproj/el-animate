export const AnimationType = {
  TRANSITION: 'transition',
  ANIMATION: 'animation',
} as const;

export type AnimationTypeUnion = typeof AnimationType[keyof typeof AnimationType];
