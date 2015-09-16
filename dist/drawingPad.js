!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();require("../polyfills/requestAnimationFrame");var BACKGROUND_HASH="background",UserEvents=["click","mousedown","mouseup","mouseover","mousemove","mouseout","touchmove","touchstart","touchend","frame","resize"],Canvas=function(){function Canvas(canvas){var _this=this;_classCallCheck(this,Canvas);var parent;this.events={},"getContext"in document.createElement("canvas")&&(canvas&&canvas instanceof HTMLCanvasElement?this.target=canvas:(parent=canvas,canvas=document.createElement("canvas"),parent||(parent=document.body,canvas.style.cssText="position:fixed;z-index:-1;top:0;left:0;",canvas.setAttribute("tabindex",0),document.documentElement.style.cssText="min-height:100%;",document.body.style.cssText="min-height:100%;",window.addEventListener("resize",this.resize.bind(this))),parent.insertBefore(canvas,parent.firstElementChild),this.target=canvas,this.resize()),this.ctx=canvas.getContext("2d"),this.draw(),UserEvents.forEach(function(eventname){return _this.target.addEventListener(eventname,_this.dispatchEvent.bind(_this))}),!function(){var hashchange=function(){var z=INITIAL_ZINDEX;window.location.hash==="#"+BACKGROUND_HASH&&(z=1e4),void 0!==z?this.target.style.setProperty("z-index",z):this.target.style.removeProperty("z-index")};window.addEventListener("hashchange",hashchange.bind(_this));var INITIAL_ZINDEX=_this.target.style.getPropertyValue("z-index");hashchange.call(_this)}())}return _createClass(Canvas,[{key:"resize",value:function(){var parent=this.target.parentNode===document.body?document.documentElement:this.target.parentNode,height=parent.clientHeight,width=parent.clientWidth,changed=!1;this.width!==width&&(changed=!0,this.width=width),this.height!==height&&(changed=!0,this.height=height),changed&&this.target.dispatchEvent(new Event("resize"))}},{key:"bringToFront",value:function(){window.location.hash=BACKGROUND_HASH}},{key:"draw",value:function(){this.target.dispatchEvent(new Event("frame")),requestAnimationFrame(this.draw.bind(this))}},{key:"addEventListener",value:function(eventname,handler){eventname in this.events||(this.events[eventname]=[]),this.events[eventname].push(handler)}},{key:"dispatchEvent",value:function(e){if(e.type in this.events){if(e.target!==this.target)return;this.events[e.type].forEach(function(handler){return handler(e)})}}},{key:"width",get:function(){return this.target.width},set:function(value){return this.target.width=value}},{key:"height",get:function(){return this.target.height},set:function(value){return this.target.height=value}}]),Canvas}();exports["default"]=Canvas,module.exports=exports["default"]},{"../polyfills/requestAnimationFrame":6}],2:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function intersect(a,b){return!(a.x>b.x+b.w||a.x+a.w<b.x||a.y>b.y+b.h||a.y+a.h<b.y)}function displaced(a,b){return a.x!==b.x||a.y!==b.y||a.w!==b.w||a.h!==b.h}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),UserEvents=["click","mousedown","mouseup","mouseover","mousemove","mouseout","touchmove","touchstart","touchend","frame"],Collection=function(){function Collection(target){_classCallCheck(this,Collection),this.children=[],this.events=[],this.init(target)}return _createClass(Collection,[{key:"init",value:function(target){var _this=this;this.target=target,this.ctx=target.getContext("2d"),UserEvents.forEach(function(eventname){return target.addEventListener(eventname,_this._findAndDispatch.bind(_this))})}},{key:"push",value:function(item){item.dirty=!0,-1===this.children.indexOf(item)&&(item.setup(this),this.children.push(item))}},{key:"prepare",value:function(){var _this2=this;this.children.forEach(function(item){item.dirty&&_this2.prepareChild(item)})}},{key:"prepareChild",value:function(item){var ctx=this.ctx;item.dirty=!0,ctx.clearRect(item.x,item.y,item.w,item.h),displaced(item.past,item)&&ctx.clearRect(item.past.x,item.past.y,item.past.w,item.past.h),this.children.forEach(this._prepareSiblings.bind(this,item))}},{key:"_prepareSiblings",value:function(item,sibling){sibling.dirty||!intersect(sibling,item)&&(item.past?!intersect(sibling,item.past):1)||this.prepareChild(sibling)}},{key:"sort",value:function(){this.children.sort(function(a,b){return a=a.zIndex||0,b=b.zIndex||0,+(a>b)||-(b>a)})}},{key:"draw",value:function(){var ctx=this.ctx;this.children.forEach(function(item){item.frame(ctx),item.dirty&&item.visible&&item.draw(ctx)}),this.children.filter(function(item){return item.dirty}).forEach(function(item){return item.dirty=!1})}},{key:"elementFromPoint",value:function(x,y){var target,obj={x:x,y:y,w:1,h:1};return this.children.forEach(function(item){item.visible&&item.w&&item.h&&item.pointerEvents&&intersect(obj,item)&&(target=item)}),target}},{key:"addEventListener",value:function(eventname,handler){eventname in this.events||(this.events[eventname]=[]),this.events[eventname].push(handler)}},{key:"dispatchEvent",value:function(e){e.type in this.events&&this.events[e.type].forEach(function(handler){return handler(e)})}},{key:"_findAndDispatch",value:function(e){if(e instanceof MouseEvent||e instanceof TouchEvent){var obj={x:e.offsetX,y:e.offsetY,w:1,h:1};this.children.forEach(function(item){item.visible&&item.w&&item.h&&item.pointerEvents&&intersect(obj,item)&&item.dispatchEvent(e)})}}},{key:"length",get:function(){return this.children.length},set:function(v){return this.children.length=v}}]),Collection}();exports["default"]=Collection,module.exports=exports["default"]},{}],3:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Shape=function(){function Shape(){_classCallCheck(this,Shape),["x","y","w","h","dx","dy","visible","opacity"].forEach(this._watchProperty.bind(this)),this._dirty=!0,this.events=[],this.pointerEvents=!0,this.past={},this.position.apply(this,arguments),this.visible=!0,this.opacity=1}return _createClass(Shape,[{key:"position",value:function(){var x=arguments.length<=0||void 0===arguments[0]?0:arguments[0],y=arguments.length<=1||void 0===arguments[1]?0:arguments[1],w=arguments.length<=2||void 0===arguments[2]?0:arguments[2],h=arguments.length<=3||void 0===arguments[3]?0:arguments[3];this.past.x=this.x,this.past.y=this.y,this.past.w=this.w,this.past.h=this.h,this.x=x,this.y=y,this.w=w,this.h=h}},{key:"frame",value:function(){}},{key:"draw",value:function(){}},{key:"setup",value:function(){}},{key:"addEventListener",value:function(eventName,callback){eventName in this.events||(this.events[eventName]=[]),this.events[eventName].push(callback)}},{key:"dispatchEvent",value:function(e){e.type in this.events&&this.events[e.type].forEach(function(fn){return fn(e)})}},{key:"_watchProperty",value:function(propName){Object.defineProperty(this,propName,{get:this._getter.bind(this,propName),set:this._setter.bind(this,propName)})}},{key:"_getter",value:function(propName){return this["_"+propName]}},{key:"_setter",value:function(propName,v){this["_"+propName]!==v&&(this.dirty=!0,this["_"+propName]=v)}},{key:"dirty",set:function(v){!this._dirty&&v?(this._dirty=v,this.dispatchEvent(new Event("dirty"))):v||(this._dirty=!1)},get:function(){return this._dirty}}]),Shape}();exports["default"]=Shape,module.exports=exports["default"]},{}],4:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i["return"]&&_i["return"]()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return sliceIterator(arr,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function(_x,_x2,_x3){for(var _again=!0;_again;){var object=_x,property=_x2,receiver=_x3;desc=parent=getter=void 0,_again=!1,null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0!==desc){if("value"in desc)return desc.value;var getter=desc.get;return void 0===getter?void 0:getter.call(receiver)}var parent=Object.getPrototypeOf(object);if(null===parent)return void 0;_x=parent,_x2=property,_x3=receiver,_again=!0}},_shape=require("./shape"),_shape2=_interopRequireDefault(_shape),Text=function(_Shape){function Text(text){_classCallCheck(this,Text),_get(Object.getPrototypeOf(Text.prototype),"constructor",this).call(this),["text","shadowBlur","shadowColor","fillStyle","strokeStyle","textAlign","textBaseline","lineWidth"].forEach(this._watchProperty.bind(this)),this.text=text||"",this.shadowColor="black",this.fillStyle="black",this.strokeStyle="white",this.textAlign="left",this.textBaseline="top",this.lineWidth=0,this.align="left top",this.fontSize=30}return _inherits(Text,_Shape),_createClass(Text,[{key:"calc",value:function(canvas){var _align$split=this.align.split(" "),_align$split2=_slicedToArray(_align$split,2);this.textAlign=_align$split2[0],this.textBaseline=_align$split2[1];var ctx=canvas.ctx,fontSize=this.fontSize;this.lines=this.text.split("\n");var _width=0,default_text=this.lines[0];for(this.lines.forEach(function(line){var _w=ctx.measureText(line).width;_w>_width&&(_width=_w,default_text=line)}),ctx.save(),ctx.shadowColor="black",ctx.fillStyle="black",ctx.strokeStyle="rgba(255,255,255,0.5)",ctx.font=fontSize+"px Arial bold";ctx.measureText(default_text).width>canvas.width;)fontSize*=.9,fontSize=Math.round(fontSize),ctx.font=fontSize+"px Arial bold";switch(this.shadowBlur=ctx.shadowBlur=Math.round(fontSize/10),this.fontSize=fontSize,this.font=ctx.font,this.w=ctx.measureText(default_text).width+2*this.shadowBlur,this.h=(fontSize+2*this.shadowBlur)*this.lines.length,ctx.restore(),this.lineWidth=Math.floor(fontSize/30),this.textAlign){case"center":case"middle":this.textAlign="center",this.x=canvas.width/2-this.w/2;break;case"left":this.x=0;break;case"right":this.x=canvas.width-this.w}switch(this.textBaseline){case"center":case"middle":this.textBaseline="middle",this.y=canvas.height/2-this.h/2;break;case"top":this.y=0;break;case"bottom":this.y=canvas.height-this.h}this.textAlign="left",this.textBaseline="top",ctx.restore()}},{key:"draw",value:function(ctx){var _this=this;ctx.save(),ctx.globalAlpha=this.opacity,ctx.shadowColor=this.shadowColor,this.shadowBlur&&(ctx.shadowBlur=this.shadowBlur),ctx.fillStyle=this.fillStyle,ctx.strokeStyle=this.strokeStyle,ctx.font=this.font,ctx.textAlign=this.textAlign,ctx.textBaseline=this.textBaseline,ctx.lineWidth=this.lineWidth,this.lineWidth&&(ctx.lineWidth=this.lineWidth),this.lines=this.text.toString().split("\n");var len=this.lines.length;this.lines.forEach(function(item,index){var y=_this.y+(_this.h?index*(_this.h/len):0);ctx.fillText(item,_this.x,y),_this.strokeStyle&&ctx.strokeText(item,_this.x,y)}),ctx.restore()}}]),Text}(_shape2["default"]);exports["default"]=Text,module.exports=exports["default"]},{"./shape":3}],5:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}function hideText(){brush&&(text.opacity>.1?text.opacity*=.9:text.opacity=0)}function pointStart(e){brush=new Brush(e.offsetX,e.offsetY),collection.push(brush),mousedown=!0}function pointEnd(){brush=null,mousedown=!1}function move(e){brush&&brush.push(e.offsetX,e.offsetY)}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function(_x,_x2,_x3){for(var _again=!0;_again;){var object=_x,property=_x2,receiver=_x3;desc=parent=getter=void 0,_again=!1,null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0!==desc){if("value"in desc)return desc.value;var getter=desc.get;return void 0===getter?void 0:getter.call(receiver)}var parent=Object.getPrototypeOf(object);if(null===parent)return void 0;_x=parent,_x2=property,_x3=receiver,_again=!0}},_classesCanvas=require("./classes/canvas"),_classesCanvas2=_interopRequireDefault(_classesCanvas),_classesCollection=require("./classes/collection"),_classesCollection2=_interopRequireDefault(_classesCollection),_classesShape=require("./classes/shape"),_classesShape2=_interopRequireDefault(_classesShape),_classesText=require("./classes/text"),_classesText2=_interopRequireDefault(_classesText),Brush=function(_Shape){function Brush(){_classCallCheck(this,Brush);for(var _len=arguments.length,args=Array(_len),_key=0;_len>_key;_key++)args[_key]=arguments[_key];_get(Object.getPrototypeOf(Brush.prototype),"constructor",this).apply(this,args),this.points=[],this.push.apply(this,args)}return _inherits(Brush,_Shape),_createClass(Brush,[{key:"push",value:function(x,y){this.dirty=!0,this.points.push([x,y]),x<this.x?(this.w=this.w+(this.x-x),this.x=x):x>this.x+this.w&&(this.w=x-this.x),y<this.y?(this.h=this.h+(this.y-y),this.y=y):y>this.y+this.h&&(this.h=y-this.y)}},{key:"draw",value:function(ctx){ctx.beginPath();var point=this.points[0];ctx.moveTo(point[0],point[1]),this.points.forEach(function(point){return ctx.lineTo(point[0],point[1])}),ctx.stroke()}}]),Brush}(_classesShape2["default"]),canvas=new _classesCanvas2["default"],collection=new _classesCollection2["default"](canvas.target),text=new _classesText2["default"];text.text="Drawing Pad",text.align="center center",text.fontSize=150,text.fillStyle="rgba(0,0,0,0.03)",text.strokeStyle="rgba(255,255,255,0.03)",text.calc(canvas),canvas.addEventListener("frame",function(e){hideText(),collection.prepare(),collection.draw()}),collection.push(text);var brush=null,mousedown=!1;canvas.addEventListener("touchstart",pointStart),canvas.addEventListener("touchend",pointEnd),canvas.addEventListener("touchmove",move),canvas.addEventListener("mousedown",pointStart),canvas.addEventListener("mouseup",pointEnd),canvas.addEventListener("mousemove",move),canvas.addEventListener("resize",function(){return canvas.clean(!0)})},{"./classes/canvas":1,"./classes/collection":2,"./classes/shape":3,"./classes/text":4}],6:[function(require,module,exports){"use strict";window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1e3/60)}}()},{}]},{},[5]);
//# sourceMappingURL=../dist/drawingPad.js.map