// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"dfktE":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "687ffa6e0c8ed324";
module.bundle.HMR_BUNDLE_ID = "d799025722d85cae";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, importScripts */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else if ("reload" in location) location.reload();
            else {
                // Web extension context
                var ext = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
                if (ext && ext.runtime && ext.runtime.reload) ext.runtime.reload();
            }
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                if (asset.type === "js") {
                    if (typeof document !== "undefined") {
                        let script = document.createElement("script");
                        script.src = asset.url;
                        return new Promise((resolve, reject)=>{
                            var _document$head;
                            script.onload = ()=>resolve(script);
                            script.onerror = reject;
                            (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
                        });
                    } else if (typeof importScripts === "function") return new Promise((resolve, reject)=>{
                        try {
                            importScripts(asset.url);
                        } catch (err) {
                            reject(err);
                        }
                    });
                }
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id1][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"lLxCH":[function(require,module,exports) {
var _modalJs = require("./modal.js");
var _searchJs = require("./search.js");

},{"./modal.js":"iRz4f","./search.js":"d9abO"}],"iRz4f":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _modalsJs = require("./modals.js");
var _modalsJsDefault = parcelHelpers.interopDefault(_modalsJs);
const container = document.getElementById("info");
if (container) new (0, _modalsJsDefault.default)(container);
 // If you have more than one modal on the page
 // const containers = document.querySelectorAll(".Modal");
 // containers.forEach(container => new Modal(container));

},{"./modals.js":"bFKxS","@parcel/transformer-js/src/esmodule-helpers.js":"CsGN4"}],"bFKxS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _freezeScroll = require("@threespot/freeze-scroll");
var _freezeScrollDefault = parcelHelpers.interopDefault(_freezeScroll);
var _evEmitter = require("ev-emitter");
var _evEmitterDefault = parcelHelpers.interopDefault(_evEmitter);
// by Threespot https://github.com/Threespot/modal
// adding as a local module because Parcel is having
// trouble with the npm installed module
//------------------------------------------------------------------------
// Modal windows
//
// - Progressively enhanced, works with pure CSS thanks to the `:target` pseudo selector
// - Supports multiple toggles and multiple close buttons
//
// References:
// - https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/dialog-modal/dialog.html
// - https://www.smashingmagazine.com/2014/09/making-modal-windows-better-for-everyone/
// - https://www.smashingmagazine.com/2016/09/building-social-a-case-study-on-progressive-enhancement/
// - https://bitsofco.de/accessible-modal-dialog/
// - https://haltersweb.github.io/Accessibility/dialog.html
// - https://yoast.com/dev-blog/the-a11y-monthly-making-modals-accessible/
//
// Note: Avoid aria-modal="true" until support is beter
//       https://labs.levelaccess.com/index.php/ARIA_Dialog_Role_with_modal_true
//------------------------------------------------------------------------
"use strict";
class Modal extends (0, _evEmitterDefault.default) {
    constructor(el, opts){
        // Have to call super() first before referencing “this” since we’re extending EventEmitter
        // https://stackoverflow.com/a/43591507/673457
        super();
        // Use Object.assign() to merge “opts” object with default values in this.options
        this.options = Object.assign({}, {
            transitionSpeed: 100,
            activeClasses: "",
            modalContentClass: "Modal-content",
            onReady: null
        }, opts);
        if (this.options.activeClasses.length) {
            // Check if active class string contains multiple classes
            if (this.options.activeClasses.indexOf(" ") > -1) // Convert to array and remove any empty string values
            // caused by having multiple spaces in a row.
            this.options.activeClasses = this.options.activeClasses.split(" ").filter((n)=>n.length);
            else // We still need to convert a single active class to an array
            // so we can use the spread syntax later in classList.add()
            this.options.activeClasses = [
                this.options.activeClasses
            ];
        }
        this.el = el;
        this.el.classList.add("js-init");
        this.isOpen = false;
        this.hasToggles = false;
        this.contentEl = this.el.querySelector(".Modal-content");
        this.customContentEl = this.el.querySelector("." + this.options.modalContentClass) || this.contentEl;
        this.closeEls = this.el.querySelectorAll("[data-modal-close]");
        // If modal has an ID, check for matching toggle elements with “data-modal” attribute
        if (this.el.id) {
            this.toggleEls = document.querySelectorAll(`[data-modal="${this.el.id}"]`);
            this.hasToggles = !!this.toggleEls.length;
        } else // If modal doesn’t have an id, add a random one for “aria-controls”
        // https://gist.github.com/gordonbrander/2230317
        this.el.id = Math.random().toString(36).substr(2, 4);
        // Store currently focused element when modal opens so we can restore focus when it closes
        this.prevFocusedEl = null;
        // Find focusable elements inside of modal window (used to prevent tabbing outside of modal)
        this.focusableEls = this.getFocusableEls();
        // Save first and last focusable elements
        if (this.focusableEls.length) {
            this.firstFocusableEl = this.focusableEls[0];
            this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
        }
        // Check for aria-label/aria-labelledby on modal (a11y best practice)
        if (!this.el.getAttribute("aria-label") && !this.el.getAttribute("aria-labelledby")) console.warn("A11y Issue: Modal window should have an \u201Caria-label\u201D or \u201Caria-labelledby\u201D attribute", this.el);
        // Init modal window
        this.init();
    }
    init() {
        // Add aria attributes to modal window
        this.el.setAttribute("aria-hidden", "true");
        this.el.setAttribute("role", "dialog");
        // Add aria attributes to toggle buttons
        if (this.hasToggles) this.toggleEls.forEach((toggleEl)=>{
            // Add “aria-controls” but be aware only JAWS supports it
            // https://inclusive-components.design/menus-menu-buttons/#ariacontrols
            toggleEl.setAttribute("aria-controls", this.el.id);
            toggleEl.setAttribute("aria-expanded", "false");
            toggleEl.setAttribute("role", "button");
        });
        // Add aria attributes to close buttons
        if (this.closeEls.length) this.closeEls.forEach((closeEl)=>{
            closeEl.setAttribute("role", "button");
        });
        // Add event listeners
        this.bindEvents();
        // Check for ready callback
        if (typeof this.options.onReady === "function") this.options.onReady();
    // Check URL hash to determine if modal should start open
    // if (
    //   this.el.id &&
    //   window.location.hash &&
    //   window.location.hash.substring(1) == this.el.id
    // ) {
    //   this.open();
    // }
    }
    destroy() {
        // Remove aria attributes on modal window
        this.el.removeAttribute("aria-hidden");
        this.el.removeAttribute("role");
        this.el.removeAttribute("tabindex");
        // Remove aria attributes on toggle buttons
        if (this.hasToggles) this.toggleEls.forEach((toggleEl)=>{
            toggleEl.removeAttribute("aria-controls");
            toggleEl.removeAttribute("aria-expanded");
            toggleEl.removeAttribute("role");
        });
        // Remove aria attributes on close buttons
        if (this.closeEls.length) this.closeEls.forEach((closeEl)=>{
            closeEl.removeAttribute("aria-label");
            closeEl.removeAttribute("role");
        });
        // Remove event listeners
        this.unbindEvents();
        // Trigger destroy event
        this.emitEvent("destroy");
    }
    // Find focusable elements inside of modal window (used to prevent tabbing outside of modal)
    // https://bitsofco.de/accessible-modal-dialog/
    getFocusableEls() {
        let focusableEls = this.el.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
        // Convert NodeList to Array
        return [
            ...focusableEls
        ];
    }
    // Get currently focused element
    // https://stackoverflow.com/a/40873560/673457
    // Could also use document.querySelector(":focus") but that’s likely less performant
    getFocusedEl() {
        if (document.hasFocus() && document.activeElement !== document.body && document.activeElement !== document.documentElement) return document.activeElement;
        return null;
    }
    focusDelay(el) {
        var self = this;
        // Use setTimeout() to ensure element is focused
        // https://stackoverflow.com/questions/33955650/what-is-settimeout-doing-when-set-to-0-milliseconds/33955673
        // https://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
        // https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5
        window.setTimeout(()=>el.focus(), this.options.transitionSpeed);
    }
    windowClickHandler(evt) {
        // Ignore click on the toggle button, which already has an event handler
        let isToggle = Array.prototype.indexOf.call(this.toggleEls, evt.target.closest("[data-modal]")) > -1;
        // Don’t close if target el has been removed from the DOM by the time this callback runs
        let targetElExists = document.body.contains(evt.target);
        // Do nothing if modal is closed, a toggle was clicked,
        // or target element no longer exists.
        if (!this.isOpen || isToggle || !targetElExists) return;
        // Don’t close if target is a child of the modal wrapper
        let targetInsideWrapper = this.customContentEl && this.customContentEl.contains(evt.target);
        // Don’t close if target is the modal wrapper itself
        let targetIsWrapper = this.customContentEl.isSameNode(evt.target);
        // For single-page apps or site using pjax (e.g. Turbolinks, Swup),
        // we need to manually close the modal when a link is clicked,
        // but ignore links that have been set to role="button".
        // let targetIsLink = evt.target.closest('a:not([role="button"])');
        //
        // Then add this additional condition below:
        // || (targetInsideWrapper && targetIsLink)
        // Close when click target is outside of the modal window,
        if (!(targetInsideWrapper || targetIsWrapper)) this.close(evt);
    }
    keydownHandler(evt) {
        // Do nothing if modal is closed
        if (!this.isOpen) return false;
        // Close with escape key
        if (evt.which === 27) this.close(evt);
        // Prevent tabbing outside of modal
        if (evt.which === 9) {
            // If no focusable items, close the modal
            if (!this.focusableEls.length) {
                this.close(evt);
                return false;
            }
            // Find currently focused element
            let focusedEl = this.getFocusedEl();
            // If tabbing forward and the last item is focued, focus the first item
            if (!evt.shiftKey && focusedEl == this.lastFocusableEl) {
                // Prevent default since we're manually focusing the first element
                evt.preventDefault();
                this.firstFocusableEl.focus();
            } else if (evt.shiftKey && (focusedEl == this.firstFocusableEl || focusedEl == this.contentEl)) {
                // If tabbing backwards and the first item is focused, focus the last item
                evt.preventDefault();
                this.lastFocusableEl.focus();
            }
        }
    }
    bindEvents() {
        // Toggle buttons
        if (this.hasToggles) {
            // Note: Event callbacks need to be assigned to a var so they can be removed
            // https://stackoverflow.com/a/22870717/673457
            this.toggleClick = this.toggle.bind(this);
            this.toggleEls.forEach((toggleEl)=>{
                toggleEl.addEventListener("click", this.toggleClick);
            });
        }
        // Close buttons
        if (this.closeEls.length) {
            // Event callback
            this.closeClick = this.close.bind(this);
            this.closeEls.forEach((closeEl)=>{
                closeEl.addEventListener("click", this.closeClick);
            });
        }
        // Close if click outside of modal content
        this.windowClick = this.windowClickHandler.bind(this);
        window.addEventListener("click", this.windowClick);
        // Keyboard events
        this.keydown = this.keydownHandler.bind(this);
        window.addEventListener("keydown", this.keydown);
    }
    unbindEvents() {
        // Toggle buttons
        if (this.hasToggles) this.toggleEls.forEach((toggleEl)=>{
            toggleEl.removeEventListener("click", this.toggleClick);
        });
        // Close buttons
        if (this.closeEls.length) this.closeEls.forEach((closeEl)=>{
            closeEl.removeEventListener("click", this.closeClick);
        });
        // Window events
        window.removeEventListener("click", this.windowClick);
        window.removeEventListener("keydown", this.keydown);
    }
    // Expand expandable
    open(evt) {
        evt.preventDefault();
        // Save currently focused element to focus on close
        this.prevFocusedEl = this.getFocusedEl();
        // Disable scrolling
        (0, _freezeScrollDefault.default).freeze();
        // Scroll modal content to top
        // (without this, content will be vertically centered)
        if (this.contentEl) this.contentEl.scrollTop = 0;
        // Update modal aria attributes
        this.el.setAttribute("aria-hidden", "false");
        // Add custom classes
        if (this.options.activeClasses.length) this.el.classList.add(...this.options.activeClasses);
        // Update toggle aria attributes
        if (this.hasToggles) this.toggleEls.forEach((toggleEl)=>{
            toggleEl.setAttribute("aria-expanded", "true");
            // Add custom classes
            if (this.options.activeClasses.length) toggleEl.classList.add(...this.options.activeClasses);
        });
        // Focus modal on open
        if (this.contentEl) {
            this.contentEl.setAttribute("tabindex", "-1");
            this.focusDelay(this.contentEl);
        } else {
            this.el.setAttribute("tabindex", "-1");
            this.focusDelay(this.el);
        }
        // Update URL hash so users can link directly to the modal window content
        // Use history.replaceState() to prevent adding a new history entry
        // Note: If replaceState isn’t supported, modal-toggles.js won’t prevent the
        // default click event, causing the hash to update and creating a new history entry.
        // if (history.replaceState) {
        //   history.replaceState(null, "", "#" + this.el.id);
        // }
        // Update state
        this.isOpen = true;
        // Trigger open event
        this.emitEvent("open");
    }
    // Collapse expandable
    close(evt) {
        evt.preventDefault();
        // Clear hash using replaceState() to prevent adding a new history entry
        // if (history.replaceState) {
        //   history.replaceState(null, "", window.location.pathname);
        // }
        // Update modal aria attributes
        this.el.setAttribute("aria-hidden", "true");
        // Remove custom classes
        if (this.options.activeClasses.length) this.el.classList.remove(...this.options.activeClasses);
        // Update toggle aria attributes
        if (this.hasToggles) this.toggleEls.forEach((toggleEl)=>{
            toggleEl.setAttribute("aria-expanded", "false");
            // Remove custom classes
            if (this.options.activeClasses.length) toggleEl.classList.remove(...this.options.activeClasses);
        });
        // Enable scrolling
        (0, _freezeScrollDefault.default).unfreeze();
        // Shift focus to previously focused element
        if (this.prevFocusedEl) this.focusDelay(this.prevFocusedEl);
        else if (this.hasToggles) // Focus the first toggle if nothing was previously focused
        this.focusDelay(this.toggleEls[0]);
        // Update state
        this.isOpen = false;
        // Trigger close event
        this.emitEvent("close");
    }
    // Toggle expandable
    toggle(evt) {
        if (this.isOpen) this.close(evt);
        else this.open(evt);
    }
}
exports.default = Modal;

},{"@threespot/freeze-scroll":"3wDUr","ev-emitter":"dz3Sd","@parcel/transformer-js/src/esmodule-helpers.js":"CsGN4"}],"3wDUr":[function(require,module,exports) {
module.exports = /******/ function(modules) {
    /******/ // The module cache
    /******/ var installedModules = {};
    /******/ /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
        /******/ /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId]) /******/ return installedModules[moduleId].exports;
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = installedModules[moduleId] = {
            /******/ i: moduleId,
            /******/ l: false,
            /******/ exports: {}
        };
        /******/ /******/ // Execute the module function
        /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/ /******/ // Flag the module as loaded
        /******/ module.l = true;
        /******/ /******/ // Return the exports of the module
        /******/ return module.exports;
    /******/ }
    /******/ /******/ /******/ // expose the modules object (__webpack_modules__)
    /******/ __webpack_require__.m = modules;
    /******/ /******/ // expose the module cache
    /******/ __webpack_require__.c = installedModules;
    /******/ /******/ // define getter function for harmony exports
    /******/ __webpack_require__.d = function(exports, name, getter) {
        /******/ if (!__webpack_require__.o(exports, name)) /******/ Object.defineProperty(exports, name, {
            /******/ configurable: false,
            /******/ enumerable: true,
            /******/ get: getter
        });
    /******/ };
    /******/ /******/ // define __esModule on exports
    /******/ __webpack_require__.r = function(exports) {
        /******/ Object.defineProperty(exports, "__esModule", {
            value: true
        });
    /******/ };
    /******/ /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = function(module) {
        /******/ var getter = module && module.__esModule ? /******/ function getDefault() {
            return module["default"];
        } : /******/ function getModuleExports() {
            return module;
        };
        /******/ __webpack_require__.d(getter, "a", getter);
        /******/ return getter;
    /******/ };
    /******/ /******/ // Object.prototype.hasOwnProperty.call
    /******/ __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/ /******/ // __webpack_public_path__
    /******/ __webpack_require__.p = "";
    /******/ /******/ /******/ // Load entry module and return exports
    /******/ return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ }({
    /***/ "./index.js": /*!******************!*\
  !*** ./index.js ***!
  \******************/ /*! no static exports found */ /***/ function(module, exports, __webpack_require__) {
        "use strict";
        eval('//------------------------------------------------------------------------\n// Disable scrolling (e.g. when modal window is open)\n//\n// Inspired by https://benfrain.com/preventing-body-scroll-for-modals-in-ios/\n//\n// Note: Once Safari and iOS Safari support the \u201Ctouch-action\u201D CSS property,\n//       we can simply toggle a class that adds the following:\n//\n//       html,\n//       body {\n//         overflow: hidden !important;\n//         touch-action: none !important;\n//       }\n//\n//       /* Add class to elements like modal windows that still need to scroll */\n//       .allow-scroll { touch-action: auto !important; }\n//\n// https://caniuse.com/#feat=css-touch-action\n//------------------------------------------------------------------------\n\n\nmodule.exports = {\n  // Save current scroll position when scrolling is disabled so we can reset it when enabled\n  _scrollPos: 0,\n\n  // Track whether or not we have injected CSS the already\n  _hasCSS: false,\n\n  // Inject <style> tag with CSS rules (simpler than toggling a lot of inline styles)\n  _injectCSS: function _injectCSS() {\n\n    // Don\u2019t add styles more than once\n    if (!this._hasCSS) {\n      var css = \'\\n        html.js-no-scroll { height: 100% !important; }\\n        .js-no-scroll body {\\n          height: 100%;\\n          overflow: hidden !important;\\n          position: fixed !important;\\n          width: 100% !important;\\n        }\';\n\n      // Note: Setting \u201Cposition: fixed\u201D on the body prevents iOS from scrolling.\n      //       However, this will cause the browser to scroll to the top, so we must\n      //       add inline \u201Cheight\u201D and \u201Ctop\u201D styles to the body to address this.\n\n      // Create <style> tag and add to <head>\n      // https://stackoverflow.com/a/524721/673457\n      var styleEl = document.createElement(\'style\');\n      styleEl.type = \'text/css\';\n      styleEl.appendChild(document.createTextNode(css));\n      document.head.appendChild(styleEl);\n\n      // Update var so we can avoid loading the CSS multiple times\n      this._hasCSS = true;\n    }\n  },\n\n  _saveScrollPos: function _saveScrollPos() {\n    this._scrollPos = window.pageYOffset || document.documentElement.scrollTop;\n  },\n\n  /**\n   * Disable scrolling\n   */\n  freeze: function freeze() {\n    // Add required inline CSS (only runs first time)\n    this._injectCSS();\n\n    this._saveScrollPos();\n\n    // Add class to prevent page scrolling (sets fixed position on body)\n    document.documentElement.classList.add("js-no-scroll");\n\n    // Add inline styles if not already at top of page\n    if (this._scrollPos > 0) {\n      document.body.style.height = "calc(100% + " + this._scrollPos + "px)";\n      document.body.style.top = -this._scrollPos + "px";\n    }\n  },\n\n  /**\n   * Enable scrolling\n   */\n  unfreeze: function unfreeze() {\n    // Remove js-no-scroll class\n    document.documentElement.classList.remove("js-no-scroll");\n\n    if (this._scrollPos > 0) {\n      // Remove inline styles on body, which causes the page to jump to the top.\n      document.body.style.height = "";\n      document.body.style.top = "";\n\n      // Disable native smooth scrolling before resetting the scroll position.\n      // Otherwise, there would be an annoying jump after scrolling is enabled.\n      if (document.documentElement.style.hasOwnProperty(\'scrollBehavior\')) {\n        document.documentElement.style.scrollBehavior = "auto";\n      }\n\n      // Reset scroll position to what it was before scrolling was disabled.\n      window.scrollTo(0, this._scrollPos);\n\n      // Re-enable native smooth scrolling\n      if (document.documentElement.style.hasOwnProperty(\'scrollBehavior\')) {\n        document.documentElement.style.scrollBehavior = "";\n      }\n    }\n  }\n};\n\n//# sourceURL=webpack://%5Bname%5DLink/./index.js?');
    /***/ }
});

},{}],"dz3Sd":[function(require,module,exports) {
/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */ /* jshint unused: true, undef: true, strict: true */ (function(global, factory) {
    // universal module definition
    /* jshint strict: false */ /* globals define, module, window */ if (typeof define == "function" && define.amd) // AMD - RequireJS
    define(factory);
    else if (module.exports) // CommonJS - Browserify, Webpack
    module.exports = factory();
    else // Browser globals
    global.EvEmitter = factory();
})(typeof window != "undefined" ? window : this, function() {
    "use strict";
    function EvEmitter() {}
    var proto = EvEmitter.prototype;
    proto.on = function(eventName, listener) {
        if (!eventName || !listener) return;
        // set events hash
        var events = this._events = this._events || {};
        // set listeners array
        var listeners = events[eventName] = events[eventName] || [];
        // only add once
        if (listeners.indexOf(listener) == -1) listeners.push(listener);
        return this;
    };
    proto.once = function(eventName, listener) {
        if (!eventName || !listener) return;
        // add event
        this.on(eventName, listener);
        // set once flag
        // set onceEvents hash
        var onceEvents = this._onceEvents = this._onceEvents || {};
        // set onceListeners object
        var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
        // set flag
        onceListeners[listener] = true;
        return this;
    };
    proto.off = function(eventName, listener) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) return;
        var index = listeners.indexOf(listener);
        if (index != -1) listeners.splice(index, 1);
        return this;
    };
    proto.emitEvent = function(eventName, args) {
        var listeners = this._events && this._events[eventName];
        if (!listeners || !listeners.length) return;
        // copy over to avoid interference if .off() in listener
        listeners = listeners.slice(0);
        args = args || [];
        // once stuff
        var onceListeners = this._onceEvents && this._onceEvents[eventName];
        for(var i = 0; i < listeners.length; i++){
            var listener = listeners[i];
            var isOnce = onceListeners && onceListeners[listener];
            if (isOnce) {
                // remove listener
                // remove before trigger to prevent recursion
                this.off(eventName, listener);
                // unset once flag
                delete onceListeners[listener];
            }
            // trigger listener
            listener.apply(this, args);
        }
        return this;
    };
    proto.allOff = function() {
        delete this._events;
        delete this._onceEvents;
    };
    return EvEmitter;
});

},{}],"CsGN4":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"d9abO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _lunr = require("lunr");
var _lunrDefault = parcelHelpers.interopDefault(_lunr);
// set variables
const htmlCollection = document.getElementsByClassName("excerpt");
const htmlPosts = [
    ...htmlCollection
];
const searchbar = document.getElementById("search");
const filter = document.getElementById("filter");
const postsContainer = document.getElementById("posts");
const noResults = document.getElementById("no-results");
const clearButton = document.getElementById("clear-filters");
const loadButton = document.getElementById("load-more");
let counter = 10;
// create array of objects containing posts texts
const posts = htmlPosts.map((post)=>({
        id: post.id,
        content: post.innerText.replace(/\n/g, " "),
        feedback: post.dataset.feedback,
        type: post.dataset.type,
        degrees: post.dataset.degrees
    }));
// initiate lunr
let idx = (0, _lunrDefault.default)(function() {
    this.ref("id");
    this.field("content", {
        boost: 10
    });
    this.field("feedback", {
        boost: 5
    });
    this.field("type", {
        boost: 5
    });
    this.field("degrees", {
        boost: 5
    });
    // similarity tuning
    this.k1(0.2);
    this.b(1);
    // remove buzz words that are causing random word eliminiation
    this.pipeline.reset();
    this.searchPipeline.reset();
    posts.forEach(function(doc) {
        this.add(doc);
    }, this);
});
// automatic text search by typing in text input field
const checkEnter = (e)=>{
    e = e || event;
    var txtArea = /textarea/i.test((e.target || e.srcElement).tagName);
    return txtArea || (e.keyCode || e.which || e.charCode || 0) !== 13;
};
searchbar.onkeypress = checkEnter;
searchbar.addEventListener("input", (event)=>{
    event.preventDefault();
    loadButton.classList.add("hidden");
    idx.query(function(q) {
        // look for an exact match and apply a large positive boost
        q.term(event.target.value, {
            usePipeline: true,
            boost: 100
        });
        // look for terms that match the beginning of this query term and apply a medium boost
        q.term(`${event.target.value}*`, {
            usePipeline: false,
            boost: 10
        });
        // look for terms that match with an edit distance of 2 and apply a small boost
        q.term(event.target.value, {
            usePipeline: false,
            editDistance: 2,
            boost: 1
        });
    });
    let results = idx.search(`${event.target.value}^100 ${event.target.value}*^10 ${event.target.value}~2`);
    if (event.target.value && results.length) {
        noResults.classList.add("hidden");
        postsContainer.classList.remove("hidden");
        htmlPosts.filter((post)=>{
            post.classList.add("hidden");
            results.some((result)=>{
                if (result.ref === post.id) post.classList.remove("hidden");
            });
        });
    } else if (event.target.value) {
        noResults.classList.remove("hidden");
        postsContainer.classList.add("hidden");
    } else {
        noResults.classList.add("hidden");
        postsContainer.classList.remove("hidden");
        htmlPosts.map((post)=>{
            post.classList.remove("hidden");
        });
    }
});
// search by submitting form of dropdown/checkboxes
filter.addEventListener("submit", (event)=>{
    event.preventDefault();
    loadButton.classList.add("hidden");
    let formData = new FormData(filter);
    let options = [];
    for (var pair of formData.entries())options = [
        ...options,
        ...pair
    ];
    options = options.filter((option)=>option !== "on" && option != "location" && option.length).map((option)=>{
        const thisOption = `${option}*`;
        return thisOption.replace(/\-/g, " +");
    }).join("* +");
    idx.query(function(q) {
        // look for an exact match and apply a large positive boost
        q.term(options, {
            usePipeline: true,
            boost: 100
        });
    });
    let results = idx.search(`+${options}`);
    if (options.length && results.length) {
        noResults.classList.add("hidden");
        postsContainer.classList.remove("hidden");
        htmlPosts.filter((post)=>{
            post.classList.add("hidden");
            results.some((result)=>{
                if (result.ref === post.id) post.classList.remove("hidden");
            });
        });
    } else if (options.length) {
        noResults.classList.remove("hidden");
        postsContainer.classList.add("hidden");
    } else {
        noResults.classList.add("hidden");
        postsContainer.classList.remove("hidden");
        htmlPosts.map((post)=>{
            post.classList.remove("hidden");
        });
    }
});
// reset search on clear
clearButton.addEventListener("click", (event)=>{
    filter.reset();
    loadButton.classList.remove("hidden");
    counter = 10;
    htmlPosts.map((post, index)=>{
        if (index < counter) post.classList.remove("hidden");
    });
});
// load up to 10 posts on page load
if (htmlPosts.length) htmlPosts.map((post, index)=>{
    if (index >= 10) {
        post.classList.add("hidden");
        loadButton.classList.remove("hidden");
    } else {
        post.classList.remove("hidden");
        loadButton.classList.add("hidden");
    }
});
// load up to 10 posts more on load more click
loadButton.addEventListener("click", (event)=>{
    if (counter < htmlPosts.length) {
        counter += 10;
        htmlPosts.map((post, index)=>{
            if (counter <= index <= htmlPosts.length) post.classList.remove("hidden");
            else post.classList.add("hidden");
        });
    } else loadButton.classList.add("hidden");
});

},{"lunr":"j8Nzw","@parcel/transformer-js/src/esmodule-helpers.js":"CsGN4"}],"j8Nzw":[function(require,module,exports) {
(function() {
    /**
 * A convenience function for configuring and constructing
 * a new lunr Index.
 *
 * A lunr.Builder instance is created and the pipeline setup
 * with a trimmer, stop word filter and stemmer.
 *
 * This builder object is yielded to the configuration function
 * that is passed as a parameter, allowing the list of fields
 * and other builder parameters to be customised.
 *
 * All documents _must_ be added within the passed config function.
 *
 * @example
 * var idx = lunr(function () {
 *   this.field('title')
 *   this.field('body')
 *   this.ref('id')
 *
 *   documents.forEach(function (doc) {
 *     this.add(doc)
 *   }, this)
 * })
 *
 * @see {@link lunr.Builder}
 * @see {@link lunr.Pipeline}
 * @see {@link lunr.trimmer}
 * @see {@link lunr.stopWordFilter}
 * @see {@link lunr.stemmer}
 * @namespace {function} lunr
 */ var lunr = function(config) {
        var builder = new lunr.Builder;
        builder.pipeline.add(lunr.trimmer, lunr.stopWordFilter, lunr.stemmer);
        builder.searchPipeline.add(lunr.stemmer);
        config.call(builder, builder);
        return builder.build();
    };
    lunr.version = "2.3.9";
    /*!
 * lunr.utils
 * Copyright (C) 2020 Oliver Nightingale
 */ /**
 * A namespace containing utils for the rest of the lunr library
 * @namespace lunr.utils
 */ lunr.utils = {};
    /**
 * Print a warning message to the console.
 *
 * @param {String} message The message to be printed.
 * @memberOf lunr.utils
 * @function
 */ lunr.utils.warn = function(global) {
        /* eslint-disable no-console */ return function(message) {
            if (global.console && console.warn) console.warn(message);
        };
    /* eslint-enable no-console */ }(this);
    /**
 * Convert an object to a string.
 *
 * In the case of `null` and `undefined` the function returns
 * the empty string, in all other cases the result of calling
 * `toString` on the passed object is returned.
 *
 * @param {Any} obj The object to convert to a string.
 * @return {String} string representation of the passed object.
 * @memberOf lunr.utils
 */ lunr.utils.asString = function(obj) {
        if (obj === void 0 || obj === null) return "";
        else return obj.toString();
    };
    /**
 * Clones an object.
 *
 * Will create a copy of an existing object such that any mutations
 * on the copy cannot affect the original.
 *
 * Only shallow objects are supported, passing a nested object to this
 * function will cause a TypeError.
 *
 * Objects with primitives, and arrays of primitives are supported.
 *
 * @param {Object} obj The object to clone.
 * @return {Object} a clone of the passed object.
 * @throws {TypeError} when a nested object is passed.
 * @memberOf Utils
 */ lunr.utils.clone = function(obj) {
        if (obj === null || obj === undefined) return obj;
        var clone = Object.create(null), keys = Object.keys(obj);
        for(var i = 0; i < keys.length; i++){
            var key = keys[i], val = obj[key];
            if (Array.isArray(val)) {
                clone[key] = val.slice();
                continue;
            }
            if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
                clone[key] = val;
                continue;
            }
            throw new TypeError("clone is not deep and does not support nested objects");
        }
        return clone;
    };
    lunr.FieldRef = function(docRef, fieldName, stringValue) {
        this.docRef = docRef;
        this.fieldName = fieldName;
        this._stringValue = stringValue;
    };
    lunr.FieldRef.joiner = "/";
    lunr.FieldRef.fromString = function(s) {
        var n = s.indexOf(lunr.FieldRef.joiner);
        if (n === -1) throw "malformed field ref string";
        var fieldRef = s.slice(0, n), docRef = s.slice(n + 1);
        return new lunr.FieldRef(docRef, fieldRef, s);
    };
    lunr.FieldRef.prototype.toString = function() {
        if (this._stringValue == undefined) this._stringValue = this.fieldName + lunr.FieldRef.joiner + this.docRef;
        return this._stringValue;
    };
    /*!
 * lunr.Set
 * Copyright (C) 2020 Oliver Nightingale
 */ /**
 * A lunr set.
 *
 * @constructor
 */ lunr.Set = function(elements) {
        this.elements = Object.create(null);
        if (elements) {
            this.length = elements.length;
            for(var i = 0; i < this.length; i++)this.elements[elements[i]] = true;
        } else this.length = 0;
    };
    /**
 * A complete set that contains all elements.
 *
 * @static
 * @readonly
 * @type {lunr.Set}
 */ lunr.Set.complete = {
        intersect: function(other) {
            return other;
        },
        union: function() {
            return this;
        },
        contains: function() {
            return true;
        }
    };
    /**
 * An empty set that contains no elements.
 *
 * @static
 * @readonly
 * @type {lunr.Set}
 */ lunr.Set.empty = {
        intersect: function() {
            return this;
        },
        union: function(other) {
            return other;
        },
        contains: function() {
            return false;
        }
    };
    /**
 * Returns true if this set contains the specified object.
 *
 * @param {object} object - Object whose presence in this set is to be tested.
 * @returns {boolean} - True if this set contains the specified object.
 */ lunr.Set.prototype.contains = function(object) {
        return !!this.elements[object];
    };
    /**
 * Returns a new set containing only the elements that are present in both
 * this set and the specified set.
 *
 * @param {lunr.Set} other - set to intersect with this set.
 * @returns {lunr.Set} a new set that is the intersection of this and the specified set.
 */ lunr.Set.prototype.intersect = function(other) {
        var a, b, elements, intersection = [];
        if (other === lunr.Set.complete) return this;
        if (other === lunr.Set.empty) return other;
        if (this.length < other.length) {
            a = this;
            b = other;
        } else {
            a = other;
            b = this;
        }
        elements = Object.keys(a.elements);
        for(var i = 0; i < elements.length; i++){
            var element = elements[i];
            if (element in b.elements) intersection.push(element);
        }
        return new lunr.Set(intersection);
    };
    /**
 * Returns a new set combining the elements of this and the specified set.
 *
 * @param {lunr.Set} other - set to union with this set.
 * @return {lunr.Set} a new set that is the union of this and the specified set.
 */ lunr.Set.prototype.union = function(other) {
        if (other === lunr.Set.complete) return lunr.Set.complete;
        if (other === lunr.Set.empty) return this;
        return new lunr.Set(Object.keys(this.elements).concat(Object.keys(other.elements)));
    };
    /**
 * A function to calculate the inverse document frequency for
 * a posting. This is shared between the builder and the index
 *
 * @private
 * @param {object} posting - The posting for a given term
 * @param {number} documentCount - The total number of documents.
 */ lunr.idf = function(posting, documentCount) {
        var documentsWithTerm = 0;
        for(var fieldName in posting){
            if (fieldName == "_index") continue; // Ignore the term index, its not a field
            documentsWithTerm += Object.keys(posting[fieldName]).length;
        }
        var x = (documentCount - documentsWithTerm + 0.5) / (documentsWithTerm + 0.5);
        return Math.log(1 + Math.abs(x));
    };
    /**
 * A token wraps a string representation of a token
 * as it is passed through the text processing pipeline.
 *
 * @constructor
 * @param {string} [str=''] - The string token being wrapped.
 * @param {object} [metadata={}] - Metadata associated with this token.
 */ lunr.Token = function(str, metadata) {
        this.str = str || "";
        this.metadata = metadata || {};
    };
    /**
 * Returns the token string that is being wrapped by this object.
 *
 * @returns {string}
 */ lunr.Token.prototype.toString = function() {
        return this.str;
    };
    /**
 * A token update function is used when updating or optionally
 * when cloning a token.
 *
 * @callback lunr.Token~updateFunction
 * @param {string} str - The string representation of the token.
 * @param {Object} metadata - All metadata associated with this token.
 */ /**
 * Applies the given function to the wrapped string token.
 *
 * @example
 * token.update(function (str, metadata) {
 *   return str.toUpperCase()
 * })
 *
 * @param {lunr.Token~updateFunction} fn - A function to apply to the token string.
 * @returns {lunr.Token}
 */ lunr.Token.prototype.update = function(fn) {
        this.str = fn(this.str, this.metadata);
        return this;
    };
    /**
 * Creates a clone of this token. Optionally a function can be
 * applied to the cloned token.
 *
 * @param {lunr.Token~updateFunction} [fn] - An optional function to apply to the cloned token.
 * @returns {lunr.Token}
 */ lunr.Token.prototype.clone = function(fn) {
        fn = fn || function(s) {
            return s;
        };
        return new lunr.Token(fn(this.str, this.metadata), this.metadata);
    };
    /*!
 * lunr.tokenizer
 * Copyright (C) 2020 Oliver Nightingale
 */ /**
 * A function for splitting a string into tokens ready to be inserted into
 * the search index. Uses `lunr.tokenizer.separator` to split strings, change
 * the value of this property to change how strings are split into tokens.
 *
 * This tokenizer will convert its parameter to a string by calling `toString` and
 * then will split this string on the character in `lunr.tokenizer.separator`.
 * Arrays will have their elements converted to strings and wrapped in a lunr.Token.
 *
 * Optional metadata can be passed to the tokenizer, this metadata will be cloned and
 * added as metadata to every token that is created from the object to be tokenized.
 *
 * @static
 * @param {?(string|object|object[])} obj - The object to convert into tokens
 * @param {?object} metadata - Optional metadata to associate with every token
 * @returns {lunr.Token[]}
 * @see {@link lunr.Pipeline}
 */ lunr.tokenizer = function(obj, metadata) {
        if (obj == null || obj == undefined) return [];
        if (Array.isArray(obj)) return obj.map(function(t) {
            return new lunr.Token(lunr.utils.asString(t).toLowerCase(), lunr.utils.clone(metadata));
        });
        var str = obj.toString().toLowerCase(), len = str.length, tokens = [];
        for(var sliceEnd = 0, sliceStart = 0; sliceEnd <= len; sliceEnd++){
            var char = str.charAt(sliceEnd), sliceLength = sliceEnd - sliceStart;
            if (char.match(lunr.tokenizer.separator) || sliceEnd == len) {
                if (sliceLength > 0) {
                    var tokenMetadata = lunr.utils.clone(metadata) || {};
                    tokenMetadata["position"] = [
                        sliceStart,
                        sliceLength
                    ];
                    tokenMetadata["index"] = tokens.length;
                    tokens.push(new lunr.Token(str.slice(sliceStart, sliceEnd), tokenMetadata));
                }
                sliceStart = sliceEnd + 1;
            }
        }
        return tokens;
    };
    /**
 * The separator used to split a string into tokens. Override this property to change the behaviour of
 * `lunr.tokenizer` behaviour when tokenizing strings. By default this splits on whitespace and hyphens.
 *
 * @static
 * @see lunr.tokenizer
 */ lunr.tokenizer.separator = /[\s\-]+/;
    /*!
 * lunr.Pipeline
 * Copyright (C) 2020 Oliver Nightingale
 */ /**
 * lunr.Pipelines maintain an ordered list of functions to be applied to all
 * tokens in documents entering the search index and queries being ran against
 * the index.
 *
 * An instance of lunr.Index created with the lunr shortcut will contain a
 * pipeline with a stop word filter and an English language stemmer. Extra
 * functions can be added before or after either of these functions or these
 * default functions can be removed.
 *
 * When run the pipeline will call each function in turn, passing a token, the
 * index of that token in the original list of all tokens and finally a list of
 * all the original tokens.
 *
 * The output of functions in the pipeline will be passed to the next function
 * in the pipeline. To exclude a token from entering the index the function
 * should return undefined, the rest of the pipeline will not be called with
 * this token.
 *
 * For serialisation of pipelines to work, all functions used in an instance of
 * a pipeline should be registered with lunr.Pipeline. Registered functions can
 * then be loaded. If trying to load a serialised pipeline that uses functions
 * that are not registered an error will be thrown.
 *
 * If not planning on serialising the pipeline then registering pipeline functions
 * is not necessary.
 *
 * @constructor
 */ lunr.Pipeline = function() {
        this._stack = [];
    };
    lunr.Pipeline.registeredFunctions = Object.create(null);
    /**
 * A pipeline function maps lunr.Token to lunr.Token. A lunr.Token contains the token
 * string as well as all known metadata. A pipeline function can mutate the token string
 * or mutate (or add) metadata for a given token.
 *
 * A pipeline function can indicate that the passed token should be discarded by returning
 * null, undefined or an empty string. This token will not be passed to any downstream pipeline
 * functions and will not be added to the index.
 *
 * Multiple tokens can be returned by returning an array of tokens. Each token will be passed
 * to any downstream pipeline functions and all will returned tokens will be added to the index.
 *
 * Any number of pipeline functions may be chained together using a lunr.Pipeline.
 *
 * @interface lunr.PipelineFunction
 * @param {lunr.Token} token - A token from the document being processed.
 * @param {number} i - The index of this token in the complete list of tokens for this document/field.
 * @param {lunr.Token[]} tokens - All tokens for this document/field.
 * @returns {(?lunr.Token|lunr.Token[])}
 */ /**
 * Register a function with the pipeline.
 *
 * Functions that are used in the pipeline should be registered if the pipeline
 * needs to be serialised, or a serialised pipeline needs to be loaded.
 *
 * Registering a function does not add it to a pipeline, functions must still be
 * added to instances of the pipeline for them to be used when running a pipeline.
 *
 * @param {lunr.PipelineFunction} fn - The function to check for.
 * @param {String} label - The label to register this function with
 */ lunr.Pipeline.registerFunction = function(fn, label) {
        if (label in this.registeredFunctions) lunr.utils.warn("Overwriting existing registered function: " + label);
        fn.label = label;
        lunr.Pipeline.registeredFunctions[fn.label] = fn;
    };
    /**
 * Warns if the function is not registered as a Pipeline function.
 *
 * @param {lunr.PipelineFunction} fn - The function to check for.
 * @private
 */ lunr.Pipeline.warnIfFunctionNotRegistered = function(fn) {
        var isRegistered = fn.label && fn.label in this.registeredFunctions;
        if (!isRegistered) lunr.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n", fn);
    };
    /**
 * Loads a previously serialised pipeline.
 *
 * All functions to be loaded must already be registered with lunr.Pipeline.
 * If any function from the serialised data has not been registered then an
 * error will be thrown.
 *
 * @param {Object} serialised - The serialised pipeline to load.
 * @returns {lunr.Pipeline}
 */ lunr.Pipeline.load = function(serialised) {
        var pipeline = new lunr.Pipeline;
        serialised.forEach(function(fnName) {
            var fn = lunr.Pipeline.registeredFunctions[fnName];
            if (fn) pipeline.add(fn);
            else throw new Error("Cannot load unregistered function: " + fnName);
        });
        return pipeline;
    };
    /**
 * Adds new functions to the end of the pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {lunr.PipelineFunction[]} functions - Any number of functions to add to the pipeline.
 */ lunr.Pipeline.prototype.add = function() {
        var fns = Array.prototype.slice.call(arguments);
        fns.forEach(function(fn) {
            lunr.Pipeline.warnIfFunctionNotRegistered(fn);
            this._stack.push(fn);
        }, this);
    };
    /**
 * Adds a single function after a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {lunr.PipelineFunction} existingFn - A function that already exists in the pipeline.
 * @param {lunr.PipelineFunction} newFn - The new function to add to the pipeline.
 */ lunr.Pipeline.prototype.after = function(existingFn, newFn) {
        lunr.Pipeline.warnIfFunctionNotRegistered(newFn);
        var pos = this._stack.indexOf(existingFn);
        if (pos == -1) throw new Error("Cannot find existingFn");
        pos = pos + 1;
        this._stack.splice(pos, 0, newFn);
    };
    /**
 * Adds a single function before a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {lunr.PipelineFunction} existingFn - A function that already exists in the pipeline.
 * @param {lunr.PipelineFunction} newFn - The new function to add to the pipeline.
 */ lunr.Pipeline.prototype.before = function(existingFn, newFn) {
        lunr.Pipeline.warnIfFunctionNotRegistered(newFn);
        var pos = this._stack.indexOf(existingFn);
        if (pos == -1) throw new Error("Cannot find existingFn");
        this._stack.splice(pos, 0, newFn);
    };
    /**
 * Removes a function from the pipeline.
 *
 * @param {lunr.PipelineFunction} fn The function to remove from the pipeline.
 */ lunr.Pipeline.prototype.remove = function(fn) {
        var pos = this._stack.indexOf(fn);
        if (pos == -1) return;
        this._stack.splice(pos, 1);
    };
    /**
 * Runs the current list of functions that make up the pipeline against the
 * passed tokens.
 *
 * @param {Array} tokens The tokens to run through the pipeline.
 * @returns {Array}
 */ lunr.Pipeline.prototype.run = function(tokens) {
        var stackLength = this._stack.length;
        for(var i = 0; i < stackLength; i++){
            var fn = this._stack[i];
            var memo = [];
            for(var j = 0; j < tokens.length; j++){
                var result = fn(tokens[j], j, tokens);
                if (result === null || result === void 0 || result === "") continue;
                if (Array.isArray(result)) for(var k = 0; k < result.length; k++)memo.push(result[k]);
                else memo.push(result);
            }
            tokens = memo;
        }
        return tokens;
    };
    /**
 * Convenience method for passing a string through a pipeline and getting
 * strings out. This method takes care of wrapping the passed string in a
 * token and mapping the resulting tokens back to strings.
 *
 * @param {string} str - The string to pass through the pipeline.
 * @param {?object} metadata - Optional metadata to associate with the token
 * passed to the pipeline.
 * @returns {string[]}
 */ lunr.Pipeline.prototype.runString = function(str, metadata) {
        var token = new lunr.Token(str, metadata);
        return this.run([
            token
        ]).map(function(t) {
            return t.toString();
        });
    };
    /**
 * Resets the pipeline by removing any existing processors.
 *
 */ lunr.Pipeline.prototype.reset = function() {
        this._stack = [];
    };
    /**
 * Returns a representation of the pipeline ready for serialisation.
 *
 * Logs a warning if the function has not been registered.
 *
 * @returns {Array}
 */ lunr.Pipeline.prototype.toJSON = function() {
        return this._stack.map(function(fn) {
            lunr.Pipeline.warnIfFunctionNotRegistered(fn);
            return fn.label;
        });
    };
    /*!
 * lunr.Vector
 * Copyright (C) 2020 Oliver Nightingale
 */ /**
 * A vector is used to construct the vector space of documents and queries. These
 * vectors support operations to determine the similarity between two documents or
 * a document and a query.
 *
 * Normally no parameters are required for initializing a vector, but in the case of
 * loading a previously dumped vector the raw elements can be provided to the constructor.
 *
 * For performance reasons vectors are implemented with a flat array, where an elements
 * index is immediately followed by its value. E.g. [index, value, index, value]. This
 * allows the underlying array to be as sparse as possible and still offer decent
 * performance when being used for vector calculations.
 *
 * @constructor
 * @param {Number[]} [elements] - The flat list of element index and element value pairs.
 */ lunr.Vector = function(elements) {
        this._magnitude = 0;
        this.elements = elements || [];
    };
    /**
 * Calculates the position within the vector to insert a given index.
 *
 * This is used internally by insert and upsert. If there are duplicate indexes then
 * the position is returned as if the value for that index were to be updated, but it
 * is the callers responsibility to check whether there is a duplicate at that index
 *
 * @param {Number} insertIdx - The index at which the element should be inserted.
 * @returns {Number}
 */ lunr.Vector.prototype.positionForIndex = function(index) {
        // For an empty vector the tuple can be inserted at the beginning
        if (this.elements.length == 0) return 0;
        var start = 0, end = this.elements.length / 2, sliceLength = end - start, pivotPoint = Math.floor(sliceLength / 2), pivotIndex = this.elements[pivotPoint * 2];
        while(sliceLength > 1){
            if (pivotIndex < index) start = pivotPoint;
            if (pivotIndex > index) end = pivotPoint;
            if (pivotIndex == index) break;
            sliceLength = end - start;
            pivotPoint = start + Math.floor(sliceLength / 2);
            pivotIndex = this.elements[pivotPoint * 2];
        }
        if (pivotIndex == index) return pivotPoint * 2;
        if (pivotIndex > index) return pivotPoint * 2;
        if (pivotIndex < index) return (pivotPoint + 1) * 2;
    };
    /**
 * Inserts an element at an index within the vector.
 *
 * Does not allow duplicates, will throw an error if there is already an entry
 * for this index.
 *
 * @param {Number} insertIdx - The index at which the element should be inserted.
 * @param {Number} val - The value to be inserted into the vector.
 */ lunr.Vector.prototype.insert = function(insertIdx, val) {
        this.upsert(insertIdx, val, function() {
            throw "duplicate index";
        });
    };
    /**
 * Inserts or updates an existing index within the vector.
 *
 * @param {Number} insertIdx - The index at which the element should be inserted.
 * @param {Number} val - The value to be inserted into the vector.
 * @param {function} fn - A function that is called for updates, the existing value and the
 * requested value are passed as arguments
 */ lunr.Vector.prototype.upsert = function(insertIdx, val, fn) {
        this._magnitude = 0;
        var position = this.positionForIndex(insertIdx);
        if (this.elements[position] == insertIdx) this.elements[position + 1] = fn(this.elements[position + 1], val);
        else this.elements.splice(position, 0, insertIdx, val);
    };
    /**
 * Calculates the magnitude of this vector.
 *
 * @returns {Number}
 */ lunr.Vector.prototype.magnitude = function() {
        if (this._magnitude) return this._magnitude;
        var sumOfSquares = 0, elementsLength = this.elements.length;
        for(var i = 1; i < elementsLength; i += 2){
            var val = this.elements[i];
            sumOfSquares += val * val;
        }
        return this._magnitude = Math.sqrt(sumOfSquares);
    };
    /**
 * Calculates the dot product of this vector and another vector.
 *
 * @param {lunr.Vector} otherVector - The vector to compute the dot product with.
 * @returns {Number}
 */ lunr.Vector.prototype.dot = function(otherVector) {
        var dotProduct = 0, a = this.elements, b = otherVector.elements, aLen = a.length, bLen = b.length, aVal = 0, bVal = 0, i = 0, j = 0;
        while(i < aLen && j < bLen){
            aVal = a[i], bVal = b[j];
            if (aVal < bVal) i += 2;
            else if (aVal > bVal) j += 2;
            else if (aVal == bVal) {
                dotProduct += a[i + 1] * b[j + 1];
                i += 2;
                j += 2;
            }
        }
        return dotProduct;
    };
    /**
 * Calculates the similarity between this vector and another vector.
 *
 * @param {lunr.Vector} otherVector - The other vector to calculate the
 * similarity with.
 * @returns {Number}
 */ lunr.Vector.prototype.similarity = function(otherVector) {
        return this.dot(otherVector) / this.magnitude() || 0;
    };
    /**
 * Converts the vector to an array of the elements within the vector.
 *
 * @returns {Number[]}
 */ lunr.Vector.prototype.toArray = function() {
        var output = new Array(this.elements.length / 2);
        for(var i = 1, j = 0; i < this.elements.length; i += 2, j++)output[j] = this.elements[i];
        return output;
    };
    /**
 * A JSON serializable representation of the vector.
 *
 * @returns {Number[]}
 */ lunr.Vector.prototype.toJSON = function() {
        return this.elements;
    };
    /* eslint-disable */ /*!
 * lunr.stemmer
 * Copyright (C) 2020 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */ /**
 * lunr.stemmer is an english language stemmer, this is a JavaScript
 * implementation of the PorterStemmer taken from http://tartarus.org/~martin
 *
 * @static
 * @implements {lunr.PipelineFunction}
 * @param {lunr.Token} token - The string to stem
 * @returns {lunr.Token}
 * @see {@link lunr.Pipeline}
 * @function
 */ lunr.stemmer = function() {
        var step2list = {
            "ational": "ate",
            "tional": "tion",
            "enci": "ence",
            "anci": "ance",
            "izer": "ize",
            "bli": "ble",
            "alli": "al",
            "entli": "ent",
            "eli": "e",
            "ousli": "ous",
            "ization": "ize",
            "ation": "ate",
            "ator": "ate",
            "alism": "al",
            "iveness": "ive",
            "fulness": "ful",
            "ousness": "ous",
            "aliti": "al",
            "iviti": "ive",
            "biliti": "ble",
            "logi": "log"
        }, step3list = {
            "icate": "ic",
            "ative": "",
            "alize": "al",
            "iciti": "ic",
            "ical": "ic",
            "ful": "",
            "ness": ""
        }, c = "[^aeiou]", v = "[aeiouy]", C = c + "[^aeiouy]*", V = v + "[aeiou]*", mgr0 = "^(" + C + ")?" + V + C, meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$", mgr1 = "^(" + C + ")?" + V + C + V + C, s_v = "^(" + C + ")?" + v; // vowel in stem
        var re_mgr0 = new RegExp(mgr0);
        var re_mgr1 = new RegExp(mgr1);
        var re_meq1 = new RegExp(meq1);
        var re_s_v = new RegExp(s_v);
        var re_1a = /^(.+?)(ss|i)es$/;
        var re2_1a = /^(.+?)([^s])s$/;
        var re_1b = /^(.+?)eed$/;
        var re2_1b = /^(.+?)(ed|ing)$/;
        var re_1b_2 = /.$/;
        var re2_1b_2 = /(at|bl|iz)$/;
        var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
        var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");
        var re_1c = /^(.+?[^aeiou])y$/;
        var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
        var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
        var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
        var re2_4 = /^(.+?)(s|t)(ion)$/;
        var re_5 = /^(.+?)e$/;
        var re_5_1 = /ll$/;
        var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");
        var porterStemmer = function porterStemmer(w) {
            var stem, suffix, firstch, re, re2, re3, re4;
            if (w.length < 3) return w;
            firstch = w.substr(0, 1);
            if (firstch == "y") w = firstch.toUpperCase() + w.substr(1);
            // Step 1a
            re = re_1a;
            re2 = re2_1a;
            if (re.test(w)) w = w.replace(re, "$1$2");
            else if (re2.test(w)) w = w.replace(re2, "$1$2");
            // Step 1b
            re = re_1b;
            re2 = re2_1b;
            if (re.test(w)) {
                var fp = re.exec(w);
                re = re_mgr0;
                if (re.test(fp[1])) {
                    re = re_1b_2;
                    w = w.replace(re, "");
                }
            } else if (re2.test(w)) {
                var fp = re2.exec(w);
                stem = fp[1];
                re2 = re_s_v;
                if (re2.test(stem)) {
                    w = stem;
                    re2 = re2_1b_2;
                    re3 = re3_1b_2;
                    re4 = re4_1b_2;
                    if (re2.test(w)) w = w + "e";
                    else if (re3.test(w)) {
                        re = re_1b_2;
                        w = w.replace(re, "");
                    } else if (re4.test(w)) w = w + "e";
                }
            }
            // Step 1c - replace suffix y or Y by i if preceded by a non-vowel which is not the first letter of the word (so cry -> cri, by -> by, say -> say)
            re = re_1c;
            if (re.test(w)) {
                var fp = re.exec(w);
                stem = fp[1];
                w = stem + "i";
            }
            // Step 2
            re = re_2;
            if (re.test(w)) {
                var fp = re.exec(w);
                stem = fp[1];
                suffix = fp[2];
                re = re_mgr0;
                if (re.test(stem)) w = stem + step2list[suffix];
            }
            // Step 3
            re = re_3;
            if (re.test(w)) {
                var fp = re.exec(w);
                stem = fp[1];
                suffix = fp[2];
                re = re_mgr0;
                if (re.test(stem)) w = stem + step3list[suffix];
            }
            // Step 4
            re = re_4;
            re2 = re2_4;
            if (re.test(w)) {
                var fp = re.exec(w);
                stem = fp[1];
                re = re_mgr1;
                if (re.test(stem)) w = stem;
            } else if (re2.test(w)) {
                var fp = re2.exec(w);
                stem = fp[1] + fp[2];
                re2 = re_mgr1;
                if (re2.test(stem)) w = stem;
            }
            // Step 5
            re = re_5;
            if (re.test(w)) {
                var fp = re.exec(w);
                stem = fp[1];
                re = re_mgr1;
                re2 = re_meq1;
                re3 = re3_5;
                if (re.test(stem) || re2.test(stem) && !re3.test(stem)) w = stem;
            }
            re = re_5_1;
            re2 = re_mgr1;
            if (re.test(w) && re2.test(w)) {
                re = re_1b_2;
                w = w.replace(re, "");
            }
            // and turn initial Y back to y
            if (firstch == "y") w = firstch.toLowerCase() + w.substr(1);
            return w;
        };
        return function(token) {
            return token.update(porterStemmer);
        };
    }();
    lunr.Pipeline.registerFunction(lunr.stemmer, "stemmer");
    /*!
 * lunr.stopWordFilter
 * Copyright (C) 2020 Oliver Nightingale
 */ /**
 * lunr.generateStopWordFilter builds a stopWordFilter function from the provided
 * list of stop words.
 *
 * The built in lunr.stopWordFilter is built using this generator and can be used
 * to generate custom stopWordFilters for applications or non English languages.
 *
 * @function
 * @param {Array} token The token to pass through the filter
 * @returns {lunr.PipelineFunction}
 * @see lunr.Pipeline
 * @see lunr.stopWordFilter
 */ lunr.generateStopWordFilter = function(stopWords) {
        var words = stopWords.reduce(function(memo, stopWord) {
            memo[stopWord] = stopWord;
            return memo;
        }, {});
        return function(token) {
            if (token && words[token.toString()] !== token.toString()) return token;
        };
    };
    /**
 * lunr.stopWordFilter is an English language stop word list filter, any words
 * contained in the list will not be passed through the filter.
 *
 * This is intended to be used in the Pipeline. If the token does not pass the
 * filter then undefined will be returned.
 *
 * @function
 * @implements {lunr.PipelineFunction}
 * @params {lunr.Token} token - A token to check for being a stop word.
 * @returns {lunr.Token}
 * @see {@link lunr.Pipeline}
 */ lunr.stopWordFilter = lunr.generateStopWordFilter([
        "a",
        "able",
        "about",
        "across",
        "after",
        "all",
        "almost",
        "also",
        "am",
        "among",
        "an",
        "and",
        "any",
        "are",
        "as",
        "at",
        "be",
        "because",
        "been",
        "but",
        "by",
        "can",
        "cannot",
        "could",
        "dear",
        "did",
        "do",
        "does",
        "either",
        "else",
        "ever",
        "every",
        "for",
        "from",
        "get",
        "got",
        "had",
        "has",
        "have",
        "he",
        "her",
        "hers",
        "him",
        "his",
        "how",
        "however",
        "i",
        "if",
        "in",
        "into",
        "is",
        "it",
        "its",
        "just",
        "least",
        "let",
        "like",
        "likely",
        "may",
        "me",
        "might",
        "most",
        "must",
        "my",
        "neither",
        "no",
        "nor",
        "not",
        "of",
        "off",
        "often",
        "on",
        "only",
        "or",
        "other",
        "our",
        "own",
        "rather",
        "said",
        "say",
        "says",
        "she",
        "should",
        "since",
        "so",
        "some",
        "than",
        "that",
        "the",
        "their",
        "them",
        "then",
        "there",
        "these",
        "they",
        "this",
        "tis",
        "to",
        "too",
        "twas",
        "us",
        "wants",
        "was",
        "we",
        "were",
        "what",
        "when",
        "where",
        "which",
        "while",
        "who",
        "whom",
        "why",
        "will",
        "with",
        "would",
        "yet",
        "you",
        "your"
    ]);
    lunr.Pipeline.registerFunction(lunr.stopWordFilter, "stopWordFilter");
    /*!
 * lunr.trimmer
 * Copyright (C) 2020 Oliver Nightingale
 */ /**
 * lunr.trimmer is a pipeline function for trimming non word
 * characters from the beginning and end of tokens before they
 * enter the index.
 *
 * This implementation may not work correctly for non latin
 * characters and should either be removed or adapted for use
 * with languages with non-latin characters.
 *
 * @static
 * @implements {lunr.PipelineFunction}
 * @param {lunr.Token} token The token to pass through the filter
 * @returns {lunr.Token}
 * @see lunr.Pipeline
 */ lunr.trimmer = function(token) {
        return token.update(function(s) {
            return s.replace(/^\W+/, "").replace(/\W+$/, "");
        });
    };
    lunr.Pipeline.registerFunction(lunr.trimmer, "trimmer");
    /*!
 * lunr.TokenSet
 * Copyright (C) 2020 Oliver Nightingale
 */ /**
 * A token set is used to store the unique list of all tokens
 * within an index. Token sets are also used to represent an
 * incoming query to the index, this query token set and index
 * token set are then intersected to find which tokens to look
 * up in the inverted index.
 *
 * A token set can hold multiple tokens, as in the case of the
 * index token set, or it can hold a single token as in the
 * case of a simple query token set.
 *
 * Additionally token sets are used to perform wildcard matching.
 * Leading, contained and trailing wildcards are supported, and
 * from this edit distance matching can also be provided.
 *
 * Token sets are implemented as a minimal finite state automata,
 * where both common prefixes and suffixes are shared between tokens.
 * This helps to reduce the space used for storing the token set.
 *
 * @constructor
 */ lunr.TokenSet = function() {
        this.final = false;
        this.edges = {};
        this.id = lunr.TokenSet._nextId;
        lunr.TokenSet._nextId += 1;
    };
    /**
 * Keeps track of the next, auto increment, identifier to assign
 * to a new tokenSet.
 *
 * TokenSets require a unique identifier to be correctly minimised.
 *
 * @private
 */ lunr.TokenSet._nextId = 1;
    /**
 * Creates a TokenSet instance from the given sorted array of words.
 *
 * @param {String[]} arr - A sorted array of strings to create the set from.
 * @returns {lunr.TokenSet}
 * @throws Will throw an error if the input array is not sorted.
 */ lunr.TokenSet.fromArray = function(arr) {
        var builder = new lunr.TokenSet.Builder;
        for(var i = 0, len = arr.length; i < len; i++)builder.insert(arr[i]);
        builder.finish();
        return builder.root;
    };
    /**
 * Creates a token set from a query clause.
 *
 * @private
 * @param {Object} clause - A single clause from lunr.Query.
 * @param {string} clause.term - The query clause term.
 * @param {number} [clause.editDistance] - The optional edit distance for the term.
 * @returns {lunr.TokenSet}
 */ lunr.TokenSet.fromClause = function(clause) {
        if ("editDistance" in clause) return lunr.TokenSet.fromFuzzyString(clause.term, clause.editDistance);
        else return lunr.TokenSet.fromString(clause.term);
    };
    /**
 * Creates a token set representing a single string with a specified
 * edit distance.
 *
 * Insertions, deletions, substitutions and transpositions are each
 * treated as an edit distance of 1.
 *
 * Increasing the allowed edit distance will have a dramatic impact
 * on the performance of both creating and intersecting these TokenSets.
 * It is advised to keep the edit distance less than 3.
 *
 * @param {string} str - The string to create the token set from.
 * @param {number} editDistance - The allowed edit distance to match.
 * @returns {lunr.Vector}
 */ lunr.TokenSet.fromFuzzyString = function(str, editDistance) {
        var root = new lunr.TokenSet;
        var stack = [
            {
                node: root,
                editsRemaining: editDistance,
                str: str
            }
        ];
        while(stack.length){
            var frame = stack.pop();
            // no edit
            if (frame.str.length > 0) {
                var char = frame.str.charAt(0), noEditNode;
                if (char in frame.node.edges) noEditNode = frame.node.edges[char];
                else {
                    noEditNode = new lunr.TokenSet;
                    frame.node.edges[char] = noEditNode;
                }
                if (frame.str.length == 1) noEditNode.final = true;
                stack.push({
                    node: noEditNode,
                    editsRemaining: frame.editsRemaining,
                    str: frame.str.slice(1)
                });
            }
            if (frame.editsRemaining == 0) continue;
            // insertion
            if ("*" in frame.node.edges) var insertionNode = frame.node.edges["*"];
            else {
                var insertionNode = new lunr.TokenSet;
                frame.node.edges["*"] = insertionNode;
            }
            if (frame.str.length == 0) insertionNode.final = true;
            stack.push({
                node: insertionNode,
                editsRemaining: frame.editsRemaining - 1,
                str: frame.str
            });
            // deletion
            // can only do a deletion if we have enough edits remaining
            // and if there are characters left to delete in the string
            if (frame.str.length > 1) stack.push({
                node: frame.node,
                editsRemaining: frame.editsRemaining - 1,
                str: frame.str.slice(1)
            });
            // deletion
            // just removing the last character from the str
            if (frame.str.length == 1) frame.node.final = true;
            // substitution
            // can only do a substitution if we have enough edits remaining
            // and if there are characters left to substitute
            if (frame.str.length >= 1) {
                if ("*" in frame.node.edges) var substitutionNode = frame.node.edges["*"];
                else {
                    var substitutionNode = new lunr.TokenSet;
                    frame.node.edges["*"] = substitutionNode;
                }
                if (frame.str.length == 1) substitutionNode.final = true;
                stack.push({
                    node: substitutionNode,
                    editsRemaining: frame.editsRemaining - 1,
                    str: frame.str.slice(1)
                });
            }
            // transposition
            // can only do a transposition if there are edits remaining
            // and there are enough characters to transpose
            if (frame.str.length > 1) {
                var charA = frame.str.charAt(0), charB = frame.str.charAt(1), transposeNode;
                if (charB in frame.node.edges) transposeNode = frame.node.edges[charB];
                else {
                    transposeNode = new lunr.TokenSet;
                    frame.node.edges[charB] = transposeNode;
                }
                if (frame.str.length == 1) transposeNode.final = true;
                stack.push({
                    node: transposeNode,
                    editsRemaining: frame.editsRemaining - 1,
                    str: charA + frame.str.slice(2)
                });
            }
        }
        return root;
    };
    /**
 * Creates a TokenSet from a string.
 *
 * The string may contain one or more wildcard characters (*)
 * that will allow wildcard matching when intersecting with
 * another TokenSet.
 *
 * @param {string} str - The string to create a TokenSet from.
 * @returns {lunr.TokenSet}
 */ lunr.TokenSet.fromString = function(str) {
        var node = new lunr.TokenSet, root = node;
        /*
   * Iterates through all characters within the passed string
   * appending a node for each character.
   *
   * When a wildcard character is found then a self
   * referencing edge is introduced to continually match
   * any number of any characters.
   */ for(var i = 0, len = str.length; i < len; i++){
            var char = str[i], final = i == len - 1;
            if (char == "*") {
                node.edges[char] = node;
                node.final = final;
            } else {
                var next = new lunr.TokenSet;
                next.final = final;
                node.edges[char] = next;
                node = next;
            }
        }
        return root;
    };
    /**
 * Converts this TokenSet into an array of strings
 * contained within the TokenSet.
 *
 * This is not intended to be used on a TokenSet that
 * contains wildcards, in these cases the results are
 * undefined and are likely to cause an infinite loop.
 *
 * @returns {string[]}
 */ lunr.TokenSet.prototype.toArray = function() {
        var words = [];
        var stack = [
            {
                prefix: "",
                node: this
            }
        ];
        while(stack.length){
            var frame = stack.pop(), edges = Object.keys(frame.node.edges), len = edges.length;
            if (frame.node.final) {
                /* In Safari, at this point the prefix is sometimes corrupted, see:
       * https://github.com/olivernn/lunr.js/issues/279 Calling any
       * String.prototype method forces Safari to "cast" this string to what
       * it's supposed to be, fixing the bug. */ frame.prefix.charAt(0);
                words.push(frame.prefix);
            }
            for(var i = 0; i < len; i++){
                var edge = edges[i];
                stack.push({
                    prefix: frame.prefix.concat(edge),
                    node: frame.node.edges[edge]
                });
            }
        }
        return words;
    };
    /**
 * Generates a string representation of a TokenSet.
 *
 * This is intended to allow TokenSets to be used as keys
 * in objects, largely to aid the construction and minimisation
 * of a TokenSet. As such it is not designed to be a human
 * friendly representation of the TokenSet.
 *
 * @returns {string}
 */ lunr.TokenSet.prototype.toString = function() {
        // NOTE: Using Object.keys here as this.edges is very likely
        // to enter 'hash-mode' with many keys being added
        //
        // avoiding a for-in loop here as it leads to the function
        // being de-optimised (at least in V8). From some simple
        // benchmarks the performance is comparable, but allowing
        // V8 to optimize may mean easy performance wins in the future.
        if (this._str) return this._str;
        var str = this.final ? "1" : "0", labels = Object.keys(this.edges).sort(), len = labels.length;
        for(var i = 0; i < len; i++){
            var label = labels[i], node = this.edges[label];
            str = str + label + node.id;
        }
        return str;
    };
    /**
 * Returns a new TokenSet that is the intersection of
 * this TokenSet and the passed TokenSet.
 *
 * This intersection will take into account any wildcards
 * contained within the TokenSet.
 *
 * @param {lunr.TokenSet} b - An other TokenSet to intersect with.
 * @returns {lunr.TokenSet}
 */ lunr.TokenSet.prototype.intersect = function(b) {
        var output = new lunr.TokenSet, frame = undefined;
        var stack = [
            {
                qNode: b,
                output: output,
                node: this
            }
        ];
        while(stack.length){
            frame = stack.pop();
            // NOTE: As with the #toString method, we are using
            // Object.keys and a for loop instead of a for-in loop
            // as both of these objects enter 'hash' mode, causing
            // the function to be de-optimised in V8
            var qEdges = Object.keys(frame.qNode.edges), qLen = qEdges.length, nEdges = Object.keys(frame.node.edges), nLen = nEdges.length;
            for(var q = 0; q < qLen; q++){
                var qEdge = qEdges[q];
                for(var n = 0; n < nLen; n++){
                    var nEdge = nEdges[n];
                    if (nEdge == qEdge || qEdge == "*") {
                        var node = frame.node.edges[nEdge], qNode = frame.qNode.edges[qEdge], final = node.final && qNode.final, next = undefined;
                        if (nEdge in frame.output.edges) {
                            // an edge already exists for this character
                            // no need to create a new node, just set the finality
                            // bit unless this node is already final
                            next = frame.output.edges[nEdge];
                            next.final = next.final || final;
                        } else {
                            // no edge exists yet, must create one
                            // set the finality bit and insert it
                            // into the output
                            next = new lunr.TokenSet;
                            next.final = final;
                            frame.output.edges[nEdge] = next;
                        }
                        stack.push({
                            qNode: qNode,
                            output: next,
                            node: node
                        });
                    }
                }
            }
        }
        return output;
    };
    lunr.TokenSet.Builder = function() {
        this.previousWord = "";
        this.root = new lunr.TokenSet;
        this.uncheckedNodes = [];
        this.minimizedNodes = {};
    };
    lunr.TokenSet.Builder.prototype.insert = function(word) {
        var node, commonPrefix = 0;
        if (word < this.previousWord) throw new Error("Out of order word insertion");
        for(var i = 0; i < word.length && i < this.previousWord.length; i++){
            if (word[i] != this.previousWord[i]) break;
            commonPrefix++;
        }
        this.minimize(commonPrefix);
        if (this.uncheckedNodes.length == 0) node = this.root;
        else node = this.uncheckedNodes[this.uncheckedNodes.length - 1].child;
        for(var i = commonPrefix; i < word.length; i++){
            var nextNode = new lunr.TokenSet, char = word[i];
            node.edges[char] = nextNode;
            this.uncheckedNodes.push({
                parent: node,
                char: char,
                child: nextNode
            });
            node = nextNode;
        }
        node.final = true;
        this.previousWord = word;
    };
    lunr.TokenSet.Builder.prototype.finish = function() {
        this.minimize(0);
    };
    lunr.TokenSet.Builder.prototype.minimize = function(downTo) {
        for(var i = this.uncheckedNodes.length - 1; i >= downTo; i--){
            var node = this.uncheckedNodes[i], childKey = node.child.toString();
            if (childKey in this.minimizedNodes) node.parent.edges[node.char] = this.minimizedNodes[childKey];
            else {
                // Cache the key for this node since
                // we know it can't change anymore
                node.child._str = childKey;
                this.minimizedNodes[childKey] = node.child;
            }
            this.uncheckedNodes.pop();
        }
    };
    /*!
 * lunr.Index
 * Copyright (C) 2020 Oliver Nightingale
 */ /**
 * An index contains the built index of all documents and provides a query interface
 * to the index.
 *
 * Usually instances of lunr.Index will not be created using this constructor, instead
 * lunr.Builder should be used to construct new indexes, or lunr.Index.load should be
 * used to load previously built and serialized indexes.
 *
 * @constructor
 * @param {Object} attrs - The attributes of the built search index.
 * @param {Object} attrs.invertedIndex - An index of term/field to document reference.
 * @param {Object<string, lunr.Vector>} attrs.fieldVectors - Field vectors
 * @param {lunr.TokenSet} attrs.tokenSet - An set of all corpus tokens.
 * @param {string[]} attrs.fields - The names of indexed document fields.
 * @param {lunr.Pipeline} attrs.pipeline - The pipeline to use for search terms.
 */ lunr.Index = function(attrs) {
        this.invertedIndex = attrs.invertedIndex;
        this.fieldVectors = attrs.fieldVectors;
        this.tokenSet = attrs.tokenSet;
        this.fields = attrs.fields;
        this.pipeline = attrs.pipeline;
    };
    /**
 * A result contains details of a document matching a search query.
 * @typedef {Object} lunr.Index~Result
 * @property {string} ref - The reference of the document this result represents.
 * @property {number} score - A number between 0 and 1 representing how similar this document is to the query.
 * @property {lunr.MatchData} matchData - Contains metadata about this match including which term(s) caused the match.
 */ /**
 * Although lunr provides the ability to create queries using lunr.Query, it also provides a simple
 * query language which itself is parsed into an instance of lunr.Query.
 *
 * For programmatically building queries it is advised to directly use lunr.Query, the query language
 * is best used for human entered text rather than program generated text.
 *
 * At its simplest queries can just be a single term, e.g. `hello`, multiple terms are also supported
 * and will be combined with OR, e.g `hello world` will match documents that contain either 'hello'
 * or 'world', though those that contain both will rank higher in the results.
 *
 * Wildcards can be included in terms to match one or more unspecified characters, these wildcards can
 * be inserted anywhere within the term, and more than one wildcard can exist in a single term. Adding
 * wildcards will increase the number of documents that will be found but can also have a negative
 * impact on query performance, especially with wildcards at the beginning of a term.
 *
 * Terms can be restricted to specific fields, e.g. `title:hello`, only documents with the term
 * hello in the title field will match this query. Using a field not present in the index will lead
 * to an error being thrown.
 *
 * Modifiers can also be added to terms, lunr supports edit distance and boost modifiers on terms. A term
 * boost will make documents matching that term score higher, e.g. `foo^5`. Edit distance is also supported
 * to provide fuzzy matching, e.g. 'hello~2' will match documents with hello with an edit distance of 2.
 * Avoid large values for edit distance to improve query performance.
 *
 * Each term also supports a presence modifier. By default a term's presence in document is optional, however
 * this can be changed to either required or prohibited. For a term's presence to be required in a document the
 * term should be prefixed with a '+', e.g. `+foo bar` is a search for documents that must contain 'foo' and
 * optionally contain 'bar'. Conversely a leading '-' sets the terms presence to prohibited, i.e. it must not
 * appear in a document, e.g. `-foo bar` is a search for documents that do not contain 'foo' but may contain 'bar'.
 *
 * To escape special characters the backslash character '\' can be used, this allows searches to include
 * characters that would normally be considered modifiers, e.g. `foo\~2` will search for a term "foo~2" instead
 * of attempting to apply a boost of 2 to the search term "foo".
 *
 * @typedef {string} lunr.Index~QueryString
 * @example <caption>Simple single term query</caption>
 * hello
 * @example <caption>Multiple term query</caption>
 * hello world
 * @example <caption>term scoped to a field</caption>
 * title:hello
 * @example <caption>term with a boost of 10</caption>
 * hello^10
 * @example <caption>term with an edit distance of 2</caption>
 * hello~2
 * @example <caption>terms with presence modifiers</caption>
 * -foo +bar baz
 */ /**
 * Performs a search against the index using lunr query syntax.
 *
 * Results will be returned sorted by their score, the most relevant results
 * will be returned first.  For details on how the score is calculated, please see
 * the {@link https://lunrjs.com/guides/searching.html#scoring|guide}.
 *
 * For more programmatic querying use lunr.Index#query.
 *
 * @param {lunr.Index~QueryString} queryString - A string containing a lunr query.
 * @throws {lunr.QueryParseError} If the passed query string cannot be parsed.
 * @returns {lunr.Index~Result[]}
 */ lunr.Index.prototype.search = function(queryString) {
        return this.query(function(query) {
            var parser = new lunr.QueryParser(queryString, query);
            parser.parse();
        });
    };
    /**
 * A query builder callback provides a query object to be used to express
 * the query to perform on the index.
 *
 * @callback lunr.Index~queryBuilder
 * @param {lunr.Query} query - The query object to build up.
 * @this lunr.Query
 */ /**
 * Performs a query against the index using the yielded lunr.Query object.
 *
 * If performing programmatic queries against the index, this method is preferred
 * over lunr.Index#search so as to avoid the additional query parsing overhead.
 *
 * A query object is yielded to the supplied function which should be used to
 * express the query to be run against the index.
 *
 * Note that although this function takes a callback parameter it is _not_ an
 * asynchronous operation, the callback is just yielded a query object to be
 * customized.
 *
 * @param {lunr.Index~queryBuilder} fn - A function that is used to build the query.
 * @returns {lunr.Index~Result[]}
 */ lunr.Index.prototype.query = function(fn) {
        // for each query clause
        // * process terms
        // * expand terms from token set
        // * find matching documents and metadata
        // * get document vectors
        // * score documents
        var query = new lunr.Query(this.fields), matchingFields = Object.create(null), queryVectors = Object.create(null), termFieldCache = Object.create(null), requiredMatches = Object.create(null), prohibitedMatches = Object.create(null);
        /*
   * To support field level boosts a query vector is created per
   * field. An empty vector is eagerly created to support negated
   * queries.
   */ for(var i = 0; i < this.fields.length; i++)queryVectors[this.fields[i]] = new lunr.Vector;
        fn.call(query, query);
        for(var i = 0; i < query.clauses.length; i++){
            /*
     * Unless the pipeline has been disabled for this term, which is
     * the case for terms with wildcards, we need to pass the clause
     * term through the search pipeline. A pipeline returns an array
     * of processed terms. Pipeline functions may expand the passed
     * term, which means we may end up performing multiple index lookups
     * for a single query term.
     */ var clause = query.clauses[i], terms = null, clauseMatches = lunr.Set.empty;
            if (clause.usePipeline) terms = this.pipeline.runString(clause.term, {
                fields: clause.fields
            });
            else terms = [
                clause.term
            ];
            for(var m = 0; m < terms.length; m++){
                var term = terms[m];
                /*
       * Each term returned from the pipeline needs to use the same query
       * clause object, e.g. the same boost and or edit distance. The
       * simplest way to do this is to re-use the clause object but mutate
       * its term property.
       */ clause.term = term;
                /*
       * From the term in the clause we create a token set which will then
       * be used to intersect the indexes token set to get a list of terms
       * to lookup in the inverted index
       */ var termTokenSet = lunr.TokenSet.fromClause(clause), expandedTerms = this.tokenSet.intersect(termTokenSet).toArray();
                /*
       * If a term marked as required does not exist in the tokenSet it is
       * impossible for the search to return any matches. We set all the field
       * scoped required matches set to empty and stop examining any further
       * clauses.
       */ if (expandedTerms.length === 0 && clause.presence === lunr.Query.presence.REQUIRED) {
                    for(var k = 0; k < clause.fields.length; k++){
                        var field = clause.fields[k];
                        requiredMatches[field] = lunr.Set.empty;
                    }
                    break;
                }
                for(var j = 0; j < expandedTerms.length; j++){
                    /*
         * For each term get the posting and termIndex, this is required for
         * building the query vector.
         */ var expandedTerm = expandedTerms[j], posting = this.invertedIndex[expandedTerm], termIndex = posting._index;
                    for(var k = 0; k < clause.fields.length; k++){
                        /*
           * For each field that this query term is scoped by (by default
           * all fields are in scope) we need to get all the document refs
           * that have this term in that field.
           *
           * The posting is the entry in the invertedIndex for the matching
           * term from above.
           */ var field = clause.fields[k], fieldPosting = posting[field], matchingDocumentRefs = Object.keys(fieldPosting), termField = expandedTerm + "/" + field, matchingDocumentsSet = new lunr.Set(matchingDocumentRefs);
                        /*
           * if the presence of this term is required ensure that the matching
           * documents are added to the set of required matches for this clause.
           *
           */ if (clause.presence == lunr.Query.presence.REQUIRED) {
                            clauseMatches = clauseMatches.union(matchingDocumentsSet);
                            if (requiredMatches[field] === undefined) requiredMatches[field] = lunr.Set.complete;
                        }
                        /*
           * if the presence of this term is prohibited ensure that the matching
           * documents are added to the set of prohibited matches for this field,
           * creating that set if it does not yet exist.
           */ if (clause.presence == lunr.Query.presence.PROHIBITED) {
                            if (prohibitedMatches[field] === undefined) prohibitedMatches[field] = lunr.Set.empty;
                            prohibitedMatches[field] = prohibitedMatches[field].union(matchingDocumentsSet);
                            continue;
                        }
                        /*
           * The query field vector is populated using the termIndex found for
           * the term and a unit value with the appropriate boost applied.
           * Using upsert because there could already be an entry in the vector
           * for the term we are working with. In that case we just add the scores
           * together.
           */ queryVectors[field].upsert(termIndex, clause.boost, function(a, b) {
                            return a + b;
                        });
                        /**
           * If we've already seen this term, field combo then we've already collected
           * the matching documents and metadata, no need to go through all that again
           */ if (termFieldCache[termField]) continue;
                        for(var l = 0; l < matchingDocumentRefs.length; l++){
                            /*
             * All metadata for this term/field/document triple
             * are then extracted and collected into an instance
             * of lunr.MatchData ready to be returned in the query
             * results
             */ var matchingDocumentRef = matchingDocumentRefs[l], matchingFieldRef = new lunr.FieldRef(matchingDocumentRef, field), metadata = fieldPosting[matchingDocumentRef], fieldMatch;
                            if ((fieldMatch = matchingFields[matchingFieldRef]) === undefined) matchingFields[matchingFieldRef] = new lunr.MatchData(expandedTerm, field, metadata);
                            else fieldMatch.add(expandedTerm, field, metadata);
                        }
                        termFieldCache[termField] = true;
                    }
                }
            }
            /**
     * If the presence was required we need to update the requiredMatches field sets.
     * We do this after all fields for the term have collected their matches because
     * the clause terms presence is required in _any_ of the fields not _all_ of the
     * fields.
     */ if (clause.presence === lunr.Query.presence.REQUIRED) for(var k = 0; k < clause.fields.length; k++){
                var field = clause.fields[k];
                requiredMatches[field] = requiredMatches[field].intersect(clauseMatches);
            }
        }
        /**
   * Need to combine the field scoped required and prohibited
   * matching documents into a global set of required and prohibited
   * matches
   */ var allRequiredMatches = lunr.Set.complete, allProhibitedMatches = lunr.Set.empty;
        for(var i = 0; i < this.fields.length; i++){
            var field = this.fields[i];
            if (requiredMatches[field]) allRequiredMatches = allRequiredMatches.intersect(requiredMatches[field]);
            if (prohibitedMatches[field]) allProhibitedMatches = allProhibitedMatches.union(prohibitedMatches[field]);
        }
        var matchingFieldRefs = Object.keys(matchingFields), results = [], matches = Object.create(null);
        /*
   * If the query is negated (contains only prohibited terms)
   * we need to get _all_ fieldRefs currently existing in the
   * index. This is only done when we know that the query is
   * entirely prohibited terms to avoid any cost of getting all
   * fieldRefs unnecessarily.
   *
   * Additionally, blank MatchData must be created to correctly
   * populate the results.
   */ if (query.isNegated()) {
            matchingFieldRefs = Object.keys(this.fieldVectors);
            for(var i = 0; i < matchingFieldRefs.length; i++){
                var matchingFieldRef = matchingFieldRefs[i];
                var fieldRef = lunr.FieldRef.fromString(matchingFieldRef);
                matchingFields[matchingFieldRef] = new lunr.MatchData;
            }
        }
        for(var i = 0; i < matchingFieldRefs.length; i++){
            /*
     * Currently we have document fields that match the query, but we
     * need to return documents. The matchData and scores are combined
     * from multiple fields belonging to the same document.
     *
     * Scores are calculated by field, using the query vectors created
     * above, and combined into a final document score using addition.
     */ var fieldRef = lunr.FieldRef.fromString(matchingFieldRefs[i]), docRef = fieldRef.docRef;
            if (!allRequiredMatches.contains(docRef)) continue;
            if (allProhibitedMatches.contains(docRef)) continue;
            var fieldVector = this.fieldVectors[fieldRef], score = queryVectors[fieldRef.fieldName].similarity(fieldVector), docMatch;
            if ((docMatch = matches[docRef]) !== undefined) {
                docMatch.score += score;
                docMatch.matchData.combine(matchingFields[fieldRef]);
            } else {
                var match = {
                    ref: docRef,
                    score: score,
                    matchData: matchingFields[fieldRef]
                };
                matches[docRef] = match;
                results.push(match);
            }
        }
        /*
   * Sort the results objects by score, highest first.
   */ return results.sort(function(a, b) {
            return b.score - a.score;
        });
    };
    /**
 * Prepares the index for JSON serialization.
 *
 * The schema for this JSON blob will be described in a
 * separate JSON schema file.
 *
 * @returns {Object}
 */ lunr.Index.prototype.toJSON = function() {
        var invertedIndex = Object.keys(this.invertedIndex).sort().map(function(term) {
            return [
                term,
                this.invertedIndex[term]
            ];
        }, this);
        var fieldVectors = Object.keys(this.fieldVectors).map(function(ref) {
            return [
                ref,
                this.fieldVectors[ref].toJSON()
            ];
        }, this);
        return {
            version: lunr.version,
            fields: this.fields,
            fieldVectors: fieldVectors,
            invertedIndex: invertedIndex,
            pipeline: this.pipeline.toJSON()
        };
    };
    /**
 * Loads a previously serialized lunr.Index
 *
 * @param {Object} serializedIndex - A previously serialized lunr.Index
 * @returns {lunr.Index}
 */ lunr.Index.load = function(serializedIndex) {
        var attrs = {}, fieldVectors = {}, serializedVectors = serializedIndex.fieldVectors, invertedIndex = Object.create(null), serializedInvertedIndex = serializedIndex.invertedIndex, tokenSetBuilder = new lunr.TokenSet.Builder, pipeline = lunr.Pipeline.load(serializedIndex.pipeline);
        if (serializedIndex.version != lunr.version) lunr.utils.warn("Version mismatch when loading serialised index. Current version of lunr '" + lunr.version + "' does not match serialized index '" + serializedIndex.version + "'");
        for(var i = 0; i < serializedVectors.length; i++){
            var tuple = serializedVectors[i], ref = tuple[0], elements = tuple[1];
            fieldVectors[ref] = new lunr.Vector(elements);
        }
        for(var i = 0; i < serializedInvertedIndex.length; i++){
            var tuple = serializedInvertedIndex[i], term = tuple[0], posting = tuple[1];
            tokenSetBuilder.insert(term);
            invertedIndex[term] = posting;
        }
        tokenSetBuilder.finish();
        attrs.fields = serializedIndex.fields;
        attrs.fieldVectors = fieldVectors;
        attrs.invertedIndex = invertedIndex;
        attrs.tokenSet = tokenSetBuilder.root;
        attrs.pipeline = pipeline;
        return new lunr.Index(attrs);
    };
    /*!
 * lunr.Builder
 * Copyright (C) 2020 Oliver Nightingale
 */ /**
 * lunr.Builder performs indexing on a set of documents and
 * returns instances of lunr.Index ready for querying.
 *
 * All configuration of the index is done via the builder, the
 * fields to index, the document reference, the text processing
 * pipeline and document scoring parameters are all set on the
 * builder before indexing.
 *
 * @constructor
 * @property {string} _ref - Internal reference to the document reference field.
 * @property {string[]} _fields - Internal reference to the document fields to index.
 * @property {object} invertedIndex - The inverted index maps terms to document fields.
 * @property {object} documentTermFrequencies - Keeps track of document term frequencies.
 * @property {object} documentLengths - Keeps track of the length of documents added to the index.
 * @property {lunr.tokenizer} tokenizer - Function for splitting strings into tokens for indexing.
 * @property {lunr.Pipeline} pipeline - The pipeline performs text processing on tokens before indexing.
 * @property {lunr.Pipeline} searchPipeline - A pipeline for processing search terms before querying the index.
 * @property {number} documentCount - Keeps track of the total number of documents indexed.
 * @property {number} _b - A parameter to control field length normalization, setting this to 0 disabled normalization, 1 fully normalizes field lengths, the default value is 0.75.
 * @property {number} _k1 - A parameter to control how quickly an increase in term frequency results in term frequency saturation, the default value is 1.2.
 * @property {number} termIndex - A counter incremented for each unique term, used to identify a terms position in the vector space.
 * @property {array} metadataWhitelist - A list of metadata keys that have been whitelisted for entry in the index.
 */ lunr.Builder = function() {
        this._ref = "id";
        this._fields = Object.create(null);
        this._documents = Object.create(null);
        this.invertedIndex = Object.create(null);
        this.fieldTermFrequencies = {};
        this.fieldLengths = {};
        this.tokenizer = lunr.tokenizer;
        this.pipeline = new lunr.Pipeline;
        this.searchPipeline = new lunr.Pipeline;
        this.documentCount = 0;
        this._b = 0.75;
        this._k1 = 1.2;
        this.termIndex = 0;
        this.metadataWhitelist = [];
    };
    /**
 * Sets the document field used as the document reference. Every document must have this field.
 * The type of this field in the document should be a string, if it is not a string it will be
 * coerced into a string by calling toString.
 *
 * The default ref is 'id'.
 *
 * The ref should _not_ be changed during indexing, it should be set before any documents are
 * added to the index. Changing it during indexing can lead to inconsistent results.
 *
 * @param {string} ref - The name of the reference field in the document.
 */ lunr.Builder.prototype.ref = function(ref) {
        this._ref = ref;
    };
    /**
 * A function that is used to extract a field from a document.
 *
 * Lunr expects a field to be at the top level of a document, if however the field
 * is deeply nested within a document an extractor function can be used to extract
 * the right field for indexing.
 *
 * @callback fieldExtractor
 * @param {object} doc - The document being added to the index.
 * @returns {?(string|object|object[])} obj - The object that will be indexed for this field.
 * @example <caption>Extracting a nested field</caption>
 * function (doc) { return doc.nested.field }
 */ /**
 * Adds a field to the list of document fields that will be indexed. Every document being
 * indexed should have this field. Null values for this field in indexed documents will
 * not cause errors but will limit the chance of that document being retrieved by searches.
 *
 * All fields should be added before adding documents to the index. Adding fields after
 * a document has been indexed will have no effect on already indexed documents.
 *
 * Fields can be boosted at build time. This allows terms within that field to have more
 * importance when ranking search results. Use a field boost to specify that matches within
 * one field are more important than other fields.
 *
 * @param {string} fieldName - The name of a field to index in all documents.
 * @param {object} attributes - Optional attributes associated with this field.
 * @param {number} [attributes.boost=1] - Boost applied to all terms within this field.
 * @param {fieldExtractor} [attributes.extractor] - Function to extract a field from a document.
 * @throws {RangeError} fieldName cannot contain unsupported characters '/'
 */ lunr.Builder.prototype.field = function(fieldName, attributes) {
        if (/\//.test(fieldName)) throw new RangeError("Field '" + fieldName + "' contains illegal character '/'");
        this._fields[fieldName] = attributes || {};
    };
    /**
 * A parameter to tune the amount of field length normalisation that is applied when
 * calculating relevance scores. A value of 0 will completely disable any normalisation
 * and a value of 1 will fully normalise field lengths. The default is 0.75. Values of b
 * will be clamped to the range 0 - 1.
 *
 * @param {number} number - The value to set for this tuning parameter.
 */ lunr.Builder.prototype.b = function(number) {
        if (number < 0) this._b = 0;
        else if (number > 1) this._b = 1;
        else this._b = number;
    };
    /**
 * A parameter that controls the speed at which a rise in term frequency results in term
 * frequency saturation. The default value is 1.2. Setting this to a higher value will give
 * slower saturation levels, a lower value will result in quicker saturation.
 *
 * @param {number} number - The value to set for this tuning parameter.
 */ lunr.Builder.prototype.k1 = function(number) {
        this._k1 = number;
    };
    /**
 * Adds a document to the index.
 *
 * Before adding fields to the index the index should have been fully setup, with the document
 * ref and all fields to index already having been specified.
 *
 * The document must have a field name as specified by the ref (by default this is 'id') and
 * it should have all fields defined for indexing, though null or undefined values will not
 * cause errors.
 *
 * Entire documents can be boosted at build time. Applying a boost to a document indicates that
 * this document should rank higher in search results than other documents.
 *
 * @param {object} doc - The document to add to the index.
 * @param {object} attributes - Optional attributes associated with this document.
 * @param {number} [attributes.boost=1] - Boost applied to all terms within this document.
 */ lunr.Builder.prototype.add = function(doc, attributes) {
        var docRef = doc[this._ref], fields = Object.keys(this._fields);
        this._documents[docRef] = attributes || {};
        this.documentCount += 1;
        for(var i = 0; i < fields.length; i++){
            var fieldName = fields[i], extractor = this._fields[fieldName].extractor, field = extractor ? extractor(doc) : doc[fieldName], tokens = this.tokenizer(field, {
                fields: [
                    fieldName
                ]
            }), terms = this.pipeline.run(tokens), fieldRef = new lunr.FieldRef(docRef, fieldName), fieldTerms = Object.create(null);
            this.fieldTermFrequencies[fieldRef] = fieldTerms;
            this.fieldLengths[fieldRef] = 0;
            // store the length of this field for this document
            this.fieldLengths[fieldRef] += terms.length;
            // calculate term frequencies for this field
            for(var j = 0; j < terms.length; j++){
                var term = terms[j];
                if (fieldTerms[term] == undefined) fieldTerms[term] = 0;
                fieldTerms[term] += 1;
                // add to inverted index
                // create an initial posting if one doesn't exist
                if (this.invertedIndex[term] == undefined) {
                    var posting = Object.create(null);
                    posting["_index"] = this.termIndex;
                    this.termIndex += 1;
                    for(var k = 0; k < fields.length; k++)posting[fields[k]] = Object.create(null);
                    this.invertedIndex[term] = posting;
                }
                // add an entry for this term/fieldName/docRef to the invertedIndex
                if (this.invertedIndex[term][fieldName][docRef] == undefined) this.invertedIndex[term][fieldName][docRef] = Object.create(null);
                // store all whitelisted metadata about this token in the
                // inverted index
                for(var l = 0; l < this.metadataWhitelist.length; l++){
                    var metadataKey = this.metadataWhitelist[l], metadata = term.metadata[metadataKey];
                    if (this.invertedIndex[term][fieldName][docRef][metadataKey] == undefined) this.invertedIndex[term][fieldName][docRef][metadataKey] = [];
                    this.invertedIndex[term][fieldName][docRef][metadataKey].push(metadata);
                }
            }
        }
    };
    /**
 * Calculates the average document length for this index
 *
 * @private
 */ lunr.Builder.prototype.calculateAverageFieldLengths = function() {
        var fieldRefs = Object.keys(this.fieldLengths), numberOfFields = fieldRefs.length, accumulator = {}, documentsWithField = {};
        for(var i = 0; i < numberOfFields; i++){
            var fieldRef = lunr.FieldRef.fromString(fieldRefs[i]), field = fieldRef.fieldName;
            documentsWithField[field] || (documentsWithField[field] = 0);
            documentsWithField[field] += 1;
            accumulator[field] || (accumulator[field] = 0);
            accumulator[field] += this.fieldLengths[fieldRef];
        }
        var fields = Object.keys(this._fields);
        for(var i = 0; i < fields.length; i++){
            var fieldName = fields[i];
            accumulator[fieldName] = accumulator[fieldName] / documentsWithField[fieldName];
        }
        this.averageFieldLength = accumulator;
    };
    /**
 * Builds a vector space model of every document using lunr.Vector
 *
 * @private
 */ lunr.Builder.prototype.createFieldVectors = function() {
        var fieldVectors = {}, fieldRefs = Object.keys(this.fieldTermFrequencies), fieldRefsLength = fieldRefs.length, termIdfCache = Object.create(null);
        for(var i = 0; i < fieldRefsLength; i++){
            var fieldRef = lunr.FieldRef.fromString(fieldRefs[i]), fieldName = fieldRef.fieldName, fieldLength = this.fieldLengths[fieldRef], fieldVector = new lunr.Vector, termFrequencies = this.fieldTermFrequencies[fieldRef], terms = Object.keys(termFrequencies), termsLength = terms.length;
            var fieldBoost = this._fields[fieldName].boost || 1, docBoost = this._documents[fieldRef.docRef].boost || 1;
            for(var j = 0; j < termsLength; j++){
                var term = terms[j], tf = termFrequencies[term], termIndex = this.invertedIndex[term]._index, idf, score, scoreWithPrecision;
                if (termIdfCache[term] === undefined) {
                    idf = lunr.idf(this.invertedIndex[term], this.documentCount);
                    termIdfCache[term] = idf;
                } else idf = termIdfCache[term];
                score = idf * ((this._k1 + 1) * tf) / (this._k1 * (1 - this._b + this._b * (fieldLength / this.averageFieldLength[fieldName])) + tf);
                score *= fieldBoost;
                score *= docBoost;
                scoreWithPrecision = Math.round(score * 1000) / 1000;
                // Converts 1.23456789 to 1.234.
                // Reducing the precision so that the vectors take up less
                // space when serialised. Doing it now so that they behave
                // the same before and after serialisation. Also, this is
                // the fastest approach to reducing a number's precision in
                // JavaScript.
                fieldVector.insert(termIndex, scoreWithPrecision);
            }
            fieldVectors[fieldRef] = fieldVector;
        }
        this.fieldVectors = fieldVectors;
    };
    /**
 * Creates a token set of all tokens in the index using lunr.TokenSet
 *
 * @private
 */ lunr.Builder.prototype.createTokenSet = function() {
        this.tokenSet = lunr.TokenSet.fromArray(Object.keys(this.invertedIndex).sort());
    };
    /**
 * Builds the index, creating an instance of lunr.Index.
 *
 * This completes the indexing process and should only be called
 * once all documents have been added to the index.
 *
 * @returns {lunr.Index}
 */ lunr.Builder.prototype.build = function() {
        this.calculateAverageFieldLengths();
        this.createFieldVectors();
        this.createTokenSet();
        return new lunr.Index({
            invertedIndex: this.invertedIndex,
            fieldVectors: this.fieldVectors,
            tokenSet: this.tokenSet,
            fields: Object.keys(this._fields),
            pipeline: this.searchPipeline
        });
    };
    /**
 * Applies a plugin to the index builder.
 *
 * A plugin is a function that is called with the index builder as its context.
 * Plugins can be used to customise or extend the behaviour of the index
 * in some way. A plugin is just a function, that encapsulated the custom
 * behaviour that should be applied when building the index.
 *
 * The plugin function will be called with the index builder as its argument, additional
 * arguments can also be passed when calling use. The function will be called
 * with the index builder as its context.
 *
 * @param {Function} plugin The plugin to apply.
 */ lunr.Builder.prototype.use = function(fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        args.unshift(this);
        fn.apply(this, args);
    };
    /**
 * Contains and collects metadata about a matching document.
 * A single instance of lunr.MatchData is returned as part of every
 * lunr.Index~Result.
 *
 * @constructor
 * @param {string} term - The term this match data is associated with
 * @param {string} field - The field in which the term was found
 * @param {object} metadata - The metadata recorded about this term in this field
 * @property {object} metadata - A cloned collection of metadata associated with this document.
 * @see {@link lunr.Index~Result}
 */ lunr.MatchData = function(term, field, metadata) {
        var clonedMetadata = Object.create(null), metadataKeys = Object.keys(metadata || {});
        // Cloning the metadata to prevent the original
        // being mutated during match data combination.
        // Metadata is kept in an array within the inverted
        // index so cloning the data can be done with
        // Array#slice
        for(var i = 0; i < metadataKeys.length; i++){
            var key = metadataKeys[i];
            clonedMetadata[key] = metadata[key].slice();
        }
        this.metadata = Object.create(null);
        if (term !== undefined) {
            this.metadata[term] = Object.create(null);
            this.metadata[term][field] = clonedMetadata;
        }
    };
    /**
 * An instance of lunr.MatchData will be created for every term that matches a
 * document. However only one instance is required in a lunr.Index~Result. This
 * method combines metadata from another instance of lunr.MatchData with this
 * objects metadata.
 *
 * @param {lunr.MatchData} otherMatchData - Another instance of match data to merge with this one.
 * @see {@link lunr.Index~Result}
 */ lunr.MatchData.prototype.combine = function(otherMatchData) {
        var terms = Object.keys(otherMatchData.metadata);
        for(var i = 0; i < terms.length; i++){
            var term = terms[i], fields = Object.keys(otherMatchData.metadata[term]);
            if (this.metadata[term] == undefined) this.metadata[term] = Object.create(null);
            for(var j = 0; j < fields.length; j++){
                var field = fields[j], keys = Object.keys(otherMatchData.metadata[term][field]);
                if (this.metadata[term][field] == undefined) this.metadata[term][field] = Object.create(null);
                for(var k = 0; k < keys.length; k++){
                    var key = keys[k];
                    if (this.metadata[term][field][key] == undefined) this.metadata[term][field][key] = otherMatchData.metadata[term][field][key];
                    else this.metadata[term][field][key] = this.metadata[term][field][key].concat(otherMatchData.metadata[term][field][key]);
                }
            }
        }
    };
    /**
 * Add metadata for a term/field pair to this instance of match data.
 *
 * @param {string} term - The term this match data is associated with
 * @param {string} field - The field in which the term was found
 * @param {object} metadata - The metadata recorded about this term in this field
 */ lunr.MatchData.prototype.add = function(term, field, metadata) {
        if (!(term in this.metadata)) {
            this.metadata[term] = Object.create(null);
            this.metadata[term][field] = metadata;
            return;
        }
        if (!(field in this.metadata[term])) {
            this.metadata[term][field] = metadata;
            return;
        }
        var metadataKeys = Object.keys(metadata);
        for(var i = 0; i < metadataKeys.length; i++){
            var key = metadataKeys[i];
            if (key in this.metadata[term][field]) this.metadata[term][field][key] = this.metadata[term][field][key].concat(metadata[key]);
            else this.metadata[term][field][key] = metadata[key];
        }
    };
    /**
 * A lunr.Query provides a programmatic way of defining queries to be performed
 * against a {@link lunr.Index}.
 *
 * Prefer constructing a lunr.Query using the {@link lunr.Index#query} method
 * so the query object is pre-initialized with the right index fields.
 *
 * @constructor
 * @property {lunr.Query~Clause[]} clauses - An array of query clauses.
 * @property {string[]} allFields - An array of all available fields in a lunr.Index.
 */ lunr.Query = function(allFields) {
        this.clauses = [];
        this.allFields = allFields;
    };
    /**
 * Constants for indicating what kind of automatic wildcard insertion will be used when constructing a query clause.
 *
 * This allows wildcards to be added to the beginning and end of a term without having to manually do any string
 * concatenation.
 *
 * The wildcard constants can be bitwise combined to select both leading and trailing wildcards.
 *
 * @constant
 * @default
 * @property {number} wildcard.NONE - The term will have no wildcards inserted, this is the default behaviour
 * @property {number} wildcard.LEADING - Prepend the term with a wildcard, unless a leading wildcard already exists
 * @property {number} wildcard.TRAILING - Append a wildcard to the term, unless a trailing wildcard already exists
 * @see lunr.Query~Clause
 * @see lunr.Query#clause
 * @see lunr.Query#term
 * @example <caption>query term with trailing wildcard</caption>
 * query.term('foo', { wildcard: lunr.Query.wildcard.TRAILING })
 * @example <caption>query term with leading and trailing wildcard</caption>
 * query.term('foo', {
 *   wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING
 * })
 */ lunr.Query.wildcard = new String("*");
    lunr.Query.wildcard.NONE = 0;
    lunr.Query.wildcard.LEADING = 1;
    lunr.Query.wildcard.TRAILING = 2;
    /**
 * Constants for indicating what kind of presence a term must have in matching documents.
 *
 * @constant
 * @enum {number}
 * @see lunr.Query~Clause
 * @see lunr.Query#clause
 * @see lunr.Query#term
 * @example <caption>query term with required presence</caption>
 * query.term('foo', { presence: lunr.Query.presence.REQUIRED })
 */ lunr.Query.presence = {
        /**
   * Term's presence in a document is optional, this is the default value.
   */ OPTIONAL: 1,
        /**
   * Term's presence in a document is required, documents that do not contain
   * this term will not be returned.
   */ REQUIRED: 2,
        /**
   * Term's presence in a document is prohibited, documents that do contain
   * this term will not be returned.
   */ PROHIBITED: 3
    };
    /**
 * A single clause in a {@link lunr.Query} contains a term and details on how to
 * match that term against a {@link lunr.Index}.
 *
 * @typedef {Object} lunr.Query~Clause
 * @property {string[]} fields - The fields in an index this clause should be matched against.
 * @property {number} [boost=1] - Any boost that should be applied when matching this clause.
 * @property {number} [editDistance] - Whether the term should have fuzzy matching applied, and how fuzzy the match should be.
 * @property {boolean} [usePipeline] - Whether the term should be passed through the search pipeline.
 * @property {number} [wildcard=lunr.Query.wildcard.NONE] - Whether the term should have wildcards appended or prepended.
 * @property {number} [presence=lunr.Query.presence.OPTIONAL] - The terms presence in any matching documents.
 */ /**
 * Adds a {@link lunr.Query~Clause} to this query.
 *
 * Unless the clause contains the fields to be matched all fields will be matched. In addition
 * a default boost of 1 is applied to the clause.
 *
 * @param {lunr.Query~Clause} clause - The clause to add to this query.
 * @see lunr.Query~Clause
 * @returns {lunr.Query}
 */ lunr.Query.prototype.clause = function(clause) {
        if (!("fields" in clause)) clause.fields = this.allFields;
        if (!("boost" in clause)) clause.boost = 1;
        if (!("usePipeline" in clause)) clause.usePipeline = true;
        if (!("wildcard" in clause)) clause.wildcard = lunr.Query.wildcard.NONE;
        if (clause.wildcard & lunr.Query.wildcard.LEADING && clause.term.charAt(0) != lunr.Query.wildcard) clause.term = "*" + clause.term;
        if (clause.wildcard & lunr.Query.wildcard.TRAILING && clause.term.slice(-1) != lunr.Query.wildcard) clause.term = "" + clause.term + "*";
        if (!("presence" in clause)) clause.presence = lunr.Query.presence.OPTIONAL;
        this.clauses.push(clause);
        return this;
    };
    /**
 * A negated query is one in which every clause has a presence of
 * prohibited. These queries require some special processing to return
 * the expected results.
 *
 * @returns boolean
 */ lunr.Query.prototype.isNegated = function() {
        for(var i = 0; i < this.clauses.length; i++){
            if (this.clauses[i].presence != lunr.Query.presence.PROHIBITED) return false;
        }
        return true;
    };
    /**
 * Adds a term to the current query, under the covers this will create a {@link lunr.Query~Clause}
 * to the list of clauses that make up this query.
 *
 * The term is used as is, i.e. no tokenization will be performed by this method. Instead conversion
 * to a token or token-like string should be done before calling this method.
 *
 * The term will be converted to a string by calling `toString`. Multiple terms can be passed as an
 * array, each term in the array will share the same options.
 *
 * @param {object|object[]} term - The term(s) to add to the query.
 * @param {object} [options] - Any additional properties to add to the query clause.
 * @returns {lunr.Query}
 * @see lunr.Query#clause
 * @see lunr.Query~Clause
 * @example <caption>adding a single term to a query</caption>
 * query.term("foo")
 * @example <caption>adding a single term to a query and specifying search fields, term boost and automatic trailing wildcard</caption>
 * query.term("foo", {
 *   fields: ["title"],
 *   boost: 10,
 *   wildcard: lunr.Query.wildcard.TRAILING
 * })
 * @example <caption>using lunr.tokenizer to convert a string to tokens before using them as terms</caption>
 * query.term(lunr.tokenizer("foo bar"))
 */ lunr.Query.prototype.term = function(term, options) {
        if (Array.isArray(term)) {
            term.forEach(function(t) {
                this.term(t, lunr.utils.clone(options));
            }, this);
            return this;
        }
        var clause = options || {};
        clause.term = term.toString();
        this.clause(clause);
        return this;
    };
    lunr.QueryParseError = function(message, start, end) {
        this.name = "QueryParseError";
        this.message = message;
        this.start = start;
        this.end = end;
    };
    lunr.QueryParseError.prototype = new Error;
    lunr.QueryLexer = function(str) {
        this.lexemes = [];
        this.str = str;
        this.length = str.length;
        this.pos = 0;
        this.start = 0;
        this.escapeCharPositions = [];
    };
    lunr.QueryLexer.prototype.run = function() {
        var state = lunr.QueryLexer.lexText;
        while(state)state = state(this);
    };
    lunr.QueryLexer.prototype.sliceString = function() {
        var subSlices = [], sliceStart = this.start, sliceEnd = this.pos;
        for(var i = 0; i < this.escapeCharPositions.length; i++){
            sliceEnd = this.escapeCharPositions[i];
            subSlices.push(this.str.slice(sliceStart, sliceEnd));
            sliceStart = sliceEnd + 1;
        }
        subSlices.push(this.str.slice(sliceStart, this.pos));
        this.escapeCharPositions.length = 0;
        return subSlices.join("");
    };
    lunr.QueryLexer.prototype.emit = function(type) {
        this.lexemes.push({
            type: type,
            str: this.sliceString(),
            start: this.start,
            end: this.pos
        });
        this.start = this.pos;
    };
    lunr.QueryLexer.prototype.escapeCharacter = function() {
        this.escapeCharPositions.push(this.pos - 1);
        this.pos += 1;
    };
    lunr.QueryLexer.prototype.next = function() {
        if (this.pos >= this.length) return lunr.QueryLexer.EOS;
        var char = this.str.charAt(this.pos);
        this.pos += 1;
        return char;
    };
    lunr.QueryLexer.prototype.width = function() {
        return this.pos - this.start;
    };
    lunr.QueryLexer.prototype.ignore = function() {
        if (this.start == this.pos) this.pos += 1;
        this.start = this.pos;
    };
    lunr.QueryLexer.prototype.backup = function() {
        this.pos -= 1;
    };
    lunr.QueryLexer.prototype.acceptDigitRun = function() {
        var char, charCode;
        do {
            char = this.next();
            charCode = char.charCodeAt(0);
        }while (charCode > 47 && charCode < 58);
        if (char != lunr.QueryLexer.EOS) this.backup();
    };
    lunr.QueryLexer.prototype.more = function() {
        return this.pos < this.length;
    };
    lunr.QueryLexer.EOS = "EOS";
    lunr.QueryLexer.FIELD = "FIELD";
    lunr.QueryLexer.TERM = "TERM";
    lunr.QueryLexer.EDIT_DISTANCE = "EDIT_DISTANCE";
    lunr.QueryLexer.BOOST = "BOOST";
    lunr.QueryLexer.PRESENCE = "PRESENCE";
    lunr.QueryLexer.lexField = function(lexer) {
        lexer.backup();
        lexer.emit(lunr.QueryLexer.FIELD);
        lexer.ignore();
        return lunr.QueryLexer.lexText;
    };
    lunr.QueryLexer.lexTerm = function(lexer) {
        if (lexer.width() > 1) {
            lexer.backup();
            lexer.emit(lunr.QueryLexer.TERM);
        }
        lexer.ignore();
        if (lexer.more()) return lunr.QueryLexer.lexText;
    };
    lunr.QueryLexer.lexEditDistance = function(lexer) {
        lexer.ignore();
        lexer.acceptDigitRun();
        lexer.emit(lunr.QueryLexer.EDIT_DISTANCE);
        return lunr.QueryLexer.lexText;
    };
    lunr.QueryLexer.lexBoost = function(lexer) {
        lexer.ignore();
        lexer.acceptDigitRun();
        lexer.emit(lunr.QueryLexer.BOOST);
        return lunr.QueryLexer.lexText;
    };
    lunr.QueryLexer.lexEOS = function(lexer) {
        if (lexer.width() > 0) lexer.emit(lunr.QueryLexer.TERM);
    };
    // This matches the separator used when tokenising fields
    // within a document. These should match otherwise it is
    // not possible to search for some tokens within a document.
    //
    // It is possible for the user to change the separator on the
    // tokenizer so it _might_ clash with any other of the special
    // characters already used within the search string, e.g. :.
    //
    // This means that it is possible to change the separator in
    // such a way that makes some words unsearchable using a search
    // string.
    lunr.QueryLexer.termSeparator = lunr.tokenizer.separator;
    lunr.QueryLexer.lexText = function(lexer) {
        while(true){
            var char = lexer.next();
            if (char == lunr.QueryLexer.EOS) return lunr.QueryLexer.lexEOS;
            // Escape character is '\'
            if (char.charCodeAt(0) == 92) {
                lexer.escapeCharacter();
                continue;
            }
            if (char == ":") return lunr.QueryLexer.lexField;
            if (char == "~") {
                lexer.backup();
                if (lexer.width() > 0) lexer.emit(lunr.QueryLexer.TERM);
                return lunr.QueryLexer.lexEditDistance;
            }
            if (char == "^") {
                lexer.backup();
                if (lexer.width() > 0) lexer.emit(lunr.QueryLexer.TERM);
                return lunr.QueryLexer.lexBoost;
            }
            // "+" indicates term presence is required
            // checking for length to ensure that only
            // leading "+" are considered
            if (char == "+" && lexer.width() === 1) {
                lexer.emit(lunr.QueryLexer.PRESENCE);
                return lunr.QueryLexer.lexText;
            }
            // "-" indicates term presence is prohibited
            // checking for length to ensure that only
            // leading "-" are considered
            if (char == "-" && lexer.width() === 1) {
                lexer.emit(lunr.QueryLexer.PRESENCE);
                return lunr.QueryLexer.lexText;
            }
            if (char.match(lunr.QueryLexer.termSeparator)) return lunr.QueryLexer.lexTerm;
        }
    };
    lunr.QueryParser = function(str, query) {
        this.lexer = new lunr.QueryLexer(str);
        this.query = query;
        this.currentClause = {};
        this.lexemeIdx = 0;
    };
    lunr.QueryParser.prototype.parse = function() {
        this.lexer.run();
        this.lexemes = this.lexer.lexemes;
        var state = lunr.QueryParser.parseClause;
        while(state)state = state(this);
        return this.query;
    };
    lunr.QueryParser.prototype.peekLexeme = function() {
        return this.lexemes[this.lexemeIdx];
    };
    lunr.QueryParser.prototype.consumeLexeme = function() {
        var lexeme = this.peekLexeme();
        this.lexemeIdx += 1;
        return lexeme;
    };
    lunr.QueryParser.prototype.nextClause = function() {
        var completedClause = this.currentClause;
        this.query.clause(completedClause);
        this.currentClause = {};
    };
    lunr.QueryParser.parseClause = function(parser) {
        var lexeme = parser.peekLexeme();
        if (lexeme == undefined) return;
        switch(lexeme.type){
            case lunr.QueryLexer.PRESENCE:
                return lunr.QueryParser.parsePresence;
            case lunr.QueryLexer.FIELD:
                return lunr.QueryParser.parseField;
            case lunr.QueryLexer.TERM:
                return lunr.QueryParser.parseTerm;
            default:
                var errorMessage = "expected either a field or a term, found " + lexeme.type;
                if (lexeme.str.length >= 1) errorMessage += " with value '" + lexeme.str + "'";
                throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
        }
    };
    lunr.QueryParser.parsePresence = function(parser) {
        var lexeme = parser.consumeLexeme();
        if (lexeme == undefined) return;
        switch(lexeme.str){
            case "-":
                parser.currentClause.presence = lunr.Query.presence.PROHIBITED;
                break;
            case "+":
                parser.currentClause.presence = lunr.Query.presence.REQUIRED;
                break;
            default:
                var errorMessage = "unrecognised presence operator'" + lexeme.str + "'";
                throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
        }
        var nextLexeme = parser.peekLexeme();
        if (nextLexeme == undefined) {
            var errorMessage = "expecting term or field, found nothing";
            throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
        }
        switch(nextLexeme.type){
            case lunr.QueryLexer.FIELD:
                return lunr.QueryParser.parseField;
            case lunr.QueryLexer.TERM:
                return lunr.QueryParser.parseTerm;
            default:
                var errorMessage = "expecting term or field, found '" + nextLexeme.type + "'";
                throw new lunr.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
        }
    };
    lunr.QueryParser.parseField = function(parser) {
        var lexeme = parser.consumeLexeme();
        if (lexeme == undefined) return;
        if (parser.query.allFields.indexOf(lexeme.str) == -1) {
            var possibleFields = parser.query.allFields.map(function(f) {
                return "'" + f + "'";
            }).join(", "), errorMessage = "unrecognised field '" + lexeme.str + "', possible fields: " + possibleFields;
            throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
        }
        parser.currentClause.fields = [
            lexeme.str
        ];
        var nextLexeme = parser.peekLexeme();
        if (nextLexeme == undefined) {
            var errorMessage = "expecting term, found nothing";
            throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
        }
        switch(nextLexeme.type){
            case lunr.QueryLexer.TERM:
                return lunr.QueryParser.parseTerm;
            default:
                var errorMessage = "expecting term, found '" + nextLexeme.type + "'";
                throw new lunr.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
        }
    };
    lunr.QueryParser.parseTerm = function(parser) {
        var lexeme = parser.consumeLexeme();
        if (lexeme == undefined) return;
        parser.currentClause.term = lexeme.str.toLowerCase();
        if (lexeme.str.indexOf("*") != -1) parser.currentClause.usePipeline = false;
        var nextLexeme = parser.peekLexeme();
        if (nextLexeme == undefined) {
            parser.nextClause();
            return;
        }
        switch(nextLexeme.type){
            case lunr.QueryLexer.TERM:
                parser.nextClause();
                return lunr.QueryParser.parseTerm;
            case lunr.QueryLexer.FIELD:
                parser.nextClause();
                return lunr.QueryParser.parseField;
            case lunr.QueryLexer.EDIT_DISTANCE:
                return lunr.QueryParser.parseEditDistance;
            case lunr.QueryLexer.BOOST:
                return lunr.QueryParser.parseBoost;
            case lunr.QueryLexer.PRESENCE:
                parser.nextClause();
                return lunr.QueryParser.parsePresence;
            default:
                var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
                throw new lunr.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
        }
    };
    lunr.QueryParser.parseEditDistance = function(parser) {
        var lexeme = parser.consumeLexeme();
        if (lexeme == undefined) return;
        var editDistance = parseInt(lexeme.str, 10);
        if (isNaN(editDistance)) {
            var errorMessage = "edit distance must be numeric";
            throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
        }
        parser.currentClause.editDistance = editDistance;
        var nextLexeme = parser.peekLexeme();
        if (nextLexeme == undefined) {
            parser.nextClause();
            return;
        }
        switch(nextLexeme.type){
            case lunr.QueryLexer.TERM:
                parser.nextClause();
                return lunr.QueryParser.parseTerm;
            case lunr.QueryLexer.FIELD:
                parser.nextClause();
                return lunr.QueryParser.parseField;
            case lunr.QueryLexer.EDIT_DISTANCE:
                return lunr.QueryParser.parseEditDistance;
            case lunr.QueryLexer.BOOST:
                return lunr.QueryParser.parseBoost;
            case lunr.QueryLexer.PRESENCE:
                parser.nextClause();
                return lunr.QueryParser.parsePresence;
            default:
                var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
                throw new lunr.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
        }
    };
    lunr.QueryParser.parseBoost = function(parser) {
        var lexeme = parser.consumeLexeme();
        if (lexeme == undefined) return;
        var boost = parseInt(lexeme.str, 10);
        if (isNaN(boost)) {
            var errorMessage = "boost must be numeric";
            throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
        }
        parser.currentClause.boost = boost;
        var nextLexeme = parser.peekLexeme();
        if (nextLexeme == undefined) {
            parser.nextClause();
            return;
        }
        switch(nextLexeme.type){
            case lunr.QueryLexer.TERM:
                parser.nextClause();
                return lunr.QueryParser.parseTerm;
            case lunr.QueryLexer.FIELD:
                parser.nextClause();
                return lunr.QueryParser.parseField;
            case lunr.QueryLexer.EDIT_DISTANCE:
                return lunr.QueryParser.parseEditDistance;
            case lunr.QueryLexer.BOOST:
                return lunr.QueryParser.parseBoost;
            case lunr.QueryLexer.PRESENCE:
                parser.nextClause();
                return lunr.QueryParser.parsePresence;
            default:
                var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
                throw new lunr.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
        }
    } /**
   * export the module via AMD, CommonJS or as a browser global
   * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
   */ ;
    (function(root, factory) {
        if (typeof define === "function" && define.amd) // AMD. Register as an anonymous module.
        define(factory);
        else /**
       * Node. Does not work with strict CommonJS, but
       * only CommonJS-like enviroments that support module.exports,
       * like Node.
       */ module.exports = factory();
    })(this, function() {
        /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */ return lunr;
    });
})();

},{}]},["dfktE","lLxCH"], "lLxCH", "parcelRequire7bfb")

//# sourceMappingURL=custom.js.map
