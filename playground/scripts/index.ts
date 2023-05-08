/* eslint-disable no-return-assign */
import { animate, cancelAnimation } from '../../src';

const changeStateButton = document.querySelector('.change-button') as HTMLButtonElement;

const target = document.querySelector('.block') as HTMLDivElement;
const transitionBlock = document.querySelector('.block2') as HTMLDivElement;
const animateTarget = document.querySelector('.animate-block') as HTMLDivElement;

animateTarget.addEventListener('click', () => {
  if (animateTarget.dataset.elAnimateStatus) {
    cancelAnimation(animateTarget);
    return;
  }

  animate(animateTarget, {
    classNames: {
      to: 'animation-to',
      final: 'animation-to final-state',
      active: 'animation-active',
    },
    multiCallHandling: 'replaceToState',
  });
});

target.addEventListener('click', () => {
  animate(target, {
    classNames: {
      prefix: 'enter',
    },
    animation: {
      type: 'animation',
      name: 'show',
    },
  });
});

changeStateButton.addEventListener('click', () => {
  if (
    transitionBlock.classList.contains('hidden') ||
    transitionBlock.classList.contains('leave-active')
  ) {
    animate(transitionBlock, {
      classNames: {
        prefix: 'enter',
        initial: 'hidden',
      },
      multiCallHandling: 'replaceToState',
    });
    animate(target, {
      classNames: {
        prefix: 'enter',
        initial: 'hidden',
      },
      animation: {
        type: 'animation',
      },
      multiCallHandling: 'replaceToState',
    });

    return;
  }

  animate(transitionBlock, {
    classNames: {
      prefix: 'leave',
      final: 'hidden',
    },
    multiCallHandling: 'replaceToState',
  });
  animate(target, {
    classNames: {
      prefix: 'leave',
      final: 'hidden',
    },
    multiCallHandling: 'replaceToState',
  });
});
