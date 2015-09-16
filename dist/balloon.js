!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}function setup(){var n=100,W=canvas.width,H=canvas.height,A=H*W,a=A/n,w=Math.sqrt(a),h=w,nx=Math.floor(W/w)||1,ny=Math.floor(H/h)||1;w=W/nx,h=H/ny;var r=Math.max(w,h)/2;max_radius=1.5*r;for(var i=0;nx>i;i++){r=(i+1)/nx*w/2;for(var j=0;ny>j;j++){var cx=parseInt(i*w+w/2,10),cy=parseInt(j*h+h/2,10),balloon=balloons[i*ny+j];balloon?(collection.push(balloon),balloon.cx=cx,balloon.cy=cy,balloon.r=r,balloon.ascending=!0):(balloon=new Balloon(cx,cy,r),collection.push(balloon),balloons.push(balloon))}}collection.length=nx*ny}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function(_x,_x2,_x3){for(var _again=!0;_again;){var object=_x,property=_x2,receiver=_x3;desc=parent=getter=void 0,_again=!1,null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0!==desc){if("value"in desc)return desc.value;var getter=desc.get;return void 0===getter?void 0:getter.call(receiver)}var parent=Object.getPrototypeOf(object);if(null===parent)return void 0;_x=parent,_x2=property,_x3=receiver,_again=!0}},_classesCanvas=require("./classes/canvas"),_classesCanvas2=_interopRequireDefault(_classesCanvas),_classesCollection=require("./classes/collection"),_classesCollection2=_interopRequireDefault(_classesCollection),_classesCircle=require("./classes/circle"),_classesCircle2=_interopRequireDefault(_classesCircle),Balloon=function(_Circle){function Balloon(){_classCallCheck(this,Balloon);for(var _len=arguments.length,args=Array(_len),_key=0;_len>_key;_key++)args[_key]=arguments[_key];_get(Object.getPrototypeOf(Balloon.prototype),"constructor",this).apply(this,args),this.ascending=!0}return _inherits(Balloon,_Circle),_createClass(Balloon,[{key:"frame",value:function(canvas){this.r<=0?this.ascending=!0:this.r>=max_radius&&(this.ascending=!1),this.r+=(this.ascending?1:-1)*(max_radius/200)}}]),Balloon}(_classesCircle2["default"]),canvas=new _classesCanvas2["default"],collection=new _classesCollection2["default"](canvas.target);canvas.addEventListener("resize",setup),canvas.addEventListener("frame",function(){canvas.ctx.clearRect(0,0,canvas.width,canvas.height),collection.draw()});var max_radius,balloons=[];setup()},{"./classes/canvas":2,"./classes/circle":3,"./classes/collection":4}],2:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();require("../polyfills/requestAnimationFrame");var BACKGROUND_HASH="background",UserEvents=["click","mousedown","mouseup","mouseover","mousemove","mouseout","frame","resize"],TouchEvents=["touchmove","touchstart","touchend"],Canvas=function(){function Canvas(canvas){var _this=this;_classCallCheck(this,Canvas);var parent;this.events={},"getContext"in document.createElement("canvas")&&(canvas&&canvas instanceof HTMLCanvasElement?this.target=canvas:(parent=canvas,canvas=document.createElement("canvas"),parent||(parent=document.body,canvas.style.cssText="position:fixed;z-index:-1;top:0;left:0;",canvas.setAttribute("tabindex",0),document.documentElement.style.cssText="min-height:100%;",document.body.style.cssText="min-height:100%;",window.addEventListener("resize",this.resize.bind(this))),parent.insertBefore(canvas,parent.firstElementChild),this.target=canvas,this.resize()),this.ctx=canvas.getContext("2d"),this.draw(),UserEvents.forEach(function(eventname){return _this.target.addEventListener(eventname,_this.dispatchEvent.bind(_this))}),TouchEvents.forEach(function(eventname){return _this.target.addEventListener(eventname,_this.dispatchTouchEvent.bind(_this))}),!function(){var hashchange=function(){var z=INITIAL_ZINDEX;window.location.hash==="#"+BACKGROUND_HASH&&(z=1e4),void 0!==z?this.target.style.setProperty("z-index",z):this.target.style.removeProperty("z-index")};window.addEventListener("hashchange",hashchange.bind(_this));var INITIAL_ZINDEX=_this.target.style.getPropertyValue("z-index");hashchange.call(_this)}())}return _createClass(Canvas,[{key:"resize",value:function(){var parent=this.target.parentNode===document.body?document.documentElement:this.target.parentNode,height=parent.clientHeight,width=parent.clientWidth,changed=!1;this.width!==width&&(changed=!0,this.width=width),this.height!==height&&(changed=!0,this.height=height),changed&&this.target.dispatchEvent(new Event("resize"))}},{key:"bringToFront",value:function(){window.location.hash=BACKGROUND_HASH}},{key:"draw",value:function(){this.target.dispatchEvent(new Event("frame")),requestAnimationFrame(this.draw.bind(this))}},{key:"addEventListener",value:function(eventname,handler){eventname in this.events||(this.events[eventname]=[]),this.events[eventname].push(handler)}},{key:"dispatchEvent",value:function(e){if(e.type in this.events){if(e.target!==this.target)return;this.events[e.type].forEach(function(handler){return handler(e)}),e.preventDefault(),e.stopPropagation()}}},{key:"dispatchTouchEvent",value:function(e){var touch=(e.touches||e.changedTouches)[0];touch&&(e.offsetX=Math.abs(touch.screenX),e.offsetY=Math.abs(touch.screenY)),this.dispatchEvent(e)}},{key:"width",get:function(){return this.target.width},set:function(value){return this.target.width=value}},{key:"height",get:function(){return this.target.height},set:function(value){return this.target.height=value}}]),Canvas}();exports["default"]=Canvas,module.exports=exports["default"]},{"../polyfills/requestAnimationFrame":6}],3:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}function watchCircleProperties(propName){Object.defineProperty(this,propName,{get:_getter.bind(this,propName),set:_setter.bind(this,propName)})}function _getter(propName){return this["_"+propName]}function _setter(propName,v){this["_"+propName]!==v&&(this["_"+propName]=v,this.x=this.cx-this.r,this.y=this.cy-this.r,this.w=this.r,this.h=this.r)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function(_x,_x2,_x3){for(var _again=!0;_again;){var object=_x,property=_x2,receiver=_x3;desc=parent=getter=void 0,_again=!1,null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0!==desc){if("value"in desc)return desc.value;var getter=desc.get;return void 0===getter?void 0:getter.call(receiver)}var parent=Object.getPrototypeOf(object);if(null===parent)return void 0;_x=parent,_x2=property,_x3=receiver,_again=!0}},_shape=require("./shape"),_shape2=_interopRequireDefault(_shape),Circle=function(_Shape){function Circle(cx,cy,r){_classCallCheck(this,Circle),_get(Object.getPrototypeOf(Circle.prototype),"constructor",this).call(this,cx-r,cy-r,r,r),["fillStyle"].forEach(this._watchProperty.bind(this)),["cx","cy","r"].forEach(watchCircleProperties.bind(this)),this.cx=cx,this.cy=cy,this.r=r,this.type="circle"}return _inherits(Circle,_Shape),_createClass(Circle,[{key:"draw",value:function(ctx){return this.r<=0?void(this.r=0):(ctx.fillStyle=this.fillStyle,ctx.beginPath(),ctx.arc(this.cx,this.cy,this.r,0,2*Math.PI,!1),void ctx.fill())}}]),Circle}(_shape2["default"]);exports["default"]=Circle,module.exports=exports["default"]},{"./shape":5}],4:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function intersect(a,b){return!(a.x>b.x+b.w||a.x+a.w<b.x||a.y>b.y+b.h||a.y+a.h<b.y)}function displaced(a,b){return a.x!==b.x||a.y!==b.y||a.w!==b.w||a.h!==b.h}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),UserEvents=["click","mousedown","mouseup","mouseover","mousemove","mouseout","touchmove","touchstart","touchend","frame"],Collection=function(){function Collection(target){_classCallCheck(this,Collection),this.children=[],this.events=[],this.init(target)}return _createClass(Collection,[{key:"init",value:function(target){var _this=this;this.target=target,this.ctx=target.getContext("2d"),UserEvents.forEach(function(eventname){return target.addEventListener(eventname,_this._findAndDispatch.bind(_this))})}},{key:"push",value:function(item){item.dirty=!0,-1===this.children.indexOf(item)&&(item.setup(this),this.children.push(item))}},{key:"prepare",value:function(){var _this2=this;this.children.forEach(function(item){item.dirty&&_this2.prepareChild(item)})}},{key:"prepareChild",value:function(item){var ctx=this.ctx;item.dirty=!0,ctx.clearRect(item.x,item.y,item.w,item.h),displaced(item.past,item)&&ctx.clearRect(item.past.x,item.past.y,item.past.w,item.past.h),this.children.forEach(this._prepareSiblings.bind(this,item))}},{key:"_prepareSiblings",value:function(item,sibling){sibling.dirty||!intersect(sibling,item)&&(item.past?!intersect(sibling,item.past):1)||this.prepareChild(sibling)}},{key:"sort",value:function(){this.children.sort(function(a,b){return a=a.zIndex||0,b=b.zIndex||0,+(a>b)||-(b>a)})}},{key:"draw",value:function(){var ctx=this.ctx;this.children.forEach(function(item){item.frame(ctx),item.dirty&&item.visible&&item.draw(ctx)}),this.children.filter(function(item){return item.dirty}).forEach(function(item){return item.dirty=!1})}},{key:"elementFromPoint",value:function(x,y){var target,obj={x:x,y:y,w:1,h:1};return this.children.forEach(function(item){item.visible&&item.w&&item.h&&item.pointerEvents&&intersect(obj,item)&&(target=item)}),target}},{key:"addEventListener",value:function(eventname,handler){eventname in this.events||(this.events[eventname]=[]),this.events[eventname].push(handler)}},{key:"dispatchEvent",value:function(e){e.type in this.events&&this.events[e.type].forEach(function(handler){return handler(e)})}},{key:"_findAndDispatch",value:function(e){if(e instanceof MouseEvent||e instanceof TouchEvent){var obj={x:e.offsetX,y:e.offsetY,w:1,h:1};this.children.forEach(function(item){item.visible&&item.w&&item.h&&item.pointerEvents&&intersect(obj,item)&&item.dispatchEvent(e)})}}},{key:"length",get:function(){return this.children.length},set:function(v){return this.children.length=v}}]),Collection}();exports["default"]=Collection,module.exports=exports["default"]},{}],5:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Shape=function(){function Shape(){_classCallCheck(this,Shape),["x","y","w","h","dx","dy","visible","opacity"].forEach(this._watchProperty.bind(this)),this._dirty=!0,this.events=[],this.pointerEvents=!0,this.past={},this.position.apply(this,arguments),this.visible=!0,this.opacity=1}return _createClass(Shape,[{key:"position",value:function(){var x=arguments.length<=0||void 0===arguments[0]?0:arguments[0],y=arguments.length<=1||void 0===arguments[1]?0:arguments[1],w=arguments.length<=2||void 0===arguments[2]?0:arguments[2],h=arguments.length<=3||void 0===arguments[3]?0:arguments[3];this.past.x=this.x,this.past.y=this.y,this.past.w=this.w,this.past.h=this.h,this.x=x,this.y=y,this.w=w,this.h=h}},{key:"frame",value:function(){}},{key:"draw",value:function(){}},{key:"setup",value:function(){}},{key:"addEventListener",value:function(eventName,callback){eventName in this.events||(this.events[eventName]=[]),this.events[eventName].push(callback)}},{key:"dispatchEvent",value:function(e){e.type in this.events&&this.events[e.type].forEach(function(fn){return fn(e)})}},{key:"_watchProperty",value:function(propName){Object.defineProperty(this,propName,{get:this._getter.bind(this,propName),set:this._setter.bind(this,propName)})}},{key:"_getter",value:function(propName){return this["_"+propName]}},{key:"_setter",value:function(propName,v){this["_"+propName]!==v&&(this.dirty=!0,this["_"+propName]=v)}},{key:"dirty",set:function(v){!this._dirty&&v?(this._dirty=v,this.dispatchEvent(new Event("dirty"))):v||(this._dirty=!1)},get:function(){return this._dirty}}]),Shape}();exports["default"]=Shape,module.exports=exports["default"]},{}],6:[function(require,module,exports){"use strict";window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1e3/60)}}()},{}]},{},[1]);
//# sourceMappingURL=../dist/balloon.js.map