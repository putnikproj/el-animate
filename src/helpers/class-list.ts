const cl = {
  add: (elem: HTMLElement, ...classNames: string[]) => {
    classNames.forEach((className) => {
      if (className.length !== 0) {
        elem.classList.add(...className.split(' '));
      }
    });
  },
  remove: (elem: HTMLElement, ...classNames: string[]) => {
    classNames.forEach((className) => {
      if (className.length !== 0) {
        elem.classList.remove(...className.split(' '));
      }
    });
  },
};

export default cl;
