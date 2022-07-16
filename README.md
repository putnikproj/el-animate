# ELAnimate

ElAnimate is a small, lightweight, cross-browser TypeScript library-helper, that helpes to create simple HTML-element animations described in CSS with transition or animation property, but controlled in JavaScipt. This combination allows creating hardware accelerated native css animations with best performance and smoothness on the one hand, but provides simplicity and convenience on the other hand.

This library is also very useful for enter/leave animations. Without this library it is very hard to animate element first and only then delete it from DOM (for example, animated burger menu, or backdrop).

> Note: this library is intended for simple animations from one point to another. It is also very useful for enter/leave animations (see demo). If you want to create complicated animations with different timings or something like this, you should use libraries where you describe and controll everything in in JavaScript.

## Features

- **Lightweight**: ~1.5KB minified & gziped
- **Simple**: ElAnimate exports only `animate` and `cancelAnimation` functions, has a few config options
- **Fully typed**: This package is written in TypeScript, every config option has type, and JSDoc annotations
- **Very wide range of browser support**: IE10+ can understand the code
- **Library Independent**: ElAnimate has no dependences and doesn't require any library like JQuery

## Installation

### NPM

```bash
npm install el-animate --save
```

## Importing

### ESM

```js
import { animate, cancelAnimation } from 'el-animate';
```

### CommonJS

```js
const ElAnimate = require('el-animate');
```

## Build

If you want to build this library, then

```bash
npm install
npm run build
```

The result will be in `dist/` folder.

## Contributing

This project is open for requesting new features, issues, pull requests. It will be constantly maintained especially if there will be activity.
