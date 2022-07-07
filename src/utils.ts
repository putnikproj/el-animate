/** Fully render frame at first and then run callback */
export function nextFrame(callback: () => void) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(callback);
  });
}
