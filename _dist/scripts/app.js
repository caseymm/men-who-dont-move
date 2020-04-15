const e=function(e){let t,s,o;(s=e.indexOf("#"))>=0?(t=e.slice(s),e=e.slice(0,s)):t="";const i=e.indexOf("??");return i>=0?i+1!==e.lastIndexOf("?")&&(s=e.lastIndexOf("?")):s=e.indexOf("?"),s>=0?(o=e.slice(s),e=e.slice(0,s)):o="",{url:e,params:o,hash:t}},t=function(t){let s;return ({url:t}=e(t)),s=0===t.indexOf("file://")?t.replace(new RegExp("^file://(localhost)?"),""):t.replace(new RegExp("^([^:]+:)?//([^:/]+)(:\\d*)?/"),"/"),decodeURIComponent(s)};var s=function(e,t){if((e=e.replace(/^\/+/,"").toLowerCase())===(t=t.replace(/^\/+/,"").toLowerCase()))return 1e4;const s=e.split("/").reverse(),o=t.split("/").reverse(),i=Math.min(s.length,o.length);let r=0;for(;r<i&&s[r]===o[r];)++r;return r};const o=(e,t)=>s(e,t)>0,i=[{selector:"background",styleNames:["backgroundImage"]},{selector:"border",styleNames:["borderImage","webkitBorderImage","MozBorderImage"]}];class r{constructor(e){this.func=e,this.running=!1,this.id=null,this._handler=(()=>(this.running=!1,this.id=null,this.func()));}start(e){this.running&&clearTimeout(this.id),this.id=setTimeout(this._handler,e),this.running=!0;}stop(){this.running&&(clearTimeout(this.id),this.running=!1,this.id=null);}}r.start=((e,t)=>setTimeout(t,e));var n=new class{constructor(e,t,s){this.window=e,this.console=t,this.Timer=s,this.document=this.window.document,this.importCacheWaitPeriod=200,this.plugins=[];}addPlugin(e){return this.plugins.push(e)}analyze(e){}reload(e,t){this.options=t,this.options.stylesheetReloadTimeout||(this.options.stylesheetReloadTimeout=15e3);for(const s of Array.from(this.plugins))if(s.reload&&s.reload(e,t))return;if(!(t.liveCSS&&e.match(/\.css(?:\.map)?$/i)&&this.reloadStylesheet(e)))if(t.liveImg&&e.match(/\.(jpe?g|png|gif)$/i))this.reloadImages(e);else{if(!t.isChromeExtension)return this.reloadPage();this.reloadChromeExtension();}}reloadPage(){return this.window.document.location.reload()}reloadChromeExtension(){return this.window.chrome.runtime.reload()}reloadImages(e){let s;const r=this.generateUniqueString();for(s of Array.from(this.document.images))o(e,t(s.src))&&(s.src=this.generateCacheBustUrl(s.src,r));if(this.document.querySelectorAll)for(const{selector:t,styleNames:o}of i)for(s of Array.from(this.document.querySelectorAll(`[style*=${t}]`)))this.reloadStyleImages(s.style,o,e,r);if(this.document.styleSheets)return Array.from(this.document.styleSheets).map(t=>this.reloadStylesheetImages(t,e,r))}reloadStylesheetImages(e,t,s){let o;try{o=(e||{}).cssRules;}catch(e){}if(o)for(const e of Array.from(o))switch(e.type){case CSSRule.IMPORT_RULE:this.reloadStylesheetImages(e.styleSheet,t,s);break;case CSSRule.STYLE_RULE:for(const{styleNames:o}of i)this.reloadStyleImages(e.style,o,t,s);break;case CSSRule.MEDIA_RULE:this.reloadStylesheetImages(e,t,s);}}reloadStyleImages(e,s,i,r){for(const n of s){const s=e[n];if("string"==typeof s){const l=s.replace(new RegExp("\\burl\\s*\\(([^)]*)\\)"),(e,s)=>o(i,t(s))?`url(${this.generateCacheBustUrl(s,r)})`:e);l!==s&&(e[n]=l);}}}reloadStylesheet(e){let o,i;const r=(()=>{const e=[];for(i of Array.from(this.document.getElementsByTagName("link")))i.rel.match(/^stylesheet$/i)&&!i.__LiveReload_pendingRemoval&&e.push(i);return e})(),n=[];for(o of Array.from(this.document.getElementsByTagName("style")))o.sheet&&this.collectImportedStylesheets(o,o.sheet,n);for(i of Array.from(r))this.collectImportedStylesheets(i,i.sheet,n);if(this.window.StyleFix&&this.document.querySelectorAll)for(o of Array.from(this.document.querySelectorAll("style[data-href]")))r.push(o);this.console.log(`LiveReload found ${r.length} LINKed stylesheets, ${n.length} @imported stylesheets`);const l=function(e,t,o){let i,r={score:0};for(const n of t)(i=s(e,o(n)))>r.score&&(r={object:n,score:i});return 0===r.score?null:r}(e,r.concat(n),e=>t(this.linkHref(e)));if(l)l.object.rule?(this.console.log(`LiveReload is reloading imported stylesheet: ${l.object.href}`),this.reattachImportedRule(l.object)):(this.console.log(`LiveReload is reloading stylesheet: ${this.linkHref(l.object)}`),this.reattachStylesheetLink(l.object));else if(this.options.reloadMissingCSS)for(i of(this.console.log(`LiveReload will reload all stylesheets because path '${e}' did not match any specific one. To disable this behavior, set 'options.reloadMissingCSS' to 'false'.`),Array.from(r)))this.reattachStylesheetLink(i);else this.console.log(`LiveReload will not reload path '${e}' because the stylesheet was not found on the page and 'options.reloadMissingCSS' was set to 'false'.`);return !0}collectImportedStylesheets(e,t,s){let o;try{o=(t||{}).cssRules;}catch(e){}if(o&&o.length)for(let t=0;t<o.length;t++){const i=o[t];switch(i.type){case CSSRule.CHARSET_RULE:continue;case CSSRule.IMPORT_RULE:s.push({link:e,rule:i,index:t,href:i.href}),this.collectImportedStylesheets(e,i.styleSheet,s);}}}waitUntilCssLoads(e,t){let s=!1;const o=()=>{if(!s)return s=!0,t()};if(e.onload=(()=>(this.console.log("LiveReload: the new stylesheet has finished loading"),this.knownToSupportCssOnLoad=!0,o())),!this.knownToSupportCssOnLoad){let t;(t=(()=>e.sheet?(this.console.log("LiveReload is polling until the new CSS finishes loading..."),o()):this.Timer.start(50,t)))();}return this.Timer.start(this.options.stylesheetReloadTimeout,o)}linkHref(e){return e.href||e.getAttribute("data-href")}reattachStylesheetLink(e){let t;if(e.__LiveReload_pendingRemoval)return;e.__LiveReload_pendingRemoval=!0,"STYLE"===e.tagName?((t=this.document.createElement("link")).rel="stylesheet",t.media=e.media,t.disabled=e.disabled):t=e.cloneNode(!1),t.href=this.generateCacheBustUrl(this.linkHref(e));const s=e.parentNode;return s.lastChild===e?s.appendChild(t):s.insertBefore(t,e.nextSibling),this.waitUntilCssLoads(t,()=>{let s;return s=/AppleWebKit/.test(navigator.userAgent)?5:200,this.Timer.start(s,()=>{if(e.parentNode)return e.parentNode.removeChild(e),t.onreadystatechange=null,this.window.StyleFix?this.window.StyleFix.link(t):void 0})})}reattachImportedRule({rule:e,index:t,link:s}){const o=e.parentStyleSheet,i=this.generateCacheBustUrl(e.href),r=e.media.length?[].join.call(e.media,", "):"",n=`@import url("${i}") ${r};`;e.__LiveReload_newHref=i;const l=this.document.createElement("link");return l.rel="stylesheet",l.href=i,l.__LiveReload_pendingRemoval=!0,s.parentNode&&s.parentNode.insertBefore(l,s),this.Timer.start(this.importCacheWaitPeriod,()=>{if(l.parentNode&&l.parentNode.removeChild(l),e.__LiveReload_newHref===i)return o.insertRule(n,t),o.deleteRule(t+1),(e=o.cssRules[t]).__LiveReload_newHref=i,this.Timer.start(this.importCacheWaitPeriod,()=>{if(e.__LiveReload_newHref===i)return o.insertRule(n,t),o.deleteRule(t+1)})})}generateUniqueString(){return `livereload=${Date.now()}`}generateCacheBustUrl(t,s){let o,i;if(s||(s=this.generateUniqueString()),({url:t,hash:o,params:i}=e(t)),this.options.overrideURL&&t.indexOf(this.options.serverURL)<0){const e=t;t=this.options.serverURL+this.options.overrideURL+"?url="+encodeURIComponent(t),this.console.log(`LiveReload is overriding source URL ${e} with ${t}`);}let r=i.replace(/(\?|&)livereload=(\d+)/,(e,t)=>`${t}${s}`);return r===i&&(r=0===i.length?`?${s}`:`${i}&${s}`),t+r+o}}(window,console,r),l={liveCSS:!0,liveImg:!0};!function e(){var t=new EventSource("http://"+window.location.hostname+":"+window.location.port+"/__dev_sync__");t.addEventListener("open",function(){console.info("[DEV SYNC] Development server has connected.");}),t.addEventListener("error",function(s){console.error(s),t.readyState===EventSource.CLOSED&&(console.info("[DEV SYNC] Trying to reconnect in 5 seconds."),setTimeout(e,5e3));}),t.addEventListener("reload",function(e){var t=JSON.parse(e.data);n.reload(t.file||"",l);});}();

function e$1({modulePath:e=".",importFunctionName:t="__import__"}={}){try{self[t]=new Function("u","return import(u)");}catch(o){const r=new URL(e,location),n=e=>{URL.revokeObjectURL(e.src),e.remove();};self[t]=e=>new Promise((o,a)=>{const c=new URL(e,r);if(self[t].moduleMap[c])return o(self[t].moduleMap[c]);const l=new Blob([`import * as m from '${c}';`,`${t}.moduleMap['${c}']=m;`],{type:"text/javascript"}),m=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(l),onerror(){a(new Error(`Failed to import: ${e}`)),n(m);},onload(){o(self[t].moduleMap[c]),n(m);}});document.head.appendChild(m);}),self[t].moduleMap={};}}var t$1=Object.freeze({initialize:e$1});

// This needs to be done before any dynamic imports are used
t$1.initialize({ modulePath: 'scripts/' });

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */
(function() {

// Exit early if we're not running in a browser.
if (typeof window !== 'object') {
  return;
}

// Exit early if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

  // Minimal polyfill for Edge 15's lack of `isIntersecting`
  // See: https://github.com/w3c/IntersectionObserver/issues/211
  if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
    Object.defineProperty(window.IntersectionObserverEntry.prototype,
      'isIntersecting', {
      get: function () {
        return this.intersectionRatio > 0;
      }
    });
  }
  return;
}


/**
 * A local reference to the document.
 */
var document = window.document;


/**
 * Creates the global IntersectionObserverEntry constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
 * @param {Object} entry A dictionary of instance properties.
 * @constructor
 */
function IntersectionObserverEntry(entry) {
  this.time = entry.time;
  this.target = entry.target;
  this.rootBounds = entry.rootBounds;
  this.boundingClientRect = entry.boundingClientRect;
  this.intersectionRect = entry.intersectionRect || getEmptyRect();
  this.isIntersecting = !!entry.intersectionRect;

  // Calculates the intersection ratio.
  var targetRect = this.boundingClientRect;
  var targetArea = targetRect.width * targetRect.height;
  var intersectionRect = this.intersectionRect;
  var intersectionArea = intersectionRect.width * intersectionRect.height;

  // Sets intersection ratio.
  if (targetArea) {
    // Round the intersection ratio to avoid floating point math issues:
    // https://github.com/w3c/IntersectionObserver/issues/324
    this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
  } else {
    // If area is zero and is intersecting, sets to 1, otherwise to 0
    this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
}


/**
 * Creates the global IntersectionObserver constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
 * @param {Function} callback The function to be invoked after intersection
 *     changes have queued. The function is not invoked if the queue has
 *     been emptied by calling the `takeRecords` method.
 * @param {Object=} opt_options Optional configuration options.
 * @constructor
 */
function IntersectionObserver(callback, opt_options) {

  var options = opt_options || {};

  if (typeof callback != 'function') {
    throw new Error('callback must be a function');
  }

  if (options.root && options.root.nodeType != 1) {
    throw new Error('root must be an Element');
  }

  // Binds and throttles `this._checkForIntersections`.
  this._checkForIntersections = throttle(
      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

  // Private properties.
  this._callback = callback;
  this._observationTargets = [];
  this._queuedEntries = [];
  this._rootMarginValues = this._parseRootMargin(options.rootMargin);

  // Public properties.
  this.thresholds = this._initThresholds(options.threshold);
  this.root = options.root || null;
  this.rootMargin = this._rootMarginValues.map(function(margin) {
    return margin.value + margin.unit;
  }).join(' ');
}


/**
 * The minimum interval within which the document will be checked for
 * intersection changes.
 */
IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


/**
 * The frequency in which the polyfill polls for intersection changes.
 * this can be updated on a per instance basis and must be set prior to
 * calling `observe` on the first target.
 */
IntersectionObserver.prototype.POLL_INTERVAL = null;

/**
 * Use a mutation observer on the root element
 * to detect intersection changes.
 */
IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


/**
 * Starts observing a target element for intersection changes based on
 * the thresholds values.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.observe = function(target) {
  var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
    return item.element == target;
  });

  if (isTargetAlreadyObserved) {
    return;
  }

  if (!(target && target.nodeType == 1)) {
    throw new Error('target must be an Element');
  }

  this._registerInstance();
  this._observationTargets.push({element: target, entry: null});
  this._monitorIntersections();
  this._checkForIntersections();
};


/**
 * Stops observing a target element for intersection changes.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.unobserve = function(target) {
  this._observationTargets =
      this._observationTargets.filter(function(item) {

    return item.element != target;
  });
  if (!this._observationTargets.length) {
    this._unmonitorIntersections();
    this._unregisterInstance();
  }
};


/**
 * Stops observing all target elements for intersection changes.
 */
IntersectionObserver.prototype.disconnect = function() {
  this._observationTargets = [];
  this._unmonitorIntersections();
  this._unregisterInstance();
};


/**
 * Returns any queue entries that have not yet been reported to the
 * callback and clears the queue. This can be used in conjunction with the
 * callback to obtain the absolute most up-to-date intersection information.
 * @return {Array} The currently queued entries.
 */
IntersectionObserver.prototype.takeRecords = function() {
  var records = this._queuedEntries.slice();
  this._queuedEntries = [];
  return records;
};


/**
 * Accepts the threshold value from the user configuration object and
 * returns a sorted array of unique threshold values. If a value is not
 * between 0 and 1 and error is thrown.
 * @private
 * @param {Array|number=} opt_threshold An optional threshold value or
 *     a list of threshold values, defaulting to [0].
 * @return {Array} A sorted list of unique and valid threshold values.
 */
IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
  var threshold = opt_threshold || [0];
  if (!Array.isArray(threshold)) threshold = [threshold];

  return threshold.sort().filter(function(t, i, a) {
    if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
      throw new Error('threshold must be a number between 0 and 1 inclusively');
    }
    return t !== a[i - 1];
  });
};


/**
 * Accepts the rootMargin value from the user configuration object
 * and returns an array of the four margin values as an object containing
 * the value and unit properties. If any of the values are not properly
 * formatted or use a unit other than px or %, and error is thrown.
 * @private
 * @param {string=} opt_rootMargin An optional rootMargin value,
 *     defaulting to '0px'.
 * @return {Array<Object>} An array of margin objects with the keys
 *     value and unit.
 */
IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
  var marginString = opt_rootMargin || '0px';
  var margins = marginString.split(/\s+/).map(function(margin) {
    var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
    if (!parts) {
      throw new Error('rootMargin must be specified in pixels or percent');
    }
    return {value: parseFloat(parts[1]), unit: parts[2]};
  });

  // Handles shorthand.
  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];

  return margins;
};


/**
 * Starts polling for intersection changes if the polling is not already
 * happening, and if the page's visibility state is visible.
 * @private
 */
IntersectionObserver.prototype._monitorIntersections = function() {
  if (!this._monitoringIntersections) {
    this._monitoringIntersections = true;

    // If a poll interval is set, use polling instead of listening to
    // resize and scroll events or DOM mutations.
    if (this.POLL_INTERVAL) {
      this._monitoringInterval = setInterval(
          this._checkForIntersections, this.POLL_INTERVAL);
    }
    else {
      addEvent(window, 'resize', this._checkForIntersections, true);
      addEvent(document, 'scroll', this._checkForIntersections, true);

      if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
        this._domObserver = new MutationObserver(this._checkForIntersections);
        this._domObserver.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @private
 */
IntersectionObserver.prototype._unmonitorIntersections = function() {
  if (this._monitoringIntersections) {
    this._monitoringIntersections = false;

    clearInterval(this._monitoringInterval);
    this._monitoringInterval = null;

    removeEvent(window, 'resize', this._checkForIntersections, true);
    removeEvent(document, 'scroll', this._checkForIntersections, true);

    if (this._domObserver) {
      this._domObserver.disconnect();
      this._domObserver = null;
    }
  }
};


/**
 * Scans each observation target for intersection changes and adds them
 * to the internal entries queue. If new entries are found, it
 * schedules the callback to be invoked.
 * @private
 */
IntersectionObserver.prototype._checkForIntersections = function() {
  var rootIsInDom = this._rootIsInDom();
  var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

  this._observationTargets.forEach(function(item) {
    var target = item.element;
    var targetRect = getBoundingClientRect(target);
    var rootContainsTarget = this._rootContainsTarget(target);
    var oldEntry = item.entry;
    var intersectionRect = rootIsInDom && rootContainsTarget &&
        this._computeTargetAndRootIntersection(target, rootRect);

    var newEntry = item.entry = new IntersectionObserverEntry({
      time: now(),
      target: target,
      boundingClientRect: targetRect,
      rootBounds: rootRect,
      intersectionRect: intersectionRect
    });

    if (!oldEntry) {
      this._queuedEntries.push(newEntry);
    } else if (rootIsInDom && rootContainsTarget) {
      // If the new entry intersection ratio has crossed any of the
      // thresholds, add a new entry.
      if (this._hasCrossedThreshold(oldEntry, newEntry)) {
        this._queuedEntries.push(newEntry);
      }
    } else {
      // If the root is not in the DOM or target is not contained within
      // root but the previous entry for this target had an intersection,
      // add a new record indicating removal.
      if (oldEntry && oldEntry.isIntersecting) {
        this._queuedEntries.push(newEntry);
      }
    }
  }, this);

  if (this._queuedEntries.length) {
    this._callback(this.takeRecords(), this);
  }
};


/**
 * Accepts a target and root rect computes the intersection between then
 * following the algorithm in the spec.
 * TODO(philipwalton): at this time clip-path is not considered.
 * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
 * @param {Element} target The target DOM element
 * @param {Object} rootRect The bounding rect of the root after being
 *     expanded by the rootMargin value.
 * @return {?Object} The final intersection rect object or undefined if no
 *     intersection is found.
 * @private
 */
IntersectionObserver.prototype._computeTargetAndRootIntersection =
    function(target, rootRect) {

  // If the element isn't displayed, an intersection can't happen.
  if (window.getComputedStyle(target).display == 'none') return;

  var targetRect = getBoundingClientRect(target);
  var intersectionRect = targetRect;
  var parent = getParentNode(target);
  var atRoot = false;

  while (!atRoot) {
    var parentRect = null;
    var parentComputedStyle = parent.nodeType == 1 ?
        window.getComputedStyle(parent) : {};

    // If the parent isn't displayed, an intersection can't happen.
    if (parentComputedStyle.display == 'none') return;

    if (parent == this.root || parent == document) {
      atRoot = true;
      parentRect = rootRect;
    } else {
      // If the element has a non-visible overflow, and it's not the <body>
      // or <html> element, update the intersection rect.
      // Note: <body> and <html> cannot be clipped to a rect that's not also
      // the document rect, so no need to compute a new intersection.
      if (parent != document.body &&
          parent != document.documentElement &&
          parentComputedStyle.overflow != 'visible') {
        parentRect = getBoundingClientRect(parent);
      }
    }

    // If either of the above conditionals set a new parentRect,
    // calculate new intersection data.
    if (parentRect) {
      intersectionRect = computeRectIntersection(parentRect, intersectionRect);

      if (!intersectionRect) break;
    }
    parent = getParentNode(parent);
  }
  return intersectionRect;
};


/**
 * Returns the root rect after being expanded by the rootMargin value.
 * @return {Object} The expanded root rect.
 * @private
 */
IntersectionObserver.prototype._getRootRect = function() {
  var rootRect;
  if (this.root) {
    rootRect = getBoundingClientRect(this.root);
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    var html = document.documentElement;
    var body = document.body;
    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }
  return this._expandRectByRootMargin(rootRect);
};


/**
 * Accepts a rect and expands it by the rootMargin value.
 * @param {Object} rect The rect object to expand.
 * @return {Object} The expanded rect.
 * @private
 */
IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
  var margins = this._rootMarginValues.map(function(margin, i) {
    return margin.unit == 'px' ? margin.value :
        margin.value * (i % 2 ? rect.width : rect.height) / 100;
  });
  var newRect = {
    top: rect.top - margins[0],
    right: rect.right + margins[1],
    bottom: rect.bottom + margins[2],
    left: rect.left - margins[3]
  };
  newRect.width = newRect.right - newRect.left;
  newRect.height = newRect.bottom - newRect.top;

  return newRect;
};


/**
 * Accepts an old and new entry and returns true if at least one of the
 * threshold values has been crossed.
 * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
 *    particular target element or null if no previous entry exists.
 * @param {IntersectionObserverEntry} newEntry The current entry for a
 *    particular target element.
 * @return {boolean} Returns true if a any threshold has been crossed.
 * @private
 */
IntersectionObserver.prototype._hasCrossedThreshold =
    function(oldEntry, newEntry) {

  // To make comparing easier, an entry that has a ratio of 0
  // but does not actually intersect is given a value of -1
  var oldRatio = oldEntry && oldEntry.isIntersecting ?
      oldEntry.intersectionRatio || 0 : -1;
  var newRatio = newEntry.isIntersecting ?
      newEntry.intersectionRatio || 0 : -1;

  // Ignore unchanged ratios
  if (oldRatio === newRatio) return;

  for (var i = 0; i < this.thresholds.length; i++) {
    var threshold = this.thresholds[i];

    // Return true if an entry matches a threshold or if the new ratio
    // and the old ratio are on the opposite sides of a threshold.
    if (threshold == oldRatio || threshold == newRatio ||
        threshold < oldRatio !== threshold < newRatio) {
      return true;
    }
  }
};


/**
 * Returns whether or not the root element is an element and is in the DOM.
 * @return {boolean} True if the root element is an element and is in the DOM.
 * @private
 */
IntersectionObserver.prototype._rootIsInDom = function() {
  return !this.root || containsDeep(document, this.root);
};


/**
 * Returns whether or not the target element is a child of root.
 * @param {Element} target The target element to check.
 * @return {boolean} True if the target element is a child of root.
 * @private
 */
IntersectionObserver.prototype._rootContainsTarget = function(target) {
  return containsDeep(this.root || document, target);
};


/**
 * Adds the instance to the global IntersectionObserver registry if it isn't
 * already present.
 * @private
 */
IntersectionObserver.prototype._registerInstance = function() {
};


/**
 * Removes the instance from the global IntersectionObserver registry.
 * @private
 */
IntersectionObserver.prototype._unregisterInstance = function() {
};


/**
 * Returns the result of the performance.now() method or null in browsers
 * that don't support the API.
 * @return {number} The elapsed time since the page was requested.
 */
function now() {
  return window.performance && performance.now && performance.now();
}


/**
 * Throttles a function and delays its execution, so it's only called at most
 * once within a given time period.
 * @param {Function} fn The function to throttle.
 * @param {number} timeout The amount of time that must pass before the
 *     function can be called again.
 * @return {Function} The throttled function.
 */
function throttle(fn, timeout) {
  var timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function() {
        fn();
        timer = null;
      }, timeout);
    }
  };
}


/**
 * Adds an event handler to a DOM node ensuring cross-browser compatibility.
 * @param {Node} node The DOM node to add the event handler to.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to add.
 * @param {boolean} opt_useCapture Optionally adds the even to the capture
 *     phase. Note: this only works in modern browsers.
 */
function addEvent(node, event, fn, opt_useCapture) {
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.attachEvent == 'function') {
    node.attachEvent('on' + event, fn);
  }
}


/**
 * Removes a previously added event handler from a DOM node.
 * @param {Node} node The DOM node to remove the event handler from.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to remove.
 * @param {boolean} opt_useCapture If the event handler was added with this
 *     flag set to true, it should be set to true here in order to remove it.
 */
function removeEvent(node, event, fn, opt_useCapture) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.detatchEvent == 'function') {
    node.detatchEvent('on' + event, fn);
  }
}


/**
 * Returns the intersection between two rect objects.
 * @param {Object} rect1 The first rect.
 * @param {Object} rect2 The second rect.
 * @return {?Object} The intersection rect or undefined if no intersection
 *     is found.
 */
function computeRectIntersection(rect1, rect2) {
  var top = Math.max(rect1.top, rect2.top);
  var bottom = Math.min(rect1.bottom, rect2.bottom);
  var left = Math.max(rect1.left, rect2.left);
  var right = Math.min(rect1.right, rect2.right);
  var width = right - left;
  var height = bottom - top;

  return (width >= 0 && height >= 0) && {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: width,
    height: height
  };
}


/**
 * Shims the native getBoundingClientRect for compatibility with older IE.
 * @param {Element} el The element whose bounding rect to get.
 * @return {Object} The (possibly shimmed) rect of the element.
 */
function getBoundingClientRect(el) {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/w3c/IntersectionObserver/pull/205
  }

  if (!rect) return getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
}


/**
 * Returns an empty rect object. An empty rect is returned when an element
 * is not in the DOM.
 * @return {Object} The empty rect.
 */
function getEmptyRect() {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
}

/**
 * Checks to see if a parent element contains a child element (including inside
 * shadow DOM).
 * @param {Node} parent The parent element.
 * @param {Node} child The child element.
 * @return {boolean} True if the parent node contains the child node.
 */
function containsDeep(parent, child) {
  var node = child;
  while (node) {
    if (node == parent) return true;

    node = getParentNode(node);
  }
  return false;
}


/**
 * Gets the parent node of an element or its host element if the parent node
 * is a shadow root.
 * @param {Node} node The node whose parent to get.
 * @return {Node|null} The parent node or null if no parent exists.
 */
function getParentNode(node) {
  var parent = node.parentNode;

  if (parent && parent.nodeType == 11 && parent.host) {
    // If the parent is a shadow root, return the host element.
    return parent.host;
  }

  if (parent && parent.assignedSlot) {
    // If the parent is distributed in a <slot>, return the parent of a slot.
    return parent.assignedSlot.parentNode;
  }

  return parent;
}


// Exposes the constructors globally.
window.IntersectionObserver = IntersectionObserver;
window.IntersectionObserverEntry = IntersectionObserverEntry;

}());

function yall (options) {
  options = options || {};

  // Options
  const lazyClass = options.lazyClass || "lazy";
  const lazyBackgroundClass = options.lazyBackgroundClass || "lazy-bg";
  const idleLoadTimeout = "idleLoadTimeout" in options ? options.idleLoadTimeout : 200;
  const observeChanges = options.observeChanges || false;
  const events = options.events || {};

  // Shorthands (saves more than a few bytes!)
  const win = window;
  const ric = "requestIdleCallback";
  const io = "IntersectionObserver";

  // App stuff
  const dataAttrs = ["srcset", "src", "poster"];
  const arr = [];
  const queryDOM = (selector, root) => arr.slice.call((root || document).querySelectorAll(selector || `img.${lazyClass},video.${lazyClass},iframe.${lazyClass},.${lazyBackgroundClass}`));

  // This function handles lazy loading of elements.
  const yallLoad = element => {
    const parentNode = element.parentNode;
    let sourceNode;

    if (parentNode.nodeName == "PICTURE") {
      sourceNode = parentNode;
    }

    if (element.nodeName == "VIDEO") {
      sourceNode = element;
    }

    yallApplyFn(queryDOM("source", sourceNode), yallFlipDataAttrs);
    yallFlipDataAttrs(element);

    if (element.autoplay) {
      element.load();
    }

    const classList = element.classList;

    // Lazy load CSS background images
    if (classList.contains(lazyBackgroundClass)) {
      classList.remove(lazyBackgroundClass);
      classList.add(options.lazyBackgroundLoaded || "lazy-bg-loaded");
    }
  };

  const yallBindEvents = element => {
    for (let eventIndex in events) {
      element.addEventListener(eventIndex, events[eventIndex].listener || events[eventIndex], events[eventIndex].options || undefined);
    }
  };

  // Added because there was a number of patterns like this peppered throughout
  // the code. This just flips necessary data- attrs on an element
  const yallFlipDataAttrs = element => {
    for (let dataAttrIndex in dataAttrs) {
      if (dataAttrs[dataAttrIndex] in element.dataset) {
        win["requestAnimationFrame"](() => {
          element.setAttribute(dataAttrs[dataAttrIndex], element.dataset[dataAttrs[dataAttrIndex]]);
        });
      }
    }
  };

  // Noticed lots of loops where a function simply gets executed on every
  // member of an array. This abstraction eliminates that repetiive code.
  const yallApplyFn = (items, fn) => {
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      fn instanceof win[io] ? fn.observe(items[itemIndex]) : fn(items[itemIndex]);
    }
  };

  const yallIntersectionObserve = entry => {
    if (entry.isIntersecting || entry.intersectionRatio) {
      const element = entry.target;

      if (ric in win && idleLoadTimeout) {
        win[ric](() => {
          yallLoad(element);
        }, {
          timeout: idleLoadTimeout
        });
      } else {
        yallLoad(element);
      }

      element.classList.remove(lazyClass);
      intersectionListener.unobserve(element);
      lazyElements = lazyElements.filter(lazyElement => lazyElement != element);

      if (!lazyElements.length && !observeChanges) {
        intersectionListener.disconnect();
      }
    }
  };

  const yallMutationObserve = newElement => {
    if (lazyElements.indexOf(newElement) < 0) {
      lazyElements.push(newElement);
      yallBindEvents(newElement);
      intersectionListener.observe(newElement);
    }
  };

  const yallCreateMutationObserver = entry => {
    new MutationObserver(() => {
      yallApplyFn(queryDOM(), yallMutationObserve);
    }).observe(entry, options.mutationObserverOptions || {
      childList: true,
      subtree: true
    });
  };

  let lazyElements = queryDOM();

  // If the current user agent is a known crawler, immediately load all media
  // for the elements yall is listening for and halt execution (good for SEO).
  if (/baidu|(?:google|bing|yandex|duckduck)bot/i.test(navigator.userAgent)) {
    yallApplyFn(lazyElements, yallLoad);

    return;
  }

  if (io in win && `${io}Entry` in win) {
    var intersectionListener = new win[io](entries => {
      yallApplyFn(entries, yallIntersectionObserve);
    }, {
      rootMargin: `${"threshold" in options ? options.threshold : 200}px 0%`
    });

    yallApplyFn(lazyElements, yallBindEvents);
    yallApplyFn(lazyElements, intersectionListener);

    if (observeChanges) {
      yallApplyFn(queryDOM(options.observeRootSelector || "body"), yallCreateMutationObserver);
    }
  }
}

// packages

document.addEventListener('DOMContentLoaded', yall); // Write your code!

console.log('Hello, world!');
//# sourceMappingURL=app.js.map
