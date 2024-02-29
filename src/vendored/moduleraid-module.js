// node_modules/moduleraid/dist/moduleraid.module.js
function t() {
  return t = Object.assign || function(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var n = arguments[e2];
      for (var o in n)
        Object.prototype.hasOwnProperty.call(n, o) && (t2[o] = n[o]);
    }
    return t2;
  }, t.apply(this, arguments);
}
var e = function() {
  function e2(e3) {
    var n2, o = this;
    this.entrypoint = void 0, this.debug = void 0, this.strict = void 0, this.moduleID = Math.random().toString(36).substring(7), this.functionArguments = [[[0], [function(t2, e4, n3) {
      o.modules = n3.c, o.constructors = n3.m, o.get = n3;
    }]], [[1e3], (n2 = {}, n2[this.moduleID] = function(t2, e4, n3) {
      o.modules = n3.c, o.constructors = n3.m, o.get = n3;
    }, n2), [[this.moduleID]]]], this.arrayArguments = [[[this.moduleID], {}, function(t2) {
      Object.keys(t2.m).forEach(function(e4) {
        try {
          o.modules[e4] = t2(e4);
        } catch (t3) {
          o.log("[arrayArguments/1] Failed to require(" + e4 + ") with error:\n" + t3 + "\n" + t3.stack);
        }
      }), o.get = t2;
    }], this.functionArguments[1]], this.modules = {}, this.constructors = [], this.get = void 0;
    var r = { entrypoint: "webpackJsonp", debug: false, strict: false };
    "object" == typeof e3 && (r = t({}, r, e3)), this.entrypoint = r.entrypoint, this.debug = r.debug, this.strict = r.strict, this.detectEntrypoint(), this.fillModules(), this.replaceGet(), this.setupPushEvent();
  }
  var n = e2.prototype;
  return n.log = function(t2) {
    this.debug && console.warn("[moduleRaid] " + t2);
  }, n.replaceGet = function() {
    var t2 = this;
    null === this.get && (this.get = function(e3) {
      return t2.modules[e3];
    });
  }, n.fillModules = function() {
    var t2 = this;
    if ("function" == typeof window[this.entrypoint] ? this.functionArguments.forEach(function(e4, n3) {
      try {
        var o;
        if (t2.modules && Object.keys(t2.modules).length > 0)
          return;
        (o = window)[t2.entrypoint].apply(o, e4);
      } catch (e5) {
        t2.log("moduleRaid.functionArguments[" + n3 + "] failed:\n" + e5 + "\n" + e5.stack);
      }
    }) : this.arrayArguments.forEach(function(e4, n3) {
      try {
        if (t2.modules && Object.keys(t2.modules).length > 0)
          return;
        window[t2.entrypoint].push(e4);
      } catch (e5) {
        t2.log("Pushing moduleRaid.arrayArguments[" + n3 + "] into " + t2.entrypoint + " failed:\n" + e5 + "\n" + e5.stack);
      }
    }), this.modules && 0 == Object.keys(this.modules).length) {
      var e3 = false, n2 = 0;
      if ("function" != typeof window[this.entrypoint] || !window[this.entrypoint]([], [], [n2]))
        throw Error("Unknown Webpack structure");
      for (; !e3; )
        try {
          this.modules[n2] = window[this.entrypoint]([], [], [n2]), n2++;
        } catch (t3) {
          e3 = true;
        }
    }
  }, n.setupPushEvent = function() {
    var t2 = this, e3 = window[this.entrypoint].push;
    window[this.entrypoint].push = function() {
      var n2 = [].slice.call(arguments), o = Reflect.apply(e3, window[t2.entrypoint], n2);
      return document.dispatchEvent(new CustomEvent("moduleraid:webpack-push", { detail: n2 })), o;
    };
  }, n.detectEntrypoint = function() {
    if (null == window[this.entrypoint]) {
      if (this.strict)
        throw Error("Strict mode is enabled and entrypoint at window." + this.entrypoint + " couldn't be found. Please specify the correct one!");
      var t2 = Object.keys(window);
      if ((t2 = t2.filter(function(t3) {
        return t3.toLowerCase().includes("chunk") || t3.toLowerCase().includes("webpack");
      }).filter(function(t3) {
        return "function" == typeof window[t3] || Array.isArray(window[t3]);
      })).length > 1)
        throw Error("Multiple possible endpoints have been detected, please create a new moduleRaid instance with a specific one:\n" + t2.join(", "));
      if (0 === t2.length)
        throw Error("No Webpack JSONP entrypoints could be detected");
      this.log("Entrypoint has been detected at window." + t2[0] + " and set for injection"), this.entrypoint = t2[0];
    }
  }, n.searchObject = function(t2, e3) {
    for (var n2 in t2) {
      var o = t2[n2], r = e3.toLowerCase();
      if ("object" != typeof o) {
        if (n2.toString().toLowerCase().includes(r))
          return true;
        if ("object" != typeof o) {
          if (o.toString().toLowerCase().includes(r))
            return true;
        } else if (this.searchObject(o, e3))
          return true;
      }
    }
    return false;
  }, n.findModule = function(t2) {
    var e3 = this, n2 = [], o = Object.keys(this.modules);
    if (0 === o.length)
      throw new Error("There are no modules to search through!");
    return o.forEach(function(o2) {
      var r = e3.modules[o2.toString()];
      if (void 0 !== r)
        try {
          if ("string" == typeof t2)
            switch (t2 = t2.toLowerCase(), typeof r) {
              case "string":
                r.toLowerCase().includes(t2) && n2.push(r);
                break;
              case "function":
                r.toString().toLowerCase().includes(t2) && n2.push(r);
                break;
              case "object":
                e3.searchObject(r, t2) && n2.push(r);
            }
          else {
            if ("function" != typeof t2)
              throw new TypeError("findModule can only find via string and function, " + typeof t2 + " was passed");
            t2(r) && n2.push(r);
          }
        } catch (t3) {
          e3.log("There was an error while searching through module '" + o2 + "':\n" + t3 + "\n" + t3.stack);
        }
    }), n2;
  }, n.findConstructor = function(t2) {
    var e3 = this, n2 = [], o = Object.keys(this.constructors);
    if (0 === o.length)
      throw new Error("There are no constructors to search through!");
    return o.forEach(function(o2) {
      var r = e3.constructors[o2];
      try {
        "string" == typeof t2 ? (t2 = t2.toLowerCase(), r.toString().toLowerCase().includes(t2) && n2.push([e3.constructors[o2], e3.modules[o2]])) : "function" == typeof t2 && t2(r) && n2.push([e3.constructors[o2], e3.modules[o2]]);
      } catch (t3) {
        e3.log("There was an error while searching through constructor '" + o2 + "':\n" + t3 + "\n" + t3.stack);
      }
    }), n2;
  }, e2;
}();
var moduleraid_module_default = e;
export {
  moduleraid_module_default as default
};
