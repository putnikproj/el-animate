const cl = {
  has: (elem: HTMLElement, className: string) => elem.classList.contains(className),
  add: (elem: HTMLElement, ...className: string[]) => {
    if (className.length !== 0) {
      elem.classList.add(...className);
    }
  },
  remove: (elem: HTMLElement, ...className: string[]) => {
    if (className.length !== 0) {
      elem.classList.remove(...className);
    }
  },
};

export default cl;
