(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = function (obj) {
  return Array.prototype.slice.call(obj);
};

},{}],2:[function(require,module,exports){
'use strict';

var isDom = require('./isDom.js');
var instanceOf = require('../object/instanceOf.js');
var toArray = require('../array/toArray.js');

module.exports = function (matches) {
	var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};


	if (isDom(matches)) {
		matches = [matches];
	} else if (typeof matches === 'string') {
		matches = document.querySelectorAll(matches);
	}

	if (!instanceOf(matches, Array)) {
		matches = toArray(matches);
	}

	if (callback) {
		matches.forEach(callback);
	}

	return matches;
};

},{"../array/toArray.js":1,"../object/instanceOf.js":7,"./isDom.js":3}],3:[function(require,module,exports){
'use strict';

var instanceOf = require('../object/instanceOf.js');

var _HTMLElement = typeof HTMLElement !== 'undefined' ? HTMLElement : Element;
var _HTMLDocument = typeof HTMLDocument !== 'undefined' ? HTMLDocument : Document;
var _Window = window.constructor;

module.exports = function (test) {
	return instanceOf(test, _HTMLElement) || instanceOf(test, _HTMLDocument) || instanceOf(test, _Window);
};

},{"../object/instanceOf.js":7}],4:[function(require,module,exports){
"use strict";

module.exports = function (e) {
	e.stopPropagation = function () {};
	e.preventDefault = function () {};
	return e;
};

},{}],5:[function(require,module,exports){
'use strict';

// IE does not support `new Event()`
// See https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events for details
var dict = { bubbles: true, cancelable: true };

var createEvent = function createEvent(eventname) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dict;
	return new Event(eventname, options);
};

try {
	createEvent('test');
} catch (e) {
	createEvent = function createEvent(eventname) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dict;

		var e = document.createEvent('Event');
		e.initEvent(eventname, !!options.bubbles, !!options.cancelable);
		return e;
	};
}

module.exports = createEvent;

},{}],6:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// on.js
// Listen to events, this is a wrapper for addEventListener

var each = require('../dom/each.js');
var SEPERATOR = /[\s\,]+/;

// See https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
var supportsPassive = false;
try {
	var opts = Object.defineProperty({}, 'passive', {
		get: function get() {
			supportsPassive = true;
		}
	});
	window.addEventListener('test', null, opts);
} catch (e) {
	// Continue
}

module.exports = function (elements, eventnames, callback) {
	var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;


	if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options.passive && !supportsPassive) {
		// Override the passive mark
		options = false;
	}

	eventnames = eventnames.split(SEPERATOR);
	return each(elements, function (el) {
		return eventnames.forEach(function (eventname) {
			return el.addEventListener(eventname, callback, options);
		});
	});
};

},{"../dom/each.js":2}],7:[function(require,module,exports){
"use strict";

module.exports = function (test, root) {
  return root && test instanceof root;
};

},{}],8:[function(require,module,exports){
"use strict";

// requestAnimationFrame polyfill
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	return setTimeout(callback, 1000 / 60);
};

module.exports = window.requestAnimationFrame.bind(window);

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Setup
// This constructs the canvas object

// Includes


require('tricks/support/requestAnimationFrame');

var _createEvent = require('tricks/events/createEvent');

var _createEvent2 = _interopRequireDefault(_createEvent);

var _createDummyEvent = require('tricks/events/createDummyEvent');

var _createDummyEvent2 = _interopRequireDefault(_createDummyEvent);

var _on = require('tricks/events/on');

var _on2 = _interopRequireDefault(_on);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Constants
var BACKGROUND_HASH = 'background';
var UserEvents = ['click', 'mousedown', 'mouseup', 'mouseover', 'mousemove', 'mouseout', 'frame', 'resize'];
var TouchEvents = ['touchmove', 'touchstart', 'touchend'];

var EVENT_SEPARATOR = /[\s\,]+/;

var Canvas = function () {

	// Construct the Canvas Element
	// @param canvas should be an root element container for this imagery.
	function Canvas(canvas) {
		_classCallCheck(this, Canvas);

		var parent = void 0;

		// events
		this.events = {};

		// browser check
		if (!('getContext' in document.createElement('canvas'))) {
			// browser doesn't support canvas
			return;
		}

		if (!(canvas && canvas instanceof HTMLCanvasElement)) {

			// Set the parent
			parent = canvas;

			// Create the canvas layer
			canvas = document.createElement('canvas');
			canvas.style.backgroundColor = 'white';

			// Not a parent
			if (!parent) {
				// Append to the body
				parent = document.body;
				canvas.style.cssText = 'position:fixed;z-index:-1;top:0;left:0;';
				canvas.setAttribute('tabindex', 0);

				document.documentElement.style.cssText = 'min-height:100%;';
				document.body.style.cssText = 'min-height:100%;';

				// Bind window resize events
				window.addEventListener('resize', this.resize.bind(this));
			}

			// Append this element
			parent.insertBefore(canvas, parent.firstElementChild);

			this.target = canvas;

			this.resize();
		} else {
			this.target = canvas;
			parent = canvas.parentNode;
		}

		this.ctx = canvas.getContext('2d');

		// Set initial save point
		this.ctx.save();

		// Initiate the time
		this._time = 0;
		this._fps = 0;

		// Initiate the draw
		this.draw();

		// Bind events
		(0, _on2.default)(this.target, UserEvents.toString(), this.dispatchEvent.bind(this), { passive: true });

		// Format Touch events
		(0, _on2.default)(this.target, TouchEvents.toString(), this.dispatchTouchEvent.bind(this), { passive: true });

		// In IE user-events aren't propagated to elements which have negative z-Index's
		// Listen to events on the document element and propagate those accordingly
		if (parent === document.body && canvas.style.getPropertyValue('z-index') === '-1') {
			// Bind events
			(0, _on2.default)(document, UserEvents.toString(), this.dispatchEvent.bind(this), { passive: true });

			// Format Touch events
			(0, _on2.default)(document, TouchEvents.toString(), this.dispatchTouchEvent.bind(this), { passive: true });
		}

		// Listen to hashChange events
		{
			// HASH CHANGE DEPTH
			var style = this.target.style;
			var initialZ = style.getPropertyValue('z-index');
			// Listen to changes to the background hash to bring the canvas element to the front
			window.addEventListener('hashchange', hashchange.bind(style, initialZ));

			hashchange.call(style, initialZ);
		}
	}

	// ensure its keeping up.


	_createClass(Canvas, [{
		key: 'resize',
		value: function resize() {
			var parent = this.target.parentNode === document.body ? document.documentElement : this.target.parentNode;
			var height = parent.clientHeight;
			var width = parent.clientWidth;
			var changed = false;

			if (this.width !== width) {
				changed = true;
				this.width = width;
			}
			if (this.height !== height) {
				changed = true;
				this.height = height;
			}

			if (changed) {
				this.target.dispatchEvent((0, _createEvent2.default)('resize'));
			}
		}
	}, {
		key: 'clear',
		value: function clear() {
			this.ctx.clearRect(0, 0, this.target.width, this.target.height);
		}

		// Bring the content of the canvas to the front

	}, {
		key: 'bringToFront',
		value: function bringToFront() {

			// Update the window.location with the hash #background
			window.location.hash = BACKGROUND_HASH;
		}

		// Trigger the draw function

	}, {
		key: 'draw',
		value: function draw() {

			// Increment the number of frames
			this.fps++;

			// Call the frame function in the context of the frame to draw
			this.target.dispatchEvent((0, _createEvent2.default)('frame'));

			// Request another frame
			requestAnimationFrame(this.draw.bind(this));
		}

		// The user has clicked an item on the page

	}, {
		key: 'addEventListener',
		value: function addEventListener(eventnames, handler) {
			var _this = this;

			eventnames.split(EVENT_SEPARATOR).forEach(function (eventname) {
				// Add to the events list
				if (!(eventname in _this.events)) {
					_this.events[eventname] = [];
				}

				_this.events[eventname].push(handler);
			});
		}

		// Dispatch

	}, {
		key: 'dispatchEvent',
		value: function dispatchEvent(e) {

			if (e.type in this.events) {

				var target = e.currentTarget;

				// This was triggered using event delegation, aka in the background
				if (target === document) {

					e = (0, _createDummyEvent2.default)({
						type: e.type,
						target: this.target,
						offsetX: e.pageX || e.offsetX,
						offsetY: e.pageY || e.offsetY
					});
				}

				this.events[e.type].forEach(function (handler) {
					return handler(e);
				});
				e.stopPropagation();
			}
		}

		// Dispatch

	}, {
		key: 'dispatchTouchEvent',
		value: function dispatchTouchEvent(e) {
			// If this was a touch event
			// Determine the offset to the canvas element relative to the item being clicked
			var touch = (e.touches || e.changedTouches)[0];
			if (touch) {
				e.offsetX = Math.abs(touch.pageX || touch.screenX);
				e.offsetY = Math.abs(touch.pageY || touch.screenY);
			}

			this.dispatchEvent(e);
		}
	}, {
		key: 'width',
		get: function get() {
			return this.target.width;
		},
		set: function set(value) {
			this.target.width = value;
			return value;
		}
	}, {
		key: 'height',
		get: function get() {
			return this.target.height;
		},
		set: function set(value) {
			this.target.height = value;
			return value;
		}
	}, {
		key: 'fps',
		get: function get() {
			return this._fps;
		},
		set: function set(value) {

			this._fps = value;

			var now = new Date().getTime();

			if (now - this._time > 1000) {
				// console.log('fps: %d', this._fps);
				this._time = now;
				this._fps = 0;
			}
		}
	}]);

	return Canvas;
}();

exports.default = Canvas;


function hashchange(z) {

	var zIndex = 'z-index';

	if (window.location.hash === '#' + BACKGROUND_HASH) {
		z = 10000;
	}

	if (z !== undefined) {
		// Set the z-Index
		this.setProperty(zIndex, z);
	} else {
		// Remove the z-Index
		this.removeProperty(zIndex);
	}
}

},{"tricks/events/createDummyEvent":4,"tricks/events/createEvent":5,"tricks/events/on":6,"tricks/support/requestAnimationFrame":8}],10:[function(require,module,exports){
'use strict';

var _canvas = require('./classes/canvas');

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = new _canvas2.default();
canvas.addEventListener('mouseover', function () {
	return hover = true;
});
canvas.addEventListener('mouseout', function () {
	return hover = false;
});

var slices = 32;
var pi = Math.PI / 180;
var deg = 360 / slices;
var pallate = ['rgb(255, 140, 0)', 'rgb(255,0,0)', 'rgb(255,255,0)'];

var spin = 0;
var radius = void 0;
var hover = void 0;
var opacity = 0;

canvas.addEventListener('frame', function () {

	var ctx = canvas.ctx;
	var cx = canvas.width / 2,
	    cy = canvas.height / 2;

	// ensure its keeping up.

	radius = Math.max(canvas.width, canvas.height) / 2;

	// Do we need this?
	if (hover || opacity > 0) {

		spin++;

		if (hover && opacity < 1) {
			opacity += 0.1;
		}
		if (!hover && opacity > 0) {
			opacity -= 0.1;
		}

		canvas.target.style.opacity = Math.round(opacity * 10) / 10;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// draw an arc
		for (var i = 0; i < slices; i++) {
			ctx.beginPath();
			ctx.fillStyle = pallate[i % pallate.length];

			// *270 changed to *360
			ctx.arc(radius, radius, radius * 1.5, pi * (i * deg + spin), pi * ((i + 1) * deg + spin), false);
			ctx.lineTo(cx, cy);
			ctx.fill();
			ctx.closePath();
		}
	}
});

},{"./classes/canvas":9}]},{},[10])

//# sourceMappingURL=sunrise.js.map
