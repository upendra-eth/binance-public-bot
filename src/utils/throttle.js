// src/utils/throttle.js
export function throttle(fn, wait) {
    let lastCall = 0;
  
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall > wait) {
        lastCall = now;
        return fn(...args);
      }
    };
  }
  