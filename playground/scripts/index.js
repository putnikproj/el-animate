/* eslint-disable no-return-assign */
import * as ELAnimate from '../../src/el-animate';

// Buttons
const changeButton = document.querySelector('.change-button');
const showButton = document.querySelector('.show-button');
const hideButton = document.querySelector('.hide-button');
const addButton = document.querySelector('.add-button');
const removeButton = document.querySelector('.remove-button');
// Targets
// const target = document.querySelector('.block');
const target2 = document.querySelector('.block2');
// Logs
// const status = document.querySelector('.status-of-animation');
const status2 = document.querySelector('.status-of-animation2');

// Settings
// const targetSettings = {
//   animationType: 'animation',
//   beforeEnterCallback: (el) => (status.textContent = `${el.textContent}: showing`),
//   afterEnterCallback: (el) => (status.textContent = `${el.textContent}: shown`),
//   beforeLeaveCallback: (el) => (status.textContent = `${el.textContent}: hiding`),
//   afterLeaveCallback: (el) => (status.textContent = `${el.textContent}: hidden`),
// };

const target2Settings = {
  animationType: 'transition',
  multiClicksHandling: 'from-current',
  beforeEnterCallback: (el) => (status2.textContent = `${el.textContent}: showing`),
  afterEnterCallback: (el) => (status2.textContent = `${el.textContent}: shown`),
  beforeLeaveCallback: (el) => (status2.textContent = `${el.textContent}: hiding`),
  afterLeaveCallback: (el) => (status2.textContent = `${el.textContent}: hidden`),
};

// Handlers
const changeButtonClickHandler = () => {
  // ELAnimate.toggle(target, targetSettings);
  ELAnimate.toggle(target2, target2Settings);
};

const showButtonClickHandler = () => {
  // ELAnimate.show(target, targetSettings);
  ELAnimate.show(target2, target2Settings);
};

const hideButtonClickHandler = () => {
  // ELAnimate.hide(target, targetSettings);
  ELAnimate.hide(target2, target2Settings);
};

const addButtonClickHandler = () => {
  if (document.querySelector('.created-block')) {
    return;
  }

  const elem = document.createElement('div');
  elem.classList.add('block');
  elem.classList.add('created-block');
  elem.style.width = '50px';
  elem.style.height = '50px';
  document.body.appendChild(elem);
  ELAnimate.setInitialState(elem, 'hidden', {
    animationType: 'animation',
  });
  ELAnimate.show(elem, {
    animationType: 'animation',
  });
};

const removeButtonClickHandler = () => {
  const block = document.querySelector('.created-block');

  if (!block) {
    return;
  }

  ELAnimate.hide(block, {
    animationType: 'animation',
    afterLeaveCallback: (el) => el.remove(),
  });
};

// Setting initial state
// ELAnimate.setInitialState(target, 'hidden', targetSettings);
ELAnimate.setInitialState(target2, 'hidden', target2Settings);

// Event listeners
changeButton.addEventListener('click', changeButtonClickHandler);
showButton.addEventListener('click', showButtonClickHandler);
hideButton.addEventListener('click', hideButtonClickHandler);
addButton.addEventListener('click', addButtonClickHandler);
removeButton.addEventListener('click', removeButtonClickHandler);
