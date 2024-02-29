// node_modules/moduleraid/dist/moduleraid.modern.js
function t() {
  return t = Object.assign || function(t2) {
    for (var e = 1; e < arguments.length; e++) {
      var o = arguments[e];
      for (var s in o)
        Object.prototype.hasOwnProperty.call(o, s) && (t2[s] = o[s]);
    }
    return t2;
  }, t.apply(this, arguments);
}
var moduleraid_modern_default = class {
  constructor(e) {
    this.entrypoint = void 0, this.debug = void 0, this.strict = void 0, this.moduleID = Math.random().toString(36).substring(7), this.functionArguments = [[[0], [(t2, e2, o2) => {
      this.modules = o2.c, this.constructors = o2.m, this.get = o2;
    }]], [[1e3], { [this.moduleID]: (t2, e2, o2) => {
      this.modules = o2.c, this.constructors = o2.m, this.get = o2;
    } }, [[this.moduleID]]]], this.arrayArguments = [[[this.moduleID], {}, (t2) => {
      Object.keys(t2.m).forEach((e2) => {
        try {
          this.modules[e2] = t2(e2);
        } catch (t3) {
          this.log(`[arrayArguments/1] Failed to require(${e2}) with error:
${t3}
${t3.stack}`);
        }
      }), this.get = t2;
    }], this.functionArguments[1]], this.modules = {}, this.constructors = [], this.get = void 0;
    let o = { entrypoint: "webpackJsonp", debug: false, strict: false };
    "object" == typeof e && (o = t({}, o, e)), this.entrypoint = o.entrypoint, this.debug = o.debug, this.strict = o.strict, this.detectEntrypoint(), this.fillModules(), this.replaceGet(), this.setupPushEvent();
  }
  log(t2) {
    this.debug && console.warn(`[moduleRaid] ${t2}`);
  }
  replaceGet() {
    null === this.get && (this.get = (t2) => this.modules[t2]);
  }
  fillModules() {
    if ("function" == typeof window[this.entrypoint] ? this.functionArguments.forEach((t2, e) => {
      try {
        if (this.modules && Object.keys(this.modules).length > 0)
          return;
        window[this.entrypoint](...t2);
      } catch (t3) {
        this.log(`moduleRaid.functionArguments[${e}] failed:
${t3}
${t3.stack}`);
      }
    }) : this.arrayArguments.forEach((t2, e) => {
      try {
        if (this.modules && Object.keys(this.modules).length > 0)
          return;
        window[this.entrypoint].push(t2);
      } catch (t3) {
        this.log(`Pushing moduleRaid.arrayArguments[${e}] into ${this.entrypoint} failed:
${t3}
${t3.stack}`);
      }
    }), this.modules && 0 == Object.keys(this.modules).length) {
      let t2 = false, e = 0;
      if ("function" != typeof window[this.entrypoint] || !window[this.entrypoint]([], [], [e]))
        throw Error("Unknown Webpack structure");
      for (; !t2; )
        try {
          this.modules[e] = window[this.entrypoint]([], [], [e]), e++;
        } catch (e2) {
          t2 = true;
        }
    }
  }
  setupPushEvent() {
    const t2 = window[this.entrypoint].push;
    window[this.entrypoint].push = (...e) => {
      const o = Reflect.apply(t2, window[this.entrypoint], e);
      return document.dispatchEvent(new CustomEvent("moduleraid:webpack-push", { detail: e })), o;
    };
  }
  detectEntrypoint() {
    if (null != window[this.entrypoint])
      return;
    if (this.strict)
      throw Error(`Strict mode is enabled and entrypoint at window.${this.entrypoint} couldn't be found. Please specify the correct one!`);
    let t2 = Object.keys(window);
    if (t2 = t2.filter((t3) => t3.toLowerCase().includes("chunk") || t3.toLowerCase().includes("webpack")).filter((t3) => "function" == typeof window[t3] || Array.isArray(window[t3])), t2.length > 1)
      throw Error(`Multiple possible endpoints have been detected, please create a new moduleRaid instance with a specific one:
${t2.join(", ")}`);
    if (0 === t2.length)
      throw Error("No Webpack JSONP entrypoints could be detected");
    this.log(`Entrypoint has been detected at window.${t2[0]} and set for injection`), this.entrypoint = t2[0];
  }
  searchObject(t2, e) {
    for (const o in t2) {
      const s = t2[o], n = e.toLowerCase();
      if ("object" != typeof s) {
        if (o.toString().toLowerCase().includes(n))
          return true;
        if ("object" != typeof s) {
          if (s.toString().toLowerCase().includes(n))
            return true;
        } else if (this.searchObject(s, e))
          return true;
      }
    }
    return false;
  }
  findModule(t2) {
    const e = [], o = Object.keys(this.modules);
    if (0 === o.length)
      throw new Error("There are no modules to search through!");
    return o.forEach((o2) => {
      const s = this.modules[o2.toString()];
      if (void 0 !== s)
        try {
          if ("string" == typeof t2)
            switch (t2 = t2.toLowerCase(), typeof s) {
              case "string":
                s.toLowerCase().includes(t2) && e.push(s);
                break;
              case "function":
                s.toString().toLowerCase().includes(t2) && e.push(s);
                break;
              case "object":
                this.searchObject(s, t2) && e.push(s);
            }
          else {
            if ("function" != typeof t2)
              throw new TypeError(`findModule can only find via string and function, ${typeof t2} was passed`);
            t2(s) && e.push(s);
          }
        } catch (t3) {
          this.log(`There was an error while searching through module '${o2}':
${t3}
${t3.stack}`);
        }
    }), e;
  }
  findConstructor(t2) {
    const e = [], o = Object.keys(this.constructors);
    if (0 === o.length)
      throw new Error("There are no constructors to search through!");
    return o.forEach((o2) => {
      const s = this.constructors[o2];
      try {
        "string" == typeof t2 ? (t2 = t2.toLowerCase(), s.toString().toLowerCase().includes(t2) && e.push([this.constructors[o2], this.modules[o2]])) : "function" == typeof t2 && t2(s) && e.push([this.constructors[o2], this.modules[o2]]);
      } catch (t3) {
        this.log(`There was an error while searching through constructor '${o2}':
${t3}
${t3.stack}`);
      }
    }), e;
  }
};
export {
  moduleraid_modern_default as default
};
