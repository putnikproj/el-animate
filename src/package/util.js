/** Same as elem.classList.contains */
function has(elem, className) {
  return elem.classList.contains(className);
}

/** Same as elem.classList.add */
function add(elem, className) {
  return elem.classList.add(className);
}

/** Same as elem.classList.remove */
function remove(elem, className) {
  return elem.classList.remove(className);
}

/** Fully render frame at first and then run callback */
function nextFrame(callback) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(callback);
  });
}

export { has, add, remove, nextFrame };
