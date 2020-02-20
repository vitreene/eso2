export const hasOwn = (obj, key) =>
  Object.prototype.hasOwnProperty.call(obj, key);

export function throttle(callback, limit) {
  let wait = false; // Initially, we're not waiting
  return () => {
    // We return a throttled function
    if (!wait) {
      // If we're not waiting
      callback.call(); // Execute users function
      wait = true; // Prevent future invocations
      setTimeout(
        () =>
          // After a period of time
          (wait = false), // And allow future invocations
        limit
      );
    }
  };
}

export function arrayToObject(arr) {
  const obj = {};
  try {
    arr.forEach(el => (obj[el.id] = el));
  } catch (error) {
    return null;
  }
  return obj;
}

export function joinId(...args) {
  return args.filter(a => a !== "").join("_");
}

export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

// ne teste pas la validité de obj
export function round(obj) {
  const r = {};
  for (const e in obj) {
    r[e] = parseFloat(obj[e].toFixed(2));
  }
  return r;
}

export const deferOnMount = {
  dequeue() {
    let exe;
    do {
      exe = this.exe;
      typeof exe === "function" && exe();
    } while (exe !== "empty");
  },
  values: [],
  set exe(fn) {
    this.values.push(fn);
  },
  get exe() {
    return this.values.length > 0 ? this.values.shift() : "empty";
  }
};
