# ELAnimate

[![NPM Package](https://img.shields.io/npm/v/el-animate.svg)](https://www.npmjs.org/package/el-animate)
[![Minified Size](https://img.shields.io/bundlephobia/min/el-animate.svg?label=minified)](https://bundlephobia.com/result?p=el-animate)
[![Gzipped Size](https://img.shields.io/bundlephobia/minzip/el-animate.svg?label=gzipped)](https://bundlephobia.com/result?p=el-animate)
[![Tree-shakeable](https://badgen.net/bundlephobia/tree-shaking/el-animate)](https://bundlephobia.com/result?p=el-animate)
[![Types included](https://badgen.net/npm/types/el-animate)](https://npmjs.org/package/el-animate)

ElAnimate is a small, lightweight, cross-browser TypeScript library-helper, that helpes to create simple HTML-element animations described in CSS with transition or animation property, but controlled in JavaScipt by changing classNames. This combination allows creating hardware accelerated native css animations with best performance and smoothness on the one hand, but provides simplicity and convenience on the other hand.

This library is also very useful for enter/leave animations. Without this library it is very hard to animate element first and only then delete it from DOM (for example, animated burger menu, or backdrop).

> Note: this library is intended for simple animations from one point to another. If you want to create complicated animations with different timings or something like this, you should use libraries where you describe and controll everything in in JavaScript.

## Features

- **Lightweight**: ~1.5KB minified & gziped
- **Simple**: ElAnimate exports only `animate` and `cancelAnimation` functions, has a few config options
- **Fully typed**: This package is written in TypeScript, every config option has type, and JSDoc annotations
- **Very wide range of browser support**: IE10+ can understand the code
- **Library Independent**: ElAnimate has no dependences and doesn't require any library like JQuery

**[Demos](https://codepen.io/collection/warqKo?grid_type=list)**

## Installation

### Package manager

The most common is npm:

```bash
npm install el-animate --save
```

Alternatively you can use yarn:

```bash
yarn add el-animate
```

### CDN, Local installation

You can use either CDN like JSDELIVR, UNPKG or you can directly download `el-animate.iife.js` from CDN, and insert el-animate from your local copy. Main thing is to place el-animate before your other scripts. For example:

```html
<script src="https://cdn.jsdelivr.net/npm/el-animate/dist/el-animate.iife.js"></script>
<!-- Then your scripts -->
<script>
  ElAnimate.animate(elem, config);
</script>
```

## Importing

### ESM

```javascript
import { animate, cancelAnimation } from 'el-animate';
// or, if you don't need 'cancelAnimation' function:
import animate from 'el-animate';
```

### CommonJS

```javascript
const ElAnimate = require('el-animate');
```

## Usage

> If you khow how to improve usage guide, please write an issues or open a new pull request

Main function for animating html element looks like this:

```typescript
ElAnimate.animate(elem: HTMLElement, config: Config);
```

Main idea is to change 5 classnames of HTML-element at the right time. In this classes you should write styles ([demo](https://codepen.io/putnik-projects/pen/LYdxdJw)):

![How el-animate works](https://i.ibb.co/Zdq08xH/el-animate.png)

To reproduce this animation, in `active` classname you should write `transition` or `animation` property, in `from` classname you should write from which point animation should start and in `initial` classname you should write `display: none`

**We strongly recommend you to use css properties like `transform` or `opacity` for animations, which do not trigger expensive CSS layout calculation in comparison to properties like `height` or `margin`. For checking which property is recommended to use, see [CSS-Triggers](https://csstriggers.com/)**

```css
.elem {
  opacity: 1;
}

.elem-initial {
  display: none;
}

.elem-from {
  opacity: 0;
}

.elem-active {
  transition: opacity 0.5s ease;
}
```

And then of course you should configure classnames and other parameters in JavaScipt

## Full list of parameters:

```typescript
{
  classNames: {
    /**
     * If you specify prefix, all classnames except `final` will automatically be generated with this prefix.
     * *You can overwrite any prefixed classname, if you specify it (including that case, when you specify empty classname).*
     * @example
     * prefix: 'animation',
     * classnames.initial: 'animation-initial',
     * classnames.from: 'animation-from'...
     * @default
     * undefined
     */
    prefix: string;
    /**
     * ClassName which element contains before animation starts and should be deleted when animation starts
     * @default ''
     */
    initial: string;
    /**
     * From wich point animation should be started
     * (Adds: 1st frame, Removes: 2nd frame)
     * @default ''
     */
    from: string;
    /**
     * ClassName which element contains during the whole animation.
     * Usually there you write `animation` or `transition` css properties.
     * (on: 1st frame, off: last frame)
     * @default ''
     */
    active: string;
    /**
     * Final animation point. Note: If you want the element to have `to` state after animation end, then set `final` classname the same as `to`
     * (on: 2nd frame, off: last frame)
     * @default ''
     */
    to: string;
    /**
     * ClassName which element contains after animation ends
     * @default ''
     */
    final: string;
  };
  /**
   * This property is necessary for correct animation end detecting
   */
  animation: {
    /**
     * When you add animations with css, you can do this either with `transition` or with `animation` property
     * You should choose one of this for correct animation end detecting if you have problems.
     * By default ElAnimate adds both `transitionend` and `animationend` handlers
     * As a last resort, you can set `animation.name`
     * @default 'both'
     */
    type: 'transition' | 'animation' | 'both';
    /**
     * if you have several animation, you can additionally set `animation.name` field in config
     * Then ElAnimate can properly detect animation end with this animation name.
     * You should type the same string as in @keyframes
     */
    name: string | undefined;
  };
  callbacks: {
    /**
     * Called before animation start, element has `initial` classname
     */
    beforeStart: (elem: HTMLElement, currentConfig: Config) => void;
    /**
     * Called when animation initialized: element has `from` classname, animation end handling added
     */
    fromStateSet: (elem: HTMLElement, currentConfig: Config) => void;
    /**
     * Called when element has `to` classname
     */
    toStateSet: (elem: HTMLElement, currentConfig: Config) => void;
    /**
     * Called when animation ended, element has `final` classname
     */
    afterEnd: (elem: HTMLElement, currentConfig: Config) => void;
  };
  /**
   * You can set what should el-animate do, if new animate function called, but the element is currently animating
   * - `block` means that we should abort new animation calls, while the element is animation
   * - `restart` means that we should stop current animation and start the new one
   * - `replaceToState` means that we only replace final points of animation
   * (el-animate replaces `to` className and animation end handler). **Useful if `animation.type` is `transition`.
   * Then the animation continues without interruption**
   * @default 'restart'
   */
  multiCallHandling: 'block' | 'restart' | 'replaceToState';
}
```

Also, if in some moment you need to cancel animation and return it to initial point, this is a special function: `ElAnimate.cancelAnimation(elem)`

## Demos

All demos are available [here on codepen.io](https://codepen.io/collection/warqKo?grid_type=list). We highly recommend to view them.

## Build

If you want to build this library, then

```bash
npm install
npm run build
```

The result will be in `dist/` folder.

## Contributing

This project is open for requesting new features, issues, pull requests. It will be constantly maintained especially if there will be activity.
