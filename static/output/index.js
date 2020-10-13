// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function toggleColorModes() {
  var light = 'lit';
  var dark = 'dim';
  var storageKey = 'colorMode';
  var key = '--color-mode';
  var data = 'data-mode';
  var bank = window.localStorage;

  function currentMode() {
    var acceptableChars = light + dark;
    acceptableChars = _toConsumableArray(acceptableChars);
    var mode = getComputedStyle(doc).getPropertyValue(key).replace(/\"/g, '').trim();
    mode = _toConsumableArray(mode).filter(function (letter) {
      return acceptableChars.includes(letter);
    });
    return mode.join('');
  }

  function changeMode(isDarkMode) {
    if (isDarkMode) {
      bank.setItem(storageKey, light);
      elemAttribute(doc, data, light);
    } else {
      bank.setItem(storageKey, dark);
      elemAttribute(doc, data, dark);
    }
  }

  function setUserColorMode() {
    var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var isDarkMode = currentMode() == dark;
    var storedMode = bank.getItem(storageKey);

    if (storedMode) {
      if (mode) {
        changeMode(isDarkMode);
      } else {
        elemAttribute(doc, data, storedMode);
      }
    } else {
      if (mode === true) {
        changeMode(isDarkMode);
      }
    }
  }

  setUserColorMode();
  doc.addEventListener('click', function (event) {
    var target = event.target;
    var modeClass = 'color_choice';
    var animateClass = 'color_animate';
    var isModeToggle = containsClass(target, modeClass);

    if (isModeToggle) {
      pushClass(target, animateClass);
      setUserColorMode(true);
    }
  });
})();

function fileClosure() {
  (function updateDate() {
    var date = new Date();
    var year = date.getFullYear();
    var yearEl = elem('.year');
    yearEl ? yearEl.innerHTML = year : false;
  })();

  (function makeExternalLinks() {
    var links = elems('a');

    if (links) {
      Array.from(links).forEach(function (link) {
        var target, rel, blank, noopener, attr1, attr2, url, isExternal;
        url = elemAttribute(link, 'href');
        isExternal = url && typeof url == 'string' && url.startsWith('http') && !url.startsWith(parentURL) ? true : false;

        if (isExternal) {
          target = 'target';
          rel = 'rel';
          blank = '_blank';
          noopener = 'noopener';
          attr1 = elemAttribute(link, target);
          attr2 = elemAttribute(link, noopener);
          attr1 ? false : elemAttribute(link, target, blank);
          attr2 ? false : elemAttribute(link, rel, noopener);
        }
      });
    }
  })();

  var headingNodes = [],
      results,
      link,
      icon,
      current,
      id,
      tags = ['h2', 'h3', 'h4', 'h5', 'h6'];
  current = document.URL;
  tags.forEach(function (tag) {
    var article = elem('.post_content');

    if (article) {
      results = article.getElementsByTagName(tag);
      Array.prototype.push.apply(headingNodes, results);
    }
  });
  headingNodes.forEach(function (node) {
    link = createEl('a');
    loadSvg('link', link);
    link.className = 'link icon';
    id = node.getAttribute('id');

    if (id) {
      link.href = "".concat(current, "#").concat(id);
      node.appendChild(link);
      pushClass(node, 'link_owner');
    }
  });
  var inlineListItems = elems('ol li');

  if (inlineListItems) {
    inlineListItems.forEach(function (listItem) {
      var firstChild = listItem.children[0];
      var containsHeading = isMatch(firstChild, tags);
      containsHeading ? pushClass(listItem, 'align') : false;
    });
  }

  function copyFeedback(parent) {
    var copyText = document.createElement('div');
    var yanked = 'link_yanked';
    copyText.classList.add(yanked);
    copyText.innerText = 'Link Copied';

    if (!elem(".".concat(yanked), parent)) {
      parent.appendChild(copyText);
      setTimeout(function () {
        parent.removeChild(copyText);
      }, 3000);
    }
  }

  (function copyHeadingLink() {
    var deeplink, deeplinks, newLink, parent, target;
    deeplink = 'link';
    deeplinks = elems(".".concat(deeplink));

    if (deeplinks) {
      document.addEventListener('click', function (event) {
        target = event.target;
        parent = target.parentNode;

        if (target && containsClass(target, deeplink) || containsClass(parent, deeplink)) {
          event.preventDefault();
          newLink = target.href != undefined ? target.href : target.parentNode.href;
          copyToClipboard(newLink);
          target.href != undefined ? copyFeedback(target) : copyFeedback(target.parentNode);
        }
      });
    }
  })();

  (function copyLinkToShare() {
    var copy, copied, excerpt, isCopyIcon, isInExcerpt, link, postCopy, postLink, target;
    copy = 'copy';
    copied = 'copy_done';
    excerpt = 'excerpt';
    postCopy = 'post_copy';
    postLink = 'post_card';
    doc.addEventListener('click', function (event) {
      target = event.target;
      isCopyIcon = containsClass(target, copy);
      var isWithinCopyIcon = target.closest(".".concat(copy));

      if (isCopyIcon || isWithinCopyIcon) {
        var _icon = isCopyIcon ? isCopyIcon : isWithinCopyIcon;

        isInExcerpt = containsClass(_icon, postCopy);

        if (isInExcerpt) {
          link = target.closest(".".concat(excerpt)).previousElementSibling;
          link = containsClass(link, postLink) ? elemAttribute(link, 'href') : false;
        } else {
          link = window.location.href;
        }

        if (link) {
          copyToClipboard(link);
          pushClass(_icon, copied);
        }
      }

      var yankLink = '.link_yank';
      var isCopyLink = target.matches(yankLink);
      var isCopyLinkIcon = target.closest(yankLink);

      if (isCopyLink || isCopyLinkIcon) {
        event.preventDefault();
        var yankContent = isCopyLinkIcon ? elemAttribute(target.closest(yankLink), 'href') : elemAttribute(target, 'href');
        copyToClipboard(yankContent);
        isCopyLink ? copyFeedback(target) : copyFeedback(target.parentNode);
      }
    });
  })();

  (function hideAside() {
    var aside, title, posts;
    aside = elem('.aside');
    title = aside ? aside.previousElementSibling : null;

    if (aside && title.nodeName.toLowerCase() === 'h3') {
      posts = Array.from(aside.children);
      posts.length < 1 ? title.remove() : false;
    }
  })();

  (function goBack() {
    var backBtn = elem('.btn_back');
    var history = window.history;

    if (backBtn) {
      backBtn.addEventListener('click', function () {
        history.back();
      });
    }
  })();

  function showingImagePosition() {
    // whether or not to track image position for non-linear images within the article body element.
    var thisPage = document.documentElement;
    var showImagePositionOnPage = thisPage.dataset.figures;

    if (showImagePositionOnPage) {
      showImagePosition = showImagePositionOnPage;
    }

    return showImagePosition === "true" ? true : false;
  }

  function populateAlt(images) {
    var imagePosition = 0;
    images.forEach(function (image) {
      var alt = image.alt;
      image.loading = "lazy";
      var modifiers = [':left', ':right'];
      var altArr = alt.split('::').map(function (x) {
        return x.trim();
      });

      if (altArr.length > 1) {
        altArr[1].split(' ').filter(Boolean).forEach(function (cls) {
          pushClass(image, cls);
          alt = altArr[0];
        });
      }

      modifiers.forEach(function (modifier) {
        var canModify = alt.includes(modifier);

        if (canModify) {
          pushClass(image, "float_".concat(modifier.replace(":", "")));
          alt = alt.replace(modifier, "");
        }
      });
      var isInline = alt.includes(inline);
      alt = alt.replace(inline, ""); // wait for position to load and a caption if the image is not online and has an alt attribute

      if (alt.length > 0 && !containsClass(image, 'alt' && !isInline)) {
        imagePosition += 1;
        image.dataset.pos = imagePosition;
        image.addEventListener('load', function () {
          var showImagePosition = showingImagePosition();
          var desc = document.createElement('p');
          desc.classList.add('img_alt');
          var imageAlt = alt;
          var thisImgPos = image.dataset.pos; // modify image caption is necessary

          imageAlt = showImagePosition ? "".concat(showImagePositionLabel, " ").concat(thisImgPos, ": ").concat(imageAlt) : imageAlt;
          desc.textContent = imageAlt;
          image.insertAdjacentHTML('afterend', desc.outerHTML);
        });
      }

      if (isInline) {
        modifyClass(image, 'inline');
      }
    });
    hljs.initHighlightingOnLoad();
  }

  function largeImages(baseParent) {
    var images = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (images) {
      images.forEach(function (image) {
        image.addEventListener('load', function () {
          var actualWidth = image.naturalWidth;
          var parentWidth = baseParent.offsetWidth;
          var actionableRatio = actualWidth / parentWidth;

          if (actionableRatio > 1) {
            pushClass(image, "image-scalable");
            image.dataset.scale = actionableRatio;
            var figure = createEl('figure');
            wrapEl(image, figure);
          }
        });
      });
    }
  }

  (function AltImage() {
    var post = elem('.post_content');
    var images = post ? post.querySelectorAll('img') : false;
    images ? populateAlt(images) : false;
    largeImages(post, images);
  })();

  doc.addEventListener('click', function (event) {
    var target = event.target;
    isClickableImage = target.matches('.image-scalable');
    var isFigure = target.matches('figure');

    if (isFigure) {
      var hasClickableImage = containsClass(target.children[0], 'image-scalable');

      if (hasClickableImage) {
        modifyClass(target, 'image-scale');
      }
    }

    if (isClickableImage) {
      var figure = target.parentNode;
      modifyClass(figure, 'image-scale');
    }
  });
  var tables = elems('table');

  if (tables) {
    var scrollable = 'scrollable';
    tables.forEach(function (table) {
      var wrapper = createEl();
      wrapper.className = scrollable;
      wrapEl(table, wrapper);
    });
  }

  function toggleTags() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var tagsButtonClass = 'post_tags_toggle';
    var tagsButtonClass2 = 'tags_hide';
    var tagsShowClass = 'jswidgetopen';
    var postTagsWrapper = elem(".".concat(tagsShowClass));
    target = target === null ? postTagsWrapper : target;
    var showingAllTags = target.matches(".".concat(tagsShowClass));
    var isExandButton = target.matches(".".concat(tagsButtonClass));
    var isCloseButton = target.matches(".".concat(tagsButtonClass2)) || target.closest(".".concat(tagsButtonClass2));
    var isButton = isExandButton || isCloseButton;
    var isActionable = isButton || showingAllTags;

    if (isActionable) {
      if (isButton) {
        if (isExandButton) {
          var allTagsWrapper = target.nextElementSibling;
          pushClass(allTagsWrapper, tagsShowClass);
        } else {
          deleteClass(postTagsWrapper, tagsShowClass);
        }
      } else {
        isActionable ? deleteClass(target, tagsShowClass) : false;
      }
    }
  }

  (function showAllPostTags() {
    doc.addEventListener('click', function (event) {
      var target = event.target;
      toggleTags(target);
    });
    horizontalSwipe(doc, toggleTags, 'left');
  })();

  (function navToggle() {
    doc.addEventListener('click', function (event) {
      var target = event.target;
      var open = 'jsopen';
      var navCloseIconClass = '.nav_close';
      var navClose = elem(navCloseIconClass);
      var isNavToggle = target.matches(navCloseIconClass) || target.closest(navCloseIconClass);
      var harmburgerIcon = navClose.firstElementChild.firstElementChild;

      if (isNavToggle) {
        event.preventDefault();
        modifyClass(doc, open);
        modifyClass(harmburgerIcon, 'isopen');
      }

      if (!target.closest('.nav') && elem(".".concat(open))) {
        modifyClass(doc, open);
        var navIsOpen = containsClass(doc, open);
        !navIsOpen ? modifyClass(harmburgerIcon, 'isopen') : false;
      }

      var navItem = 'nav_item';
      var navSub = 'nav_sub';
      var showSub = 'nav_open';
      var isNavItem = target.matches(".".concat(navItem));
      var isNavItemIcon = target.closest(".".concat(navItem));

      if (isNavItem || isNavItemIcon) {
        var thisItem = isNavItem ? target : isNavItemIcon;
        var hasNext = thisItem.nextElementSibling;
        var hasSubNav = hasNext ? hasNext.matches(".".concat(navSub)) : null;

        if (hasSubNav) {
          event.preventDefault();
          Array.from(thisItem.parentNode.parentNode.children).forEach(function (item) {
            var targetItem = item.firstElementChild;
            targetItem != thisItem ? deleteClass(targetItem, showSub) : false;
          });
          modifyClass(thisItem, showSub);
        }
      }
    });
  })();

  function isMobileDevice() {
    var agent = navigator.userAgent.toLowerCase();
    var isMobile = agent.includes('android') || agent.includes('iphone');
    return isMobile;
  }

  ;

  (function ifiOS() {
    // modify backto top button
    var backToTopButton = elem('.to_top');
    var thisOS = getMobileOperatingSystem();
    var ios = 'ios';

    if (backToTopButton && thisOS === 'iOS') {
      pushClass(backToTopButton, ios);
    } // precisely position back to top button on large screens


    var buttonParentWidth = backToTopButton.parentNode.offsetWidth;
    var docWidth = doc.offsetWidth;
    var leftOffset = (docWidth - buttonParentWidth) / 2;
    var buttonWidth = backToTopButton.offsetWidth;
    leftOffset = leftOffset + buttonParentWidth - buttonWidth;

    if (!isMobileDevice()) {
      backToTopButton.style.left = "".concat(leftOffset, "px");
    }
  })();

  (function sortTags() {
    doc.addEventListener('click', function (event) {
      var active = 'active';
      var target = event.target;
      var isSortButton = target.matches('.tags_sort') || target.matches('.tags_sort span');

      if (isSortButton) {
        var tagsList = target.closest('.tags_list');
        var sortButton = elem('.tags_sort', tagsList);
        modifyClass(sortButton, 'sorted');

        var _tags = elems('.post_tag', tagsList);

        Array.from(_tags).forEach(function (tag) {
          var order = tag.dataset.position;
          var reverseSorting = containsClass(tag, active);
          tag.style.order = reverseSorting ? 0 : -order;
          modifyClass(tag, active);
        });
      }
    });
  })();

  (function shareViaLinkedin() {
    doc.addEventListener('click', function (event) {
      var linkedin = '.linkedin';
      var target = event.target;

      if (target.matches(linkedin) || target.closest(linkedin)) {
        window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(window.location.href), '', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
      }
    });
  })(); // add new code above this line

}

window.addEventListener('load', fileClosure());
},{}],"../../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57801" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.js.map