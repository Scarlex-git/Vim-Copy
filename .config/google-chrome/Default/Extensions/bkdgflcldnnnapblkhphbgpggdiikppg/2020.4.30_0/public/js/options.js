(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var document = require('global/document')
var hyperx = require('hyperx')
var onload = require('on-load')

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  selected: 1,
  willvalidate: 1
}
var COMMENT_TAG = '!--'
var SVG_TAGS = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else if (tag === COMMENT_TAG) {
    return document.createComment(props.comment)
  } else {
    el = document.createElement(tag)
  }

  // If adding onload events
  if (props.onload || props.onunload) {
    var load = props.onload || function () {}
    var unload = props.onunload || function () {}
    onload(el, function belOnload () {
      load(el)
    }, function belOnunload () {
      unload(el)
    },
    // We have to use non-standard `caller` to find who invokes `belCreateElement`
    belCreateElement.caller.caller.caller)
    delete props.onload
    delete props.onunload
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        typeof node === 'function' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = document.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

module.exports = hyperx(belCreateElement, {comments: true})
module.exports.default = module.exports
module.exports.createElement = belCreateElement

},{"global/document":3,"hyperx":6,"on-load":8}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":2}],4:[function(require,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],6:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12
var COMMENT = 13

module.exports = function (h, opts) {
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }
  if (opts.attrToProp !== false) {
    h = attrToProp(h)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        if (xstate === OPEN) {
          if (reg === '/') {
            p.push([ OPEN, '/', arg ])
            reg = ''
          } else {
            p.push([ OPEN, arg ])
          }
        } else {
          p.push([ VAR, xstate, arg ])
        }
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else parts[i][1]==="" || (cur[1][key] = concat(cur[1][key], parts[i][1]));
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else parts[i][2]==="" || (cur[1][key] = concat(cur[1][key], parts[i][2]));
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            if (parts[i][0] === CLOSE) {
              i--
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state) && state !== COMMENT) {
          if (state === OPEN && reg.length) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === COMMENT && /-$/.test(reg) && c === '-') {
          if (opts.comments) {
            res.push([ATTR_VALUE,reg.substr(0, reg.length - 1)],[CLOSE])
          }
          reg = ''
          state = TEXT
        } else if (state === OPEN && /^!--$/.test(reg)) {
          if (opts.comments) {
            res.push([OPEN, reg],[ATTR_KEY,'comment'],[ATTR_EQ])
          }
          reg = c
          state = COMMENT
        } else if (state === TEXT || state === COMMENT) {
          reg += c
        } else if (state === OPEN && c === '/' && reg.length) {
          // no-op, self closing tag without a space <br/>
        } else if (state === OPEN && /\s/.test(c)) {
          if (reg.length) {
            res.push([OPEN, reg])
          }
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[^\s"'=/]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":5}],7:[function(require,module,exports){
assert.notEqual = notEqual
assert.notOk = notOk
assert.equal = equal
assert.ok = assert

module.exports = assert

function equal (a, b, m) {
  assert(a == b, m) // eslint-disable-line eqeqeq
}

function notEqual (a, b, m) {
  assert(a != b, m) // eslint-disable-line eqeqeq
}

function notOk (t, m) {
  assert(!t, m)
}

function assert (t, m) {
  if (!t) throw new Error(m || 'AssertionError')
}

},{}],8:[function(require,module,exports){
/* global MutationObserver */
var document = require('global/document')
var window = require('global/window')
var assert = require('assert')
var watch = Object.create(null)
var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36)
var KEY_ATTR = 'data-' + KEY_ID
var INDEX = 0

if (window && window.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    if (Object.keys(watch).length < 1) return
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === KEY_ATTR) {
        eachAttr(mutations[i], turnon, turnoff)
        continue
      }
      eachMutation(mutations[i].removedNodes, turnoff)
      eachMutation(mutations[i].addedNodes, turnon)
    }
  })
  if (document.body) {
    beginObserve(observer)
  } else {
    document.addEventListener('DOMContentLoaded', function (event) {
      beginObserve(observer)
    })
  }
}

function beginObserve (observer) {
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [KEY_ATTR]
  })
}

module.exports = function onload (el, on, off, caller) {
  assert(document.body, 'on-load: will not work prior to DOMContentLoaded')
  on = on || function () {}
  off = off || function () {}
  el.setAttribute(KEY_ATTR, 'o' + INDEX)
  watch['o' + INDEX] = [on, off, 0, caller || onload.caller]
  INDEX += 1
  return el
}

module.exports.KEY_ATTR = KEY_ATTR
module.exports.KEY_ID = KEY_ID

function turnon (index, el) {
  if (watch[index][0] && watch[index][2] === 0) {
    watch[index][0](el)
    watch[index][2] = 1
  }
}

function turnoff (index, el) {
  if (watch[index][1] && watch[index][2] === 1) {
    watch[index][1](el)
    watch[index][2] = 0
  }
}

function eachAttr (mutation, on, off) {
  var newValue = mutation.target.getAttribute(KEY_ATTR)
  if (sameOrigin(mutation.oldValue, newValue)) {
    watch[newValue] = watch[mutation.oldValue]
    return
  }
  if (watch[mutation.oldValue]) {
    off(mutation.oldValue, mutation.target)
  }
  if (watch[newValue]) {
    on(newValue, mutation.target)
  }
}

function sameOrigin (oldValue, newValue) {
  if (!oldValue || !newValue) return false
  return watch[oldValue][3] === watch[newValue][3]
}

function eachMutation (nodes, fn) {
  var keys = Object.keys(watch)
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
      var onloadid = nodes[i].getAttribute(KEY_ATTR)
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k, nodes[i])
        }
      })
    }
    if (nodes[i].childNodes.length > 0) {
      eachMutation(nodes[i].childNodes, fn)
    }
  }
}

},{"assert":7,"global/document":3,"global/window":4}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Check if `vhost` is a valid suffix of `hostname` (top-domain)
 *
 * It means that `vhost` needs to be a suffix of `hostname` and we then need to
 * make sure that: either they are equal, or the character preceding `vhost` in
 * `hostname` is a '.' (it should not be a partial label).
 *
 * * hostname = 'not.evil.com' and vhost = 'vil.com'      => not ok
 * * hostname = 'not.evil.com' and vhost = 'evil.com'     => ok
 * * hostname = 'not.evil.com' and vhost = 'not.evil.com' => ok
 */
function shareSameDomainSuffix(hostname, vhost) {
    if (hostname.endsWith(vhost)) {
        return (hostname.length === vhost.length ||
            hostname[hostname.length - vhost.length - 1] === '.');
    }
    return false;
}
/**
 * Given a hostname and its public suffix, extract the general domain.
 */
function extractDomainWithSuffix(hostname, publicSuffix) {
    // Locate the index of the last '.' in the part of the `hostname` preceding
    // the public suffix.
    //
    // examples:
    //   1. not.evil.co.uk  => evil.co.uk
    //         ^    ^
    //         |    | start of public suffix
    //         | index of the last dot
    //
    //   2. example.co.uk   => example.co.uk
    //     ^       ^
    //     |       | start of public suffix
    //     |
    //     | (-1) no dot found before the public suffix
    var publicSuffixIndex = hostname.length - publicSuffix.length - 2;
    var lastDotBeforeSuffixIndex = hostname.lastIndexOf('.', publicSuffixIndex);
    // No '.' found, then `hostname` is the general domain (no sub-domain)
    if (lastDotBeforeSuffixIndex === -1) {
        return hostname;
    }
    // Extract the part between the last '.'
    return hostname.slice(lastDotBeforeSuffixIndex + 1);
}
/**
 * Detects the domain based on rules and upon and a host string
 */
function getDomain(suffix, hostname, options) {
    // Check if `hostname` ends with a member of `validHosts`.
    if (options.validHosts !== null) {
        var validHosts = options.validHosts;
        for (var i = 0; i < validHosts.length; i += 1) {
            var vhost = validHosts[i];
            if (shareSameDomainSuffix(hostname, vhost)) {
                return vhost;
            }
        }
    }
    // If `hostname` is a valid public suffix, then there is no domain to return.
    // Since we already know that `getPublicSuffix` returns a suffix of `hostname`
    // there is no need to perform a string comparison and we only compare the
    // size.
    if (suffix.length === hostname.length) {
        return null;
    }
    // To extract the general domain, we start by identifying the public suffix
    // (if any), then consider the domain to be the public suffix with one added
    // level of depth. (e.g.: if hostname is `not.evil.co.uk` and public suffix:
    // `co.uk`, then we take one more level: `evil`, giving the final result:
    // `evil.co.uk`).
    return extractDomainWithSuffix(hostname, suffix);
}

/**
 * Return the part of domain without suffix.
 *
 * Example: for domain 'foo.com', the result would be 'foo'.
 */
function getDomainWithoutSuffix(domain, suffix) {
    // Note: here `domain` and `suffix` cannot have the same length because in
    // this case we set `domain` to `null` instead. It is thus safe to assume
    // that `suffix` is shorter than `domain`.
    return domain.slice(0, -suffix.length - 1);
}

/**
 * @param url - URL we want to extract a hostname from.
 * @param urlIsValidHostname - hint from caller; true if `url` is already a valid hostname.
 */
function extractHostname(url, urlIsValidHostname) {
    var start = 0;
    var end = url.length;
    var hasUpper = false;
    // If url is not already a valid hostname, then try to extract hostname.
    if (urlIsValidHostname === false) {
        // Trim leading spaces
        while (start < url.length && url.charCodeAt(start) <= 32) {
            start += 1;
        }
        // Trim trailing spaces
        while (end > start + 1 && url.charCodeAt(end - 1) <= 32) {
            end -= 1;
        }
        // Skip scheme.
        if (url.charCodeAt(start) === 47 /* '/' */ &&
            url.charCodeAt(start + 1) === 47 /* '/' */) {
            start += 2;
        }
        else {
            var indexOfProtocol = url.indexOf(':/', start);
            if (indexOfProtocol !== -1) {
                // Implement fast-path for common protocols. We expect most protocols
                // should be one of these 4 and thus we will not need to perform the
                // more expansive validity check most of the time.
                var protocolSize = indexOfProtocol - start;
                var c0 = url.charCodeAt(start);
                var c1 = url.charCodeAt(start + 1);
                var c2 = url.charCodeAt(start + 2);
                var c3 = url.charCodeAt(start + 3);
                var c4 = url.charCodeAt(start + 4);
                if (protocolSize === 5 &&
                    c0 === 104 /* 'h' */ &&
                    c1 === 116 /* 't' */ &&
                    c2 === 116 /* 't' */ &&
                    c3 === 112 /* 'p' */ &&
                    c4 === 115 /* 's' */) ;
                else if (protocolSize === 4 &&
                    c0 === 104 /* 'h' */ &&
                    c1 === 116 /* 't' */ &&
                    c2 === 116 /* 't' */ &&
                    c3 === 112 /* 'p' */) ;
                else if (protocolSize === 3 &&
                    c0 === 119 /* 'w' */ &&
                    c1 === 115 /* 's' */ &&
                    c2 === 115 /* 's' */) ;
                else if (protocolSize === 2 &&
                    c0 === 119 /* 'w' */ &&
                    c1 === 115 /* 's' */) ;
                else {
                    // Check that scheme is valid
                    for (var i = start; i < indexOfProtocol; i += 1) {
                        var lowerCaseCode = url.charCodeAt(i) | 32;
                        if (((lowerCaseCode >= 97 && lowerCaseCode <= 122) || // [a, z]
                            (lowerCaseCode >= 48 && lowerCaseCode <= 57) || // [0, 9]
                            lowerCaseCode === 46 || // '.'
                            lowerCaseCode === 45 || // '-'
                            lowerCaseCode === 43) === false // '+'
                        ) {
                            return null;
                        }
                    }
                }
                // Skip 0, 1 or more '/' after ':/'
                start = indexOfProtocol + 2;
                while (url.charCodeAt(start) === 47 /* '/' */) {
                    start += 1;
                }
            }
        }
        // Detect first occurrence of '/', '?' or '#'. We also keep track of the
        // last occurrence of '@', ']' or ':' to speed-up subsequent parsing of
        // (respectively), identifier, ipv6 or port.
        var indexOfIdentifier = -1;
        var indexOfClosingBracket = -1;
        var indexOfPort = -1;
        for (var i = start; i < end; i += 1) {
            var code = url.charCodeAt(i);
            if (code === 35 || // '#'
                code === 47 || // '/'
                code === 63 // '?'
            ) {
                end = i;
                break;
            }
            else if (code === 64) {
                // '@'
                indexOfIdentifier = i;
            }
            else if (code === 93) {
                // ']'
                indexOfClosingBracket = i;
            }
            else if (code === 58) {
                // ':'
                indexOfPort = i;
            }
            else if (code >= 65 && code <= 90) {
                hasUpper = true;
            }
        }
        // Detect identifier: '@'
        if (indexOfIdentifier !== -1 &&
            indexOfIdentifier > start &&
            indexOfIdentifier < end) {
            start = indexOfIdentifier + 1;
        }
        // Handle ipv6 addresses
        if (url.charCodeAt(start) === 91 /* '[' */) {
            if (indexOfClosingBracket !== -1) {
                return url.slice(start + 1, indexOfClosingBracket).toLowerCase();
            }
            return null;
        }
        else if (indexOfPort !== -1 && indexOfPort > start && indexOfPort < end) {
            // Detect port: ':'
            end = indexOfPort;
        }
    }
    // Trim trailing dots
    while (end > start + 1 && url.charCodeAt(end - 1) === 46 /* '.' */) {
        end -= 1;
    }
    var hostname = start !== 0 || end !== url.length ? url.slice(start, end) : url;
    if (hasUpper) {
        return hostname.toLowerCase();
    }
    return hostname;
}

/**
 * Check if a hostname is an IP. You should be aware that this only works
 * because `hostname` is already garanteed to be a valid hostname!
 */
function isProbablyIpv4(hostname) {
    // Cannot be shorted than 1.1.1.1
    if (hostname.length < 7) {
        return false;
    }
    // Cannot be longer than: 255.255.255.255
    if (hostname.length > 15) {
        return false;
    }
    var numberOfDots = 0;
    for (var i = 0; i < hostname.length; i += 1) {
        var code = hostname.charCodeAt(i);
        if (code === 46 /* '.' */) {
            numberOfDots += 1;
        }
        else if (code < 48 /* '0' */ || code > 57 /* '9' */) {
            return false;
        }
    }
    return (numberOfDots === 3 &&
        hostname.charCodeAt(0) !== 46 /* '.' */ &&
        hostname.charCodeAt(hostname.length - 1) !== 46 /* '.' */);
}
/**
 * Similar to isProbablyIpv4.
 */
function isProbablyIpv6(hostname) {
    if (hostname.length < 3) {
        return false;
    }
    var start = hostname[0] === '[' ? 1 : 0;
    var end = hostname.length;
    if (hostname[end - 1] === ']') {
        end -= 1;
    }
    // We only consider the maximum size of a normal IPV6. Note that this will
    // fail on so-called "IPv4 mapped IPv6 addresses" but this is a corner-case
    // and a proper validation library should be used for these.
    if (end - start > 39) {
        return false;
    }
    var hasColon = false;
    for (; start < end; start += 1) {
        var code = hostname.charCodeAt(start);
        if (code === 58 /* ':' */) {
            hasColon = true;
        }
        else if (((code >= 48 && code <= 57) || // 0-9
            (code >= 97 && code <= 102) || // a-f
            (code >= 65 && code <= 90) // A-F
        ) === false) {
            return false;
        }
    }
    return hasColon;
}
/**
 * Check if `hostname` is *probably* a valid ip addr (either ipv6 or ipv4).
 * This *will not* work on any string. We need `hostname` to be a valid
 * hostname.
 */
function isIp(hostname) {
    return isProbablyIpv6(hostname) || isProbablyIpv4(hostname);
}

/**
 * Implements fast shallow verification of hostnames. This does not perform a
 * struct check on the content of labels (classes of Unicode characters, etc.)
 * but instead check that the structure is valid (number of labels, length of
 * labels, etc.).
 *
 * If you need stricter validation, consider using an external library.
 */
function isValidAscii(code) {
    return ((code >= 97 && code <= 122) || (code >= 48 && code <= 57) || code > 127);
}
/**
 * Check if a hostname string is valid. It's usually a preliminary check before
 * trying to use getDomain or anything else.
 *
 * Beware: it does not check if the TLD exists.
 */
function isValidHostname (hostname) {
    if (hostname.length > 255) {
        return false;
    }
    if (hostname.length === 0) {
        return false;
    }
    if (!isValidAscii(hostname.charCodeAt(0))) {
        return false;
    }
    // Validate hostname according to RFC
    var lastDotIndex = -1;
    var lastCharCode = -1;
    var len = hostname.length;
    for (var i = 0; i < len; i += 1) {
        var code = hostname.charCodeAt(i);
        if (code === 46 /* '.' */) {
            if (
            // Check that previous label is < 63 bytes long (64 = 63 + '.')
            i - lastDotIndex > 64 ||
                // Check that previous character was not already a '.'
                lastCharCode === 46 ||
                // Check that the previous label does not end with a '-' (dash)
                lastCharCode === 45 ||
                // Check that the previous label does not end with a '_' (underscore)
                lastCharCode === 95) {
                return false;
            }
            lastDotIndex = i;
        }
        else if (!(isValidAscii(code) || code === 45 || code === 95)) {
            // Check if there is a forbidden character in the label
            return false;
        }
        lastCharCode = code;
    }
    return (
    // Check that last label is shorter than 63 chars
    len - lastDotIndex - 1 <= 63 &&
        // Check that the last character is an allowed trailing label character.
        // Since we already checked that the char is a valid hostname character,
        // we only need to check that it's different from '-'.
        lastCharCode !== 45);
}

function setDefaultsImpl(_a) {
    var _b = _a.allowIcannDomains, allowIcannDomains = _b === void 0 ? true : _b, _c = _a.allowPrivateDomains, allowPrivateDomains = _c === void 0 ? false : _c, _d = _a.detectIp, detectIp = _d === void 0 ? true : _d, _e = _a.extractHostname, extractHostname = _e === void 0 ? true : _e, _f = _a.mixedInputs, mixedInputs = _f === void 0 ? true : _f, _g = _a.validHosts, validHosts = _g === void 0 ? null : _g, _h = _a.validateHostname, validateHostname = _h === void 0 ? true : _h;
    return {
        allowIcannDomains: allowIcannDomains,
        allowPrivateDomains: allowPrivateDomains,
        detectIp: detectIp,
        extractHostname: extractHostname,
        mixedInputs: mixedInputs,
        validHosts: validHosts,
        validateHostname: validateHostname
    };
}
var DEFAULT_OPTIONS = setDefaultsImpl({});
function setDefaults(options) {
    if (options === undefined) {
        return DEFAULT_OPTIONS;
    }
    return setDefaultsImpl(options);
}

/**
 * Returns the subdomain of a hostname string
 */
function getSubdomain(hostname, domain) {
    // If `hostname` and `domain` are the same, then there is no sub-domain
    if (domain.length === hostname.length) {
        return '';
    }
    return hostname.slice(0, -domain.length - 1);
}

/**
 * Implement a factory allowing to plug different implementations of suffix
 * lookup (e.g.: using a trie or the packed hashes datastructures). This is used
 * and exposed in `tldts.ts` and `tldts-experimental.ts` bundle entrypoints.
 */
function getEmptyResult() {
    return {
        domain: null,
        domainWithoutSuffix: null,
        hostname: null,
        isIcann: null,
        isIp: null,
        isPrivate: null,
        publicSuffix: null,
        subdomain: null
    };
}
function resetResult(result) {
    result.domain = null;
    result.domainWithoutSuffix = null;
    result.hostname = null;
    result.isIcann = null;
    result.isIp = null;
    result.isPrivate = null;
    result.publicSuffix = null;
    result.subdomain = null;
}
function parseImpl(url, step, suffixLookup, partialOptions, result) {
    var options = setDefaults(partialOptions);
    // Very fast approximate check to make sure `url` is a string. This is needed
    // because the library will not necessarily be used in a typed setup and
    // values of arbitrary types might be given as argument.
    if (typeof url !== 'string') {
        return result;
    }
    // Extract hostname from `url` only if needed. This can be made optional
    // using `options.extractHostname`. This option will typically be used
    // whenever we are sure the inputs to `parse` are already hostnames and not
    // arbitrary URLs.
    //
    // `mixedInput` allows to specify if we expect a mix of URLs and hostnames
    // as input. If only hostnames are expected then `extractHostname` can be
    // set to `false` to speed-up parsing. If only URLs are expected then
    // `mixedInputs` can be set to `false`. The `mixedInputs` is only a hint
    // and will not change the behavior of the library.
    if (options.extractHostname === false) {
        result.hostname = url;
    }
    else if (options.mixedInputs === true) {
        result.hostname = extractHostname(url, isValidHostname(url));
    }
    else {
        result.hostname = extractHostname(url, false);
    }
    if (step === 0 /* HOSTNAME */ || result.hostname === null) {
        return result;
    }
    // Check if `hostname` is a valid ip address
    if (options.detectIp === true) {
        result.isIp = isIp(result.hostname);
        if (result.isIp === true) {
            return result;
        }
    }
    // Perform optional hostname validation. If hostname is not valid, no need to
    // go further as there will be no valid domain or sub-domain.
    if (options.validateHostname === true &&
        options.extractHostname === true &&
        isValidHostname(result.hostname) === false) {
        result.hostname = null;
        return result;
    }
    // Extract public suffix
    suffixLookup(result.hostname, options, result);
    if (step === 2 /* PUBLIC_SUFFIX */ || result.publicSuffix === null) {
        return result;
    }
    // Extract domain
    result.domain = getDomain(result.publicSuffix, result.hostname, options);
    if (step === 3 /* DOMAIN */ || result.domain === null) {
        return result;
    }
    // Extract subdomain
    result.subdomain = getSubdomain(result.hostname, result.domain);
    if (step === 4 /* SUB_DOMAIN */) {
        return result;
    }
    // Extract domain without suffix
    result.domainWithoutSuffix = getDomainWithoutSuffix(result.domain, result.publicSuffix);
    return result;
}

function fastPathLookup (hostname, options, out) {
    // Fast path for very popular suffixes; this allows to by-pass lookup
    // completely as well as any extra allocation or string manipulation.
    if (options.allowPrivateDomains === false && hostname.length > 3) {
        var last = hostname.length - 1;
        var c3 = hostname.charCodeAt(last);
        var c2 = hostname.charCodeAt(last - 1);
        var c1 = hostname.charCodeAt(last - 2);
        var c0 = hostname.charCodeAt(last - 3);
        if (c3 === 109 /* 'm' */ &&
            c2 === 111 /* 'o' */ &&
            c1 === 99 /* 'c' */ &&
            c0 === 46 /* '.' */) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'com';
            return true;
        }
        else if (c3 === 103 /* 'g' */ &&
            c2 === 114 /* 'r' */ &&
            c1 === 111 /* 'o' */ &&
            c0 === 46 /* '.' */) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'org';
            return true;
        }
        else if (c3 === 117 /* 'u' */ &&
            c2 === 100 /* 'd' */ &&
            c1 === 101 /* 'e' */ &&
            c0 === 46 /* '.' */) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'edu';
            return true;
        }
        else if (c3 === 118 /* 'v' */ &&
            c2 === 111 /* 'o' */ &&
            c1 === 103 /* 'g' */ &&
            c0 === 46 /* '.' */) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'gov';
            return true;
        }
        else if (c3 === 116 /* 't' */ &&
            c2 === 101 /* 'e' */ &&
            c1 === 110 /* 'n' */ &&
            c0 === 46 /* '.' */) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'net';
            return true;
        }
        else if (c3 === 101 /* 'e' */ &&
            c2 === 100 /* 'd' */ &&
            c1 === 46 /* '.' */) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'de';
            return true;
        }
    }
    return false;
}

var exceptions = (function () {
    var _0 = { "$": 1, "succ": {} }, _1 = { "$": 0, "succ": { "city": _0 } };
    var exceptions = { "$": 0, "succ": { "ck": { "$": 0, "succ": { "www": _0 } }, "jp": { "$": 0, "succ": { "kawasaki": _1, "kitakyushu": _1, "kobe": _1, "nagoya": _1, "sapporo": _1, "sendai": _1, "yokohama": _1 } } } };
    return exceptions;
})();
var rules = (function () {
    var _2 = { "$": 1, "succ": {} }, _3 = { "$": 1, "succ": { "com": _2, "edu": _2, "gov": _2, "net": _2, "mil": _2, "org": _2 } }, _4 = { "$": 2, "succ": {} }, _5 = { "$": 1, "succ": { "blogspot": _4 } }, _6 = { "$": 1, "succ": { "gov": _2 } }, _7 = { "$": 0, "succ": { "*": _4 } }, _8 = { "$": 0, "succ": { "*": _2 } }, _9 = { "$": 1, "succ": { "com": _2, "edu": _2, "net": _2, "org": _2, "gov": _2 } }, _10 = { "$": 1, "succ": { "co": _4 } }, _11 = { "$": 1, "succ": { "ng": _4 } }, _12 = { "$": 0, "succ": { "s3": _4 } }, _13 = { "$": 0, "succ": { "dualstack": _12 } }, _14 = { "$": 0, "succ": { "s3": _4, "dualstack": _12, "s3-website": _4 } }, _15 = { "$": 0, "succ": { "apps": _4 } }, _16 = { "$": 0, "succ": { "app": _4 } }, _17 = { "$": 1, "succ": { "com": _2, "edu": _2, "net": _2, "org": _2 } }, _18 = { "$": 0, "succ": { "user": _4 } }, _19 = { "$": 1, "succ": { "ybo": _4 } }, _20 = { "$": 1, "succ": { "nom": _4 } }, _21 = { "$": 1, "succ": { "gov": _2, "blogspot": _4, "nym": _4 } }, _22 = { "$": 0, "succ": { "cust": _4 } }, _23 = { "$": 1, "succ": { "edu": _2, "biz": _2, "net": _2, "org": _2, "gov": _2, "info": _2, "com": _2 } }, _24 = { "$": 1, "succ": { "blogspot": _4, "nym": _4 } }, _25 = { "$": 1, "succ": { "for": _4 } }, _26 = { "$": 1, "succ": { "barsy": _4 } }, _27 = { "$": 0, "succ": { "forgot": _4 } }, _28 = { "$": 1, "succ": { "gs": _2 } }, _29 = { "$": 0, "succ": { "nes": _2 } }, _30 = { "$": 1, "succ": { "k12": _2, "cc": _2, "lib": _2 } }, _31 = { "$": 1, "succ": { "cc": _2, "lib": _2 } };
    var rules = { "$": 0, "succ": { "ac": _3, "ad": { "$": 1, "succ": { "nom": _2 } }, "ae": { "$": 1, "succ": { "co": _2, "net": _2, "org": _2, "sch": _2, "ac": _2, "gov": _2, "mil": _2, "blogspot": _4, "nom": _4 } }, "aero": { "$": 1, "succ": { "accident-investigation": _2, "accident-prevention": _2, "aerobatic": _2, "aeroclub": _2, "aerodrome": _2, "agents": _2, "aircraft": _2, "airline": _2, "airport": _2, "air-surveillance": _2, "airtraffic": _2, "air-traffic-control": _2, "ambulance": _2, "amusement": _2, "association": _2, "author": _2, "ballooning": _2, "broker": _2, "caa": _2, "cargo": _2, "catering": _2, "certification": _2, "championship": _2, "charter": _2, "civilaviation": _2, "club": _2, "conference": _2, "consultant": _2, "consulting": _2, "control": _2, "council": _2, "crew": _2, "design": _2, "dgca": _2, "educator": _2, "emergency": _2, "engine": _2, "engineer": _2, "entertainment": _2, "equipment": _2, "exchange": _2, "express": _2, "federation": _2, "flight": _2, "freight": _2, "fuel": _2, "gliding": _2, "government": _2, "groundhandling": _2, "group": _2, "hanggliding": _2, "homebuilt": _2, "insurance": _2, "journal": _2, "journalist": _2, "leasing": _2, "logistics": _2, "magazine": _2, "maintenance": _2, "media": _2, "microlight": _2, "modelling": _2, "navigation": _2, "parachuting": _2, "paragliding": _2, "passenger-association": _2, "pilot": _2, "press": _2, "production": _2, "recreation": _2, "repbody": _2, "res": _2, "research": _2, "rotorcraft": _2, "safety": _2, "scientist": _2, "services": _2, "show": _2, "skydiving": _2, "software": _2, "student": _2, "trader": _2, "trading": _2, "trainer": _2, "union": _2, "workinggroup": _2, "works": _2 } }, "af": { "$": 1, "succ": { "gov": _2, "com": _2, "org": _2, "net": _2, "edu": _2, "nom": _4 } }, "ag": { "$": 1, "succ": { "com": _2, "org": _2, "net": _2, "co": _2, "nom": _2 } }, "ai": { "$": 1, "succ": { "off": _2, "com": _2, "net": _2, "org": _2, "uwu": _4, "nom": _4 } }, "al": { "$": 1, "succ": { "com": _2, "edu": _2, "gov": _2, "mil": _2, "net": _2, "org": _2, "blogspot": _4, "nom": _4 } }, "am": { "$": 1, "succ": { "co": _2, "com": _2, "commune": _2, "net": _2, "org": _2, "blogspot": _4 } }, "ao": { "$": 1, "succ": { "ed": _2, "gv": _2, "og": _2, "co": _2, "pb": _2, "it": _2 } }, "aq": _2, "ar": { "$": 1, "succ": { "com": _5, "edu": _2, "gob": _2, "gov": _2, "int": _2, "mil": _2, "musica": _2, "net": _2, "org": _2, "tur": _2 } }, "arpa": { "$": 1, "succ": { "e164": _2, "in-addr": _2, "ip6": _2, "iris": _2, "uri": _2, "urn": _2 } }, "as": _6, "asia": { "$": 1, "succ": { "cloudns": _4 } }, "at": { "$": 1, "succ": { "ac": _2, "co": _5, "gv": _2, "or": _2, "futurecms": { "$": 0, "succ": { "*": _4, "ex": _7, "in": _7 } }, "futurehosting": _4, "futuremailing": _4, "ortsinfo": { "$": 0, "succ": { "ex": _7, "kunden": _7 } }, "biz": _4, "info": _4, "priv": _4, "12hp": _4, "2ix": _4, "4lima": _4, "lima-city": _4 } }, "au": { "$": 1, "succ": { "com": _5, "net": _2, "org": _2, "edu": { "$": 1, "succ": { "act": _2, "catholic": _2, "eq": _2, "nsw": { "$": 1, "succ": { "schools": _2 } }, "nt": _2, "qld": _2, "sa": _2, "tas": { "$": 1, "succ": { "education": _2 } }, "vic": _2, "wa": _2 } }, "gov": { "$": 1, "succ": { "qld": _2, "sa": _2, "tas": _2, "vic": _2, "wa": _2 } }, "asn": _2, "id": _2, "info": _2, "conf": _2, "oz": _2, "act": _2, "nsw": _2, "nt": _2, "qld": _2, "sa": _2, "tas": _2, "vic": _2, "wa": _2 } }, "aw": { "$": 1, "succ": { "com": _2 } }, "ax": _2, "az": { "$": 1, "succ": { "com": _2, "net": _2, "int": _2, "gov": _2, "org": _2, "edu": _2, "info": _2, "pp": _2, "mil": _2, "name": _2, "pro": _2, "biz": _2 } }, "ba": { "$": 1, "succ": { "com": _2, "edu": _2, "gov": _2, "mil": _2, "net": _2, "org": _2, "blogspot": _4 } }, "bb": { "$": 1, "succ": { "biz": _2, "co": _2, "com": _2, "edu": _2, "gov": _2, "info": _2, "net": _2, "org": _2, "store": _2, "tv": _2 } }, "bd": _8, "be": { "$": 1, "succ": { "ac": _2, "webhosting": _4, "blogspot": _4, "transurl": _7 } }, "bf": _6, "bg": { "$": 1, "succ": { "0": _2, "1": _2, "2": _2, "3": _2, "4": _2, "5": _2, "6": _2, "7": _2, "8": _2, "9": _2, "a": _2, "b": _2, "c": _2, "d": _2, "e": _2, "f": _2, "g": _2, "h": _2, "i": _2, "j": _2, "k": _2, "l": _2, "m": _2, "n": _2, "o": _2, "p": _2, "q": _2, "r": _2, "s": _2, "t": _2, "u": _2, "v": _2, "w": _2, "x": _2, "y": _2, "z": _2, "blogspot": _4, "barsy": _4 } }, "bh": _9, "bi": { "$": 1, "succ": { "co": _2, "com": _2, "edu": _2, "or": _2, "org": _2 } }, "biz": { "$": 1, "succ": { "cloudns": _4, "dyndns": _4, "for-better": _4, "for-more": _4, "for-some": _4, "for-the": _4, "selfip": _4, "webhop": _4, "bpl": _4, "orx": _4, "mmafan": _4, "myftp": _4, "no-ip": _4, "dscloud": _4 } }, "bj": { "$": 1, "succ": { "asso": _2, "barreau": _2, "gouv": _2, "blogspot": _4 } }, "bm": _9, "bn": { "$": 1, "succ": { "com": _2, "edu": _2, "gov": _2, "net": _2, "org": _2, "co": _4 } }, "bo": { "$": 1, "succ": { "com": _2, "edu": _2, "gob": _2, "int": _2, "org": _2, "net": _2, "mil": _2, "tv": _2, "web": _2, "academia": _2, "agro": _2, "arte": _2, "blog": _2, "bolivia": _2, "ciencia": _2, "cooperativa": _2, "democracia": _2, "deporte": _2, "ecologia": _2, "economia": _2, "empresa": _2, "indigena": _2, "industria": _2, "info": _2, "medicina": _2, "movimiento": _2, "musica": _2, "natural": _2, "nombre": _2, "noticias": _2, "patria": _2, "politica": _2, "profesional": _2, "plurinacional": _2, "pueblo": _2, "revista": _2, "salud": _2, "tecnologia": _2, "tksat": _2, "transporte": _2, "wiki": _2 } }, "br": { "$": 1, "succ": { "9guacu": _2, "abc": _2, "adm": _2, "adv": _2, "agr": _2, "aju": _2, "am": _2, "anani": _2, "aparecida": _2, "arq": _2, "art": _2, "ato": _2, "b": _2, "barueri": _2, "belem": _2, "bhz": _2, "bio": _2, "blog": _2, "bmd": _2, "boavista": _2, "bsb": _2, "campinagrande": _2, "campinas": _2, "caxias": _2, "cim": _2, "cng": _2, "cnt": _2, "com": _5, "contagem": _2, "coop": _2, "cri": _2, "cuiaba": _2, "curitiba": _2, "def": _2, "ecn": _2, "eco": _2, "edu": _2, "emp": _2, "eng": _2, "esp": _2, "etc": _2, "eti": _2, "far": _2, "feira": _2, "flog": _2, "floripa": _2, "fm": _2, "fnd": _2, "fortal": _2, "fot": _2, "foz": _2, "fst": _2, "g12": _2, "ggf": _2, "goiania": _2, "gov": { "$": 1, "succ": { "ac": _2, "al": _2, "am": _2, "ap": _2, "ba": _2, "ce": _2, "df": _2, "es": _2, "go": _2, "ma": _2, "mg": _2, "ms": _2, "mt": _2, "pa": _2, "pb": _2, "pe": _2, "pi": _2, "pr": _2, "rj": _2, "rn": _2, "ro": _2, "rr": _2, "rs": _2, "sc": _2, "se": _2, "sp": _2, "to": _2 } }, "gru": _2, "imb": _2, "ind": _2, "inf": _2, "jab": _2, "jampa": _2, "jdf": _2, "joinville": _2, "jor": _2, "jus": _2, "leg": { "$": 1, "succ": { "ac": _4, "al": _4, "am": _4, "ap": _4, "ba": _4, "ce": _4, "df": _4, "es": _4, "go": _4, "ma": _4, "mg": _4, "ms": _4, "mt": _4, "pa": _4, "pb": _4, "pe": _4, "pi": _4, "pr": _4, "rj": _4, "rn": _4, "ro": _4, "rr": _4, "rs": _4, "sc": _4, "se": _4, "sp": _4, "to": _4 } }, "lel": _2, "londrina": _2, "macapa": _2, "maceio": _2, "manaus": _2, "maringa": _2, "mat": _2, "med": _2, "mil": _2, "morena": _2, "mp": _2, "mus": _2, "natal": _2, "net": _2, "niteroi": _2, "nom": _8, "not": _2, "ntr": _2, "odo": _2, "ong": _2, "org": _2, "osasco": _2, "palmas": _2, "poa": _2, "ppg": _2, "pro": _2, "psc": _2, "psi": _2, "pvh": _2, "qsl": _2, "radio": _2, "rec": _2, "recife": _2, "ribeirao": _2, "rio": _2, "riobranco": _2, "riopreto": _2, "salvador": _2, "sampa": _2, "santamaria": _2, "santoandre": _2, "saobernardo": _2, "saogonca": _2, "sjc": _2, "slg": _2, "slz": _2, "sorocaba": _2, "srv": _2, "taxi": _2, "tc": _2, "teo": _2, "the": _2, "tmp": _2, "trd": _2, "tur": _2, "tv": _2, "udi": _2, "vet": _2, "vix": _2, "vlog": _2, "wiki": _2, "zlg": _2 } }, "bs": { "$": 1, "succ": { "com": _2, "net": _2, "org": _2, "edu": _2, "gov": _2, "we": _4 } }, "bt": _9, "bv": _2, "bw": { "$": 1, "succ": { "co": _2, "org": _2 } }, "by": { "$": 1, "succ": { "gov": _2, "mil": _2, "com": _5, "of": _2, "nym": _4 } }, "bz": { "$": 1, "succ": { "com": _2, "net": _2, "org": _2, "edu": _2, "gov": _2, "za": _4, "nym": _4 } }, "ca": { "$": 1, "succ": { "ab": _2, "bc": _2, "mb": _2, "nb": _2, "nf": _2, "nl": _2, "ns": _2, "nt": _2, "nu": _2, "on": _2, "pe": _2, "qc": _2, "sk": _2, "yk": _2, "gc": _2, "barsy": _4, "awdev": _7, "co": _4, "blogspot": _4, "no-ip": _4 } }, "cat": _2, "cc": { "$": 1, "succ": { "cloudns": _4, "ftpaccess": _4, "game-server": _4, "myphotos": _4, "scrapping": _4, "twmail": _4, "fantasyleague": _4 } }, "cd": _6, "cf": _5, "cg": _2, "ch": { "$": 1, "succ": { "square7": _4, "blogspot": _4, "linkyard-cloud": _4, "dnsking": _4, "gotdns": _4, "12hp": _4, "2ix": _4, "4lima": _4, "lima-city": _4 } }, "ci": { "$": 1, "succ": { "org": _2, "or": _2, "com": _2, "co": _2, "edu": _2, "ed": _2, "ac": _2, "net": _2, "go": _2, "asso": _2, "xn--aroport-bya": _2, "aéroport": _2, "int": _2, "presse": _2, "md": _2, "gouv": _2, "fin": _4 } }, "ck": _8, "cl": { "$": 1, "succ": { "gov": _2, "gob": _2, "co": _2, "mil": _2, "blogspot": _4, "nom": _4 } }, "cm": { "$": 1, "succ": { "co": _2, "com": _2, "gov": _2, "net": _2 } }, "cn": { "$": 1, "succ": { "ac": _2, "com": { "$": 1, "succ": { "amazonaws": { "$": 0, "succ": { "compute": _7, "eb": { "$": 0, "succ": { "cn-north-1": _4, "cn-northwest-1": _4 } }, "elb": _7, "cn-north-1": _12 } } } }, "edu": _2, "gov": _2, "net": _2, "org": _2, "mil": _2, "xn--55qx5d": _2, "公司": _2, "xn--io0a7i": _2, "网络": _2, "xn--od0alg": _2, "網絡": _2, "ah": _2, "bj": _2, "cq": _2, "fj": _2, "gd": _2, "gs": _2, "gz": _2, "gx": _2, "ha": _2, "hb": _2, "he": _2, "hi": _2, "hl": _2, "hn": _2, "jl": _2, "js": _2, "jx": _2, "ln": _2, "nm": _2, "nx": _2, "qh": _2, "sc": _2, "sd": _2, "sh": _2, "sn": _2, "sx": _2, "tj": _2, "xj": _2, "xz": _2, "yn": _2, "zj": _2, "hk": _2, "mo": _2, "tw": _2, "instantcloud": _4 } }, "co": { "$": 1, "succ": { "arts": _2, "com": _5, "edu": _2, "firm": _2, "gov": _2, "info": _2, "int": _2, "mil": _2, "net": _2, "nom": _2, "org": _2, "rec": _2, "web": _2, "carrd": _4, "crd": _4, "otap": _7, "leadpages": _4, "lpages": _4, "mypi": _4, "n4t": _4, "nodum": _4, "repl": _4 } }, "com": { "$": 1, "succ": { "amazonaws": { "$": 0, "succ": { "compute": _7, "compute-1": _7, "us-east-1": { "$": 2, "succ": { "dualstack": _12 } }, "elb": _7, "s3": _4, "s3-ap-northeast-1": _4, "s3-ap-northeast-2": _4, "s3-ap-south-1": _4, "s3-ap-southeast-1": _4, "s3-ap-southeast-2": _4, "s3-ca-central-1": _4, "s3-eu-central-1": _4, "s3-eu-west-1": _4, "s3-eu-west-2": _4, "s3-eu-west-3": _4, "s3-external-1": _4, "s3-fips-us-gov-west-1": _4, "s3-sa-east-1": _4, "s3-us-gov-west-1": _4, "s3-us-east-2": _4, "s3-us-west-1": _4, "s3-us-west-2": _4, "ap-northeast-2": _14, "ap-south-1": _14, "ca-central-1": _14, "eu-central-1": _14, "eu-west-2": _14, "eu-west-3": _14, "us-east-2": _14, "ap-northeast-1": _13, "ap-southeast-1": _13, "ap-southeast-2": _13, "eu-west-1": _13, "sa-east-1": _13, "s3-website-us-east-1": _4, "s3-website-us-west-1": _4, "s3-website-us-west-2": _4, "s3-website-ap-northeast-1": _4, "s3-website-ap-southeast-1": _4, "s3-website-ap-southeast-2": _4, "s3-website-eu-west-1": _4, "s3-website-sa-east-1": _4 } }, "elasticbeanstalk": { "$": 2, "succ": { "ap-northeast-1": _4, "ap-northeast-2": _4, "ap-northeast-3": _4, "ap-south-1": _4, "ap-southeast-1": _4, "ap-southeast-2": _4, "ca-central-1": _4, "eu-central-1": _4, "eu-west-1": _4, "eu-west-2": _4, "eu-west-3": _4, "sa-east-1": _4, "us-east-1": _4, "us-east-2": _4, "us-gov-west-1": _4, "us-west-1": _4, "us-west-2": _4 } }, "on-aptible": _4, "myasustor": _4, "balena-devices": _4, "betainabox": _4, "bplaced": _4, "ar": _4, "br": _4, "cn": _4, "de": _4, "eu": _4, "gb": _4, "hu": _4, "jpn": _4, "kr": _4, "mex": _4, "no": _4, "qc": _4, "ru": _4, "sa": _4, "uk": _4, "us": _4, "uy": _4, "za": _4, "africa": _4, "gr": _4, "co": _4, "xenapponazure": _4, "jdevcloud": _4, "wpdevcloud": _4, "cloudcontrolled": _4, "cloudcontrolapp": _4, "trycloudflare": _4, "dattolocal": _4, "dattorelay": _4, "dattoweb": _4, "mydatto": _4, "drayddns": _4, "dreamhosters": _4, "mydrobo": _4, "dyndns-at-home": _4, "dyndns-at-work": _4, "dyndns-blog": _4, "dyndns-free": _4, "dyndns-home": _4, "dyndns-ip": _4, "dyndns-mail": _4, "dyndns-office": _4, "dyndns-pics": _4, "dyndns-remote": _4, "dyndns-server": _4, "dyndns-web": _4, "dyndns-wiki": _4, "dyndns-work": _4, "blogdns": _4, "cechire": _4, "dnsalias": _4, "dnsdojo": _4, "doesntexist": _4, "dontexist": _4, "doomdns": _4, "dyn-o-saur": _4, "dynalias": _4, "est-a-la-maison": _4, "est-a-la-masion": _4, "est-le-patron": _4, "est-mon-blogueur": _4, "from-ak": _4, "from-al": _4, "from-ar": _4, "from-ca": _4, "from-ct": _4, "from-dc": _4, "from-de": _4, "from-fl": _4, "from-ga": _4, "from-hi": _4, "from-ia": _4, "from-id": _4, "from-il": _4, "from-in": _4, "from-ks": _4, "from-ky": _4, "from-ma": _4, "from-md": _4, "from-mi": _4, "from-mn": _4, "from-mo": _4, "from-ms": _4, "from-mt": _4, "from-nc": _4, "from-nd": _4, "from-ne": _4, "from-nh": _4, "from-nj": _4, "from-nm": _4, "from-nv": _4, "from-oh": _4, "from-ok": _4, "from-or": _4, "from-pa": _4, "from-pr": _4, "from-ri": _4, "from-sc": _4, "from-sd": _4, "from-tn": _4, "from-tx": _4, "from-ut": _4, "from-va": _4, "from-vt": _4, "from-wa": _4, "from-wi": _4, "from-wv": _4, "from-wy": _4, "getmyip": _4, "gotdns": _4, "hobby-site": _4, "homelinux": _4, "homeunix": _4, "iamallama": _4, "is-a-anarchist": _4, "is-a-blogger": _4, "is-a-bookkeeper": _4, "is-a-bulls-fan": _4, "is-a-caterer": _4, "is-a-chef": _4, "is-a-conservative": _4, "is-a-cpa": _4, "is-a-cubicle-slave": _4, "is-a-democrat": _4, "is-a-designer": _4, "is-a-doctor": _4, "is-a-financialadvisor": _4, "is-a-geek": _4, "is-a-green": _4, "is-a-guru": _4, "is-a-hard-worker": _4, "is-a-hunter": _4, "is-a-landscaper": _4, "is-a-lawyer": _4, "is-a-liberal": _4, "is-a-libertarian": _4, "is-a-llama": _4, "is-a-musician": _4, "is-a-nascarfan": _4, "is-a-nurse": _4, "is-a-painter": _4, "is-a-personaltrainer": _4, "is-a-photographer": _4, "is-a-player": _4, "is-a-republican": _4, "is-a-rockstar": _4, "is-a-socialist": _4, "is-a-student": _4, "is-a-teacher": _4, "is-a-techie": _4, "is-a-therapist": _4, "is-an-accountant": _4, "is-an-actor": _4, "is-an-actress": _4, "is-an-anarchist": _4, "is-an-artist": _4, "is-an-engineer": _4, "is-an-entertainer": _4, "is-certified": _4, "is-gone": _4, "is-into-anime": _4, "is-into-cars": _4, "is-into-cartoons": _4, "is-into-games": _4, "is-leet": _4, "is-not-certified": _4, "is-slick": _4, "is-uberleet": _4, "is-with-theband": _4, "isa-geek": _4, "isa-hockeynut": _4, "issmarterthanyou": _4, "likes-pie": _4, "likescandy": _4, "neat-url": _4, "saves-the-whales": _4, "selfip": _4, "sells-for-less": _4, "sells-for-u": _4, "servebbs": _4, "simple-url": _4, "space-to-rent": _4, "teaches-yoga": _4, "writesthisblog": _4, "ddnsfree": _4, "ddnsgeek": _4, "giize": _4, "gleeze": _4, "kozow": _4, "loseyourip": _4, "ooguy": _4, "theworkpc": _4, "mytuleap": _4, "evennode": { "$": 0, "succ": { "eu-1": _4, "eu-2": _4, "eu-3": _4, "eu-4": _4, "us-1": _4, "us-2": _4, "us-3": _4, "us-4": _4 } }, "fbsbx": _15, "fastly-terrarium": _4, "fastvps-server": _4, "mydobiss": _4, "firebaseapp": _4, "flynnhub": _4, "freebox-os": _4, "freeboxos": _4, "githubusercontent": _4, "0emm": _7, "appspot": _4, "blogspot": _4, "codespot": _4, "googleapis": _4, "googlecode": _4, "pagespeedmobilizer": _4, "publishproxy": _4, "withgoogle": _4, "withyoutube": _4, "herokuapp": _4, "herokussl": _4, "myravendb": _4, "pixolino": _4, "joyent": { "$": 0, "succ": { "cns": _7 } }, "lpusercontent": _4, "lmpm": _16, "linode": { "$": 0, "succ": { "members": _4, "nodebalancer": _4 } }, "barsycenter": _4, "barsyonline": _4, "miniserver": _4, "meteorapp": { "$": 2, "succ": { "eu": _4 } }, "bitballoon": _4, "netlify": _4, "4u": _4, "nfshost": _4, "001www": _4, "ddnslive": _4, "myiphost": _4, "blogsyte": _4, "ciscofreak": _4, "damnserver": _4, "ditchyourip": _4, "dnsiskinky": _4, "dynns": _4, "geekgalaxy": _4, "health-carereform": _4, "homesecuritymac": _4, "homesecuritypc": _4, "myactivedirectory": _4, "mysecuritycamera": _4, "net-freaks": _4, "onthewifi": _4, "point2this": _4, "quicksytes": _4, "securitytactics": _4, "serveexchange": _4, "servehumour": _4, "servep2p": _4, "servesarcasm": _4, "stufftoread": _4, "unusualperson": _4, "workisboring": _4, "3utilities": _4, "ddnsking": _4, "myvnc": _4, "servebeer": _4, "servecounterstrike": _4, "serveftp": _4, "servegame": _4, "servehalflife": _4, "servehttp": _4, "serveirc": _4, "servemp3": _4, "servepics": _4, "servequake": _4, "operaunite": _4, "outsystemscloud": _4, "ownprovider": _4, "pgfog": _4, "pagefrontapp": _4, "gotpantheon": _4, "prgmr": { "$": 0, "succ": { "xen": _4 } }, "qualifioapp": _4, "qa2": _4, "dev-myqnapcloud": _4, "alpha-myqnapcloud": _4, "myqnapcloud": _4, "quipelements": _7, "rackmaze": _4, "rhcloud": _4, "render": _16, "onrender": _4, "logoip": _4, "scrysec": _4, "firewall-gateway": _4, "myshopblocks": _4, "shopitsite": _4, "1kapp": _4, "appchizi": _4, "applinzi": _4, "sinaapp": _4, "vipsinaapp": _4, "bounty-full": { "$": 2, "succ": { "alpha": _4, "beta": _4 } }, "stackhero-network": _4, "stdlib": { "$": 0, "succ": { "api": _4 } }, "temp-dns": _4, "dsmynas": _4, "familyds": _4, "thingdustdata": _4, "bloxcms": _4, "townnews-staging": _4, "hk": _4, "wafflecell": _4, "remotewd": _4, "xnbay": { "$": 2, "succ": { "u2": _4, "u2-local": _4 } }, "yolasite": _4 } }, "coop": _2, "cr": { "$": 1, "succ": { "ac": _2, "co": _2, "ed": _2, "fi": _2, "go": _2, "or": _2, "sa": _2 } }, "cu": { "$": 1, "succ": { "com": _2, "edu": _2, "org": _2, "net": _2, "gov": _2, "inf": _2 } }, "cv": _5, "cw": _17, "cx": { "$": 1, "succ": { "gov": _2, "ath": _4, "info": _4 } }, "cy": { "$": 1, "succ": { "ac": _2, "biz": _2, "com": _5, "ekloges": _2, "gov": _2, "ltd": _2, "name": _2, "net": _2, "org": _2, "parliament": _2, "press": _2, "pro": _2, "tm": _2 } }, "cz": { "$": 1, "succ": { "co": _4, "realm": _4, "e4": _4, "blogspot": _4, "metacentrum": { "$": 0, "succ": { "cloud": _4, "custom": _4 } }, "muni": { "$": 0, "succ": { "cloud": { "$": 0, "succ": { "flt": _4, "usr": _4 } } } } } }, "de": { "$": 1, "succ": { "bplaced": _4, "square7": _4, "com": _4, "cosidns": { "$": 0, "succ": { "dyn": _4 } }, "dynamisches-dns": _4, "dnsupdater": _4, "internet-dns": _4, "l-o-g-i-n": _4, "dnshome": _4, "fuettertdasnetz": _4, "isteingeek": _4, "istmein": _4, "lebtimnetz": _4, "leitungsen": _4, "traeumtgerade": _4, "ddnss": { "$": 2, "succ": { "dyn": _4, "dyndns": _4 } }, "dyndns1": _4, "dyn-ip24": _4, "home-webserver": { "$": 2, "succ": { "dyn": _4 } }, "myhome-server": _4, "goip": _4, "blogspot": _4, "dyn-berlin": _4, "in-berlin": _4, "in-brb": _4, "in-butter": _4, "in-dsl": _4, "in-vpn": _4, "mein-iserv": _4, "test-iserv": _4, "keymachine": _4, "git-repos": _4, "lcube-server": _4, "svn-repos": _4, "barsy": _4, "logoip": _4, "firewall-gateway": _4, "my-gateway": _4, "my-router": _4, "spdns": _4, "speedpartner": { "$": 0, "succ": { "customer": _4 } }, "taifun-dns": _4, "12hp": _4, "2ix": _4, "4lima": _4, "lima-city": _4, "dd-dns": _4, "dray-dns": _4, "draydns": _4, "dyn-vpn": _4, "dynvpn": _4, "mein-vigor": _4, "my-vigor": _4, "my-wan": _4, "syno-ds": _4, "synology-diskstation": _4, "synology-ds": _4, "uberspace": _7, "virtualuser": _4, "virtual-user": _4 } }, "dj": _2, "dk": { "$": 1, "succ": { "biz": _4, "co": _4, "firm": _4, "reg": _4, "store": _4, "blogspot": _4 } }, "dm": _9, "do": { "$": 1, "succ": { "art": _2, "com": _2, "edu": _2, "gob": _2, "gov": _2, "mil": _2, "net": _2, "org": _2, "sld": _2, "web": _2 } }, "dz": { "$": 1, "succ": { "com": _2, "org": _2, "net": _2, "gov": _2, "edu": _2, "asso": _2, "pol": _2, "art": _2 } }, "ec": { "$": 1, "succ": { "com": _2, "info": _2, "net": _2, "fin": _2, "k12": _2, "med": _2, "pro": _2, "org": _2, "edu": _2, "gov": _2, "gob": _2, "mil": _2, "nym": _4 } }, "edu": { "$": 1, "succ": { "rit": { "$": 0, "succ": { "git-pages": _4 } } } }, "ee": { "$": 1, "succ": { "edu": _2, "gov": _2, "riik": _2, "lib": _2, "med": _2, "com": _5, "pri": _2, "aip": _2, "org": _2, "fie": _2 } }, "eg": { "$": 1, "succ": { "com": _5, "edu": _2, "eun": _2, "gov": _2, "mil": _2, "name": _2, "net": _2, "org": _2, "sci": _2 } }, "er": _8, "es": { "$": 1, "succ": { "com": _5, "nom": _2, "org": _2, "gob": _2, "edu": _2 } }, "et": { "$": 1, "succ": { "com": _2, "gov": _2, "org": _2, "edu": _2, "biz": _2, "name": _2, "info": _2, "net": _2 } }, "eu": { "$": 1, "succ": { "mycd": _4, "cloudns": _4, "barsy": _4, "wellbeingzone": _4, "spdns": _4, "transurl": _7, "diskstation": _4 } }, "fi": { "$": 1, "succ": { "aland": _2, "dy": _4, "blogspot": _4, "xn--hkkinen-5wa": _4, "häkkinen": _4, "iki": _4 } }, "fj": _8, "fk": _8, "fm": _2, "fo": _2, "fr": { "$": 1, "succ": { "asso": _2, "com": _2, "gouv": _2, "nom": _2, "prd": _2, "tm": _2, "aeroport": _2, "avocat": _2, "avoues": _2, "cci": _2, "chambagri": _2, "chirurgiens-dentistes": _2, "experts-comptables": _2, "geometre-expert": _2, "greta": _2, "huissier-justice": _2, "medecin": _2, "notaires": _2, "pharmacien": _2, "port": _2, "veterinaire": _2, "fbx-os": _4, "fbxos": _4, "freebox-os": _4, "freeboxos": _4, "blogspot": _4, "on-web": _4, "chirurgiens-dentistes-en-france": _4 } }, "ga": _2, "gb": _2, "gd": _20, "ge": { "$": 1, "succ": { "com": _2, "edu": _2, "gov": _2, "org": _2, "mil": _2, "net": _2, "pvt": _2, "nom": _4 } }, "gf": _2, "gg": { "$": 1, "succ": { "co": _2, "net": _2, "org": _2, "kaas": _4, "cya": _4 } }, "gh": { "$": 1, "succ": { "com": _2, "edu": _2, "gov": _2, "org": _2, "mil": _2 } }, "gi": { "$": 1, "succ": { "com": _2, "ltd": _2, "gov": _2, "mod": _2, "edu": _2, "org": _2 } }, "gl": { "$": 1, "succ": { "co": _2, "com": _2, "edu": _2, "net": _2, "org": _2, "biz": _4, "nom": _4 } }, "gm": _2, "gn": { "$": 1, "succ": { "ac": _2, "com": _2, "edu": _2, "gov": _2, "org": _2, "net": _2 } }, "gov": _2, "gp": { "$": 1, "succ": { "com": _2, "net": _2, "mobi": _2, "edu": _2, "org": _2, "asso": _2 } }, "gq": _2, "gr": { "$": 1, "succ": { "com": _2, "edu": _2, "net": _2, "org": _2, "gov": _2, "blogspot": _4, "nym": _4 } }, "gs": _2, "gt": { "$": 1, "succ": { "com": _2, "edu": _2, "gob": _2, "ind": _2, "mil": _2, "net": _2, "org": _2, "nom": _4 } }, "gu": { "$": 1, "succ": { "com": _2, "edu": _2, "gov": _2, "guam": _2, "info": _2, "net": _2, "org": _2, "web": _2 } }, "gw": _2, "gy": { "$": 1, "succ": { "co": _2, "com": _2, "edu": _2, "gov": _2, "net": _2, "org": _2, "nym": _4 } }, "hk": { "$": 1, "succ": { "com": _2, "edu": _2, "gov": _2, "idv": _2, "net": _2, "org": _2, "xn--55qx5d": _2, "公司": _2, "xn--wcvs22d": _2, "教育": _2, "xn--lcvr32d": _2, "敎育": _2, "xn--mxtq1m": _2, "政府": _2, "xn--gmqw5a": _2, "個人": _2, "xn--ciqpn": _2, "个人": _2, "xn--gmq050i": _2, "箇人": _2, "xn--zf0avx": _2, "網络": _2, "xn--io0a7i": _2, "网络": _2, "xn--mk0axi": _2, "组織": _2, "xn--od0alg": _2, "網絡": _2, "xn--od0aq3b": _2, "网絡": _2, "xn--tn0ag": _2, "组织": _2, "xn--uc0atv": _2, "組織": _2, "xn--uc0ay4a": _2, "組织": _2, "blogspot": _4, "nym": _4, "ltd": _4, "inc": _4 } }, "hm": _2, "hn": { "$": 1, "succ": { "com": _2, "edu": _2, "org": _2, "net": _2, "mil": _2, "gob": _2, "nom": _4 } }, "hr": { "$": 1, "succ": { "iz": _2, "from": _2, "name": _2, "com": _2, "blogspot": _4, "free": _4 } }, "ht": { "$": 1, "succ": { "com": _2, "shop": _2, "firm": _2, "info": _2, "adult": _2, "net": _2, "pro": _2, "org": _2, "med": _2, "art": _2, "coop": _2, "pol": _2, "asso": _2, "edu": _2, "rel": _2, "gouv": _2, "perso": _2 } }, "hu": { "$": 1, "succ": { "2000": _2, "co": _2, "info": _2, "org": _2, "priv": _2, "sport": _2, "tm": _2, "agrar": _2, "bolt": _2, "casino": _2, "city": _2, "erotica": _2, "erotika": _2, "film": _2, "forum": _2, "games": _2, "hotel": _2, "ingatlan": _2, "jogasz": _2, "konyvelo": _2, "lakas": _2, "media": _2, "news": _2, "reklam": _2, "sex": _2, "shop": _2, "suli": _2, "szex": _2, "tozsde": _2, "utazas": _2, "video": _2, "blogspot": _4 } }, "id": { "$": 1, "succ": { "ac": _2, "biz": _2, "co": _5, "desa": _2, "go": _2, "mil": _2, "my": _2, "net": _2, "or": _2, "ponpes": _2, "sch": _2, "web": _2 } }, "ie": _21, "il": { "$": 1, "succ": { "ac": _2, "co": _5, "gov": _2, "idf": _2, "k12": _2, "muni": _2, "net": _2, "org": _2 } }, "im": { "$": 1, "succ": { "ac": _2, "co": { "$": 1, "succ": { "ltd": _2, "plc": _2 } }, "com": _2, "net": _2, "org": _2, "tt": _2, "tv": _2, "ro": _4, "nom": _4 } }, "in": { "$": 1, "succ": { "co": _2, "firm": _2, "net": _2, "org": _2, "gen": _2, "ind": _2, "nic": _2, "ac": _2, "edu": _2, "res": _2, "gov": _2, "mil": _2, "cloudns": _4, "blogspot": _4, "barsy": _4 } }, "info": { "$": 1, "succ": { "cloudns": _4, "dynamic-dns": _4, "dyndns": _4, "barrel-of-knowledge": _4, "barrell-of-knowledge": _4, "for-our": _4, "groks-the": _4, "groks-this": _4, "here-for-more": _4, "knowsitall": _4, "selfip": _4, "webhop": _4, "barsy": _4, "mayfirst": _4, "forumz": _4, "nsupdate": _4, "dvrcam": _4, "ilovecollege": _4, "no-ip": _4, "v-info": _4 } }, "int": { "$": 1, "succ": { "eu": _2 } }, "io": { "$": 1, "succ": { "2038": _4, "com": _2, "apigee": _4, "b-data": _4, "backplaneapp": _4, "banzaicloud": _16, "boxfuse": _4, "browsersafetymark": _4, "bigv": { "$": 0, "succ": { "uk0": _4 } }, "cleverapps": _4, "dedyn": _4, "drud": _4, "definima": _4, "enonic": { "$": 2, "succ": { "customer": _4 } }, "github": _4, "gitlab": _4, "lolipop": _4, "hasura-app": _4, "moonscale": _7, "loginline": _4, "barsy": _4, "azurecontainer": _4, "ngrok": _4, "nodeart": { "$": 0, "succ": { "stage": _4 } }, "nodum": _4, "nid": _4, "pantheonsite": _4, "dyn53": _4, "protonet": _4, "vaporcloud": _4, "on-rio": _7, "readthedocs": _4, "resindevice": _4, "resinstaging": { "$": 0, "succ": { "devices": _4 } }, "hzc": _4, "sandcats": _4, "shiftedit": _4, "mo-siemens": _4, "lair": _15, "stolos": _7, "spacekit": _4, "utwente": _4, "applicationcloud": _4, "scapp": _4, "s5y": _7, "telebit": _4, "thingdust": { "$": 0, "succ": { "dev": _22, "disrec": _22, "prod": _22, "testing": _22 } }, "wedeploy": _4, "basicserver": _4, "virtualserver": _4 } }, "iq": _3, "ir": { "$": 1, "succ": { "ac": _2, "co": _2, "gov": _2, "id": _2, "net": _2, "org": _2, "sch": _2, "xn--mgba3a4f16a": _2, "ایران": _2, "xn--mgba3a4fra": _2, "ايران": _2 } }, "is": { "$": 1, "succ": { "net": _2, "com": _2, "edu": _2, "gov": _2, "org": _2, "int": _2, "cupcake": _4, "blogspot": _4 } }, "it": { "$": 1, "succ": { "gov": _2, "edu": _2, "abr": _2, "abruzzo": _2, "aosta-valley": _2, "aostavalley": _2, "bas": _2, "basilicata": _2, "cal": _2, "calabria": _2, "cam": _2, "campania": _2, "emilia-romagna": _2, "emiliaromagna": _2, "emr": _2, "friuli-v-giulia": _2, "friuli-ve-giulia": _2, "friuli-vegiulia": _2, "friuli-venezia-giulia": _2, "friuli-veneziagiulia": _2, "friuli-vgiulia": _2, "friuliv-giulia": _2, "friulive-giulia": _2, "friulivegiulia": _2, "friulivenezia-giulia": _2, "friuliveneziagiulia": _2, "friulivgiulia": _2, "fvg": _2, "laz": _2, "lazio": _2, "lig": _2, "liguria": _2, "lom": _2, "lombardia": _2, "lombardy": _2, "lucania": _2, "mar": _2, "marche": _2, "mol": _2, "molise": _2, "piedmont": _2, "piemonte": _2, "pmn": _2, "pug": _2, "puglia": _2, "sar": _2, "sardegna": _2, "sardinia": _2, "sic": _2, "sicilia": _2, "sicily": _2, "taa": _2, "tos": _2, "toscana": _2, "trentin-sud-tirol": _2, "xn--trentin-sd-tirol-rzb": _2, "trentin-süd-tirol": _2, "trentin-sudtirol": _2, "xn--trentin-sdtirol-7vb": _2, "trentin-südtirol": _2, "trentin-sued-tirol": _2, "trentin-suedtirol": _2, "trentino-a-adige": _2, "trentino-aadige": _2, "trentino-alto-adige": _2, "trentino-altoadige": _2, "trentino-s-tirol": _2, "trentino-stirol": _2, "trentino-sud-tirol": _2, "xn--trentino-sd-tirol-c3b": _2, "trentino-süd-tirol": _2, "trentino-sudtirol": _2, "xn--trentino-sdtirol-szb": _2, "trentino-südtirol": _2, "trentino-sued-tirol": _2, "trentino-suedtirol": _2, "trentino": _2, "trentinoa-adige": _2, "trentinoaadige": _2, "trentinoalto-adige": _2, "trentinoaltoadige": _2, "trentinos-tirol": _2, "trentinostirol": _2, "trentinosud-tirol": _2, "xn--trentinosd-tirol-rzb": _2, "trentinosüd-tirol": _2, "trentinosudtirol": _2, "xn--trentinosdtirol-7vb": _2, "trentinosüdtirol": _2, "trentinosued-tirol": _2, "trentinosuedtirol": _2, "trentinsud-tirol": _2, "xn--trentinsd-tirol-6vb": _2, "trentinsüd-tirol": _2, "trentinsudtirol": _2, "xn--trentinsdtirol-nsb": _2, "trentinsüdtirol": _2, "trentinsued-tirol": _2, "trentinsuedtirol": _2, "tuscany": _2, "umb": _2, "umbria": _2, "val-d-aosta": _2, "val-daosta": _2, "vald-aosta": _2, "valdaosta": _2, "valle-aosta": _2, "valle-d-aosta": _2, "valle-daosta": _2, "valleaosta": _2, "valled-aosta": _2, "valledaosta": _2, "vallee-aoste": _2, "xn--valle-aoste-ebb": _2, "vallée-aoste": _2, "vallee-d-aoste": _2, "xn--valle-d-aoste-ehb": _2, "vallée-d-aoste": _2, "valleeaoste": _2, "xn--valleaoste-e7a": _2, "valléeaoste": _2, "valleedaoste": _2, "xn--valledaoste-ebb": _2, "valléedaoste": _2, "vao": _2, "vda": _2, "ven": _2, "veneto": _2, "ag": _2, "agrigento": _2, "al": _2, "alessandria": _2, "alto-adige": _2, "altoadige": _2, "an": _2, "ancona": _2, "andria-barletta-trani": _2, "andria-trani-barletta": _2, "andriabarlettatrani": _2, "andriatranibarletta": _2, "ao": _2, "aosta": _2, "aoste": _2, "ap": _2, "aq": _2, "aquila": _2, "ar": _2, "arezzo": _2, "ascoli-piceno": _2, "ascolipiceno": _2, "asti": _2, "at": _2, "av": _2, "avellino": _2, "ba": _2, "balsan-sudtirol": _2, "xn--balsan-sdtirol-nsb": _2, "balsan-südtirol": _2, "balsan-suedtirol": _2, "balsan": _2, "bari": _2, "barletta-trani-andria": _2, "barlettatraniandria": _2, "belluno": _2, "benevento": _2, "bergamo": _2, "bg": _2, "bi": _2, "biella": _2, "bl": _2, "bn": _2, "bo": _2, "bologna": _2, "bolzano-altoadige": _2, "bolzano": _2, "bozen-sudtirol": _2, "xn--bozen-sdtirol-2ob": _2, "bozen-südtirol": _2, "bozen-suedtirol": _2, "bozen": _2, "br": _2, "brescia": _2, "brindisi": _2, "bs": _2, "bt": _2, "bulsan-sudtirol": _2, "xn--bulsan-sdtirol-nsb": _2, "bulsan-südtirol": _2, "bulsan-suedtirol": _2, "bulsan": _2, "bz": _2, "ca": _2, "cagliari": _2, "caltanissetta": _2, "campidano-medio": _2, "campidanomedio": _2, "campobasso": _2, "carbonia-iglesias": _2, "carboniaiglesias": _2, "carrara-massa": _2, "carraramassa": _2, "caserta": _2, "catania": _2, "catanzaro": _2, "cb": _2, "ce": _2, "cesena-forli": _2, "xn--cesena-forl-mcb": _2, "cesena-forlì": _2, "cesenaforli": _2, "xn--cesenaforl-i8a": _2, "cesenaforlì": _2, "ch": _2, "chieti": _2, "ci": _2, "cl": _2, "cn": _2, "co": _2, "como": _2, "cosenza": _2, "cr": _2, "cremona": _2, "crotone": _2, "cs": _2, "ct": _2, "cuneo": _2, "cz": _2, "dell-ogliastra": _2, "dellogliastra": _2, "en": _2, "enna": _2, "fc": _2, "fe": _2, "fermo": _2, "ferrara": _2, "fg": _2, "fi": _2, "firenze": _2, "florence": _2, "fm": _2, "foggia": _2, "forli-cesena": _2, "xn--forl-cesena-fcb": _2, "forlì-cesena": _2, "forlicesena": _2, "xn--forlcesena-c8a": _2, "forlìcesena": _2, "fr": _2, "frosinone": _2, "ge": _2, "genoa": _2, "genova": _2, "go": _2, "gorizia": _2, "gr": _2, "grosseto": _2, "iglesias-carbonia": _2, "iglesiascarbonia": _2, "im": _2, "imperia": _2, "is": _2, "isernia": _2, "kr": _2, "la-spezia": _2, "laquila": _2, "laspezia": _2, "latina": _2, "lc": _2, "le": _2, "lecce": _2, "lecco": _2, "li": _2, "livorno": _2, "lo": _2, "lodi": _2, "lt": _2, "lu": _2, "lucca": _2, "macerata": _2, "mantova": _2, "massa-carrara": _2, "massacarrara": _2, "matera": _2, "mb": _2, "mc": _2, "me": _2, "medio-campidano": _2, "mediocampidano": _2, "messina": _2, "mi": _2, "milan": _2, "milano": _2, "mn": _2, "mo": _2, "modena": _2, "monza-brianza": _2, "monza-e-della-brianza": _2, "monza": _2, "monzabrianza": _2, "monzaebrianza": _2, "monzaedellabrianza": _2, "ms": _2, "mt": _2, "na": _2, "naples": _2, "napoli": _2, "no": _2, "novara": _2, "nu": _2, "nuoro": _2, "og": _2, "ogliastra": _2, "olbia-tempio": _2, "olbiatempio": _2, "or": _2, "oristano": _2, "ot": _2, "pa": _2, "padova": _2, "padua": _2, "palermo": _2, "parma": _2, "pavia": _2, "pc": _2, "pd": _2, "pe": _2, "perugia": _2, "pesaro-urbino": _2, "pesarourbino": _2, "pescara": _2, "pg": _2, "pi": _2, "piacenza": _2, "pisa": _2, "pistoia": _2, "pn": _2, "po": _2, "pordenone": _2, "potenza": _2, "pr": _2, "prato": _2, "pt": _2, "pu": _2, "pv": _2, "pz": _2, "ra": _2, "ragusa": _2, "ravenna": _2, "rc": _2, "re": _2, "reggio-calabria": _2, "reggio-emilia": _2, "reggiocalabria": _2, "reggioemilia": _2, "rg": _2, "ri": _2, "rieti": _2, "rimini": _2, "rm": _2, "rn": _2, "ro": _2, "roma": _2, "rome": _2, "rovigo": _2, "sa": _2, "salerno": _2, "sassari": _2, "savona": _2, "si": _2, "siena": _2, "siracusa": _2, "so": _2, "sondrio": _2, "sp": _2, "sr": _2, "ss": _2, "suedtirol": _2, "xn--sdtirol-n2a": _2, "südtirol": _2, "sv": _2, "ta": _2, "taranto": _2, "te": _2, "tempio-olbia": _2, "tempioolbia": _2, "teramo": _2, "terni": _2, "tn": _2, "to": _2, "torino": _2, "tp": _2, "tr": _2, "trani-andria-barletta": _2, "trani-barletta-andria": _2, "traniandriabarletta": _2, "tranibarlettaandria": _2, "trapani": _2, "trento": _2, "treviso": _2, "trieste": _2, "ts": _2, "turin": _2, "tv": _2, "ud": _2, "udine": _2, "urbino-pesaro": _2, "urbinopesaro": _2, "va": _2, "varese": _2, "vb": _2, "vc": _2, "ve": _2, "venezia": _2, "venice": _2, "verbania": _2, "vercelli": _2, "verona": _2, "vi": _2, "vibo-valentia": _2, "vibovalentia": _2, "vicenza": _2, "viterbo": _2, "vr": _2, "vs": _2, "vt": _2, "vv": _2, "blogspot": _4, "16-b": _4, "32-b": _4, "64-b": _4, "syncloud": _4 } }, "je": { "$": 1, "succ": { "co": _2, "net": _2, "org": _2 } }, "jm": _8, "jo": { "$": 1, "succ": { "com": _2, "org": _2, "net": _2, "edu": _2, "sch": _2, "gov": _2, "mil": _2, "name": _2 } }, "jobs": _2, "jp": { "$": 1, "succ": { "ac": _2, "ad": _2, "co": _2, "ed": _2, "go": _2, "gr": _2, "lg": _2, "ne": { "$": 1, "succ": { "aseinet": _18, "gehirn": _4 } }, "or": _2, "aichi": { "$": 1, "succ": { "aisai": _2, "ama": _2, "anjo": _2, "asuke": _2, "chiryu": _2, "chita": _2, "fuso": _2, "gamagori": _2, "handa": _2, "hazu": _2, "hekinan": _2, "higashiura": _2, "ichinomiya": _2, "inazawa": _2, "inuyama": _2, "isshiki": _2, "iwakura": _2, "kanie": _2, "kariya": _2, "kasugai": _2, "kira": _2, "kiyosu": _2, "komaki": _2, "konan": _2, "kota": _2, "mihama": _2, "miyoshi": _2, "nishio": _2, "nisshin": _2, "obu": _2, "oguchi": _2, "oharu": _2, "okazaki": _2, "owariasahi": _2, "seto": _2, "shikatsu": _2, "shinshiro": _2, "shitara": _2, "tahara": _2, "takahama": _2, "tobishima": _2, "toei": _2, "togo": _2, "tokai": _2, "tokoname": _2, "toyoake": _2, "toyohashi": _2, "toyokawa": _2, "toyone": _2, "toyota": _2, "tsushima": _2, "yatomi": _2 } }, "akita": { "$": 1, "succ": { "akita": _2, "daisen": _2, "fujisato": _2, "gojome": _2, "hachirogata": _2, "happou": _2, "higashinaruse": _2, "honjo": _2, "honjyo": _2, "ikawa": _2, "kamikoani": _2, "kamioka": _2, "katagami": _2, "kazuno": _2, "kitaakita": _2, "kosaka": _2, "kyowa": _2, "misato": _2, "mitane": _2, "moriyoshi": _2, "nikaho": _2, "noshiro": _2, "odate": _2, "oga": _2, "ogata": _2, "semboku": _2, "yokote": _2, "yurihonjo": _2 } }, "aomori": { "$": 1, "succ": { "aomori": _2, "gonohe": _2, "hachinohe": _2, "hashikami": _2, "hiranai": _2, "hirosaki": _2, "itayanagi": _2, "kuroishi": _2, "misawa": _2, "mutsu": _2, "nakadomari": _2, "noheji": _2, "oirase": _2, "owani": _2, "rokunohe": _2, "sannohe": _2, "shichinohe": _2, "shingo": _2, "takko": _2, "towada": _2, "tsugaru": _2, "tsuruta": _2 } }, "chiba": { "$": 1, "succ": { "abiko": _2, "asahi": _2, "chonan": _2, "chosei": _2, "choshi": _2, "chuo": _2, "funabashi": _2, "futtsu": _2, "hanamigawa": _2, "ichihara": _2, "ichikawa": _2, "ichinomiya": _2, "inzai": _2, "isumi": _2, "kamagaya": _2, "kamogawa": _2, "kashiwa": _2, "katori": _2, "katsuura": _2, "kimitsu": _2, "kisarazu": _2, "kozaki": _2, "kujukuri": _2, "kyonan": _2, "matsudo": _2, "midori": _2, "mihama": _2, "minamiboso": _2, "mobara": _2, "mutsuzawa": _2, "nagara": _2, "nagareyama": _2, "narashino": _2, "narita": _2, "noda": _2, "oamishirasato": _2, "omigawa": _2, "onjuku": _2, "otaki": _2, "sakae": _2, "sakura": _2, "shimofusa": _2, "shirako": _2, "shiroi": _2, "shisui": _2, "sodegaura": _2, "sosa": _2, "tako": _2, "tateyama": _2, "togane": _2, "tohnosho": _2, "tomisato": _2, "urayasu": _2, "yachimata": _2, "yachiyo": _2, "yokaichiba": _2, "yokoshibahikari": _2, "yotsukaido": _2 } }, "ehime": { "$": 1, "succ": { "ainan": _2, "honai": _2, "ikata": _2, "imabari": _2, "iyo": _2, "kamijima": _2, "kihoku": _2, "kumakogen": _2, "masaki": _2, "matsuno": _2, "matsuyama": _2, "namikata": _2, "niihama": _2, "ozu": _2, "saijo": _2, "seiyo": _2, "shikokuchuo": _2, "tobe": _2, "toon": _2, "uchiko": _2, "uwajima": _2, "yawatahama": _2 } }, "fukui": { "$": 1, "succ": { "echizen": _2, "eiheiji": _2, "fukui": _2, "ikeda": _2, "katsuyama": _2, "mihama": _2, "minamiechizen": _2, "obama": _2, "ohi": _2, "ono": _2, "sabae": _2, "sakai": _2, "takahama": _2, "tsuruga": _2, "wakasa": _2 } }, "fukuoka": { "$": 1, "succ": { "ashiya": _2, "buzen": _2, "chikugo": _2, "chikuho": _2, "chikujo": _2, "chikushino": _2, "chikuzen": _2, "chuo": _2, "dazaifu": _2, "fukuchi": _2, "hakata": _2, "higashi": _2, "hirokawa": _2, "hisayama": _2, "iizuka": _2, "inatsuki": _2, "kaho": _2, "kasuga": _2, "kasuya": _2, "kawara": _2, "keisen": _2, "koga": _2, "kurate": _2, "kurogi": _2, "kurume": _2, "minami": _2, "miyako": _2, "miyama": _2, "miyawaka": _2, "mizumaki": _2, "munakata": _2, "nakagawa": _2, "nakama": _2, "nishi": _2, "nogata": _2, "ogori": _2, "okagaki": _2, "okawa": _2, "oki": _2, "omuta": _2, "onga": _2, "onojo": _2, "oto": _2, "saigawa": _2, "sasaguri": _2, "shingu": _2, "shinyoshitomi": _2, "shonai": _2, "soeda": _2, "sue": _2, "tachiarai": _2, "tagawa": _2, "takata": _2, "toho": _2, "toyotsu": _2, "tsuiki": _2, "ukiha": _2, "umi": _2, "usui": _2, "yamada": _2, "yame": _2, "yanagawa": _2, "yukuhashi": _2 } }, "fukushima": { "$": 1, "succ": { "aizubange": _2, "aizumisato": _2, "aizuwakamatsu": _2, "asakawa": _2, "bandai": _2, "date": _2, "fukushima": _2, "furudono": _2, "futaba": _2, "hanawa": _2, "higashi": _2, "hirata": _2, "hirono": _2, "iitate": _2, "inawashiro": _2, "ishikawa": _2, "iwaki": _2, "izumizaki": _2, "kagamiishi": _2, "kaneyama": _2, "kawamata": _2, "kitakata": _2, "kitashiobara": _2, "koori": _2, "koriyama": _2, "kunimi": _2, "miharu": _2, "mishima": _2, "namie": _2, "nango": _2, "nishiaizu": _2, "nishigo": _2, "okuma": _2, "omotego": _2, "ono": _2, "otama": _2, "samegawa": _2, "shimogo": _2, "shirakawa": _2, "showa": _2, "soma": _2, "sukagawa": _2, "taishin": _2, "tamakawa": _2, "tanagura": _2, "tenei": _2, "yabuki": _2, "yamato": _2, "yamatsuri": _2, "yanaizu": _2, "yugawa": _2 } }, "gifu": { "$": 1, "succ": { "anpachi": _2, "ena": _2, "gifu": _2, "ginan": _2, "godo": _2, "gujo": _2, "hashima": _2, "hichiso": _2, "hida": _2, "higashishirakawa": _2, "ibigawa": _2, "ikeda": _2, "kakamigahara": _2, "kani": _2, "kasahara": _2, "kasamatsu": _2, "kawaue": _2, "kitagata": _2, "mino": _2, "minokamo": _2, "mitake": _2, "mizunami": _2, "motosu": _2, "nakatsugawa": _2, "ogaki": _2, "sakahogi": _2, "seki": _2, "sekigahara": _2, "shirakawa": _2, "tajimi": _2, "takayama": _2, "tarui": _2, "toki": _2, "tomika": _2, "wanouchi": _2, "yamagata": _2, "yaotsu": _2, "yoro": _2 } }, "gunma": { "$": 1, "succ": { "annaka": _2, "chiyoda": _2, "fujioka": _2, "higashiagatsuma": _2, "isesaki": _2, "itakura": _2, "kanna": _2, "kanra": _2, "katashina": _2, "kawaba": _2, "kiryu": _2, "kusatsu": _2, "maebashi": _2, "meiwa": _2, "midori": _2, "minakami": _2, "naganohara": _2, "nakanojo": _2, "nanmoku": _2, "numata": _2, "oizumi": _2, "ora": _2, "ota": _2, "shibukawa": _2, "shimonita": _2, "shinto": _2, "showa": _2, "takasaki": _2, "takayama": _2, "tamamura": _2, "tatebayashi": _2, "tomioka": _2, "tsukiyono": _2, "tsumagoi": _2, "ueno": _2, "yoshioka": _2 } }, "hiroshima": { "$": 1, "succ": { "asaminami": _2, "daiwa": _2, "etajima": _2, "fuchu": _2, "fukuyama": _2, "hatsukaichi": _2, "higashihiroshima": _2, "hongo": _2, "jinsekikogen": _2, "kaita": _2, "kui": _2, "kumano": _2, "kure": _2, "mihara": _2, "miyoshi": _2, "naka": _2, "onomichi": _2, "osakikamijima": _2, "otake": _2, "saka": _2, "sera": _2, "seranishi": _2, "shinichi": _2, "shobara": _2, "takehara": _2 } }, "hokkaido": { "$": 1, "succ": { "abashiri": _2, "abira": _2, "aibetsu": _2, "akabira": _2, "akkeshi": _2, "asahikawa": _2, "ashibetsu": _2, "ashoro": _2, "assabu": _2, "atsuma": _2, "bibai": _2, "biei": _2, "bifuka": _2, "bihoro": _2, "biratori": _2, "chippubetsu": _2, "chitose": _2, "date": _2, "ebetsu": _2, "embetsu": _2, "eniwa": _2, "erimo": _2, "esan": _2, "esashi": _2, "fukagawa": _2, "fukushima": _2, "furano": _2, "furubira": _2, "haboro": _2, "hakodate": _2, "hamatonbetsu": _2, "hidaka": _2, "higashikagura": _2, "higashikawa": _2, "hiroo": _2, "hokuryu": _2, "hokuto": _2, "honbetsu": _2, "horokanai": _2, "horonobe": _2, "ikeda": _2, "imakane": _2, "ishikari": _2, "iwamizawa": _2, "iwanai": _2, "kamifurano": _2, "kamikawa": _2, "kamishihoro": _2, "kamisunagawa": _2, "kamoenai": _2, "kayabe": _2, "kembuchi": _2, "kikonai": _2, "kimobetsu": _2, "kitahiroshima": _2, "kitami": _2, "kiyosato": _2, "koshimizu": _2, "kunneppu": _2, "kuriyama": _2, "kuromatsunai": _2, "kushiro": _2, "kutchan": _2, "kyowa": _2, "mashike": _2, "matsumae": _2, "mikasa": _2, "minamifurano": _2, "mombetsu": _2, "moseushi": _2, "mukawa": _2, "muroran": _2, "naie": _2, "nakagawa": _2, "nakasatsunai": _2, "nakatombetsu": _2, "nanae": _2, "nanporo": _2, "nayoro": _2, "nemuro": _2, "niikappu": _2, "niki": _2, "nishiokoppe": _2, "noboribetsu": _2, "numata": _2, "obihiro": _2, "obira": _2, "oketo": _2, "okoppe": _2, "otaru": _2, "otobe": _2, "otofuke": _2, "otoineppu": _2, "oumu": _2, "ozora": _2, "pippu": _2, "rankoshi": _2, "rebun": _2, "rikubetsu": _2, "rishiri": _2, "rishirifuji": _2, "saroma": _2, "sarufutsu": _2, "shakotan": _2, "shari": _2, "shibecha": _2, "shibetsu": _2, "shikabe": _2, "shikaoi": _2, "shimamaki": _2, "shimizu": _2, "shimokawa": _2, "shinshinotsu": _2, "shintoku": _2, "shiranuka": _2, "shiraoi": _2, "shiriuchi": _2, "sobetsu": _2, "sunagawa": _2, "taiki": _2, "takasu": _2, "takikawa": _2, "takinoue": _2, "teshikaga": _2, "tobetsu": _2, "tohma": _2, "tomakomai": _2, "tomari": _2, "toya": _2, "toyako": _2, "toyotomi": _2, "toyoura": _2, "tsubetsu": _2, "tsukigata": _2, "urakawa": _2, "urausu": _2, "uryu": _2, "utashinai": _2, "wakkanai": _2, "wassamu": _2, "yakumo": _2, "yoichi": _2 } }, "hyogo": { "$": 1, "succ": { "aioi": _2, "akashi": _2, "ako": _2, "amagasaki": _2, "aogaki": _2, "asago": _2, "ashiya": _2, "awaji": _2, "fukusaki": _2, "goshiki": _2, "harima": _2, "himeji": _2, "ichikawa": _2, "inagawa": _2, "itami": _2, "kakogawa": _2, "kamigori": _2, "kamikawa": _2, "kasai": _2, "kasuga": _2, "kawanishi": _2, "miki": _2, "minamiawaji": _2, "nishinomiya": _2, "nishiwaki": _2, "ono": _2, "sanda": _2, "sannan": _2, "sasayama": _2, "sayo": _2, "shingu": _2, "shinonsen": _2, "shiso": _2, "sumoto": _2, "taishi": _2, "taka": _2, "takarazuka": _2, "takasago": _2, "takino": _2, "tamba": _2, "tatsuno": _2, "toyooka": _2, "yabu": _2, "yashiro": _2, "yoka": _2, "yokawa": _2 } }, "ibaraki": { "$": 1, "succ": { "ami": _2, "asahi": _2, "bando": _2, "chikusei": _2, "daigo": _2, "fujishiro": _2, "hitachi": _2, "hitachinaka": _2, "hitachiomiya": _2, "hitachiota": _2, "ibaraki": _2, "ina": _2, "inashiki": _2, "itako": _2, "iwama": _2, "joso": _2, "kamisu": _2, "kasama": _2, "kashima": _2, "kasumigaura": _2, "koga": _2, "miho": _2, "mito": _2, "moriya": _2, "naka": _2, "namegata": _2, "oarai": _2, "ogawa": _2, "omitama": _2, "ryugasaki": _2, "sakai": _2, "sakuragawa": _2, "shimodate": _2, "shimotsuma": _2, "shirosato": _2, "sowa": _2, "suifu": _2, "takahagi": _2, "tamatsukuri": _2, "tokai": _2, "tomobe": _2, "tone": _2, "toride": _2, "tsuchiura": _2, "tsukuba": _2, "uchihara": _2, "ushiku": _2, "yachiyo": _2, "yamagata": _2, "yawara": _2, "yuki": _2 } }, "ishikawa": { "$": 1, "succ": { "anamizu": _2, "hakui": _2, "hakusan": _2, "kaga": _2, "kahoku": _2, "kanazawa": _2, "kawakita": _2, "komatsu": _2, "nakanoto": _2, "nanao": _2, "nomi": _2, "nonoichi": _2, "noto": _2, "shika": _2, "suzu": _2, "tsubata": _2, "tsurugi": _2, "uchinada": _2, "wajima": _2 } }, "iwate": { "$": 1, "succ": { "fudai": _2, "fujisawa": _2, "hanamaki": _2, "hiraizumi": _2, "hirono": _2, "ichinohe": _2, "ichinoseki": _2, "iwaizumi": _2, "iwate": _2, "joboji": _2, "kamaishi": _2, "kanegasaki": _2, "karumai": _2, "kawai": _2, "kitakami": _2, "kuji": _2, "kunohe": _2, "kuzumaki": _2, "miyako": _2, "mizusawa": _2, "morioka": _2, "ninohe": _2, "noda": _2, "ofunato": _2, "oshu": _2, "otsuchi": _2, "rikuzentakata": _2, "shiwa": _2, "shizukuishi": _2, "sumita": _2, "tanohata": _2, "tono": _2, "yahaba": _2, "yamada": _2 } }, "kagawa": { "$": 1, "succ": { "ayagawa": _2, "higashikagawa": _2, "kanonji": _2, "kotohira": _2, "manno": _2, "marugame": _2, "mitoyo": _2, "naoshima": _2, "sanuki": _2, "tadotsu": _2, "takamatsu": _2, "tonosho": _2, "uchinomi": _2, "utazu": _2, "zentsuji": _2 } }, "kagoshima": { "$": 1, "succ": { "akune": _2, "amami": _2, "hioki": _2, "isa": _2, "isen": _2, "izumi": _2, "kagoshima": _2, "kanoya": _2, "kawanabe": _2, "kinko": _2, "kouyama": _2, "makurazaki": _2, "matsumoto": _2, "minamitane": _2, "nakatane": _2, "nishinoomote": _2, "satsumasendai": _2, "soo": _2, "tarumizu": _2, "yusui": _2 } }, "kanagawa": { "$": 1, "succ": { "aikawa": _2, "atsugi": _2, "ayase": _2, "chigasaki": _2, "ebina": _2, "fujisawa": _2, "hadano": _2, "hakone": _2, "hiratsuka": _2, "isehara": _2, "kaisei": _2, "kamakura": _2, "kiyokawa": _2, "matsuda": _2, "minamiashigara": _2, "miura": _2, "nakai": _2, "ninomiya": _2, "odawara": _2, "oi": _2, "oiso": _2, "sagamihara": _2, "samukawa": _2, "tsukui": _2, "yamakita": _2, "yamato": _2, "yokosuka": _2, "yugawara": _2, "zama": _2, "zushi": _2 } }, "kochi": { "$": 1, "succ": { "aki": _2, "geisei": _2, "hidaka": _2, "higashitsuno": _2, "ino": _2, "kagami": _2, "kami": _2, "kitagawa": _2, "kochi": _2, "mihara": _2, "motoyama": _2, "muroto": _2, "nahari": _2, "nakamura": _2, "nankoku": _2, "nishitosa": _2, "niyodogawa": _2, "ochi": _2, "okawa": _2, "otoyo": _2, "otsuki": _2, "sakawa": _2, "sukumo": _2, "susaki": _2, "tosa": _2, "tosashimizu": _2, "toyo": _2, "tsuno": _2, "umaji": _2, "yasuda": _2, "yusuhara": _2 } }, "kumamoto": { "$": 1, "succ": { "amakusa": _2, "arao": _2, "aso": _2, "choyo": _2, "gyokuto": _2, "kamiamakusa": _2, "kikuchi": _2, "kumamoto": _2, "mashiki": _2, "mifune": _2, "minamata": _2, "minamioguni": _2, "nagasu": _2, "nishihara": _2, "oguni": _2, "ozu": _2, "sumoto": _2, "takamori": _2, "uki": _2, "uto": _2, "yamaga": _2, "yamato": _2, "yatsushiro": _2 } }, "kyoto": { "$": 1, "succ": { "ayabe": _2, "fukuchiyama": _2, "higashiyama": _2, "ide": _2, "ine": _2, "joyo": _2, "kameoka": _2, "kamo": _2, "kita": _2, "kizu": _2, "kumiyama": _2, "kyotamba": _2, "kyotanabe": _2, "kyotango": _2, "maizuru": _2, "minami": _2, "minamiyamashiro": _2, "miyazu": _2, "muko": _2, "nagaokakyo": _2, "nakagyo": _2, "nantan": _2, "oyamazaki": _2, "sakyo": _2, "seika": _2, "tanabe": _2, "uji": _2, "ujitawara": _2, "wazuka": _2, "yamashina": _2, "yawata": _2 } }, "mie": { "$": 1, "succ": { "asahi": _2, "inabe": _2, "ise": _2, "kameyama": _2, "kawagoe": _2, "kiho": _2, "kisosaki": _2, "kiwa": _2, "komono": _2, "kumano": _2, "kuwana": _2, "matsusaka": _2, "meiwa": _2, "mihama": _2, "minamiise": _2, "misugi": _2, "miyama": _2, "nabari": _2, "shima": _2, "suzuka": _2, "tado": _2, "taiki": _2, "taki": _2, "tamaki": _2, "toba": _2, "tsu": _2, "udono": _2, "ureshino": _2, "watarai": _2, "yokkaichi": _2 } }, "miyagi": { "$": 1, "succ": { "furukawa": _2, "higashimatsushima": _2, "ishinomaki": _2, "iwanuma": _2, "kakuda": _2, "kami": _2, "kawasaki": _2, "marumori": _2, "matsushima": _2, "minamisanriku": _2, "misato": _2, "murata": _2, "natori": _2, "ogawara": _2, "ohira": _2, "onagawa": _2, "osaki": _2, "rifu": _2, "semine": _2, "shibata": _2, "shichikashuku": _2, "shikama": _2, "shiogama": _2, "shiroishi": _2, "tagajo": _2, "taiwa": _2, "tome": _2, "tomiya": _2, "wakuya": _2, "watari": _2, "yamamoto": _2, "zao": _2 } }, "miyazaki": { "$": 1, "succ": { "aya": _2, "ebino": _2, "gokase": _2, "hyuga": _2, "kadogawa": _2, "kawaminami": _2, "kijo": _2, "kitagawa": _2, "kitakata": _2, "kitaura": _2, "kobayashi": _2, "kunitomi": _2, "kushima": _2, "mimata": _2, "miyakonojo": _2, "miyazaki": _2, "morotsuka": _2, "nichinan": _2, "nishimera": _2, "nobeoka": _2, "saito": _2, "shiiba": _2, "shintomi": _2, "takaharu": _2, "takanabe": _2, "takazaki": _2, "tsuno": _2 } }, "nagano": { "$": 1, "succ": { "achi": _2, "agematsu": _2, "anan": _2, "aoki": _2, "asahi": _2, "azumino": _2, "chikuhoku": _2, "chikuma": _2, "chino": _2, "fujimi": _2, "hakuba": _2, "hara": _2, "hiraya": _2, "iida": _2, "iijima": _2, "iiyama": _2, "iizuna": _2, "ikeda": _2, "ikusaka": _2, "ina": _2, "karuizawa": _2, "kawakami": _2, "kiso": _2, "kisofukushima": _2, "kitaaiki": _2, "komagane": _2, "komoro": _2, "matsukawa": _2, "matsumoto": _2, "miasa": _2, "minamiaiki": _2, "minamimaki": _2, "minamiminowa": _2, "minowa": _2, "miyada": _2, "miyota": _2, "mochizuki": _2, "nagano": _2, "nagawa": _2, "nagiso": _2, "nakagawa": _2, "nakano": _2, "nozawaonsen": _2, "obuse": _2, "ogawa": _2, "okaya": _2, "omachi": _2, "omi": _2, "ookuwa": _2, "ooshika": _2, "otaki": _2, "otari": _2, "sakae": _2, "sakaki": _2, "saku": _2, "sakuho": _2, "shimosuwa": _2, "shinanomachi": _2, "shiojiri": _2, "suwa": _2, "suzaka": _2, "takagi": _2, "takamori": _2, "takayama": _2, "tateshina": _2, "tatsuno": _2, "togakushi": _2, "togura": _2, "tomi": _2, "ueda": _2, "wada": _2, "yamagata": _2, "yamanouchi": _2, "yasaka": _2, "yasuoka": _2 } }, "nagasaki": { "$": 1, "succ": { "chijiwa": _2, "futsu": _2, "goto": _2, "hasami": _2, "hirado": _2, "iki": _2, "isahaya": _2, "kawatana": _2, "kuchinotsu": _2, "matsuura": _2, "nagasaki": _2, "obama": _2, "omura": _2, "oseto": _2, "saikai": _2, "sasebo": _2, "seihi": _2, "shimabara": _2, "shinkamigoto": _2, "togitsu": _2, "tsushima": _2, "unzen": _2 } }, "nara": { "$": 1, "succ": { "ando": _2, "gose": _2, "heguri": _2, "higashiyoshino": _2, "ikaruga": _2, "ikoma": _2, "kamikitayama": _2, "kanmaki": _2, "kashiba": _2, "kashihara": _2, "katsuragi": _2, "kawai": _2, "kawakami": _2, "kawanishi": _2, "koryo": _2, "kurotaki": _2, "mitsue": _2, "miyake": _2, "nara": _2, "nosegawa": _2, "oji": _2, "ouda": _2, "oyodo": _2, "sakurai": _2, "sango": _2, "shimoichi": _2, "shimokitayama": _2, "shinjo": _2, "soni": _2, "takatori": _2, "tawaramoto": _2, "tenkawa": _2, "tenri": _2, "uda": _2, "yamatokoriyama": _2, "yamatotakada": _2, "yamazoe": _2, "yoshino": _2 } }, "niigata": { "$": 1, "succ": { "aga": _2, "agano": _2, "gosen": _2, "itoigawa": _2, "izumozaki": _2, "joetsu": _2, "kamo": _2, "kariwa": _2, "kashiwazaki": _2, "minamiuonuma": _2, "mitsuke": _2, "muika": _2, "murakami": _2, "myoko": _2, "nagaoka": _2, "niigata": _2, "ojiya": _2, "omi": _2, "sado": _2, "sanjo": _2, "seiro": _2, "seirou": _2, "sekikawa": _2, "shibata": _2, "tagami": _2, "tainai": _2, "tochio": _2, "tokamachi": _2, "tsubame": _2, "tsunan": _2, "uonuma": _2, "yahiko": _2, "yoita": _2, "yuzawa": _2 } }, "oita": { "$": 1, "succ": { "beppu": _2, "bungoono": _2, "bungotakada": _2, "hasama": _2, "hiji": _2, "himeshima": _2, "hita": _2, "kamitsue": _2, "kokonoe": _2, "kuju": _2, "kunisaki": _2, "kusu": _2, "oita": _2, "saiki": _2, "taketa": _2, "tsukumi": _2, "usa": _2, "usuki": _2, "yufu": _2 } }, "okayama": { "$": 1, "succ": { "akaiwa": _2, "asakuchi": _2, "bizen": _2, "hayashima": _2, "ibara": _2, "kagamino": _2, "kasaoka": _2, "kibichuo": _2, "kumenan": _2, "kurashiki": _2, "maniwa": _2, "misaki": _2, "nagi": _2, "niimi": _2, "nishiawakura": _2, "okayama": _2, "satosho": _2, "setouchi": _2, "shinjo": _2, "shoo": _2, "soja": _2, "takahashi": _2, "tamano": _2, "tsuyama": _2, "wake": _2, "yakage": _2 } }, "okinawa": { "$": 1, "succ": { "aguni": _2, "ginowan": _2, "ginoza": _2, "gushikami": _2, "haebaru": _2, "higashi": _2, "hirara": _2, "iheya": _2, "ishigaki": _2, "ishikawa": _2, "itoman": _2, "izena": _2, "kadena": _2, "kin": _2, "kitadaito": _2, "kitanakagusuku": _2, "kumejima": _2, "kunigami": _2, "minamidaito": _2, "motobu": _2, "nago": _2, "naha": _2, "nakagusuku": _2, "nakijin": _2, "nanjo": _2, "nishihara": _2, "ogimi": _2, "okinawa": _2, "onna": _2, "shimoji": _2, "taketomi": _2, "tarama": _2, "tokashiki": _2, "tomigusuku": _2, "tonaki": _2, "urasoe": _2, "uruma": _2, "yaese": _2, "yomitan": _2, "yonabaru": _2, "yonaguni": _2, "zamami": _2 } }, "osaka": { "$": 1, "succ": { "abeno": _2, "chihayaakasaka": _2, "chuo": _2, "daito": _2, "fujiidera": _2, "habikino": _2, "hannan": _2, "higashiosaka": _2, "higashisumiyoshi": _2, "higashiyodogawa": _2, "hirakata": _2, "ibaraki": _2, "ikeda": _2, "izumi": _2, "izumiotsu": _2, "izumisano": _2, "kadoma": _2, "kaizuka": _2, "kanan": _2, "kashiwara": _2, "katano": _2, "kawachinagano": _2, "kishiwada": _2, "kita": _2, "kumatori": _2, "matsubara": _2, "minato": _2, "minoh": _2, "misaki": _2, "moriguchi": _2, "neyagawa": _2, "nishi": _2, "nose": _2, "osakasayama": _2, "sakai": _2, "sayama": _2, "sennan": _2, "settsu": _2, "shijonawate": _2, "shimamoto": _2, "suita": _2, "tadaoka": _2, "taishi": _2, "tajiri": _2, "takaishi": _2, "takatsuki": _2, "tondabayashi": _2, "toyonaka": _2, "toyono": _2, "yao": _2 } }, "saga": { "$": 1, "succ": { "ariake": _2, "arita": _2, "fukudomi": _2, "genkai": _2, "hamatama": _2, "hizen": _2, "imari": _2, "kamimine": _2, "kanzaki": _2, "karatsu": _2, "kashima": _2, "kitagata": _2, "kitahata": _2, "kiyama": _2, "kouhoku": _2, "kyuragi": _2, "nishiarita": _2, "ogi": _2, "omachi": _2, "ouchi": _2, "saga": _2, "shiroishi": _2, "taku": _2, "tara": _2, "tosu": _2, "yoshinogari": _2 } }, "saitama": { "$": 1, "succ": { "arakawa": _2, "asaka": _2, "chichibu": _2, "fujimi": _2, "fujimino": _2, "fukaya": _2, "hanno": _2, "hanyu": _2, "hasuda": _2, "hatogaya": _2, "hatoyama": _2, "hidaka": _2, "higashichichibu": _2, "higashimatsuyama": _2, "honjo": _2, "ina": _2, "iruma": _2, "iwatsuki": _2, "kamiizumi": _2, "kamikawa": _2, "kamisato": _2, "kasukabe": _2, "kawagoe": _2, "kawaguchi": _2, "kawajima": _2, "kazo": _2, "kitamoto": _2, "koshigaya": _2, "kounosu": _2, "kuki": _2, "kumagaya": _2, "matsubushi": _2, "minano": _2, "misato": _2, "miyashiro": _2, "miyoshi": _2, "moroyama": _2, "nagatoro": _2, "namegawa": _2, "niiza": _2, "ogano": _2, "ogawa": _2, "ogose": _2, "okegawa": _2, "omiya": _2, "otaki": _2, "ranzan": _2, "ryokami": _2, "saitama": _2, "sakado": _2, "satte": _2, "sayama": _2, "shiki": _2, "shiraoka": _2, "soka": _2, "sugito": _2, "toda": _2, "tokigawa": _2, "tokorozawa": _2, "tsurugashima": _2, "urawa": _2, "warabi": _2, "yashio": _2, "yokoze": _2, "yono": _2, "yorii": _2, "yoshida": _2, "yoshikawa": _2, "yoshimi": _2 } }, "shiga": { "$": 1, "succ": { "aisho": _2, "gamo": _2, "higashiomi": _2, "hikone": _2, "koka": _2, "konan": _2, "kosei": _2, "koto": _2, "kusatsu": _2, "maibara": _2, "moriyama": _2, "nagahama": _2, "nishiazai": _2, "notogawa": _2, "omihachiman": _2, "otsu": _2, "ritto": _2, "ryuoh": _2, "takashima": _2, "takatsuki": _2, "torahime": _2, "toyosato": _2, "yasu": _2 } }, "shimane": { "$": 1, "succ": { "akagi": _2, "ama": _2, "gotsu": _2, "hamada": _2, "higashiizumo": _2, "hikawa": _2, "hikimi": _2, "izumo": _2, "kakinoki": _2, "masuda": _2, "matsue": _2, "misato": _2, "nishinoshima": _2, "ohda": _2, "okinoshima": _2, "okuizumo": _2, "shimane": _2, "tamayu": _2, "tsuwano": _2, "unnan": _2, "yakumo": _2, "yasugi": _2, "yatsuka": _2 } }, "shizuoka": { "$": 1, "succ": { "arai": _2, "atami": _2, "fuji": _2, "fujieda": _2, "fujikawa": _2, "fujinomiya": _2, "fukuroi": _2, "gotemba": _2, "haibara": _2, "hamamatsu": _2, "higashiizu": _2, "ito": _2, "iwata": _2, "izu": _2, "izunokuni": _2, "kakegawa": _2, "kannami": _2, "kawanehon": _2, "kawazu": _2, "kikugawa": _2, "kosai": _2, "makinohara": _2, "matsuzaki": _2, "minamiizu": _2, "mishima": _2, "morimachi": _2, "nishiizu": _2, "numazu": _2, "omaezaki": _2, "shimada": _2, "shimizu": _2, "shimoda": _2, "shizuoka": _2, "susono": _2, "yaizu": _2, "yoshida": _2 } }, "tochigi": { "$": 1, "succ": { "ashikaga": _2, "bato": _2, "haga": _2, "ichikai": _2, "iwafune": _2, "kaminokawa": _2, "kanuma": _2, "karasuyama": _2, "kuroiso": _2, "mashiko": _2, "mibu": _2, "moka": _2, "motegi": _2, "nasu": _2, "nasushiobara": _2, "nikko": _2, "nishikata": _2, "nogi": _2, "ohira": _2, "ohtawara": _2, "oyama": _2, "sakura": _2, "sano": _2, "shimotsuke": _2, "shioya": _2, "takanezawa": _2, "tochigi": _2, "tsuga": _2, "ujiie": _2, "utsunomiya": _2, "yaita": _2 } }, "tokushima": { "$": 1, "succ": { "aizumi": _2, "anan": _2, "ichiba": _2, "itano": _2, "kainan": _2, "komatsushima": _2, "matsushige": _2, "mima": _2, "minami": _2, "miyoshi": _2, "mugi": _2, "nakagawa": _2, "naruto": _2, "sanagochi": _2, "shishikui": _2, "tokushima": _2, "wajiki": _2 } }, "tokyo": { "$": 1, "succ": { "adachi": _2, "akiruno": _2, "akishima": _2, "aogashima": _2, "arakawa": _2, "bunkyo": _2, "chiyoda": _2, "chofu": _2, "chuo": _2, "edogawa": _2, "fuchu": _2, "fussa": _2, "hachijo": _2, "hachioji": _2, "hamura": _2, "higashikurume": _2, "higashimurayama": _2, "higashiyamato": _2, "hino": _2, "hinode": _2, "hinohara": _2, "inagi": _2, "itabashi": _2, "katsushika": _2, "kita": _2, "kiyose": _2, "kodaira": _2, "koganei": _2, "kokubunji": _2, "komae": _2, "koto": _2, "kouzushima": _2, "kunitachi": _2, "machida": _2, "meguro": _2, "minato": _2, "mitaka": _2, "mizuho": _2, "musashimurayama": _2, "musashino": _2, "nakano": _2, "nerima": _2, "ogasawara": _2, "okutama": _2, "ome": _2, "oshima": _2, "ota": _2, "setagaya": _2, "shibuya": _2, "shinagawa": _2, "shinjuku": _2, "suginami": _2, "sumida": _2, "tachikawa": _2, "taito": _2, "tama": _2, "toshima": _2 } }, "tottori": { "$": 1, "succ": { "chizu": _2, "hino": _2, "kawahara": _2, "koge": _2, "kotoura": _2, "misasa": _2, "nanbu": _2, "nichinan": _2, "sakaiminato": _2, "tottori": _2, "wakasa": _2, "yazu": _2, "yonago": _2 } }, "toyama": { "$": 1, "succ": { "asahi": _2, "fuchu": _2, "fukumitsu": _2, "funahashi": _2, "himi": _2, "imizu": _2, "inami": _2, "johana": _2, "kamiichi": _2, "kurobe": _2, "nakaniikawa": _2, "namerikawa": _2, "nanto": _2, "nyuzen": _2, "oyabe": _2, "taira": _2, "takaoka": _2, "tateyama": _2, "toga": _2, "tonami": _2, "toyama": _2, "unazuki": _2, "uozu": _2, "yamada": _2 } }, "wakayama": { "$": 1, "succ": { "arida": _2, "aridagawa": _2, "gobo": _2, "hashimoto": _2, "hidaka": _2, "hirogawa": _2, "inami": _2, "iwade": _2, "kainan": _2, "kamitonda": _2, "katsuragi": _2, "kimino": _2, "kinokawa": _2, "kitayama": _2, "koya": _2, "koza": _2, "kozagawa": _2, "kudoyama": _2, "kushimoto": _2, "mihama": _2, "misato": _2, "nachikatsuura": _2, "shingu": _2, "shirahama": _2, "taiji": _2, "tanabe": _2, "wakayama": _2, "yuasa": _2, "yura": _2 } }, "yamagata": { "$": 1, "succ": { "asahi": _2, "funagata": _2, "higashine": _2, "iide": _2, "kahoku": _2, "kaminoyama": _2, "kaneyama": _2, "kawanishi": _2, "mamurogawa": _2, "mikawa": _2, "murayama": _2, "nagai": _2, "nakayama": _2, "nanyo": _2, "nishikawa": _2, "obanazawa": _2, "oe": _2, "oguni": _2, "ohkura": _2, "oishida": _2, "sagae": _2, "sakata": _2, "sakegawa": _2, "shinjo": _2, "shirataka": _2, "shonai": _2, "takahata": _2, "tendo": _2, "tozawa": _2, "tsuruoka": _2, "yamagata": _2, "yamanobe": _2, "yonezawa": _2, "yuza": _2 } }, "yamaguchi": { "$": 1, "succ": { "abu": _2, "hagi": _2, "hikari": _2, "hofu": _2, "iwakuni": _2, "kudamatsu": _2, "mitou": _2, "nagato": _2, "oshima": _2, "shimonoseki": _2, "shunan": _2, "tabuse": _2, "tokuyama": _2, "toyota": _2, "ube": _2, "yuu": _2 } }, "yamanashi": { "$": 1, "succ": { "chuo": _2, "doshi": _2, "fuefuki": _2, "fujikawa": _2, "fujikawaguchiko": _2, "fujiyoshida": _2, "hayakawa": _2, "hokuto": _2, "ichikawamisato": _2, "kai": _2, "kofu": _2, "koshu": _2, "kosuge": _2, "minami-alps": _2, "minobu": _2, "nakamichi": _2, "nanbu": _2, "narusawa": _2, "nirasaki": _2, "nishikatsura": _2, "oshino": _2, "otsuki": _2, "showa": _2, "tabayama": _2, "tsuru": _2, "uenohara": _2, "yamanakako": _2, "yamanashi": _2 } }, "xn--4pvxs": _2, "栃木": _2, "xn--vgu402c": _2, "愛知": _2, "xn--c3s14m": _2, "愛媛": _2, "xn--f6qx53a": _2, "兵庫": _2, "xn--8pvr4u": _2, "熊本": _2, "xn--uist22h": _2, "茨城": _2, "xn--djrs72d6uy": _2, "北海道": _2, "xn--mkru45i": _2, "千葉": _2, "xn--0trq7p7nn": _2, "和歌山": _2, "xn--8ltr62k": _2, "長崎": _2, "xn--2m4a15e": _2, "長野": _2, "xn--efvn9s": _2, "新潟": _2, "xn--32vp30h": _2, "青森": _2, "xn--4it797k": _2, "静岡": _2, "xn--1lqs71d": _2, "東京": _2, "xn--5rtp49c": _2, "石川": _2, "xn--5js045d": _2, "埼玉": _2, "xn--ehqz56n": _2, "三重": _2, "xn--1lqs03n": _2, "京都": _2, "xn--qqqt11m": _2, "佐賀": _2, "xn--kbrq7o": _2, "大分": _2, "xn--pssu33l": _2, "大阪": _2, "xn--ntsq17g": _2, "奈良": _2, "xn--uisz3g": _2, "宮城": _2, "xn--6btw5a": _2, "宮崎": _2, "xn--1ctwo": _2, "富山": _2, "xn--6orx2r": _2, "山口": _2, "xn--rht61e": _2, "山形": _2, "xn--rht27z": _2, "山梨": _2, "xn--djty4k": _2, "岩手": _2, "xn--nit225k": _2, "岐阜": _2, "xn--rht3d": _2, "岡山": _2, "xn--klty5x": _2, "島根": _2, "xn--kltx9a": _2, "広島": _2, "xn--kltp7d": _2, "徳島": _2, "xn--uuwu58a": _2, "沖縄": _2, "xn--zbx025d": _2, "滋賀": _2, "xn--ntso0iqx3a": _2, "神奈川": _2, "xn--elqq16h": _2, "福井": _2, "xn--4it168d": _2, "福岡": _2, "xn--klt787d": _2, "福島": _2, "xn--rny31h": _2, "秋田": _2, "xn--7t0a264c": _2, "群馬": _2, "xn--5rtq34k": _2, "香川": _2, "xn--k7yn95e": _2, "高知": _2, "xn--tor131o": _2, "鳥取": _2, "xn--d5qv7z876c": _2, "鹿児島": _2, "kawasaki": _8, "kitakyushu": _8, "kobe": _8, "nagoya": _8, "sapporo": _8, "sendai": _8, "yokohama": _8, "usercontent": _4, "blogspot": _4 } }, "ke": { "$": 1, "succ": { "ac": _2, "co": _5, "go": _2, "info": _2, "me": _2, "mobi": _2, "ne": _2, "or": _2, "sc": _2, "nom": _4 } }, "kg": _3, "kh": _8, "ki": _23, "km": { "$": 1, "succ": { "org": _2, "nom": _2, "gov": _2, "prd": _2, "tm": _2, "edu": _2, "mil": _2, "ass": _2, "com": _2, "coop": _2, "asso": _2, "presse": _2, "medecin": _2, "notaires": _2, "pharmaciens": _2, "veterinaire": _2, "gouv": _2 } }, "kn": { "$": 1, "succ": { "net": _2, "org": _2, "edu": _2, "gov": _2 } }, "kp": { "$": 1, "succ": { "com": _2, "edu": _2, "gov": _2, "org": _2, "rep": _2, "tra": _2 } }, "kr": { "$": 1, "succ": { "ac": _2, "co": _2, "es": _2, "go": _2, "hs": _2, "kg": _2, "mil": _2, "ms": _2, "ne": _2, "or": _2, "pe": _2, "re": _2, "sc": _2, "busan": _2, "chungbuk": _2, "chungnam": _2, "daegu": _2, "daejeon": _2, "gangwon": _2, "gwangju": _2, "gyeongbuk": _2, "gyeonggi": _2, "gyeongnam": _2, "incheon": _2, "jeju": _2, "jeonbuk": _2, "jeonnam": _2, "seoul": _2, "ulsan": _2, "blogspot": _4 } }, "kw": { "$": 1, "succ": { "com": _2, "edu": _2, "emb": _2, "gov": _2, "ind": _2, "net": _2, "org": _2 } }, "ky": _9, "kz": { "$": 1, "succ": { "org": _2, "edu": _2, "net": _2, "gov": _2, "mil": _2, "com": _2, "nym": _4 } }, "la": { "$": 1, "succ": { "int": _2, "net": _2, "info": _2, "edu": _2, "gov": _2, "per": _2, "com": _2, "org": _2, "bnr": _4, "c": _4, "nym": _4 } }, "lb": _9, "lc": { "$": 1, "succ": { "com": _2, "net": _2, "co": _2, "org": _2, "edu": _2, "gov": _2, "nym": _4, "oy": _4 } }, "li": { "$": 1, "succ": { "blogspot": _4, "caa": _4, "nom": _4, "nym": _4 } }, "lk": { "$": 1, "succ": { "gov": _2, "sch": _2, "net": _2, "int": _2, "com": _2, "org": _2, "edu": _2, "ngo": _2, "soc": _2, "web": _2, "ltd": _2, "assn": _2, "grp": _2, "hotel": _2, "ac": _2 } }, "lr": _9, "ls": { "$": 1, "succ": { "ac": _2, "biz": _2, "co": _2, "edu": _2, "gov": _2, "info": _2, "net": _2, "org": _2, "sc": _2 } }, "lt": _21, "lu": _24, "lv": { "$": 1, "succ": { "com": _2, "edu": _2, "gov": _2, "org": _2, "mil": _2, "id": _2, "net": _2, "asn": _2, "conf": _2 } }, "ly": { "$": 1, "succ": { "com": _2, "net": _2, "gov": _2, "plc": _2, "edu": _2, "sch": _2, "med": _2, "org": _2, "id": _2 } }, "ma": { "$": 1, "succ": { "co": _2, "net": _2, "gov": _2, "org": _2, "ac": _2, "press": _2 } }, "mc": { "$": 1, "succ": { "tm": _2, "asso": _2 } }, "md": _5, "me": { "$": 1, "succ": { "co": _2, "net": _2, "org": _2, "edu": _2, "ac": _2, "gov": _2, "its": _2, "priv": _2, "c66": _4, "daplie": { "$": 2, "succ": { "localhost": _4 } }, "filegear": _4, "filegear-au": _4, "filegear-de": _4, "filegear-gb": _4, "filegear-ie": _4, "filegear-jp": _4, "filegear-sg": _4, "glitch": _4, "ravendb": _4, "barsy": _4, "nctu": _4, "soundcast": _4, "tcp4": _4, "brasilia": _4, "ddns": _4, "dnsfor": _4, "hopto": _4, "loginto": _4, "noip": _4, "webhop": _4, "nym": _4, "diskstation": _4, "dscloud": _4, "i234": _4, "myds": _4, "synology": _4, "wedeploy": _4, "yombo": _4, "nohost": _4 } }, "mg": { "$": 1, "succ": { "org": _2, "nom": _2, "gov": _2, "prd": _2, "tm": _2, "edu": _2, "mil": _2, "com": _2, "co": _2 } }, "mh": _2, "mil": _2, "mk": { "$": 1, "succ": { "com": _2, "org": _2, "net": _2, "edu": _2, "gov": _2, "inf": _2, "name": _2, "blogspot": _4, "nom": _4 } }, "ml": { "$": 1, "succ": { "com": _2, "edu": _2, "gouv": _2, "gov": _2, "net": _2, "org": _2, "presse": _2 } }, "mm": _8, "mn": { "$": 1, "succ": { "gov": _2, "edu": _2, "org": _2, "nyc": _4, "nym": _4 } }, "mo": _9, "mobi": { "$": 1, "succ": { "barsy": _4, "dscloud": _4 } }, "mp": _2, "mq": _2, "mr": { "$": 1, "succ": { "gov": _2, "blogspot": _4 } }, "ms": { "$": 1, "succ": { "com": _2, "edu": _2, "gov": _2, "net": _2, "org": _2, "lab": _4 } }, "mt": { "$": 1, "succ": { "com": _5, "edu": _2, "net": _2, "org": _2 } }, "mu": { "$": 1, "succ": { "com": _2, "net": _2, "org": _2, "gov": _2, "ac": _2, "co": _2, "or": _2 } }, "museum": { "$": 1, "succ": { "academy": _2, "agriculture": _2, "air": _2, "airguard": _2, "alabama": _2, "alaska": _2, "amber": _2, "ambulance": _2, "american": _2, "americana": _2, "americanantiques": _2, "americanart": _2, "amsterdam": _2, "and": _2, "annefrank": _2, "anthro": _2, "anthropology": _2, "antiques": _2, "aquarium": _2, "arboretum": _2, "archaeological": _2, "archaeology": _2, "architecture": _2, "art": _2, "artanddesign": _2, "artcenter": _2, "artdeco": _2, "arteducation": _2, "artgallery": _2, "arts": _2, "artsandcrafts": _2, "asmatart": _2, "assassination": _2, "assisi": _2, "association": _2, "astronomy": _2, "atlanta": _2, "austin": _2, "australia": _2, "automotive": _2, "aviation": _2, "axis": _2, "badajoz": _2, "baghdad": _2, "bahn": _2, "bale": _2, "baltimore": _2, "barcelona": _2, "baseball": _2, "basel": _2, "baths": _2, "bauern": _2, "beauxarts": _2, "beeldengeluid": _2, "bellevue": _2, "bergbau": _2, "berkeley": _2, "berlin": _2, "bern": _2, "bible": _2, "bilbao": _2, "bill": _2, "birdart": _2, "birthplace": _2, "bonn": _2, "boston": _2, "botanical": _2, "botanicalgarden": _2, "botanicgarden": _2, "botany": _2, "brandywinevalley": _2, "brasil": _2, "bristol": _2, "british": _2, "britishcolumbia": _2, "broadcast": _2, "brunel": _2, "brussel": _2, "brussels": _2, "bruxelles": _2, "building": _2, "burghof": _2, "bus": _2, "bushey": _2, "cadaques": _2, "california": _2, "cambridge": _2, "can": _2, "canada": _2, "capebreton": _2, "carrier": _2, "cartoonart": _2, "casadelamoneda": _2, "castle": _2, "castres": _2, "celtic": _2, "center": _2, "chattanooga": _2, "cheltenham": _2, "chesapeakebay": _2, "chicago": _2, "children": _2, "childrens": _2, "childrensgarden": _2, "chiropractic": _2, "chocolate": _2, "christiansburg": _2, "cincinnati": _2, "cinema": _2, "circus": _2, "civilisation": _2, "civilization": _2, "civilwar": _2, "clinton": _2, "clock": _2, "coal": _2, "coastaldefence": _2, "cody": _2, "coldwar": _2, "collection": _2, "colonialwilliamsburg": _2, "coloradoplateau": _2, "columbia": _2, "columbus": _2, "communication": _2, "communications": _2, "community": _2, "computer": _2, "computerhistory": _2, "xn--comunicaes-v6a2o": _2, "comunicações": _2, "contemporary": _2, "contemporaryart": _2, "convent": _2, "copenhagen": _2, "corporation": _2, "xn--correios-e-telecomunicaes-ghc29a": _2, "correios-e-telecomunicações": _2, "corvette": _2, "costume": _2, "countryestate": _2, "county": _2, "crafts": _2, "cranbrook": _2, "creation": _2, "cultural": _2, "culturalcenter": _2, "culture": _2, "cyber": _2, "cymru": _2, "dali": _2, "dallas": _2, "database": _2, "ddr": _2, "decorativearts": _2, "delaware": _2, "delmenhorst": _2, "denmark": _2, "depot": _2, "design": _2, "detroit": _2, "dinosaur": _2, "discovery": _2, "dolls": _2, "donostia": _2, "durham": _2, "eastafrica": _2, "eastcoast": _2, "education": _2, "educational": _2, "egyptian": _2, "eisenbahn": _2, "elburg": _2, "elvendrell": _2, "embroidery": _2, "encyclopedic": _2, "england": _2, "entomology": _2, "environment": _2, "environmentalconservation": _2, "epilepsy": _2, "essex": _2, "estate": _2, "ethnology": _2, "exeter": _2, "exhibition": _2, "family": _2, "farm": _2, "farmequipment": _2, "farmers": _2, "farmstead": _2, "field": _2, "figueres": _2, "filatelia": _2, "film": _2, "fineart": _2, "finearts": _2, "finland": _2, "flanders": _2, "florida": _2, "force": _2, "fortmissoula": _2, "fortworth": _2, "foundation": _2, "francaise": _2, "frankfurt": _2, "franziskaner": _2, "freemasonry": _2, "freiburg": _2, "fribourg": _2, "frog": _2, "fundacio": _2, "furniture": _2, "gallery": _2, "garden": _2, "gateway": _2, "geelvinck": _2, "gemological": _2, "geology": _2, "georgia": _2, "giessen": _2, "glas": _2, "glass": _2, "gorge": _2, "grandrapids": _2, "graz": _2, "guernsey": _2, "halloffame": _2, "hamburg": _2, "handson": _2, "harvestcelebration": _2, "hawaii": _2, "health": _2, "heimatunduhren": _2, "hellas": _2, "helsinki": _2, "hembygdsforbund": _2, "heritage": _2, "histoire": _2, "historical": _2, "historicalsociety": _2, "historichouses": _2, "historisch": _2, "historisches": _2, "history": _2, "historyofscience": _2, "horology": _2, "house": _2, "humanities": _2, "illustration": _2, "imageandsound": _2, "indian": _2, "indiana": _2, "indianapolis": _2, "indianmarket": _2, "intelligence": _2, "interactive": _2, "iraq": _2, "iron": _2, "isleofman": _2, "jamison": _2, "jefferson": _2, "jerusalem": _2, "jewelry": _2, "jewish": _2, "jewishart": _2, "jfk": _2, "journalism": _2, "judaica": _2, "judygarland": _2, "juedisches": _2, "juif": _2, "karate": _2, "karikatur": _2, "kids": _2, "koebenhavn": _2, "koeln": _2, "kunst": _2, "kunstsammlung": _2, "kunstunddesign": _2, "labor": _2, "labour": _2, "lajolla": _2, "lancashire": _2, "landes": _2, "lans": _2, "xn--lns-qla": _2, "läns": _2, "larsson": _2, "lewismiller": _2, "lincoln": _2, "linz": _2, "living": _2, "livinghistory": _2, "localhistory": _2, "london": _2, "losangeles": _2, "louvre": _2, "loyalist": _2, "lucerne": _2, "luxembourg": _2, "luzern": _2, "mad": _2, "madrid": _2, "mallorca": _2, "manchester": _2, "mansion": _2, "mansions": _2, "manx": _2, "marburg": _2, "maritime": _2, "maritimo": _2, "maryland": _2, "marylhurst": _2, "media": _2, "medical": _2, "medizinhistorisches": _2, "meeres": _2, "memorial": _2, "mesaverde": _2, "michigan": _2, "midatlantic": _2, "military": _2, "mill": _2, "miners": _2, "mining": _2, "minnesota": _2, "missile": _2, "missoula": _2, "modern": _2, "moma": _2, "money": _2, "monmouth": _2, "monticello": _2, "montreal": _2, "moscow": _2, "motorcycle": _2, "muenchen": _2, "muenster": _2, "mulhouse": _2, "muncie": _2, "museet": _2, "museumcenter": _2, "museumvereniging": _2, "music": _2, "national": _2, "nationalfirearms": _2, "nationalheritage": _2, "nativeamerican": _2, "naturalhistory": _2, "naturalhistorymuseum": _2, "naturalsciences": _2, "nature": _2, "naturhistorisches": _2, "natuurwetenschappen": _2, "naumburg": _2, "naval": _2, "nebraska": _2, "neues": _2, "newhampshire": _2, "newjersey": _2, "newmexico": _2, "newport": _2, "newspaper": _2, "newyork": _2, "niepce": _2, "norfolk": _2, "north": _2, "nrw": _2, "nyc": _2, "nyny": _2, "oceanographic": _2, "oceanographique": _2, "omaha": _2, "online": _2, "ontario": _2, "openair": _2, "oregon": _2, "oregontrail": _2, "otago": _2, "oxford": _2, "pacific": _2, "paderborn": _2, "palace": _2, "paleo": _2, "palmsprings": _2, "panama": _2, "paris": _2, "pasadena": _2, "pharmacy": _2, "philadelphia": _2, "philadelphiaarea": _2, "philately": _2, "phoenix": _2, "photography": _2, "pilots": _2, "pittsburgh": _2, "planetarium": _2, "plantation": _2, "plants": _2, "plaza": _2, "portal": _2, "portland": _2, "portlligat": _2, "posts-and-telecommunications": _2, "preservation": _2, "presidio": _2, "press": _2, "project": _2, "public": _2, "pubol": _2, "quebec": _2, "railroad": _2, "railway": _2, "research": _2, "resistance": _2, "riodejaneiro": _2, "rochester": _2, "rockart": _2, "roma": _2, "russia": _2, "saintlouis": _2, "salem": _2, "salvadordali": _2, "salzburg": _2, "sandiego": _2, "sanfrancisco": _2, "santabarbara": _2, "santacruz": _2, "santafe": _2, "saskatchewan": _2, "satx": _2, "savannahga": _2, "schlesisches": _2, "schoenbrunn": _2, "schokoladen": _2, "school": _2, "schweiz": _2, "science": _2, "scienceandhistory": _2, "scienceandindustry": _2, "sciencecenter": _2, "sciencecenters": _2, "science-fiction": _2, "sciencehistory": _2, "sciences": _2, "sciencesnaturelles": _2, "scotland": _2, "seaport": _2, "settlement": _2, "settlers": _2, "shell": _2, "sherbrooke": _2, "sibenik": _2, "silk": _2, "ski": _2, "skole": _2, "society": _2, "sologne": _2, "soundandvision": _2, "southcarolina": _2, "southwest": _2, "space": _2, "spy": _2, "square": _2, "stadt": _2, "stalbans": _2, "starnberg": _2, "state": _2, "stateofdelaware": _2, "station": _2, "steam": _2, "steiermark": _2, "stjohn": _2, "stockholm": _2, "stpetersburg": _2, "stuttgart": _2, "suisse": _2, "surgeonshall": _2, "surrey": _2, "svizzera": _2, "sweden": _2, "sydney": _2, "tank": _2, "tcm": _2, "technology": _2, "telekommunikation": _2, "television": _2, "texas": _2, "textile": _2, "theater": _2, "time": _2, "timekeeping": _2, "topology": _2, "torino": _2, "touch": _2, "town": _2, "transport": _2, "tree": _2, "trolley": _2, "trust": _2, "trustee": _2, "uhren": _2, "ulm": _2, "undersea": _2, "university": _2, "usa": _2, "usantiques": _2, "usarts": _2, "uscountryestate": _2, "usculture": _2, "usdecorativearts": _2, "usgarden": _2, "ushistory": _2, "ushuaia": _2, "uslivinghistory": _2, "utah": _2, "uvic": _2, "valley": _2, "vantaa": _2, "versailles": _2, "viking": _2, "village": _2, "virginia": _2, "virtual": _2, "virtuel": _2, "vlaanderen": _2, "volkenkunde": _2, "wales": _2, "wallonie": _2, "war": _2, "washingtondc": _2, "watchandclock": _2, "watch-and-clock": _2, "western": _2, "westfalen": _2, "whaling": _2, "wildlife": _2, "williamsburg": _2, "windmill": _2, "workshop": _2, "york": _2, "yorkshire": _2, "yosemite": _2, "youth": _2, "zoological": _2, "zoology": _2, "xn--9dbhblg6di": _2, "ירושלים": _2, "xn--h1aegh": _2, "иком": _2 } }, "mv": { "$": 1, "succ": { "aero": _2, "biz": _2, "com": _2, "coop": _2, "edu": _2, "gov": _2, "info": _2, "int": _2, "mil": _2, "museum": _2, "name": _2, "net": _2, "org": _2, "pro": _2 } }, "mw": { "$": 1, "succ": { "ac": _2, "biz": _2, "co": _2, "com": _2, "coop": _2, "edu": _2, "gov": _2, "int": _2, "museum": _2, "net": _2, "org": _2 } }, "mx": { "$": 1, "succ": { "com": _2, "org": _2, "gob": _2, "edu": _2, "net": _2, "blogspot": _4, "nym": _4 } }, "my": { "$": 1, "succ": { "com": _2, "net": _2, "org": _2, "gov": _2, "edu": _2, "mil": _2, "name": _2, "blogspot": _4 } }, "mz": { "$": 1, "succ": { "ac": _2, "adv": _2, "co": _2, "edu": _2, "gov": _2, "mil": _2, "net": _2, "org": _2 } }, "na": { "$": 1, "succ": { "info": _2, "pro": _2, "name": _2, "school": _2, "or": _2, "dr": _2, "us": _2, "mx": _2, "ca": _2, "in": _2, "cc": _2, "tv": _2, "ws": _2, "mobi": _2, "co": _2, "com": _2, "org": _2 } }, "name": { "$": 1, "succ": { "her": _27, "his": _27 } }, "nc": { "$": 1, "succ": { "asso": _2, "nom": _2 } }, "ne": _2, "net": { "$": 1, "succ": { "alwaysdata": _4, "cloudfront": _4, "t3l3p0rt": _4, "myfritz": _4, "blackbaudcdn": _4, "boomla": _4, "bplaced": _4, "square7": _4, "gb": _4, "hu": _4, "jp": _4, "se": _4, "uk": _4, "in": _4, "cloudaccess": _4, "cdn77-ssl": _4, "cdn77": { "$": 0, "succ": { "r": _4 } }, "cloudeity": _4, "feste-ip": _4, "knx-server": _4, "static-access": _4, "cryptonomic": _7, "dattolocal": _4, "mydatto": _4, "debian": _4, "at-band-camp": _4, "blogdns": _4, "broke-it": _4, "buyshouses": _4, "dnsalias": _4, "dnsdojo": _4, "does-it": _4, "dontexist": _4, "dynalias": _4, "dynathome": _4, "endofinternet": _4, "from-az": _4, "from-co": _4, "from-la": _4, "from-ny": _4, "gets-it": _4, "ham-radio-op": _4, "homeftp": _4, "homeip": _4, "homelinux": _4, "homeunix": _4, "in-the-band": _4, "is-a-chef": _4, "is-a-geek": _4, "isa-geek": _4, "kicks-ass": _4, "office-on-the": _4, "podzone": _4, "scrapper-site": _4, "selfip": _4, "sells-it": _4, "servebbs": _4, "serveftp": _4, "thruhere": _4, "webhop": _4, "definima": _4, "casacam": _4, "dynu": _4, "dynv6": _4, "twmail": _4, "ru": _4, "channelsdvr": _4, "fastlylb": { "$": 2, "succ": { "map": _4 } }, "fastly": { "$": 0, "succ": { "freetls": _4, "map": _4, "prod": { "$": 0, "succ": { "a": _4, "global": _4 } }, "ssl": { "$": 0, "succ": { "a": _4, "b": _4, "global": _4 } } } }, "flynnhosting": _4, "cloudfunctions": _4, "moonscale": _4, "in-dsl": _4, "in-vpn": _4, "ipifony": _4, "iobb": _4, "kinghost": _4, "uni5": _4, "barsy": _4, "memset": _4, "azurewebsites": _4, "azure-mobile": _4, "cloudapp": _4, "dnsup": _4, "hicam": _4, "now-dns": _4, "ownip": _4, "vpndns": _4, "eating-organic": _4, "mydissent": _4, "myeffect": _4, "mymediapc": _4, "mypsx": _4, "mysecuritycamera": _4, "nhlfan": _4, "no-ip": _4, "pgafan": _4, "privatizehealthinsurance": _4, "bounceme": _4, "ddns": _4, "redirectme": _4, "serveblog": _4, "serveminecraft": _4, "sytes": _4, "cloudycluster": _4, "rackmaze": _4, "schokokeks": _4, "firewall-gateway": _4, "siteleaf": _4, "srcf": { "$": 0, "succ": { "soc": _4, "user": _4 } }, "dsmynas": _4, "familyds": _4, "yandexcloud": { "$": 2, "succ": { "storage": _4, "website": _4 } }, "za": _4 } }, "nf": { "$": 1, "succ": { "com": _2, "net": _2, "per": _2, "rec": _2, "web": _2, "arts": _2, "firm": _2, "info": _2, "other": _2, "store": _2 } }, "ng": { "$": 1, "succ": { "com": _5, "edu": _2, "gov": _2, "i": _2, "mil": _2, "mobi": _2, "name": _2, "net": _2, "org": _2, "sch": _2, "col": _4, "firm": _4, "gen": _4, "ltd": _4 } }, "ni": { "$": 1, "succ": { "ac": _2, "biz": _2, "co": _2, "com": _2, "edu": _2, "gob": _2, "in": _2, "info": _2, "int": _2, "mil": _2, "net": _2, "nom": _2, "org": _2, "web": _2 } }, "nl": { "$": 1, "succ": { "virtueeldomein": _4, "co": _4, "hosting-cluster": _4, "blogspot": _4, "khplay": _4, "transurl": _7, "cistron": _4, "demon": _4 } }, "no": { "$": 1, "succ": { "fhs": _2, "vgs": _2, "fylkesbibl": _2, "folkebibl": _2, "museum": _2, "idrett": _2, "priv": _2, "mil": _2, "stat": _2, "dep": _2, "kommune": _2, "herad": _2, "aa": _28, "ah": _28, "bu": _28, "fm": _28, "hl": _28, "hm": _28, "jan-mayen": _28, "mr": _28, "nl": _28, "nt": _28, "of": _28, "ol": _28, "oslo": _28, "rl": _28, "sf": _28, "st": _28, "svalbard": _28, "tm": _28, "tr": _28, "va": _28, "vf": _28, "akrehamn": _2, "xn--krehamn-dxa": _2, "åkrehamn": _2, "algard": _2, "xn--lgrd-poac": _2, "ålgård": _2, "arna": _2, "brumunddal": _2, "bryne": _2, "bronnoysund": _2, "xn--brnnysund-m8ac": _2, "brønnøysund": _2, "drobak": _2, "xn--drbak-wua": _2, "drøbak": _2, "egersund": _2, "fetsund": _2, "floro": _2, "xn--flor-jra": _2, "florø": _2, "fredrikstad": _2, "hokksund": _2, "honefoss": _2, "xn--hnefoss-q1a": _2, "hønefoss": _2, "jessheim": _2, "jorpeland": _2, "xn--jrpeland-54a": _2, "jørpeland": _2, "kirkenes": _2, "kopervik": _2, "krokstadelva": _2, "langevag": _2, "xn--langevg-jxa": _2, "langevåg": _2, "leirvik": _2, "mjondalen": _2, "xn--mjndalen-64a": _2, "mjøndalen": _2, "mo-i-rana": _2, "mosjoen": _2, "xn--mosjen-eya": _2, "mosjøen": _2, "nesoddtangen": _2, "orkanger": _2, "osoyro": _2, "xn--osyro-wua": _2, "osøyro": _2, "raholt": _2, "xn--rholt-mra": _2, "råholt": _2, "sandnessjoen": _2, "xn--sandnessjen-ogb": _2, "sandnessjøen": _2, "skedsmokorset": _2, "slattum": _2, "spjelkavik": _2, "stathelle": _2, "stavern": _2, "stjordalshalsen": _2, "xn--stjrdalshalsen-sqb": _2, "stjørdalshalsen": _2, "tananger": _2, "tranby": _2, "vossevangen": _2, "afjord": _2, "xn--fjord-lra": _2, "åfjord": _2, "agdenes": _2, "al": _2, "xn--l-1fa": _2, "ål": _2, "alesund": _2, "xn--lesund-hua": _2, "ålesund": _2, "alstahaug": _2, "alta": _2, "xn--lt-liac": _2, "áltá": _2, "alaheadju": _2, "xn--laheadju-7ya": _2, "álaheadju": _2, "alvdal": _2, "amli": _2, "xn--mli-tla": _2, "åmli": _2, "amot": _2, "xn--mot-tla": _2, "åmot": _2, "andebu": _2, "andoy": _2, "xn--andy-ira": _2, "andøy": _2, "andasuolo": _2, "ardal": _2, "xn--rdal-poa": _2, "årdal": _2, "aremark": _2, "arendal": _2, "xn--s-1fa": _2, "ås": _2, "aseral": _2, "xn--seral-lra": _2, "åseral": _2, "asker": _2, "askim": _2, "askvoll": _2, "askoy": _2, "xn--asky-ira": _2, "askøy": _2, "asnes": _2, "xn--snes-poa": _2, "åsnes": _2, "audnedaln": _2, "aukra": _2, "aure": _2, "aurland": _2, "aurskog-holand": _2, "xn--aurskog-hland-jnb": _2, "aurskog-høland": _2, "austevoll": _2, "austrheim": _2, "averoy": _2, "xn--avery-yua": _2, "averøy": _2, "balestrand": _2, "ballangen": _2, "balat": _2, "xn--blt-elab": _2, "bálát": _2, "balsfjord": _2, "bahccavuotna": _2, "xn--bhccavuotna-k7a": _2, "báhccavuotna": _2, "bamble": _2, "bardu": _2, "beardu": _2, "beiarn": _2, "bajddar": _2, "xn--bjddar-pta": _2, "bájddar": _2, "baidar": _2, "xn--bidr-5nac": _2, "báidár": _2, "berg": _2, "bergen": _2, "berlevag": _2, "xn--berlevg-jxa": _2, "berlevåg": _2, "bearalvahki": _2, "xn--bearalvhki-y4a": _2, "bearalváhki": _2, "bindal": _2, "birkenes": _2, "bjarkoy": _2, "xn--bjarky-fya": _2, "bjarkøy": _2, "bjerkreim": _2, "bjugn": _2, "bodo": _2, "xn--bod-2na": _2, "bodø": _2, "badaddja": _2, "xn--bdddj-mrabd": _2, "bådåddjå": _2, "budejju": _2, "bokn": _2, "bremanger": _2, "bronnoy": _2, "xn--brnny-wuac": _2, "brønnøy": _2, "bygland": _2, "bykle": _2, "barum": _2, "xn--brum-voa": _2, "bærum": _2, "telemark": { "$": 0, "succ": { "bo": _2, "xn--b-5ga": _2, "bø": _2 } }, "nordland": { "$": 0, "succ": { "bo": _2, "xn--b-5ga": _2, "bø": _2, "heroy": _2, "xn--hery-ira": _2, "herøy": _2 } }, "bievat": _2, "xn--bievt-0qa": _2, "bievát": _2, "bomlo": _2, "xn--bmlo-gra": _2, "bømlo": _2, "batsfjord": _2, "xn--btsfjord-9za": _2, "båtsfjord": _2, "bahcavuotna": _2, "xn--bhcavuotna-s4a": _2, "báhcavuotna": _2, "dovre": _2, "drammen": _2, "drangedal": _2, "dyroy": _2, "xn--dyry-ira": _2, "dyrøy": _2, "donna": _2, "xn--dnna-gra": _2, "dønna": _2, "eid": _2, "eidfjord": _2, "eidsberg": _2, "eidskog": _2, "eidsvoll": _2, "eigersund": _2, "elverum": _2, "enebakk": _2, "engerdal": _2, "etne": _2, "etnedal": _2, "evenes": _2, "evenassi": _2, "xn--eveni-0qa01ga": _2, "evenášši": _2, "evje-og-hornnes": _2, "farsund": _2, "fauske": _2, "fuossko": _2, "fuoisku": _2, "fedje": _2, "fet": _2, "finnoy": _2, "xn--finny-yua": _2, "finnøy": _2, "fitjar": _2, "fjaler": _2, "fjell": _2, "flakstad": _2, "flatanger": _2, "flekkefjord": _2, "flesberg": _2, "flora": _2, "fla": _2, "xn--fl-zia": _2, "flå": _2, "folldal": _2, "forsand": _2, "fosnes": _2, "frei": _2, "frogn": _2, "froland": _2, "frosta": _2, "frana": _2, "xn--frna-woa": _2, "fræna": _2, "froya": _2, "xn--frya-hra": _2, "frøya": _2, "fusa": _2, "fyresdal": _2, "forde": _2, "xn--frde-gra": _2, "førde": _2, "gamvik": _2, "gangaviika": _2, "xn--ggaviika-8ya47h": _2, "gáŋgaviika": _2, "gaular": _2, "gausdal": _2, "gildeskal": _2, "xn--gildeskl-g0a": _2, "gildeskål": _2, "giske": _2, "gjemnes": _2, "gjerdrum": _2, "gjerstad": _2, "gjesdal": _2, "gjovik": _2, "xn--gjvik-wua": _2, "gjøvik": _2, "gloppen": _2, "gol": _2, "gran": _2, "grane": _2, "granvin": _2, "gratangen": _2, "grimstad": _2, "grong": _2, "kraanghke": _2, "xn--kranghke-b0a": _2, "kråanghke": _2, "grue": _2, "gulen": _2, "hadsel": _2, "halden": _2, "halsa": _2, "hamar": _2, "hamaroy": _2, "habmer": _2, "xn--hbmer-xqa": _2, "hábmer": _2, "hapmir": _2, "xn--hpmir-xqa": _2, "hápmir": _2, "hammerfest": _2, "hammarfeasta": _2, "xn--hmmrfeasta-s4ac": _2, "hámmárfeasta": _2, "haram": _2, "hareid": _2, "harstad": _2, "hasvik": _2, "aknoluokta": _2, "xn--koluokta-7ya57h": _2, "ákŋoluokta": _2, "hattfjelldal": _2, "aarborte": _2, "haugesund": _2, "hemne": _2, "hemnes": _2, "hemsedal": _2, "more-og-romsdal": { "$": 0, "succ": { "heroy": _2, "sande": _2 } }, "xn--mre-og-romsdal-qqb": { "$": 0, "succ": { "xn--hery-ira": _2, "sande": _2 } }, "møre-og-romsdal": { "$": 0, "succ": { "herøy": _2, "sande": _2 } }, "hitra": _2, "hjartdal": _2, "hjelmeland": _2, "hobol": _2, "xn--hobl-ira": _2, "hobøl": _2, "hof": _2, "hol": _2, "hole": _2, "holmestrand": _2, "holtalen": _2, "xn--holtlen-hxa": _2, "holtålen": _2, "hornindal": _2, "horten": _2, "hurdal": _2, "hurum": _2, "hvaler": _2, "hyllestad": _2, "hagebostad": _2, "xn--hgebostad-g3a": _2, "hægebostad": _2, "hoyanger": _2, "xn--hyanger-q1a": _2, "høyanger": _2, "hoylandet": _2, "xn--hylandet-54a": _2, "høylandet": _2, "ha": _2, "xn--h-2fa": _2, "hå": _2, "ibestad": _2, "inderoy": _2, "xn--indery-fya": _2, "inderøy": _2, "iveland": _2, "jevnaker": _2, "jondal": _2, "jolster": _2, "xn--jlster-bya": _2, "jølster": _2, "karasjok": _2, "karasjohka": _2, "xn--krjohka-hwab49j": _2, "kárášjohka": _2, "karlsoy": _2, "galsa": _2, "xn--gls-elac": _2, "gálsá": _2, "karmoy": _2, "xn--karmy-yua": _2, "karmøy": _2, "kautokeino": _2, "guovdageaidnu": _2, "klepp": _2, "klabu": _2, "xn--klbu-woa": _2, "klæbu": _2, "kongsberg": _2, "kongsvinger": _2, "kragero": _2, "xn--krager-gya": _2, "kragerø": _2, "kristiansand": _2, "kristiansund": _2, "krodsherad": _2, "xn--krdsherad-m8a": _2, "krødsherad": _2, "kvalsund": _2, "rahkkeravju": _2, "xn--rhkkervju-01af": _2, "ráhkkerávju": _2, "kvam": _2, "kvinesdal": _2, "kvinnherad": _2, "kviteseid": _2, "kvitsoy": _2, "xn--kvitsy-fya": _2, "kvitsøy": _2, "kvafjord": _2, "xn--kvfjord-nxa": _2, "kvæfjord": _2, "giehtavuoatna": _2, "kvanangen": _2, "xn--kvnangen-k0a": _2, "kvænangen": _2, "navuotna": _2, "xn--nvuotna-hwa": _2, "návuotna": _2, "kafjord": _2, "xn--kfjord-iua": _2, "kåfjord": _2, "gaivuotna": _2, "xn--givuotna-8ya": _2, "gáivuotna": _2, "larvik": _2, "lavangen": _2, "lavagis": _2, "loabat": _2, "xn--loabt-0qa": _2, "loabát": _2, "lebesby": _2, "davvesiida": _2, "leikanger": _2, "leirfjord": _2, "leka": _2, "leksvik": _2, "lenvik": _2, "leangaviika": _2, "xn--leagaviika-52b": _2, "leaŋgaviika": _2, "lesja": _2, "levanger": _2, "lier": _2, "lierne": _2, "lillehammer": _2, "lillesand": _2, "lindesnes": _2, "lindas": _2, "xn--linds-pra": _2, "lindås": _2, "lom": _2, "loppa": _2, "lahppi": _2, "xn--lhppi-xqa": _2, "láhppi": _2, "lund": _2, "lunner": _2, "luroy": _2, "xn--lury-ira": _2, "lurøy": _2, "luster": _2, "lyngdal": _2, "lyngen": _2, "ivgu": _2, "lardal": _2, "lerdal": _2, "xn--lrdal-sra": _2, "lærdal": _2, "lodingen": _2, "xn--ldingen-q1a": _2, "lødingen": _2, "lorenskog": _2, "xn--lrenskog-54a": _2, "lørenskog": _2, "loten": _2, "xn--lten-gra": _2, "løten": _2, "malvik": _2, "masoy": _2, "xn--msy-ula0h": _2, "måsøy": _2, "muosat": _2, "xn--muost-0qa": _2, "muosát": _2, "mandal": _2, "marker": _2, "marnardal": _2, "masfjorden": _2, "meland": _2, "meldal": _2, "melhus": _2, "meloy": _2, "xn--mely-ira": _2, "meløy": _2, "meraker": _2, "xn--merker-kua": _2, "meråker": _2, "moareke": _2, "xn--moreke-jua": _2, "moåreke": _2, "midsund": _2, "midtre-gauldal": _2, "modalen": _2, "modum": _2, "molde": _2, "moskenes": _2, "moss": _2, "mosvik": _2, "malselv": _2, "xn--mlselv-iua": _2, "målselv": _2, "malatvuopmi": _2, "xn--mlatvuopmi-s4a": _2, "málatvuopmi": _2, "namdalseid": _2, "aejrie": _2, "namsos": _2, "namsskogan": _2, "naamesjevuemie": _2, "xn--nmesjevuemie-tcba": _2, "nååmesjevuemie": _2, "laakesvuemie": _2, "nannestad": _2, "narvik": _2, "narviika": _2, "naustdal": _2, "nedre-eiker": _2, "akershus": _29, "buskerud": _29, "nesna": _2, "nesodden": _2, "nesseby": _2, "unjarga": _2, "xn--unjrga-rta": _2, "unjárga": _2, "nesset": _2, "nissedal": _2, "nittedal": _2, "nord-aurdal": _2, "nord-fron": _2, "nord-odal": _2, "norddal": _2, "nordkapp": _2, "davvenjarga": _2, "xn--davvenjrga-y4a": _2, "davvenjárga": _2, "nordre-land": _2, "nordreisa": _2, "raisa": _2, "xn--risa-5na": _2, "ráisa": _2, "nore-og-uvdal": _2, "notodden": _2, "naroy": _2, "xn--nry-yla5g": _2, "nærøy": _2, "notteroy": _2, "xn--nttery-byae": _2, "nøtterøy": _2, "odda": _2, "oksnes": _2, "xn--ksnes-uua": _2, "øksnes": _2, "oppdal": _2, "oppegard": _2, "xn--oppegrd-ixa": _2, "oppegård": _2, "orkdal": _2, "orland": _2, "xn--rland-uua": _2, "ørland": _2, "orskog": _2, "xn--rskog-uua": _2, "ørskog": _2, "orsta": _2, "xn--rsta-fra": _2, "ørsta": _2, "hedmark": { "$": 0, "succ": { "os": _2, "valer": _2, "xn--vler-qoa": _2, "våler": _2 } }, "hordaland": { "$": 0, "succ": { "os": _2 } }, "osen": _2, "osteroy": _2, "xn--ostery-fya": _2, "osterøy": _2, "ostre-toten": _2, "xn--stre-toten-zcb": _2, "østre-toten": _2, "overhalla": _2, "ovre-eiker": _2, "xn--vre-eiker-k8a": _2, "øvre-eiker": _2, "oyer": _2, "xn--yer-zna": _2, "øyer": _2, "oygarden": _2, "xn--ygarden-p1a": _2, "øygarden": _2, "oystre-slidre": _2, "xn--ystre-slidre-ujb": _2, "øystre-slidre": _2, "porsanger": _2, "porsangu": _2, "xn--porsgu-sta26f": _2, "porsáŋgu": _2, "porsgrunn": _2, "radoy": _2, "xn--rady-ira": _2, "radøy": _2, "rakkestad": _2, "rana": _2, "ruovat": _2, "randaberg": _2, "rauma": _2, "rendalen": _2, "rennebu": _2, "rennesoy": _2, "xn--rennesy-v1a": _2, "rennesøy": _2, "rindal": _2, "ringebu": _2, "ringerike": _2, "ringsaker": _2, "rissa": _2, "risor": _2, "xn--risr-ira": _2, "risør": _2, "roan": _2, "rollag": _2, "rygge": _2, "ralingen": _2, "xn--rlingen-mxa": _2, "rælingen": _2, "rodoy": _2, "xn--rdy-0nab": _2, "rødøy": _2, "romskog": _2, "xn--rmskog-bya": _2, "rømskog": _2, "roros": _2, "xn--rros-gra": _2, "røros": _2, "rost": _2, "xn--rst-0na": _2, "røst": _2, "royken": _2, "xn--ryken-vua": _2, "røyken": _2, "royrvik": _2, "xn--ryrvik-bya": _2, "røyrvik": _2, "rade": _2, "xn--rde-ula": _2, "råde": _2, "salangen": _2, "siellak": _2, "saltdal": _2, "salat": _2, "xn--slt-elab": _2, "sálát": _2, "xn--slat-5na": _2, "sálat": _2, "samnanger": _2, "vestfold": { "$": 0, "succ": { "sande": _2 } }, "sandefjord": _2, "sandnes": _2, "sandoy": _2, "xn--sandy-yua": _2, "sandøy": _2, "sarpsborg": _2, "sauda": _2, "sauherad": _2, "sel": _2, "selbu": _2, "selje": _2, "seljord": _2, "sigdal": _2, "siljan": _2, "sirdal": _2, "skaun": _2, "skedsmo": _2, "ski": _2, "skien": _2, "skiptvet": _2, "skjervoy": _2, "xn--skjervy-v1a": _2, "skjervøy": _2, "skierva": _2, "xn--skierv-uta": _2, "skiervá": _2, "skjak": _2, "xn--skjk-soa": _2, "skjåk": _2, "skodje": _2, "skanland": _2, "xn--sknland-fxa": _2, "skånland": _2, "skanit": _2, "xn--sknit-yqa": _2, "skánit": _2, "smola": _2, "xn--smla-hra": _2, "smøla": _2, "snillfjord": _2, "snasa": _2, "xn--snsa-roa": _2, "snåsa": _2, "snoasa": _2, "snaase": _2, "xn--snase-nra": _2, "snåase": _2, "sogndal": _2, "sokndal": _2, "sola": _2, "solund": _2, "songdalen": _2, "sortland": _2, "spydeberg": _2, "stange": _2, "stavanger": _2, "steigen": _2, "steinkjer": _2, "stjordal": _2, "xn--stjrdal-s1a": _2, "stjørdal": _2, "stokke": _2, "stor-elvdal": _2, "stord": _2, "stordal": _2, "storfjord": _2, "omasvuotna": _2, "strand": _2, "stranda": _2, "stryn": _2, "sula": _2, "suldal": _2, "sund": _2, "sunndal": _2, "surnadal": _2, "sveio": _2, "svelvik": _2, "sykkylven": _2, "sogne": _2, "xn--sgne-gra": _2, "søgne": _2, "somna": _2, "xn--smna-gra": _2, "sømna": _2, "sondre-land": _2, "xn--sndre-land-0cb": _2, "søndre-land": _2, "sor-aurdal": _2, "xn--sr-aurdal-l8a": _2, "sør-aurdal": _2, "sor-fron": _2, "xn--sr-fron-q1a": _2, "sør-fron": _2, "sor-odal": _2, "xn--sr-odal-q1a": _2, "sør-odal": _2, "sor-varanger": _2, "xn--sr-varanger-ggb": _2, "sør-varanger": _2, "matta-varjjat": _2, "xn--mtta-vrjjat-k7af": _2, "mátta-várjjat": _2, "sorfold": _2, "xn--srfold-bya": _2, "sørfold": _2, "sorreisa": _2, "xn--srreisa-q1a": _2, "sørreisa": _2, "sorum": _2, "xn--srum-gra": _2, "sørum": _2, "tana": _2, "deatnu": _2, "time": _2, "tingvoll": _2, "tinn": _2, "tjeldsund": _2, "dielddanuorri": _2, "tjome": _2, "xn--tjme-hra": _2, "tjøme": _2, "tokke": _2, "tolga": _2, "torsken": _2, "tranoy": _2, "xn--trany-yua": _2, "tranøy": _2, "tromso": _2, "xn--troms-zua": _2, "tromsø": _2, "tromsa": _2, "romsa": _2, "trondheim": _2, "troandin": _2, "trysil": _2, "trana": _2, "xn--trna-woa": _2, "træna": _2, "trogstad": _2, "xn--trgstad-r1a": _2, "trøgstad": _2, "tvedestrand": _2, "tydal": _2, "tynset": _2, "tysfjord": _2, "divtasvuodna": _2, "divttasvuotna": _2, "tysnes": _2, "tysvar": _2, "xn--tysvr-vra": _2, "tysvær": _2, "tonsberg": _2, "xn--tnsberg-q1a": _2, "tønsberg": _2, "ullensaker": _2, "ullensvang": _2, "ulvik": _2, "utsira": _2, "vadso": _2, "xn--vads-jra": _2, "vadsø": _2, "cahcesuolo": _2, "xn--hcesuolo-7ya35b": _2, "čáhcesuolo": _2, "vaksdal": _2, "valle": _2, "vang": _2, "vanylven": _2, "vardo": _2, "xn--vard-jra": _2, "vardø": _2, "varggat": _2, "xn--vrggt-xqad": _2, "várggát": _2, "vefsn": _2, "vaapste": _2, "vega": _2, "vegarshei": _2, "xn--vegrshei-c0a": _2, "vegårshei": _2, "vennesla": _2, "verdal": _2, "verran": _2, "vestby": _2, "vestnes": _2, "vestre-slidre": _2, "vestre-toten": _2, "vestvagoy": _2, "xn--vestvgy-ixa6o": _2, "vestvågøy": _2, "vevelstad": _2, "vik": _2, "vikna": _2, "vindafjord": _2, "volda": _2, "voss": _2, "varoy": _2, "xn--vry-yla5g": _2, "værøy": _2, "vagan": _2, "xn--vgan-qoa": _2, "vågan": _2, "voagat": _2, "vagsoy": _2, "xn--vgsy-qoa0j": _2, "vågsøy": _2, "vaga": _2, "xn--vg-yiab": _2, "vågå": _2, "ostfold": { "$": 0, "succ": { "valer": _2 } }, "xn--stfold-9xa": { "$": 0, "succ": { "xn--vler-qoa": _2 } }, "østfold": { "$": 0, "succ": { "våler": _2 } }, "co": _4, "blogspot": _4 } }, "np": _8, "nr": _23, "nu": { "$": 1, "succ": { "merseine": _4, "mine": _4, "shacknet": _4, "nom": _4, "builder": { "$": 0, "succ": { "site": _4 } }, "enterprisecloud": _4 } }, "nz": { "$": 1, "succ": { "ac": _2, "co": _5, "cri": _2, "geek": _2, "gen": _2, "govt": _2, "health": _2, "iwi": _2, "kiwi": _2, "maori": _2, "mil": _2, "xn--mori-qsa": _2, "māori": _2, "net": _2, "org": _2, "parliament": _2, "school": _2, "nym": _4 } }, "om": { "$": 1, "succ": { "co": _2, "com": _2, "edu": _2, "gov": _2, "med": _2, "museum": _2, "net": _2, "org": _2, "pro": _2 } }, "onion": _2, "org": { "$": 1, "succ": { "altervista": _4, "amune": { "$": 0, "succ": { "tele": _4 } }, "pimienta": _4, "poivron": _4, "potager": _4, "sweetpepper": _4, "ae": _4, "us": _4, "certmgr": _4, "cdn77": { "$": 0, "succ": { "c": _4, "rsc": _4 } }, "cdn77-secure": { "$": 0, "succ": { "origin": { "$": 0, "succ": { "ssl": _4 } } } }, "cloudns": _4, "duckdns": _4, "tunk": _4, "dyndns": { "$": 2, "succ": { "go": _4, "home": _4 } }, "blogdns": _4, "blogsite": _4, "boldlygoingnowhere": _4, "dnsalias": _4, "dnsdojo": _4, "doesntexist": _4, "dontexist": _4, "doomdns": _4, "dvrdns": _4, "dynalias": _4, "endofinternet": _4, "endoftheinternet": _4, "from-me": _4, "game-host": _4, "gotdns": _4, "hobby-site": _4, "homedns": _4, "homeftp": _4, "homelinux": _4, "homeunix": _4, "is-a-bruinsfan": _4, "is-a-candidate": _4, "is-a-celticsfan": _4, "is-a-chef": _4, "is-a-geek": _4, "is-a-knight": _4, "is-a-linux-user": _4, "is-a-patsfan": _4, "is-a-soxfan": _4, "is-found": _4, "is-lost": _4, "is-saved": _4, "is-very-bad": _4, "is-very-evil": _4, "is-very-good": _4, "is-very-nice": _4, "is-very-sweet": _4, "isa-geek": _4, "kicks-ass": _4, "misconfused": _4, "podzone": _4, "readmyblog": _4, "selfip": _4, "sellsyourhome": _4, "servebbs": _4, "serveftp": _4, "servegame": _4, "stuff-4-sale": _4, "webhop": _4, "ddnss": _4, "accesscam": _4, "camdvr": _4, "freeddns": _4, "mywire": _4, "webredirect": _4, "eu": { "$": 2, "succ": { "al": _4, "asso": _4, "at": _4, "au": _4, "be": _4, "bg": _4, "ca": _4, "cd": _4, "ch": _4, "cn": _4, "cy": _4, "cz": _4, "de": _4, "dk": _4, "edu": _4, "ee": _4, "es": _4, "fi": _4, "fr": _4, "gr": _4, "hr": _4, "hu": _4, "ie": _4, "il": _4, "in": _4, "int": _4, "is": _4, "it": _4, "jp": _4, "kr": _4, "lt": _4, "lu": _4, "lv": _4, "mc": _4, "me": _4, "mk": _4, "mt": _4, "my": _4, "net": _4, "ng": _4, "nl": _4, "no": _4, "nz": _4, "paris": _4, "pl": _4, "pt": _4, "q-a": _4, "ro": _4, "ru": _4, "se": _4, "si": _4, "sk": _4, "tr": _4, "uk": _4, "us": _4 } }, "twmail": _4, "fedorainfracloud": _4, "fedorapeople": _4, "fedoraproject": { "$": 0, "succ": { "cloud": _4, "os": _16, "stg": { "$": 0, "succ": { "os": _16 } } } }, "freedesktop": _4, "hepforge": _4, "in-dsl": _4, "in-vpn": _4, "js": _4, "uklugs": _4, "barsy": _4, "mayfirst": _4, "mozilla-iot": _4, "bmoattachments": _4, "dynserv": _4, "now-dns": _4, "cable-modem": _4, "collegefan": _4, "couchpotatofries": _4, "mlbfan": _4, "mysecuritycamera": _4, "nflfan": _4, "read-books": _4, "ufcfan": _4, "hopto": _4, "myftp": _4, "no-ip": _4, "zapto": _4, "pubtls": _4, "my-firewall": _4, "myfirewall": _4, "spdns": _4, "dsmynas": _4, "familyds": _4, "edugit": _4, "tuxfamily": _4, "diskstation": _4, "hk": _4, "wmflabs": _4, "za": _4 } }, "pa": { "$": 1, "succ": { "ac": _2, "gob": _2, "com": _2, "org": _2, "sld": _2, "edu": _2, "net": _2, "ing": _2, "abo": _2, "med": _2, "nom": _2 } }, "pe": { "$": 1, "succ": { "edu": _2, "gob": _2, "nom": _2, "mil": _2, "org": _2, "com": _2, "net": _2, "blogspot": _4, "nym": _4 } }, "pf": { "$": 1, "succ": { "com": _2, "org": _2, "edu": _2 } }, "pg": _8, "ph": { "$": 1, "succ": { "com": _2, "net": _2, "org": _2, "gov": _2, "edu": _2, "ngo": _2, "mil": _2, "i": _2 } }, "pk": { "$": 1, "succ": { "com": _2, "net": _2, "edu": _2, "org": _2, "fam": _2, "biz": _2, "web": _2, "gov": _2, "gob": _2, "gok": _2, "gon": _2, "gop": _2, "gos": _2, "info": _2 } }, "pl": { "$": 1, "succ": { "com": _2, "net": _2, "org": _2, "aid": _2, "agro": _2, "atm": _2, "auto": _2, "biz": _2, "edu": _2, "gmina": _2, "gsm": _2, "info": _2, "mail": _2, "miasta": _2, "media": _2, "mil": _2, "nieruchomosci": _2, "nom": _2, "pc": _2, "powiat": _2, "priv": _2, "realestate": _2, "rel": _2, "sex": _2, "shop": _2, "sklep": _2, "sos": _2, "szkola": _2, "targi": _2, "tm": _2, "tourism": _2, "travel": _2, "turystyka": _2, "gov": { "$": 1, "succ": { "ap": _2, "ic": _2, "is": _2, "us": _2, "kmpsp": _2, "kppsp": _2, "kwpsp": _2, "psp": _2, "wskr": _2, "kwp": _2, "mw": _2, "ug": _2, "um": _2, "umig": _2, "ugim": _2, "upow": _2, "uw": _2, "starostwo": _2, "pa": _2, "po": _2, "psse": _2, "pup": _2, "rzgw": _2, "sa": _2, "so": _2, "sr": _2, "wsa": _2, "sko": _2, "uzs": _2, "wiih": _2, "winb": _2, "pinb": _2, "wios": _2, "witd": _2, "wzmiuw": _2, "piw": _2, "wiw": _2, "griw": _2, "wif": _2, "oum": _2, "sdn": _2, "zp": _2, "uppo": _2, "mup": _2, "wuoz": _2, "konsulat": _2, "oirm": _2 } }, "augustow": _2, "babia-gora": _2, "bedzin": _2, "beskidy": _2, "bialowieza": _2, "bialystok": _2, "bielawa": _2, "bieszczady": _2, "boleslawiec": _2, "bydgoszcz": _2, "bytom": _2, "cieszyn": _2, "czeladz": _2, "czest": _2, "dlugoleka": _2, "elblag": _2, "elk": _2, "glogow": _2, "gniezno": _2, "gorlice": _2, "grajewo": _2, "ilawa": _2, "jaworzno": _2, "jelenia-gora": _2, "jgora": _2, "kalisz": _2, "kazimierz-dolny": _2, "karpacz": _2, "kartuzy": _2, "kaszuby": _2, "katowice": _2, "kepno": _2, "ketrzyn": _2, "klodzko": _2, "kobierzyce": _2, "kolobrzeg": _2, "konin": _2, "konskowola": _2, "kutno": _2, "lapy": _2, "lebork": _2, "legnica": _2, "lezajsk": _2, "limanowa": _2, "lomza": _2, "lowicz": _2, "lubin": _2, "lukow": _2, "malbork": _2, "malopolska": _2, "mazowsze": _2, "mazury": _2, "mielec": _2, "mielno": _2, "mragowo": _2, "naklo": _2, "nowaruda": _2, "nysa": _2, "olawa": _2, "olecko": _2, "olkusz": _2, "olsztyn": _2, "opoczno": _2, "opole": _2, "ostroda": _2, "ostroleka": _2, "ostrowiec": _2, "ostrowwlkp": _2, "pila": _2, "pisz": _2, "podhale": _2, "podlasie": _2, "polkowice": _2, "pomorze": _2, "pomorskie": _2, "prochowice": _2, "pruszkow": _2, "przeworsk": _2, "pulawy": _2, "radom": _2, "rawa-maz": _2, "rybnik": _2, "rzeszow": _2, "sanok": _2, "sejny": _2, "slask": _2, "slupsk": _2, "sosnowiec": _2, "stalowa-wola": _2, "skoczow": _2, "starachowice": _2, "stargard": _2, "suwalki": _2, "swidnica": _2, "swiebodzin": _2, "swinoujscie": _2, "szczecin": _2, "szczytno": _2, "tarnobrzeg": _2, "tgory": _2, "turek": _2, "tychy": _2, "ustka": _2, "walbrzych": _2, "warmia": _2, "warszawa": _2, "waw": _2, "wegrow": _2, "wielun": _2, "wlocl": _2, "wloclawek": _2, "wodzislaw": _2, "wolomin": _2, "wroclaw": _2, "zachpomor": _2, "zagan": _2, "zarow": _2, "zgora": _2, "zgorzelec": _2, "beep": _4, "krasnik": _4, "leczna": _4, "lubartow": _4, "lublin": _4, "poniatowa": _4, "swidnik": _4, "co": _4, "art": _4, "gliwice": _4, "krakow": _4, "poznan": _4, "wroc": _4, "zakopane": _4, "gda": _4, "gdansk": _4, "gdynia": _4, "med": _4, "sopot": _4 } }, "pm": { "$": 1, "succ": { "own": _4 } }, "pn": { "$": 1, "succ": { "gov": _2, "co": _2, "org": _2, "edu": _2, "net": _2 } }, "post": _2, "pr": { "$": 1, "succ": { "com": _2, "net": _2, "org": _2, "gov": _2, "edu": _2, "isla": _2, "pro": _2, "biz": _2, "info": _2, "name": _2, "est": _2, "prof": _2, "ac": _2 } }, "pro": { "$": 1, "succ": { "aaa": _2, "aca": _2, "acct": _2, "avocat": _2, "bar": _2, "cpa": _2, "eng": _2, "jur": _2, "law": _2, "med": _2, "recht": _2, "cloudns": _4, "dnstrace": { "$": 0, "succ": { "bci": _4 } }, "barsy": _4 } }, "ps": { "$": 1, "succ": { "edu": _2, "gov": _2, "sec": _2, "plo": _2, "com": _2, "org": _2, "net": _2 } }, "pt": { "$": 1, "succ": { "net": _2, "gov": _2, "org": _2, "edu": _2, "int": _2, "publ": _2, "com": _2, "nome": _2, "blogspot": _4, "nym": _4 } }, "pw": { "$": 1, "succ": { "co": _2, "ne": _2, "or": _2, "ed": _2, "go": _2, "belau": _2, "cloudns": _4, "x443": _4, "nom": _4 } }, "py": { "$": 1, "succ": { "com": _2, "coop": _2, "edu": _2, "gov": _2, "mil": _2, "net": _2, "org": _2 } }, "qa": { "$": 1, "succ": { "com": _2, "edu": _2, "gov": _2, "mil": _2, "name": _2, "net": _2, "org": _2, "sch": _2, "blogspot": _4, "nom": _4 } }, "re": { "$": 1, "succ": { "asso": _2, "com": _2, "nom": _2, "blogspot": _4 } }, "ro": { "$": 1, "succ": { "arts": _2, "com": _2, "firm": _2, "info": _2, "nom": _2, "nt": _2, "org": _2, "rec": _2, "store": _2, "tm": _2, "www": _2, "shop": _4, "blogspot": _4, "nym": _4 } }, "rs": { "$": 1, "succ": { "ac": _2, "co": _2, "edu": _2, "gov": _2, "in": _2, "org": _2, "blogspot": _4, "ua": _4, "nom": _4, "ox": _4 } }, "ru": { "$": 1, "succ": { "ac": _2, "edu": _2, "gov": _2, "int": _2, "mil": _2, "test": _2, "adygeya": _4, "bashkiria": _4, "bir": _4, "cbg": _4, "com": _4, "dagestan": _4, "grozny": _4, "kalmykia": _4, "kustanai": _4, "marine": _4, "mordovia": _4, "msk": _4, "mytis": _4, "nalchik": _4, "nov": _4, "pyatigorsk": _4, "spb": _4, "vladikavkaz": _4, "vladimir": _4, "blogspot": _4, "myjino": { "$": 2, "succ": { "hosting": _7, "landing": _7, "spectrum": _7, "vps": _7 } }, "cldmail": { "$": 0, "succ": { "hb": _4 } }, "net": _4, "org": _4, "pp": _4, "ras": _4 } }, "rw": { "$": 1, "succ": { "ac": _2, "co": _2, "coop": _2, "gov": _2, "mil": _2, "net": _2, "org": _2 } }, "sa": { "$": 1, "succ": { "com": _2, "net": _2, "org": _2, "gov": _2, "med": _2, "pub": _2, "edu": _2, "sch": _2 } }, "sb": _9, "sc": _9, "sd": { "$": 1, "succ": { "com": _2, "net": _2, "org": _2, "edu": _2, "med": _2, "tv": _2, "gov": _2, "info": _2 } }, "se": { "$": 1, "succ": { "a": _2, "ac": _2, "b": _2, "bd": _2, "brand": _2, "c": _2, "d": _2, "e": _2, "f": _2, "fh": _2, "fhsk": _2, "fhv": _2, "g": _2, "h": _2, "i": _2, "k": _2, "komforb": _2, "kommunalforbund": _2, "komvux": _2, "l": _2, "lanbib": _2, "m": _2, "n": _2, "naturbruksgymn": _2, "o": _2, "org": _2, "p": _2, "parti": _2, "pp": _2, "press": _2, "r": _2, "s": _2, "t": _2, "tm": _2, "u": _2, "w": _2, "x": _2, "y": _2, "z": _2, "com": _4, "blogspot": _4, "conf": _4 } }, "sg": { "$": 1, "succ": { "com": _2, "net": _2, "org": _2, "gov": _2, "edu": _2, "per": _2, "blogspot": _4 } }, "sh": { "$": 1, "succ": { "com": _2, "net": _2, "gov": _2, "org": _2, "mil": _2, "hashbang": _4, "platform": _7, "wedeploy": _4, "now": _4 } }, "si": { "$": 1, "succ": { "blogspot": _4, "nom": _4 } }, "sj": _2, "sk": _24, "sl": _9, "sm": _2, "sn": { "$": 1, "succ": { "art": _2, "com": _2, "edu": _2, "gouv": _2, "org": _2, "perso": _2, "univ": _2, "blogspot": _4 } }, "so": { "$": 1, "succ": { "com": _2, "edu": _2, "gov": _2, "me": _2, "net": _2, "org": _2, "sch": _4 } }, "sr": _2, "ss": { "$": 1, "succ": { "biz": _2, "com": _2, "edu": _2, "gov": _2, "net": _2, "org": _2 } }, "st": { "$": 1, "succ": { "co": _2, "com": _2, "consulado": _2, "edu": _2, "embaixada": _2, "gov": _2, "mil": _2, "net": _2, "org": _2, "principe": _2, "saotome": _2, "store": _2, "nom": _4, "noho": _4 } }, "su": { "$": 1, "succ": { "abkhazia": _4, "adygeya": _4, "aktyubinsk": _4, "arkhangelsk": _4, "armenia": _4, "ashgabad": _4, "azerbaijan": _4, "balashov": _4, "bashkiria": _4, "bryansk": _4, "bukhara": _4, "chimkent": _4, "dagestan": _4, "east-kazakhstan": _4, "exnet": _4, "georgia": _4, "grozny": _4, "ivanovo": _4, "jambyl": _4, "kalmykia": _4, "kaluga": _4, "karacol": _4, "karaganda": _4, "karelia": _4, "khakassia": _4, "krasnodar": _4, "kurgan": _4, "kustanai": _4, "lenug": _4, "mangyshlak": _4, "mordovia": _4, "msk": _4, "murmansk": _4, "nalchik": _4, "navoi": _4, "north-kazakhstan": _4, "nov": _4, "obninsk": _4, "penza": _4, "pokrovsk": _4, "sochi": _4, "spb": _4, "tashkent": _4, "termez": _4, "togliatti": _4, "troitsk": _4, "tselinograd": _4, "tula": _4, "tuva": _4, "vladikavkaz": _4, "vladimir": _4, "vologda": _4, "nym": _4 } }, "sv": { "$": 1, "succ": { "com": _2, "edu": _2, "gob": _2, "org": _2, "red": _2 } }, "sx": { "$": 1, "succ": { "gov": _2, "nym": _4 } }, "sy": _3, "sz": { "$": 1, "succ": { "co": _2, "ac": _2, "org": _2 } }, "tc": _2, "td": _5, "tel": _2, "tf": _2, "tg": _2, "th": { "$": 1, "succ": { "ac": _2, "co": _2, "go": _2, "in": _2, "mi": _2, "net": _2, "or": _2, "online": _4, "shop": _4 } }, "tj": { "$": 1, "succ": { "ac": _2, "biz": _2, "co": _2, "com": _2, "edu": _2, "go": _2, "gov": _2, "int": _2, "mil": _2, "name": _2, "net": _2, "nic": _2, "org": _2, "test": _2, "web": _2, "nom": _4 } }, "tk": _2, "tl": _6, "tm": { "$": 1, "succ": { "com": _2, "co": _2, "org": _2, "net": _2, "nom": _2, "gov": _2, "mil": _2, "edu": _2 } }, "tn": { "$": 1, "succ": { "com": _2, "ens": _2, "fin": _2, "gov": _2, "ind": _2, "intl": _2, "nat": _2, "net": _2, "org": _2, "info": _2, "perso": _2, "tourism": _2, "edunet": _2, "rnrt": _2, "rns": _2, "rnu": _2, "mincom": _2, "agrinet": _2, "defense": _2, "turen": _2 } }, "to": { "$": 1, "succ": { "com": _2, "gov": _2, "net": _2, "org": _2, "edu": _2, "mil": _2, "vpnplus": _4, "quickconnect": { "$": 0, "succ": { "direct": _4 } } } }, "tr": { "$": 1, "succ": { "av": _2, "bbs": _2, "bel": _2, "biz": _2, "com": _5, "dr": _2, "edu": _2, "gen": _2, "gov": _2, "info": _2, "mil": _2, "k12": _2, "kep": _2, "name": _2, "net": _2, "org": _2, "pol": _2, "tel": _2, "tsk": _2, "tv": _2, "web": _2, "nc": _6 } }, "tt": { "$": 1, "succ": { "co": _2, "com": _2, "org": _2, "net": _2, "biz": _2, "info": _2, "pro": _2, "int": _2, "coop": _2, "jobs": _2, "mobi": _2, "travel": _2, "museum": _2, "aero": _2, "name": _2, "gov": _2, "edu": _2 } }, "tv": { "$": 1, "succ": { "dyndns": _4, "better-than": _4, "on-the-web": _4, "worse-than": _4 } }, "tw": { "$": 1, "succ": { "edu": _2, "gov": _2, "mil": _2, "com": { "$": 1, "succ": { "mymailer": _4 } }, "net": _2, "org": _2, "idv": _2, "game": _2, "ebiz": _2, "club": _2, "xn--zf0ao64a": _2, "網路": _2, "xn--uc0atv": _2, "組織": _2, "xn--czrw28b": _2, "商業": _2, "url": _4, "blogspot": _4, "nym": _4 } }, "tz": { "$": 1, "succ": { "ac": _2, "co": _2, "go": _2, "hotel": _2, "info": _2, "me": _2, "mil": _2, "mobi": _2, "ne": _2, "or": _2, "sc": _2, "tv": _2 } }, "ua": { "$": 1, "succ": { "com": _2, "edu": _2, "gov": _2, "in": _2, "net": _2, "org": _2, "cherkassy": _2, "cherkasy": _2, "chernigov": _2, "chernihiv": _2, "chernivtsi": _2, "chernovtsy": _2, "ck": _2, "cn": _2, "cr": _2, "crimea": _2, "cv": _2, "dn": _2, "dnepropetrovsk": _2, "dnipropetrovsk": _2, "dominic": _2, "donetsk": _2, "dp": _2, "if": _2, "ivano-frankivsk": _2, "kh": _2, "kharkiv": _2, "kharkov": _2, "kherson": _2, "khmelnitskiy": _2, "khmelnytskyi": _2, "kiev": _2, "kirovograd": _2, "km": _2, "kr": _2, "krym": _2, "ks": _2, "kv": _2, "kyiv": _2, "lg": _2, "lt": _2, "lugansk": _2, "lutsk": _2, "lv": _2, "lviv": _2, "mk": _2, "mykolaiv": _2, "nikolaev": _2, "od": _2, "odesa": _2, "odessa": _2, "pl": _2, "poltava": _2, "rivne": _2, "rovno": _2, "rv": _2, "sb": _2, "sebastopol": _2, "sevastopol": _2, "sm": _2, "sumy": _2, "te": _2, "ternopil": _2, "uz": _2, "uzhgorod": _2, "vinnica": _2, "vinnytsia": _2, "vn": _2, "volyn": _2, "yalta": _2, "zaporizhzhe": _2, "zaporizhzhia": _2, "zhitomir": _2, "zhytomyr": _2, "zp": _2, "zt": _2, "cc": _4, "inf": _4, "ltd": _4, "biz": _4, "co": _4, "pp": _4 } }, "ug": { "$": 1, "succ": { "co": _2, "or": _2, "ac": _2, "sc": _2, "go": _2, "ne": _2, "com": _2, "org": _2, "blogspot": _4, "nom": _4 } }, "uk": { "$": 1, "succ": { "ac": _2, "co": { "$": 1, "succ": { "bytemark": { "$": 0, "succ": { "dh": _4, "vm": _4 } }, "blogspot": _4, "barsy": _4, "barsyonline": _4, "nh-serv": _4, "no-ip": _4, "wellbeingzone": _4, "gwiddle": _4 } }, "gov": { "$": 1, "succ": { "service": _4, "homeoffice": _4 } }, "ltd": _2, "me": _2, "net": _2, "nhs": _2, "org": { "$": 1, "succ": { "glug": _4, "lug": _4, "lugs": _4 } }, "plc": _2, "police": _2, "sch": _8, "barsy": _4 } }, "us": { "$": 1, "succ": { "dni": _2, "fed": _2, "isa": _2, "kids": _2, "nsn": _2, "ak": _30, "al": _30, "ar": _30, "as": _30, "az": _30, "ca": _30, "co": _30, "ct": _30, "dc": _30, "de": { "$": 1, "succ": { "k12": _2, "cc": _2, "lib": _4 } }, "fl": _30, "ga": _30, "gu": _30, "hi": _31, "ia": _30, "id": _30, "il": _30, "in": _30, "ks": _30, "ky": _30, "la": _30, "ma": { "$": 1, "succ": { "k12": { "$": 1, "succ": { "pvt": _2, "chtr": _2, "paroch": _2 } }, "cc": _2, "lib": _2 } }, "md": _30, "me": _30, "mi": { "$": 1, "succ": { "k12": _2, "cc": _2, "lib": _2, "ann-arbor": _2, "cog": _2, "dst": _2, "eaton": _2, "gen": _2, "mus": _2, "tec": _2, "washtenaw": _2 } }, "mn": _30, "mo": _30, "ms": _30, "mt": _30, "nc": _30, "nd": _31, "ne": _30, "nh": _30, "nj": _30, "nm": _30, "nv": _30, "ny": _30, "oh": _30, "ok": _30, "or": _30, "pa": _30, "pr": _30, "ri": _30, "sc": _30, "sd": _31, "tn": _30, "tx": _30, "ut": _30, "vi": _30, "vt": _30, "va": _30, "wa": _30, "wi": _30, "wv": { "$": 1, "succ": { "cc": _2 } }, "wy": _30, "cloudns": _4, "drud": _4, "is-by": _4, "land-4-sale": _4, "stuff-4-sale": _4, "freeddns": _4, "golffan": _4, "noip": _4, "pointto": _4 } }, "uy": { "$": 1, "succ": { "com": _5, "edu": _2, "gub": _2, "mil": _2, "net": _2, "org": _2, "nom": _4 } }, "uz": { "$": 1, "succ": { "co": _2, "com": _2, "net": _2, "org": _2 } }, "va": _2, "vc": { "$": 1, "succ": { "com": _2, "net": _2, "org": _2, "gov": _2, "mil": _2, "edu": _2, "gv": { "$": 2, "succ": { "d": _4 } }, "nom": _4 } }, "ve": { "$": 1, "succ": { "arts": _2, "co": _2, "com": _2, "e12": _2, "edu": _2, "firm": _2, "gob": _2, "gov": _2, "info": _2, "int": _2, "mil": _2, "net": _2, "org": _2, "rec": _2, "store": _2, "tec": _2, "web": _2 } }, "vg": _20, "vi": { "$": 1, "succ": { "co": _2, "com": _2, "k12": _2, "net": _2, "org": _2 } }, "vn": { "$": 1, "succ": { "com": _2, "net": _2, "org": _2, "edu": _2, "gov": _2, "int": _2, "ac": _2, "biz": _2, "info": _2, "name": _2, "pro": _2, "health": _2, "blogspot": _4 } }, "vu": _17, "wf": _2, "ws": { "$": 1, "succ": { "com": _2, "net": _2, "org": _2, "gov": _2, "edu": _2, "advisor": _7, "cloud66": _4, "dyndns": _4, "mypets": _4 } }, "yt": _2, "xn--mgbaam7a8h": _2, "امارات": _2, "xn--y9a3aq": _2, "հայ": _2, "xn--54b7fta0cc": _2, "বাংলা": _2, "xn--90ae": _2, "бг": _2, "xn--90ais": _2, "бел": _2, "xn--fiqs8s": _2, "中国": _2, "xn--fiqz9s": _2, "中國": _2, "xn--lgbbat1ad8j": _2, "الجزائر": _2, "xn--wgbh1c": _2, "مصر": _2, "xn--e1a4c": _2, "ею": _2, "xn--mgbah1a3hjkrd": _2, "موريتانيا": _2, "xn--node": _2, "გე": _2, "xn--qxam": _2, "ελ": _2, "xn--j6w193g": { "$": 1, "succ": { "xn--55qx5d": _2, "xn--wcvs22d": _2, "xn--mxtq1m": _2, "xn--gmqw5a": _2, "xn--od0alg": _2, "xn--uc0atv": _2 } }, "香港": { "$": 1, "succ": { "公司": _2, "教育": _2, "政府": _2, "個人": _2, "網絡": _2, "組織": _2 } }, "xn--2scrj9c": _2, "ಭಾರತ": _2, "xn--3hcrj9c": _2, "ଭାରତ": _2, "xn--45br5cyl": _2, "ভাৰত": _2, "xn--h2breg3eve": _2, "भारतम्": _2, "xn--h2brj9c8c": _2, "भारोत": _2, "xn--mgbgu82a": _2, "ڀارت": _2, "xn--rvc1e0am3e": _2, "ഭാരതം": _2, "xn--h2brj9c": _2, "भारत": _2, "xn--mgbbh1a": _2, "بارت": _2, "xn--mgbbh1a71e": _2, "بھارت": _2, "xn--fpcrj9c3d": _2, "భారత్": _2, "xn--gecrj9c": _2, "ભારત": _2, "xn--s9brj9c": _2, "ਭਾਰਤ": _2, "xn--45brj9c": _2, "ভারত": _2, "xn--xkc2dl3a5ee0h": _2, "இந்தியா": _2, "xn--mgba3a4f16a": _2, "ایران": _2, "xn--mgba3a4fra": _2, "ايران": _2, "xn--mgbtx2b": _2, "عراق": _2, "xn--mgbayh7gpa": _2, "الاردن": _2, "xn--3e0b707e": _2, "한국": _2, "xn--80ao21a": _2, "қаз": _2, "xn--fzc2c9e2c": _2, "ලංකා": _2, "xn--xkc2al3hye2a": _2, "இலங்கை": _2, "xn--mgbc0a9azcg": _2, "المغرب": _2, "xn--d1alf": _2, "мкд": _2, "xn--l1acc": _2, "мон": _2, "xn--mix891f": _2, "澳門": _2, "xn--mix082f": _2, "澳门": _2, "xn--mgbx4cd0ab": _2, "مليسيا": _2, "xn--mgb9awbf": _2, "عمان": _2, "xn--mgbai9azgqp6j": _2, "پاکستان": _2, "xn--mgbai9a5eva00b": _2, "پاكستان": _2, "xn--ygbi2ammx": _2, "فلسطين": _2, "xn--90a3ac": { "$": 1, "succ": { "xn--o1ac": _2, "xn--c1avg": _2, "xn--90azh": _2, "xn--d1at": _2, "xn--o1ach": _2, "xn--80au": _2 } }, "срб": { "$": 1, "succ": { "пр": _2, "орг": _2, "обр": _2, "од": _2, "упр": _2, "ак": _2 } }, "xn--p1ai": _2, "рф": _2, "xn--wgbl6a": _2, "قطر": _2, "xn--mgberp4a5d4ar": _2, "السعودية": _2, "xn--mgberp4a5d4a87g": _2, "السعودیة": _2, "xn--mgbqly7c0a67fbc": _2, "السعودیۃ": _2, "xn--mgbqly7cvafr": _2, "السعوديه": _2, "xn--mgbpl2fh": _2, "سودان": _2, "xn--yfro4i67o": _2, "新加坡": _2, "xn--clchc0ea0b2g2a9gcd": _2, "சிங்கப்பூர்": _2, "xn--ogbpf8fl": _2, "سورية": _2, "xn--mgbtf8fl": _2, "سوريا": _2, "xn--o3cw4h": { "$": 1, "succ": { "xn--12c1fe0br": _2, "xn--12co0c3b4eva": _2, "xn--h3cuzk1di": _2, "xn--o3cyx2a": _2, "xn--m3ch0j3a": _2, "xn--12cfi8ixb8l": _2 } }, "ไทย": { "$": 1, "succ": { "ศึกษา": _2, "ธุรกิจ": _2, "รัฐบาล": _2, "ทหาร": _2, "เน็ต": _2, "องค์กร": _2 } }, "xn--pgbs0dh": _2, "تونس": _2, "xn--kpry57d": _2, "台灣": _2, "xn--kprw13d": _2, "台湾": _2, "xn--nnx388a": _2, "臺灣": _2, "xn--j1amh": _2, "укр": _2, "xn--mgb2ddes": _2, "اليمن": _2, "xxx": _2, "ye": _8, "za": { "$": 0, "succ": { "ac": _2, "agric": _2, "alt": _2, "co": _5, "edu": _2, "gov": _2, "grondar": _2, "law": _2, "mil": _2, "net": _2, "ngo": _2, "nic": _2, "nis": _2, "nom": _2, "org": _2, "school": _2, "tm": _2, "web": _2 } }, "zm": { "$": 1, "succ": { "ac": _2, "biz": _2, "co": _2, "com": _2, "edu": _2, "gov": _2, "info": _2, "mil": _2, "net": _2, "org": _2, "sch": _2 } }, "zw": { "$": 1, "succ": { "ac": _2, "co": _2, "gov": _2, "mil": _2, "org": _2 } }, "aaa": _2, "aarp": _2, "abarth": _2, "abb": _2, "abbott": _2, "abbvie": _2, "abc": _2, "able": _2, "abogado": _2, "abudhabi": _2, "academy": { "$": 1, "succ": { "official": _4 } }, "accenture": _2, "accountant": _2, "accountants": _2, "aco": _2, "actor": _2, "adac": _2, "ads": _2, "adult": _2, "aeg": _2, "aetna": _2, "afamilycompany": _2, "afl": _2, "africa": _2, "agakhan": _2, "agency": _2, "aig": _2, "aigo": _2, "airbus": _2, "airforce": _2, "airtel": _2, "akdn": _2, "alfaromeo": _2, "alibaba": _2, "alipay": _2, "allfinanz": _2, "allstate": _2, "ally": _2, "alsace": _2, "alstom": _2, "americanexpress": _2, "americanfamily": _2, "amex": _2, "amfam": _2, "amica": _2, "amsterdam": _2, "analytics": _2, "android": _2, "anquan": _2, "anz": _2, "aol": _2, "apartments": _2, "app": { "$": 1, "succ": { "wnext": _4, "run": { "$": 2, "succ": { "a": _4 } }, "web": _4, "hasura": _4, "loginline": _4, "telebit": _4 } }, "apple": _2, "aquarelle": _2, "arab": _2, "aramco": _2, "archi": _2, "army": _2, "art": _2, "arte": _2, "asda": _2, "associates": _2, "athleta": _2, "attorney": _2, "auction": _2, "audi": _2, "audible": _2, "audio": _2, "auspost": _2, "author": _2, "auto": _2, "autos": _2, "avianca": _2, "aws": _2, "axa": _2, "azure": _2, "baby": _2, "baidu": _2, "banamex": _2, "bananarepublic": _2, "band": _2, "bank": _2, "bar": _2, "barcelona": _2, "barclaycard": _2, "barclays": _2, "barefoot": _2, "bargains": _2, "baseball": _2, "basketball": _2, "bauhaus": _2, "bayern": _2, "bbc": _2, "bbt": _2, "bbva": _2, "bcg": _2, "bcn": _2, "beats": _2, "beauty": _2, "beer": _2, "bentley": _2, "berlin": _2, "best": _2, "bestbuy": _2, "bet": _2, "bharti": _2, "bible": _2, "bid": _2, "bike": _2, "bing": _2, "bingo": _2, "bio": _2, "black": _2, "blackfriday": _2, "blockbuster": _2, "blog": _2, "bloomberg": _2, "blue": _2, "bms": _2, "bmw": _2, "bnpparibas": _2, "boats": _2, "boehringer": _2, "bofa": _2, "bom": _2, "bond": _2, "boo": _2, "book": _2, "booking": _2, "bosch": _2, "bostik": _2, "boston": _2, "bot": _2, "boutique": _2, "box": _2, "bradesco": _2, "bridgestone": _2, "broadway": _2, "broker": _2, "brother": _2, "brussels": _2, "budapest": _2, "bugatti": _2, "build": _2, "builders": _2, "business": _10, "buy": _2, "buzz": _2, "bzh": _2, "cab": _2, "cafe": _2, "cal": _2, "call": _2, "calvinklein": _2, "cam": _2, "camera": _2, "camp": _2, "cancerresearch": _2, "canon": _2, "capetown": _2, "capital": _2, "capitalone": _2, "car": _2, "caravan": _2, "cards": _2, "care": _2, "career": _2, "careers": _2, "cars": _2, "casa": { "$": 1, "succ": { "nabu": { "$": 0, "succ": { "ui": _4 } } } }, "case": _2, "caseih": _2, "cash": _2, "casino": _2, "catering": _2, "catholic": _2, "cba": _2, "cbn": _2, "cbre": _2, "cbs": _2, "ceb": _2, "center": _2, "ceo": _2, "cern": _2, "cfa": _2, "cfd": _2, "chanel": _2, "channel": _2, "charity": _2, "chase": _2, "chat": _2, "cheap": _2, "chintai": _2, "christmas": _2, "chrome": _2, "chrysler": _2, "church": _2, "cipriani": _2, "circle": _2, "cisco": _2, "citadel": _2, "citi": _2, "citic": _2, "city": _11, "cityeats": _2, "claims": _2, "cleaning": _2, "click": _2, "clinic": _2, "clinique": _2, "clothing": _2, "cloud": { "$": 1, "succ": { "statics": _7, "linkyard": _4, "magentosite": _7, "vapor": _4, "on-rancher": _7, "sensiosite": _7, "trafficplex": _4, "voorloper": _4 } }, "club": { "$": 1, "succ": { "cloudns": _4, "barsy": _4, "pony": _4 } }, "clubmed": _2, "coach": _2, "codes": _2, "coffee": _2, "college": _2, "cologne": _2, "comcast": _2, "commbank": _2, "community": { "$": 1, "succ": { "ravendb": _4 } }, "company": _2, "compare": _2, "computer": _2, "comsec": _2, "condos": _2, "construction": _2, "consulting": _2, "contact": _2, "contractors": _2, "cooking": _2, "cookingchannel": _2, "cool": { "$": 1, "succ": { "de": _4 } }, "corsica": _2, "country": _2, "coupon": _2, "coupons": _2, "courses": _2, "cpa": _2, "credit": _2, "creditcard": _2, "creditunion": _2, "cricket": _2, "crown": _2, "crs": _2, "cruise": _2, "cruises": _2, "csc": _2, "cuisinella": _2, "cymru": _2, "cyou": _2, "dabur": _2, "dad": _2, "dance": _2, "data": _2, "date": _2, "dating": _2, "datsun": _2, "day": _2, "dclk": _2, "dds": _2, "deal": _2, "dealer": _2, "deals": _2, "degree": _2, "delivery": _2, "dell": _2, "deloitte": _2, "delta": _2, "democrat": _2, "dental": _2, "dentist": _2, "desi": _2, "design": { "$": 1, "succ": { "bss": _4 } }, "dev": { "$": 1, "succ": { "lcl": _7, "stg": _7, "workers": _4, "iserv": _4, "loginline": _4, "webhare": _7 } }, "dhl": _2, "diamonds": _2, "diet": _2, "digital": { "$": 1, "succ": { "cloudapps": { "$": 2, "succ": { "london": _4 } } } }, "direct": { "$": 1, "succ": { "fastpanel": _4 } }, "directory": _2, "discount": _2, "discover": _2, "dish": _2, "diy": _2, "dnp": _2, "docs": _2, "doctor": _2, "dodge": _2, "dog": _2, "domains": _2, "dot": _2, "download": _2, "drive": _2, "dtv": _2, "dubai": _2, "duck": _2, "dunlop": _2, "dupont": _2, "durban": _2, "dvag": _2, "dvr": _2, "earth": { "$": 1, "succ": { "dapps": { "$": 0, "succ": { "*": _4, "bzz": _7 } } } }, "eat": _2, "eco": _2, "edeka": _2, "education": _10, "email": _2, "emerck": _2, "energy": _2, "engineer": _2, "engineering": _2, "enterprises": _2, "epson": _2, "equipment": _2, "ericsson": _2, "erni": _2, "esq": _2, "estate": { "$": 1, "succ": { "compute": _7 } }, "esurance": _2, "etisalat": _2, "eurovision": _2, "eus": { "$": 1, "succ": { "party": _18 } }, "events": _10, "exchange": _2, "expert": _2, "exposed": _2, "express": _2, "extraspace": _2, "fage": _2, "fail": _2, "fairwinds": _2, "faith": _19, "family": _2, "fan": _2, "fans": _2, "farm": { "$": 1, "succ": { "storj": _4 } }, "farmers": _2, "fashion": { "$": 1, "succ": { "of": _4, "on": _4 } }, "fast": _2, "fedex": _2, "feedback": _2, "ferrari": _2, "ferrero": _2, "fiat": _2, "fidelity": _2, "fido": _2, "film": _2, "final": _2, "finance": _2, "financial": _10, "fire": _2, "firestone": _2, "firmdale": _2, "fish": _2, "fishing": _2, "fit": { "$": 1, "succ": { "ptplus": _4 } }, "fitness": _2, "flickr": _2, "flights": _2, "flir": _2, "florist": _2, "flowers": _2, "fly": _2, "foo": _2, "food": _2, "foodnetwork": _2, "football": { "$": 1, "succ": { "of": _4 } }, "ford": _2, "forex": _2, "forsale": _2, "forum": _2, "foundation": _2, "fox": _2, "free": _2, "fresenius": _2, "frl": _2, "frogans": _2, "frontdoor": _2, "frontier": _2, "ftr": _2, "fujitsu": _2, "fujixerox": _2, "fun": _2, "fund": _2, "furniture": _2, "futbol": _2, "fyi": _2, "gal": _2, "gallery": _2, "gallo": _2, "gallup": _2, "game": _2, "games": _2, "gap": _2, "garden": _2, "gay": _2, "gbiz": _2, "gdn": { "$": 1, "succ": { "cnpy": _4 } }, "gea": _2, "gent": _2, "genting": _2, "george": _2, "ggee": _2, "gift": _2, "gifts": _2, "gives": _2, "giving": _2, "glade": _2, "glass": _2, "gle": _2, "global": _2, "globo": _2, "gmail": _2, "gmbh": _2, "gmo": _2, "gmx": _2, "godaddy": _2, "gold": _2, "goldpoint": _2, "golf": _2, "goo": _2, "goodyear": _2, "goog": { "$": 1, "succ": { "cloud": _4 } }, "google": _2, "gop": _2, "got": _2, "grainger": _2, "graphics": _2, "gratis": _2, "green": _2, "gripe": _2, "grocery": _2, "group": { "$": 1, "succ": { "discourse": _4 } }, "guardian": _2, "gucci": _2, "guge": _2, "guide": _2, "guitars": _2, "guru": _2, "hair": _2, "hamburg": _2, "hangout": _2, "haus": _2, "hbo": _2, "hdfc": _2, "hdfcbank": _2, "health": _2, "healthcare": _2, "help": _2, "helsinki": _2, "here": _2, "hermes": _2, "hgtv": _2, "hiphop": _2, "hisamitsu": _2, "hitachi": _2, "hiv": _2, "hkt": _2, "hockey": _2, "holdings": _2, "holiday": _2, "homedepot": _2, "homegoods": _2, "homes": _2, "homesense": _2, "honda": _2, "horse": _2, "hospital": _2, "host": { "$": 1, "succ": { "cloudaccess": _4, "freesite": _4, "pcloud": _4, "half": _4 } }, "hosting": { "$": 1, "succ": { "opencraft": _4 } }, "hot": _2, "hoteles": _2, "hotels": _2, "hotmail": _2, "house": _2, "how": _2, "hsbc": _2, "hughes": _2, "hyatt": _2, "hyundai": _2, "ibm": _2, "icbc": _2, "ice": _2, "icu": _2, "ieee": _2, "ifm": _2, "ikano": _2, "imamat": _2, "imdb": _2, "immo": _2, "immobilien": _2, "inc": _2, "industries": _2, "infiniti": _2, "ing": _2, "ink": _11, "institute": _2, "insurance": _2, "insure": _2, "intel": _2, "international": _2, "intuit": _2, "investments": _2, "ipiranga": _2, "irish": _2, "ismaili": _2, "ist": _2, "istanbul": _2, "itau": _2, "itv": _2, "iveco": _2, "jaguar": _2, "java": _2, "jcb": _2, "jcp": _2, "jeep": _2, "jetzt": _2, "jewelry": _2, "jio": _2, "jll": _2, "jmp": _2, "jnj": _2, "joburg": _2, "jot": _2, "joy": _2, "jpmorgan": _2, "jprs": _2, "juegos": _2, "juniper": _2, "kaufen": _2, "kddi": _2, "kerryhotels": _2, "kerrylogistics": _2, "kerryproperties": _2, "kfh": _2, "kia": _2, "kim": _2, "kinder": _2, "kindle": _2, "kitchen": _2, "kiwi": _2, "koeln": _2, "komatsu": _2, "kosher": _2, "kpmg": _2, "kpn": _2, "krd": { "$": 1, "succ": { "co": _4, "edu": _4 } }, "kred": _2, "kuokgroup": _2, "kyoto": _2, "lacaixa": _2, "ladbrokes": _2, "lamborghini": _2, "lamer": _2, "lancaster": _2, "lancia": _2, "lancome": _2, "land": { "$": 1, "succ": { "static": { "$": 2, "succ": { "dev": _4, "sites": _4 } } } }, "landrover": _2, "lanxess": _2, "lasalle": _2, "lat": _2, "latino": _2, "latrobe": _2, "law": _2, "lawyer": _2, "lds": _2, "lease": _2, "leclerc": _2, "lefrak": _2, "legal": _2, "lego": _2, "lexus": _2, "lgbt": _2, "liaison": _2, "lidl": _2, "life": _2, "lifeinsurance": _2, "lifestyle": _2, "lighting": _2, "like": _2, "lilly": _2, "limited": _2, "limo": _2, "lincoln": _2, "linde": _2, "link": { "$": 1, "succ": { "cyon": _4, "mypep": _4, "dweb": _7 } }, "lipsy": _2, "live": _2, "living": _2, "lixil": _2, "llc": _2, "llp": _2, "loan": _2, "loans": _2, "locker": _2, "locus": _2, "loft": _2, "lol": _2, "london": { "$": 1, "succ": { "in": _4, "of": _4 } }, "lotte": _2, "lotto": _2, "love": _2, "lpl": _2, "lplfinancial": _2, "ltd": _2, "ltda": _2, "lundbeck": _2, "lupin": _2, "luxe": _2, "luxury": _2, "macys": _2, "madrid": _2, "maif": _2, "maison": _2, "makeup": _2, "man": _2, "management": { "$": 1, "succ": { "router": _4 } }, "mango": _2, "map": _2, "market": _2, "marketing": _2, "markets": _2, "marriott": _2, "marshalls": _2, "maserati": _2, "mattel": _2, "mba": _2, "mckinsey": _2, "med": _2, "media": _2, "meet": _2, "melbourne": _2, "meme": _2, "memorial": _2, "men": _25, "menu": _26, "merckmsd": _2, "metlife": _2, "miami": _2, "microsoft": _2, "mini": _2, "mint": _2, "mit": _2, "mitsubishi": _2, "mlb": _2, "mls": _2, "mma": _2, "mobile": _2, "moda": _2, "moe": _2, "moi": _2, "mom": { "$": 1, "succ": { "and": _4, "for": _4 } }, "monash": _2, "money": _2, "monster": _2, "mopar": _2, "mormon": _2, "mortgage": _2, "moscow": _2, "moto": _2, "motorcycles": _2, "mov": _2, "movie": _2, "movistar": _2, "msd": _2, "mtn": _2, "mtr": _2, "mutual": _2, "nab": _2, "nadex": _2, "nagoya": _2, "nationwide": _2, "natura": _2, "navy": _2, "nba": _2, "nec": _2, "netbank": _2, "netflix": _2, "network": { "$": 1, "succ": { "alces": _7, "co": _4, "arvo": _4, "azimuth": _4 } }, "neustar": _2, "new": _2, "newholland": _2, "news": _2, "next": _2, "nextdirect": _2, "nexus": _2, "nfl": _2, "ngo": _2, "nhk": _2, "nico": _2, "nike": _2, "nikon": _2, "ninja": _2, "nissan": _2, "nissay": _2, "nokia": _2, "northwesternmutual": _2, "norton": _2, "now": _2, "nowruz": _2, "nowtv": _2, "nra": _2, "nrw": _2, "ntt": _2, "nyc": _2, "obi": _2, "observer": _2, "off": _2, "office": _2, "okinawa": _2, "olayan": _2, "olayangroup": _2, "oldnavy": _2, "ollo": _2, "omega": _2, "one": { "$": 1, "succ": { "onred": { "$": 2, "succ": { "staging": _4 } }, "for": _4, "homelink": _4 } }, "ong": _2, "onl": _2, "online": _26, "onyourside": _2, "ooo": _2, "open": _2, "oracle": _2, "orange": _2, "organic": _2, "origins": _2, "osaka": _2, "otsuka": _2, "ott": _2, "ovh": { "$": 1, "succ": { "nerdpol": _4 } }, "page": { "$": 1, "succ": { "prvcy": _4 } }, "panasonic": _2, "paris": _2, "pars": _2, "partners": _2, "parts": _2, "party": _19, "passagens": _2, "pay": _2, "pccw": _2, "pet": _2, "pfizer": _2, "pharmacy": _2, "phd": _2, "philips": _2, "phone": _2, "photo": _2, "photography": _2, "photos": _2, "physio": _2, "pics": _2, "pictet": _2, "pictures": { "$": 1, "succ": { "1337": _4 } }, "pid": _2, "pin": _2, "ping": _2, "pink": _2, "pioneer": _2, "pizza": _2, "place": _10, "play": _2, "playstation": _2, "plumbing": _2, "plus": _2, "pnc": _2, "pohl": _2, "poker": _2, "politie": _2, "porn": _2, "pramerica": _2, "praxi": _2, "press": _2, "prime": _2, "prod": _2, "productions": _2, "prof": _2, "progressive": _2, "promo": _2, "properties": _2, "property": _2, "protection": _2, "pru": _2, "prudential": _2, "pub": _26, "pwc": _2, "qpon": _2, "quebec": _2, "quest": _2, "qvc": _2, "racing": _2, "radio": _2, "raid": _2, "read": _2, "realestate": _2, "realtor": _2, "realty": _2, "recipes": _2, "red": _2, "redstone": _2, "redumbrella": _2, "rehab": _2, "reise": _2, "reisen": _2, "reit": _2, "reliance": _2, "ren": _2, "rent": _2, "rentals": _2, "repair": _2, "report": _2, "republican": _2, "rest": _2, "restaurant": _2, "review": _19, "reviews": _2, "rexroth": _2, "rich": _2, "richardli": _2, "ricoh": _2, "rightathome": _2, "ril": _2, "rio": _2, "rip": { "$": 1, "succ": { "clan": _4 } }, "rmit": _2, "rocher": _2, "rocks": { "$": 1, "succ": { "myddns": _4, "lima-city": _4, "webspace": _4 } }, "rodeo": _2, "rogers": _2, "room": _2, "rsvp": _2, "rugby": _2, "ruhr": _2, "run": { "$": 1, "succ": { "hs": _4, "development": _4, "ravendb": _4, "repl": _4 } }, "rwe": _2, "ryukyu": _2, "saarland": _2, "safe": _2, "safety": _2, "sakura": _2, "sale": _25, "salon": _2, "samsclub": _2, "samsung": _2, "sandvik": _2, "sandvikcoromant": _2, "sanofi": _2, "sap": _2, "sarl": _2, "sas": _2, "save": _2, "saxo": _2, "sbi": _2, "sbs": _2, "sca": _2, "scb": _2, "schaeffler": _2, "schmidt": _2, "scholarships": _2, "school": _11, "schule": _2, "schwarz": _2, "science": _19, "scjohnson": _2, "scor": _2, "scot": { "$": 1, "succ": { "gov": _4 } }, "search": _2, "seat": _2, "secure": _2, "security": _2, "seek": _2, "select": _2, "sener": _2, "services": { "$": 1, "succ": { "loginline": _4 } }, "ses": _2, "seven": _2, "sew": _2, "sex": _2, "sexy": _2, "sfr": _2, "shangrila": _2, "sharp": _2, "shaw": _2, "shell": _2, "shia": _2, "shiksha": _2, "shoes": _2, "shop": _26, "shopping": _2, "shouji": _2, "show": _2, "showtime": _2, "shriram": _2, "silk": _2, "sina": _2, "singles": _2, "site": { "$": 1, "succ": { "cloudera": _4, "cyon": _4, "lelux": _4, "loginline": _4, "barsy": _4, "platformsh": _7, "byen": _4 } }, "ski": _2, "skin": _2, "sky": _2, "skype": _2, "sling": _2, "smart": _2, "smile": _2, "sncf": _2, "soccer": _2, "social": _2, "softbank": _2, "software": _2, "sohu": _2, "solar": _2, "solutions": _2, "song": _2, "sony": _2, "soy": _2, "spa": _2, "space": { "$": 1, "succ": { "linkitools": _4, "uber": _4, "xs4all": _4 } }, "sport": _2, "spot": _2, "spreadbetting": _2, "srl": _2, "srt": _2, "stada": _2, "staples": _2, "star": _2, "statebank": _2, "statefarm": _2, "stc": _2, "stcgroup": _2, "stockholm": _2, "storage": _2, "store": _2, "stream": _2, "studio": _2, "study": _2, "style": _2, "sucks": _2, "supplies": _2, "supply": _2, "support": _26, "surf": _2, "surgery": _2, "suzuki": _2, "swatch": _2, "swiftcover": _2, "swiss": _2, "sydney": _2, "symantec": _2, "systems": { "$": 1, "succ": { "knightpoint": _4 } }, "tab": _2, "taipei": _2, "talk": _2, "taobao": _2, "target": _2, "tatamotors": _2, "tatar": _2, "tattoo": _2, "tax": _2, "taxi": _2, "tci": _2, "tdk": _2, "team": _2, "tech": _2, "technology": _10, "telefonica": _2, "temasek": _2, "tennis": _2, "teva": _2, "thd": _2, "theater": _2, "theatre": _2, "tiaa": _2, "tickets": _2, "tienda": _2, "tiffany": _2, "tips": _2, "tires": _2, "tirol": _2, "tjmaxx": _2, "tjx": _2, "tkmaxx": _2, "tmall": _2, "today": _2, "tokyo": _2, "tools": _2, "top": { "$": 1, "succ": { "now-dns": _4, "ntdll": _4 } }, "toray": _2, "toshiba": _2, "total": _2, "tours": _2, "town": _2, "toyota": _2, "toys": _2, "trade": _19, "trading": _2, "training": _2, "travel": _2, "travelchannel": _2, "travelers": _2, "travelersinsurance": _2, "trust": _2, "trv": _2, "tube": _2, "tui": _2, "tunes": _2, "tushu": _2, "tvs": _2, "ubank": _2, "ubs": _2, "uconnect": _2, "unicom": _2, "university": _2, "uno": _2, "uol": _2, "ups": _2, "vacations": _2, "vana": _2, "vanguard": _2, "vegas": _2, "ventures": _2, "verisign": _2, "versicherung": _2, "vet": _2, "viajes": _2, "video": _2, "vig": _2, "viking": _2, "villas": _2, "vin": _2, "vip": _2, "virgin": _2, "visa": _2, "vision": _2, "vistaprint": _2, "viva": _2, "vivo": _2, "vlaanderen": _2, "vodka": _2, "volkswagen": _2, "volvo": _2, "vote": _2, "voting": _2, "voto": _2, "voyage": _2, "vuelos": _2, "wales": _2, "walmart": _2, "walter": _2, "wang": _2, "wanggou": _2, "warman": _2, "watch": _2, "watches": _2, "weather": _2, "weatherchannel": _2, "webcam": _2, "weber": _2, "website": _2, "wed": _2, "wedding": _2, "weibo": _2, "weir": _2, "whoswho": _2, "wien": _2, "wiki": _2, "williamhill": _2, "win": _2, "windows": _2, "wine": _2, "winners": _2, "wme": _2, "wolterskluwer": _2, "woodside": _2, "work": { "$": 1, "succ": { "of": _4, "to": _4 } }, "works": _2, "world": _2, "wow": _2, "wtc": _2, "wtf": _2, "xbox": _2, "xerox": _2, "xfinity": _2, "xihuan": _2, "xin": _2, "xn--11b4c3d": _2, "कॉम": _2, "xn--1ck2e1b": _2, "セール": _2, "xn--1qqw23a": _2, "佛山": _2, "xn--30rr7y": _2, "慈善": _2, "xn--3bst00m": _2, "集团": _2, "xn--3ds443g": _2, "在线": _2, "xn--3oq18vl8pn36a": _2, "大众汽车": _2, "xn--3pxu8k": _2, "点看": _2, "xn--42c2d9a": _2, "คอม": _2, "xn--45q11c": _2, "八卦": _2, "xn--4gbrim": _2, "موقع": _2, "xn--55qw42g": _2, "公益": _2, "xn--55qx5d": _2, "公司": _2, "xn--5su34j936bgsg": _2, "香格里拉": _2, "xn--5tzm5g": _2, "网站": _2, "xn--6frz82g": _2, "移动": _2, "xn--6qq986b3xl": _2, "我爱你": _2, "xn--80adxhks": _2, "москва": _2, "xn--80aqecdr1a": _2, "католик": _2, "xn--80asehdb": _2, "онлайн": _2, "xn--80aswg": _2, "сайт": _2, "xn--8y0a063a": _2, "联通": _2, "xn--9dbq2a": _2, "קום": _2, "xn--9et52u": _2, "时尚": _2, "xn--9krt00a": _2, "微博": _2, "xn--b4w605ferd": _2, "淡马锡": _2, "xn--bck1b9a5dre4c": _2, "ファッション": _2, "xn--c1avg": _2, "орг": _2, "xn--c2br7g": _2, "नेट": _2, "xn--cck2b3b": _2, "ストア": _2, "xn--cg4bki": _2, "삼성": _2, "xn--czr694b": _2, "商标": _2, "xn--czrs0t": _2, "商店": _2, "xn--czru2d": _2, "商城": _2, "xn--d1acj3b": _2, "дети": _2, "xn--eckvdtc9d": _2, "ポイント": _2, "xn--efvy88h": _2, "新闻": _2, "xn--estv75g": _2, "工行": _2, "xn--fct429k": _2, "家電": _2, "xn--fhbei": _2, "كوم": _2, "xn--fiq228c5hs": _2, "中文网": _2, "xn--fiq64b": _2, "中信": _2, "xn--fjq720a": _2, "娱乐": _2, "xn--flw351e": _2, "谷歌": _2, "xn--fzys8d69uvgm": _2, "電訊盈科": _2, "xn--g2xx48c": _2, "购物": _2, "xn--gckr3f0f": _2, "クラウド": _2, "xn--gk3at1e": _2, "通販": _2, "xn--hxt814e": _2, "网店": _2, "xn--i1b6b1a6a2e": _2, "संगठन": _2, "xn--imr513n": _2, "餐厅": _2, "xn--io0a7i": _2, "网络": _2, "xn--j1aef": _2, "ком": _2, "xn--jlq61u9w7b": _2, "诺基亚": _2, "xn--jvr189m": _2, "食品": _2, "xn--kcrx77d1x4a": _2, "飞利浦": _2, "xn--kpu716f": _2, "手表": _2, "xn--kput3i": _2, "手机": _2, "xn--mgba3a3ejt": _2, "ارامكو": _2, "xn--mgba7c0bbn0a": _2, "العليان": _2, "xn--mgbaakc7dvf": _2, "اتصالات": _2, "xn--mgbab2bd": _2, "بازار": _2, "xn--mgbca7dzdo": _2, "ابوظبي": _2, "xn--mgbi4ecexp": _2, "كاثوليك": _2, "xn--mgbt3dhd": _2, "همراه": _2, "xn--mk1bu44c": _2, "닷컴": _2, "xn--mxtq1m": _2, "政府": _2, "xn--ngbc5azd": _2, "شبكة": _2, "xn--ngbe9e0a": _2, "بيتك": _2, "xn--ngbrx": _2, "عرب": _2, "xn--nqv7f": _2, "机构": _2, "xn--nqv7fs00ema": _2, "组织机构": _2, "xn--nyqy26a": _2, "健康": _2, "xn--otu796d": _2, "招聘": _2, "xn--p1acf": _2, "рус": _2, "xn--pbt977c": _2, "珠宝": _2, "xn--pssy2u": _2, "大拿": _2, "xn--q9jyb4c": _2, "みんな": _2, "xn--qcka1pmc": _2, "グーグル": _2, "xn--rhqv96g": _2, "世界": _2, "xn--rovu88b": _2, "書籍": _2, "xn--ses554g": _2, "网址": _2, "xn--t60b56a": _2, "닷넷": _2, "xn--tckwe": _2, "コム": _2, "xn--tiq49xqyj": _2, "天主教": _2, "xn--unup4y": _2, "游戏": _2, "xn--vermgensberater-ctb": _2, "vermögensberater": _2, "xn--vermgensberatung-pwb": _2, "vermögensberatung": _2, "xn--vhquv": _2, "企业": _2, "xn--vuq861b": _2, "信息": _2, "xn--w4r85el8fhu5dnra": _2, "嘉里大酒店": _2, "xn--w4rs40l": _2, "嘉里": _2, "xn--xhq521b": _2, "广东": _2, "xn--zfr164b": _2, "政务": _2, "xyz": { "$": 1, "succ": { "blogsite": _4, "fhapp": _4, "crafting": _4, "zapto": _4, "telebit": _7 } }, "yachts": _2, "yahoo": _2, "yamaxun": _2, "yandex": _2, "yodobashi": _2, "yoga": _2, "yokohama": _2, "you": _2, "youtube": _2, "yun": _2, "zappos": _2, "zara": _2, "zero": _2, "zip": _2, "zone": { "$": 1, "succ": { "cloud66": _4, "hs": _4, "triton": _7, "lima": _4 } }, "zuerich": _2 } };
    return rules;
})();

/**
 * Lookup parts of domain in Trie
 */
function lookupInTrie(parts, trie, index, allowedMask) {
    var result = null;
    var node = trie;
    while (node !== undefined) {
        // We have a match!
        if ((node.$ & allowedMask) !== 0) {
            result = {
                index: index + 1,
                isIcann: node.$ === 1 /* ICANN */,
                isPrivate: node.$ === 2 /* PRIVATE */
            };
        }
        // No more `parts` to look for
        if (index === -1) {
            break;
        }
        var succ = node.succ;
        node = succ && (succ[parts[index]] || succ['*']);
        index -= 1;
    }
    return result;
}
/**
 * Check if `hostname` has a valid public suffix in `trie`.
 */
function suffixLookup(hostname, options, out) {
    if (fastPathLookup(hostname, options, out) === true) {
        return;
    }
    var hostnameParts = hostname.split('.');
    var allowedMask = (options.allowPrivateDomains === true ? 2 /* PRIVATE */ : 0) |
        (options.allowIcannDomains === true ? 1 /* ICANN */ : 0);
    // Look for exceptions
    var exceptionMatch = lookupInTrie(hostnameParts, exceptions, hostnameParts.length - 1, allowedMask);
    if (exceptionMatch !== null) {
        out.isIcann = exceptionMatch.isIcann;
        out.isPrivate = exceptionMatch.isPrivate;
        out.publicSuffix = hostnameParts.slice(exceptionMatch.index + 1).join('.');
        return;
    }
    // Look for a match in rules
    var rulesMatch = lookupInTrie(hostnameParts, rules, hostnameParts.length - 1, allowedMask);
    if (rulesMatch !== null) {
        out.isIcann = rulesMatch.isIcann;
        out.isPrivate = rulesMatch.isPrivate;
        out.publicSuffix = hostnameParts.slice(rulesMatch.index).join('.');
        return;
    }
    // No match found...
    // Prevailing rule is '*' so we consider the top-level domain to be the
    // public suffix of `hostname` (e.g.: 'example.org' => 'org').
    out.isIcann = false;
    out.isPrivate = false;
    out.publicSuffix = hostnameParts[hostnameParts.length - 1];
}

// For all methods but 'parse', it does not make sense to allocate an object
// every single time to only return the value of a specific attribute. To avoid
// this un-necessary allocation, we use a global object which is re-used.
var RESULT = getEmptyResult();
function parse(url, options) {
    if (options === void 0) { options = {}; }
    return parseImpl(url, 5 /* ALL */, suffixLookup, options, getEmptyResult());
}
function getHostname(url, options) {
    if (options === void 0) { options = {}; }
    resetResult(RESULT);
    return parseImpl(url, 0 /* HOSTNAME */, suffixLookup, options, RESULT).hostname;
}
function getPublicSuffix(url, options) {
    if (options === void 0) { options = {}; }
    resetResult(RESULT);
    return parseImpl(url, 2 /* PUBLIC_SUFFIX */, suffixLookup, options, RESULT).publicSuffix;
}
function getDomain$1(url, options) {
    if (options === void 0) { options = {}; }
    resetResult(RESULT);
    return parseImpl(url, 3 /* DOMAIN */, suffixLookup, options, RESULT).domain;
}
function getSubdomain$1(url, options) {
    if (options === void 0) { options = {}; }
    resetResult(RESULT);
    return parseImpl(url, 4 /* SUB_DOMAIN */, suffixLookup, options, RESULT).subdomain;
}
function getDomainWithoutSuffix$1(url, options) {
    if (options === void 0) { options = {}; }
    resetResult(RESULT);
    return parseImpl(url, 5 /* ALL */, suffixLookup, options, RESULT).domainWithoutSuffix;
}

exports.getDomain = getDomain$1;
exports.getDomainWithoutSuffix = getDomainWithoutSuffix$1;
exports.getHostname = getHostname;
exports.getPublicSuffix = getPublicSuffix;
exports.getSubdomain = getSubdomain$1;
exports.parse = parse;


},{}],10:[function(require,module,exports){
'use strict';

var fetch = function fetch(message) {
    return new Promise(function (resolve, reject) {
        window.chrome.runtime.sendMessage(message, function (result) {
            return resolve(result);
        });
    });
};

var backgroundMessage = function backgroundMessage(thisModel) {
    // listen for messages from background and
    // // notify subscribers
    window.chrome.runtime.onMessage.addListener(function (req, sender) {
        if (sender.id !== chrome.runtime.id) return;
        if (req.whitelistChanged) thisModel.send('whitelistChanged');
        if (req.updateTabData) thisModel.send('updateTabData');
        if (req.didResetTrackersData) thisModel.send('didResetTrackersData', req.didResetTrackersData);
        if (req.closePopup) window.close();
    });
};

var getBackgroundTabData = function getBackgroundTabData() {
    return new Promise(function (resolve, reject) {
        fetch({ getCurrentTab: true }).then(function (tab) {
            if (tab) {
                fetch({ getTab: tab.id }).then(function (backgroundTabObj) {
                    resolve(backgroundTabObj);
                });
            }
        });
    });
};

var search = function search(url) {
    window.chrome.tabs.create({ url: 'https://duckduckgo.com/?q=' + url + '&bext=' + window.localStorage['os'] + 'cr' });
};

var getExtensionURL = function getExtensionURL(path) {
    return chrome.extension.getURL(path);
};

var openExtensionPage = function openExtensionPage(path) {
    window.chrome.tabs.create({ url: getExtensionURL(path) });
};

var openOptionsPage = function openOptionsPage(browser) {
    if (browser === 'moz') {
        openExtensionPage('/html/options.html');
        window.close();
    } else if (browser === 'chrome') {
        window.chrome.runtime.openOptionsPage();
    }
};

var reloadTab = function reloadTab(id) {
    window.chrome.tabs.reload(id);
};

var closePopup = function closePopup() {
    var w = window.chrome.extension.getViews({ type: 'popup' })[0];
    w.close();
};

module.exports = {
    fetch: fetch,
    reloadTab: reloadTab,
    closePopup: closePopup,
    backgroundMessage: backgroundMessage,
    getBackgroundTabData: getBackgroundTabData,
    search: search,
    openOptionsPage: openOptionsPage,
    openExtensionPage: openExtensionPage,
    getExtensionURL: getExtensionURL
};

},{}],11:[function(require,module,exports){
'use strict';

var Parent = window.DDG.base.Model;
var browserUIWrapper = require('./../base/chrome-ui-wrapper.es6.js');

/**
 * Background messaging is done via two methods:
 *
 * 1. Passive messages from background -> backgroundMessage model -> subscribing model
 *
 *  The background sends these messages using chrome.runtime.sendMessage({'name': 'value'})
 *  The backgroundMessage model (here) receives the message and forwards the
 *  it to the global event store via model.send(msg)
 *  Other modules that are subscribed to state changes in backgroundMessage are notified
 *
 * 2. Two-way messaging using this.model.fetch() as a passthrough
 *
 *  Each model can use a fetch method to send and receive a response from the background.
 *  Ex: this.model.fetch({'name': 'value'}).then((response) => console.log(response))
 *  Listeners must be registered in the background to respond to messages with this 'name'.
 *
 *  The common fetch method is defined in base/model.es6.js
 */
function BackgroundMessage(attrs) {
    Parent.call(this, attrs);
    var thisModel = this;
    browserUIWrapper.backgroundMessage(thisModel);
}

BackgroundMessage.prototype = window.$.extend({}, Parent.prototype, {
    modelName: 'backgroundMessage'
});

module.exports = BackgroundMessage;

},{"./../base/chrome-ui-wrapper.es6.js":10}],12:[function(require,module,exports){
'use strict';

var Parent = window.DDG.base.Model;

function PrivacyOptions(attrs) {
    // set some default values for the toggle switches in the template
    attrs.trackerBlockingEnabled = true;
    attrs.httpsEverywhereEnabled = true;
    attrs.embeddedTweetsEnabled = false;

    Parent.call(this, attrs);
}

PrivacyOptions.prototype = window.$.extend({}, Parent.prototype, {

    modelName: 'privacyOptions',

    toggle: function toggle(k) {
        if (this.hasOwnProperty(k)) {
            this[k] = !this[k];
            console.log('PrivacyOptions model toggle ' + k + ' is now ' + this[k]);
            this.fetch({ updateSetting: { name: k, value: this[k] } });
        }
    },

    getSettings: function getSettings() {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.fetch({ getSetting: 'all' }).then(function (settings) {
                self.trackerBlockingEnabled = settings['trackerBlockingEnabled'];
                self.httpsEverywhereEnabled = settings['httpsEverywhereEnabled'];
                self.embeddedTweetsEnabled = settings['embeddedTweetsEnabled'];

                resolve();
            });
        });
    }
});

module.exports = PrivacyOptions;

},{}],13:[function(require,module,exports){
'use strict';

var Parent = window.DDG.base.Model;
var tldts = require('tldts');

function Whitelist(attrs) {
    attrs.list = {};
    Parent.call(this, attrs);

    this.setWhitelistFromSettings();
}

Whitelist.prototype = window.$.extend({}, Parent.prototype, {

    modelName: 'whitelist',

    removeDomain: function removeDomain(itemIndex) {
        var domain = this.list[itemIndex];
        console.log('whitelist: remove ' + domain);

        this.fetch({
            'whitelisted': {
                list: 'whitelisted',
                domain: domain,
                value: false
            }
        });
        // Remove domain whitelist opt-in status, if present
        this.fetch({
            'whitelistOptIn': {
                list: 'whitelistOptIn',
                domain: domain,
                value: false
            }
        });

        // Update list
        // use splice() so it reindexes the array
        this.list.splice(itemIndex, 1);
    },


    addDomain: function addDomain(url) {
        // We only whitelist domains, not full URLs:
        // - use getDomain, it will return null if the URL is invalid
        // - prefix with getSubDomain, which returns an empty string if none is found
        // But first, strip the 'www.' part, otherwise getSubDomain will include it
        // and whitelisting won't work for that site
        url = url ? url.replace('www.', '') : '';
        var localDomain = url.match(/^localhost(:[0-9]+)?$/i) ? 'localhost' : null;
        var subDomain = tldts.getSubdomain(url);
        var domain = tldts.getDomain(url) || localDomain;
        if (domain) {
            var domainToWhitelist = subDomain ? subDomain + '.' + domain : domain;
            console.log('whitelist: add ' + domainToWhitelist);

            this.fetch({
                'whitelisted': {
                    list: 'whitelisted',
                    domain: domainToWhitelist,
                    value: true
                }
            });

            this.setWhitelistFromSettings();
        }

        return domain;
    },

    setWhitelistFromSettings: function setWhitelistFromSettings() {
        var self = this;
        this.fetch({ getSetting: { name: 'whitelisted' } }).then(function (whitelist) {
            whitelist = whitelist || {};
            var wlist = Object.keys(whitelist);
            wlist.sort();

            // Publish whitelist change notification via the store
            // used to know when to rerender the view
            self.set('list', wlist);
        });
    }
});

module.exports = Whitelist;

},{"tldts":9}],14:[function(require,module,exports){
'use strict';

module.exports = {
    setBrowserClassOnBodyTag: function setBrowserClassOnBodyTag() {
        window.chrome.runtime.sendMessage({ 'getBrowser': true }, function (browser) {
            var browserClass = 'is-browser--' + browser;
            window.$('html').addClass(browserClass);
            window.$('body').addClass(browserClass);
        });
    }
};

},{}],15:[function(require,module,exports){
'use strict';

module.exports = {
    setBrowserClassOnBodyTag: require('./chrome-set-browser-class.es6.js'),
    parseQueryString: require('./parse-query-string.es6.js')
};

},{"./chrome-set-browser-class.es6.js":14,"./parse-query-string.es6.js":16}],16:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

module.exports = {
    parseQueryString: function parseQueryString(qs) {
        if (typeof qs !== 'string') {
            throw new Error('tried to parse a non-string query string');
        }

        var parsed = {};

        if (qs[0] === '?') {
            qs = qs.substr(1);
        }

        var parts = qs.split('&');

        parts.forEach(function (part) {
            var _part$split = part.split('='),
                _part$split2 = _slicedToArray(_part$split, 2),
                key = _part$split2[0],
                val = _part$split2[1];

            if (key && val) {
                parsed[key] = val;
            }
        });

        return parsed;
    }
};

},{}],17:[function(require,module,exports){
'use strict';

var Parent = window.DDG.base.Page;
var mixins = require('./mixins/index.es6.js');
var PrivacyOptionsView = require('./../views/privacy-options.es6.js');
var PrivacyOptionsModel = require('./../models/privacy-options.es6.js');
var privacyOptionsTemplate = require('./../templates/privacy-options.es6.js');
var WhitelistView = require('./../views/whitelist.es6.js');
var WhitelistModel = require('./../models/whitelist.es6.js');
var whitelistTemplate = require('./../templates/whitelist.es6.js');
var BackgroundMessageModel = require('./../models/background-message.es6.js');
var browserUIWrapper = require('./../base/chrome-ui-wrapper.es6.js');

function Options(ops) {
    Parent.call(this, ops);
}

Options.prototype = window.$.extend({}, Parent.prototype, mixins.setBrowserClassOnBodyTag, {

    pageName: 'options',

    ready: function ready() {
        var $parent = window.$('#options-content');
        Parent.prototype.ready.call(this);

        this.setBrowserClassOnBodyTag();

        window.$('.js-feedback-link').click(this._onFeedbackClick.bind(this));
        window.$('.js-report-site-link').click(this._onReportSiteClick.bind(this));

        this.views.options = new PrivacyOptionsView({
            pageView: this,
            model: new PrivacyOptionsModel({}),
            appendTo: $parent,
            template: privacyOptionsTemplate
        });

        this.views.whitelist = new WhitelistView({
            pageView: this,
            model: new WhitelistModel({}),
            appendTo: $parent,
            template: whitelistTemplate
        });

        this.message = new BackgroundMessageModel({});
    },

    _onFeedbackClick: function _onFeedbackClick(e) {
        e.preventDefault();

        browserUIWrapper.openExtensionPage('/html/feedback.html');
    },

    _onReportSiteClick: function _onReportSiteClick(e) {
        e.preventDefault();

        browserUIWrapper.openExtensionPage('/html/feedback.html?broken=1');
    }
});

// kickoff!
window.DDG = window.DDG || {};
window.DDG.page = new Options();

},{"./../base/chrome-ui-wrapper.es6.js":10,"./../models/background-message.es6.js":11,"./../models/privacy-options.es6.js":12,"./../models/whitelist.es6.js":13,"./../templates/privacy-options.es6.js":18,"./../templates/whitelist.es6.js":21,"./../views/privacy-options.es6.js":22,"./../views/whitelist.es6.js":23,"./mixins/index.es6.js":15}],18:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['<section class="options-content__privacy divider-bottom">\n    <h2 class="menu-title">Options</h2>\n    <ul class="default-list">\n        <li>\n            Show Embedded Tweets\n            ', '\n        </li>\n    </ul>\n</section>'], ['<section class="options-content__privacy divider-bottom">\n    <h2 class="menu-title">Options</h2>\n    <ul class="default-list">\n        <li>\n            Show Embedded Tweets\n            ', '\n        </li>\n    </ul>\n</section>']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var bel = require('bel');
var toggleButton = require('./shared/toggle-button.es6.js');

module.exports = function () {
    return bel(_templateObject, toggleButton(this.model.embeddedTweetsEnabled, 'js-options-embedded-tweets-enabled', 'embeddedTweetsEnabled'));
};

},{"./shared/toggle-button.es6.js":19,"bel":1}],19:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n<button class="toggle-button toggle-button--is-active-', ' ', '"\n    data-key="', '"\n    type="button"\n    aria-pressed="', '"\n    >\n    <div class="toggle-button__bg">\n    </div>\n    <div class="toggle-button__knob"></div>\n</button>'], ['\n<button class="toggle-button toggle-button--is-active-', ' ', '"\n    data-key="', '"\n    type="button"\n    aria-pressed="', '"\n    >\n    <div class="toggle-button__bg">\n    </div>\n    <div class="toggle-button__knob"></div>\n</button>']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var bel = require('bel');

module.exports = function (isActiveBoolean, klass, dataKey) {
    // make `klass` and `dataKey` optional:
    klass = klass || '';
    dataKey = dataKey || '';

    return bel(_templateObject, isActiveBoolean, klass, dataKey, isActiveBoolean ? 'true' : 'false');
};

},{"bel":1}],20:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['', ''], ['', '']),
    _templateObject2 = _taggedTemplateLiteral(['\n<li class="js-whitelist-list-item">\n    <a class="link-secondary" href="https://', '">', '</a>\n    <button class="remove pull-right js-whitelist-remove" data-item="', '">\xD7</button>\n</li>'], ['\n<li class="js-whitelist-list-item">\n    <a class="link-secondary" href="https://', '">', '</a>\n    <button class="remove pull-right js-whitelist-remove" data-item="', '">\xD7</button>\n</li>']),
    _templateObject3 = _taggedTemplateLiteral(['<li>No whitelisted sites.</li>'], ['<li>No whitelisted sites.</li>']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var bel = require('bel');

module.exports = function (list) {
    if (list.length > 0) {
        var i = 0;
        return bel(_templateObject, list.map(function (dom) {
            return bel(_templateObject2, dom, dom, i++);
        }));
    }
    return bel(_templateObject3);
};

},{"bel":1}],21:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['<section class="options-content__whitelist">\n    <h2 class="menu-title">Whitelisted Sites</h2>\n    <p class="menu-paragraph">These sites will not be enhanced by Privacy Protection</p>\n    <ul class="default-list js-whitelist-container">\n        ', '\n    </ul>\n    ', '\n</section>'], ['<section class="options-content__whitelist">\n    <h2 class="menu-title">Whitelisted Sites</h2>\n    <p class="menu-paragraph">These sites will not be enhanced by Privacy Protection</p>\n    <ul class="default-list js-whitelist-container">\n        ', '\n    </ul>\n    ', '\n</section>']),
    _templateObject2 = _taggedTemplateLiteral(['<div>\n    <p class="whitelist-show-add js-whitelist-show-add">\n        <a href="javascript:void(0)">Add site to whitelist</a>\n    </p>\n    <input class="is-hidden whitelist-url float-left js-whitelist-url" type="text" placeholder="Enter URL">\n    <div class="is-hidden whitelist-add is-disabled float-right js-whitelist-add">Add to Whitelist</div>\n\n    <div class="is-hidden modal-box js-whitelist-error float-right">\n        <div class="modal-box__popout">\n            <div class="modal-box__popout__body">\n            </div>\n        </div>\n        <div class="modal-box__body">\n            <span class="icon icon__error">\n            </span>\n            <span class="modal__body__text">\n                Invalid URL\n            </span>\n        </div>\n    </div>\n</div>'], ['<div>\n    <p class="whitelist-show-add js-whitelist-show-add">\n        <a href="javascript:void(0)">Add site to whitelist</a>\n    </p>\n    <input class="is-hidden whitelist-url float-left js-whitelist-url" type="text" placeholder="Enter URL">\n    <div class="is-hidden whitelist-add is-disabled float-right js-whitelist-add">Add to Whitelist</div>\n\n    <div class="is-hidden modal-box js-whitelist-error float-right">\n        <div class="modal-box__popout">\n            <div class="modal-box__popout__body">\n            </div>\n        </div>\n        <div class="modal-box__body">\n            <span class="icon icon__error">\n            </span>\n            <span class="modal__body__text">\n                Invalid URL\n            </span>\n        </div>\n    </div>\n</div>']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var bel = require('bel');
var whitelistItems = require('./whitelist-items.es6.js');

module.exports = function () {
    return bel(_templateObject, whitelistItems(this.model.list), addToWhitelist());

    function addToWhitelist() {
        return bel(_templateObject2);
    }
};

},{"./whitelist-items.es6.js":20,"bel":1}],22:[function(require,module,exports){
'use strict';

var Parent = window.DDG.base.View;

function PrivacyOptions(ops) {
    var _this = this;

    this.model = ops.model;
    this.pageView = ops.pageView;
    this.template = ops.template;

    Parent.call(this, ops);

    this.model.getSettings().then(function () {
        _this.rerender();
    });
}

PrivacyOptions.prototype = window.$.extend({}, Parent.prototype, {

    _clickSetting: function _clickSetting(e) {
        var key = window.$(e.target).data('key') || window.$(e.target).parent().data('key');
        console.log('privacyOptions view click for setting "' + key + '"');
        this.model.toggle(key);
        this.rerender();
    },

    setup: function setup() {
        this._cacheElems('.js-options', ['blocktrackers', 'https-everywhere-enabled', 'embedded-tweets-enabled']);
        this.bindEvents([[this.$blocktrackers, 'click', this._clickSetting], [this.$httpseverywhereenabled, 'click', this._clickSetting], [this.$embeddedtweetsenabled, 'click', this._clickSetting]]);
    },

    rerender: function rerender() {
        this.unbindEvents();
        this._rerender();
        this.setup();
    }
});

module.exports = PrivacyOptions;

},{}],23:[function(require,module,exports){
'use strict';

var Parent = window.DDG.base.View;
var isHiddenClass = 'is-hidden';
var isDisabledClass = 'is-disabled';
var isInvalidInputClass = 'is-invalid-input';
var whitelistItemsTemplate = require('./../templates/whitelist-items.es6.js');

function Whitelist(ops) {
    this.model = ops.model;
    this.pageView = ops.pageView;
    this.template = ops.template;

    Parent.call(this, ops);

    // bind events
    this.setup();
}

Whitelist.prototype = window.$.extend({}, Parent.prototype, {

    _removeItem: function _removeItem(e) {
        var itemIndex = window.$(e.target).data('item');
        this.model.removeDomain(itemIndex);

        // No need to rerender the whole view
        this._renderList();
    },

    _addItem: function _addItem(e) {
        if (!this.$add.hasClass(isDisabledClass)) {
            var url = this.$url.val();
            var isValidInput = false;
            if (url) {
                isValidInput = this.model.addDomain(url);
            }

            if (isValidInput) {
                this.rerender();
            } else {
                this._showErrorMessage();
            }
        }
    },

    _showErrorMessage: function _showErrorMessage() {
        this.$add.addClass(isHiddenClass);
        this.$error.removeClass(isHiddenClass);
        this.$url.addClass(isInvalidInputClass);
    },

    _hideErrorMessage: function _hideErrorMessage() {
        this.$add.removeClass(isHiddenClass);
        this.$error.addClass(isHiddenClass);
        this.$url.removeClass(isInvalidInputClass);
    },

    _manageInputChange: function _manageInputChange(e) {
        var isButtonDisabled = this.$add.hasClass(isDisabledClass);

        this._hideErrorMessage();
        if (this.$url.val() && isButtonDisabled) {
            this.$add.removeClass(isDisabledClass);
        } else if (!this.$url.val()) {
            this.$add.addClass(isDisabledClass);
        }

        if (!isButtonDisabled && e.key === 'Enter') {
            // also add to whitelist on enter
            this._addItem();
        }
    },

    _showAddToWhitelistInput: function _showAddToWhitelistInput(e) {
        this.$url.removeClass(isHiddenClass);
        this.$url.focus();
        this.$add.removeClass(isHiddenClass);
        this.$showadd.addClass(isHiddenClass);
        e.preventDefault();
    },

    setup: function setup() {
        this._cacheElems('.js-whitelist', ['remove', 'add', 'error', 'show-add', 'container', 'list-item', 'url']);

        this.bindEvents([[this.$remove, 'click', this._removeItem], [this.$add, 'click', this._addItem], [this.$showadd, 'click', this._showAddToWhitelistInput], [this.$url, 'keyup', this._manageInputChange],
        // listen to changes to the whitelist model
        [this.store.subscribe, 'change:whitelist', this.rerender]]);
    },

    rerender: function rerender() {
        this.unbindEvents();
        this._rerender();
        this.setup();
    },

    _renderList: function _renderList() {
        this.unbindEvents();
        this.$container.html(whitelistItemsTemplate(this.model.list));
        this.setup();
    }
});

module.exports = Whitelist;

},{"./../templates/whitelist-items.es6.js":20}]},{},[17]);
