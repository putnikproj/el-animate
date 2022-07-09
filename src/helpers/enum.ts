import { EnumValues } from './utils';

export const AnimationType = {
  TRANSITION: 'transition',
  ANIMATION: 'animation',
} as const;

export type AnimationTypeUnion = EnumValues<typeof AnimationType>;
