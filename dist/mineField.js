!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function intersect(a,b){return!(a.x>b.x+b.w||a.x+a.w<b.x||a.y>b.y+b.h||a.y+a.h<b.y)}function displaced(a,b){return a.x!==b.x||a.y!==b.y||a.w!==b.w||a.h!==b.h}function CanvasListeners(events){var self=this;events.forEach(function(eventname){self.canvas.addEventListener(eventname,function(_e){if(_e.target===self.canvas){var e=new CanvasEvent(_e),obj={x:e.clientX,y:e.clientY,w:1,h:1};self.collection.forEach(function(item){if(item.visible&&item.w&&item.h){var bool=intersect(obj,item);bool&&(e.target=item,e.type in item.events&&item.dispatchEvent(e))}}),self.dispatchEvent(e)}})})}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();require("../polyfills/requestAnimationFrame");var Canvas=function(){function Canvas(canvas){_classCallCheck(this,Canvas);var parent;this.events={},this.collection=[],"getContext"in document.createElement("canvas")&&(canvas&&canvas instanceof HTMLCanvasElement?this.canvas=canvas:(parent=canvas,canvas=document.createElement("canvas"),parent||(parent=document.body,canvas.style.cssText="position:fixed;z-index:-1;top:0;left:0;",canvas.setAttribute("tabindex",0),document.documentElement.style.cssText="min-height:100%;",window.addEventListener("resize",this.resize.bind(this))),parent.insertBefore(canvas,parent.firstElementChild),this.canvas=canvas,this.resize()),this.ctx=canvas.getContext("2d"),this.width=canvas.width,this.height=canvas.height,this.draw(),CanvasListeners.call(this,["click","mousedown","mouseup","mouseover","mousemove","mouseout","touchmove","touchstart","touchend"]))}return _createClass(Canvas,[{key:"resize",value:function(){var parent=this.canvas.parentNode===document.body?document.documentElement:this.canvas.parentNode,height=parent.offsetHeight,width=parent.offsetWidth,changed=!1;this.width!==width&&(changed=!0,this.canvas.width=width,this.width=width),this.height!==height&&(changed=!0,this.canvas.height=height,this.height=height),changed&&this.dispatchEvent({type:"resize"})}},{key:"push",value:function(item){item.dirty=!0,item.setup(this),this.collection.push(item)}},{key:"clean",value:function(enforce){var _this=this;this.collection.forEach(function(item){(enforce||item.dirty)&&_this.cleanItem(item)})}},{key:"cleanItem",value:function(item){var _this2=this;item.dirty=!0,this.ctx.clearRect(item.x,item.y,item.w,item.h);var shifted=displaced(item.past,item);shifted&&this.ctx.clearRect(item.past.x,item.past.y,item.past.w,item.past.h),this.collection.forEach(function(obj){obj.dirty||!intersect(obj,item)&&(shifted?!intersect(obj,item.past):1)||_this2.cleanItem(obj)})}},{key:"frame",value:function(){}},{key:"draw",value:function(){var _this3=this;this.frame(this),this.collection.forEach(function(item){item.frame(_this3),item.dirty&&(item.visible&&item.draw(_this3),item.dirty=!1)}),requestAnimationFrame(this.draw.bind(this))}},{key:"addEventListener",value:function(eventname,handler){eventname in this.events||(this.events[eventname]=[]),this.events[eventname].push(handler)}},{key:"dispatchEvent",value:function(e){e.type in this.events&&this.events[e.type].forEach(function(handler){return handler(e)})}}]),Canvas}();exports["default"]=Canvas;var CanvasEvent=function(){function CanvasEvent(e){_classCallCheck(this,CanvasEvent),this.type=e.type,this.originalEvent=e,this.target=null;var _e=e;e.touches&&(_e=e.touches[0]),this.clientX=_e.clientX-e.target.clientLeft,this.clientY=_e.clientY-e.target.clientTop}return _createClass(CanvasEvent,[{key:"preventDefault",value:function(){}}]),CanvasEvent}();module.exports=exports["default"]},{"../polyfills/requestAnimationFrame":6}],2:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function(_x,_x2,_x3){for(var _again=!0;_again;){var object=_x,property=_x2,receiver=_x3;desc=parent=getter=void 0,_again=!1,null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0!==desc){if("value"in desc)return desc.value;var getter=desc.get;return void 0===getter?void 0:getter.call(receiver)}var parent=Object.getPrototypeOf(object);if(null===parent)return void 0;_x=parent,_x2=property,_x3=receiver,_again=!0}},_shape=require("./shape"),_shape2=_interopRequireDefault(_shape),Rect=function(_Shape){function Rect(){_classCallCheck(this,Rect);for(var _len=arguments.length,args=Array(_len),_key=0;_len>_key;_key++)args[_key]=arguments[_key];_get(Object.getPrototypeOf(Rect.prototype),"constructor",this).apply(this,args),this.type="rect"}return _inherits(Rect,_Shape),_createClass(Rect,[{key:"draw",value:function(canvas){var ctx=canvas.ctx;ctx.save(),(this.dx||this.dy)&&ctx.translate(this.dx,this.dy),ctx.fillStyle=this.fillStyle,ctx.fillRect(this.x,this.y,this.w,this.h),ctx.restore()}}]),Rect}(_shape2["default"]);exports["default"]=Rect,module.exports=exports["default"]},{"./shape":3}],3:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Shape=function(){function Shape(){_classCallCheck(this,Shape),this.past={},this.position.apply(this,arguments),this.visible=!0,this.dirty=!0,this.events=[]}return _createClass(Shape,[{key:"position",value:function(){var x=arguments.length<=0||void 0===arguments[0]?0:arguments[0],y=arguments.length<=1||void 0===arguments[1]?0:arguments[1],w=arguments.length<=2||void 0===arguments[2]?0:arguments[2],h=arguments.length<=3||void 0===arguments[3]?0:arguments[3];this.past.x=this.x,this.past.y=this.y,this.past.w=this.w,this.past.h=this.h,this.x=x,this.y=y,this.w=w,this.h=h}},{key:"frame",value:function(){}},{key:"draw",value:function(){}},{key:"setup",value:function(){}},{key:"addEventListener",value:function(eventName,callback){eventName in this.events||(this.events[eventName]=[]),this.events[eventName].push(callback)}},{key:"dispatchEvent",value:function(e){e.type in this.events&&this.events[e.type].forEach(function(fn){return fn(e)})}}]),Shape}();exports["default"]=Shape,module.exports=exports["default"]},{}],4:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function(_x,_x2,_x3){for(var _again=!0;_again;){var object=_x,property=_x2,receiver=_x3;desc=parent=getter=void 0,_again=!1,null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0!==desc){if("value"in desc)return desc.value;var getter=desc.get;return void 0===getter?void 0:getter.call(receiver)}var parent=Object.getPrototypeOf(object);if(null===parent)return void 0;_x=parent,_x2=property,_x3=receiver,_again=!0}},_shape=require("./shape"),_shape2=_interopRequireDefault(_shape),Text=function(_Shape){function Text(text){_classCallCheck(this,Text),_get(Object.getPrototypeOf(Text.prototype),"constructor",this).call(this),this.type="text",this.text=text||"",this.shadowColor="black",this.fillStyle="black",this.strokeStyle="white",this.textAlign="left",this.textBaseline="top",this.lineWidth=0}return _inherits(Text,_Shape),_createClass(Text,[{key:"write",value:function(text,align,fontSize,canvas){canvas.cleanItem(this),this.text=text,this.textAlign=align.split(" ")[0],this.textBaseline=align.split(" ")[1],this.fontSize=fontSize,this.dirty=!0;var ctx=canvas.ctx;this.dirty=!0;var fontSize=this.fontSize;this.lines=this.text.split("\n");for(var _width=0,default_text=this.lines[0],i=0;i<this.lines.length;i++){var _w=ctx.measureText(this.lines[i]).width;_w>_width&&(_width=_w,default_text=this.lines[i])}for(ctx.save(),ctx.shadowColor="black",ctx.fillStyle="black",ctx.strokeStyle="rgba(255,255,255,0.5)",ctx.font=fontSize+"px Arial bold";ctx.measureText(default_text).width>canvas.width;)fontSize*=.9,fontSize=Math.round(fontSize),ctx.font=fontSize+"px Arial bold";switch(this.shadowBlur=ctx.shadowBlur=Math.round(fontSize/10),this.font=ctx.font,this.w=ctx.measureText(default_text).width+2*this.shadowBlur,this.h=(fontSize+2*this.shadowBlur)*this.lines.length,ctx.restore(),this.lineWidth=Math.floor(fontSize/30),this.textAlign){case"center":case"middle":this.textAlign="center",this.x=canvas.width/2-this.w/2;break;case"left":this.x=0;break;case"right":this.x=canvas.width-this.w}switch(this.textBaseline){case"center":case"middle":this.textBaseline="middle",this.y=canvas.height/2-this.h/2;break;case"top":this.y=0;break;case"bottom":this.y=canvas.height-this.h}this.textAlign="left",this.textBaseline="top"}},{key:"draw",value:function(canvas){var _this=this,ctx=canvas.ctx;ctx.save(),ctx.shadowColor=this.shadowColor,this.shadowBlur&&(ctx.shadowBlur=this.shadowBlur),ctx.fillStyle=this.fillStyle,ctx.strokeStyle=this.strokeStyle,ctx.font=this.font,ctx.textAlign=this.textAlign,ctx.textBaseline=this.textBaseline,ctx.lineWidth=this.lineWidth,this.lineWidth&&(ctx.lineWidth=this.lineWidth),this.lines=this.text.toString().split("\n");var len=this.lines.length;this.lines.forEach(function(item,index){var y=_this.y+(_this.h?index*(_this.h/len):0);ctx.fillText(item,_this.x,y),_this.strokeStyle&&ctx.strokeText(item,_this.x,y)}),ctx.restore()}}]),Text}(_shape2["default"]);exports["default"]=Text,module.exports=exports["default"]},{"./shape":3}],5:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}function setup(){mines.length=0,flooded=0,boom=!1,tiles.length=0,canvas.collection.length=0,w=h=50,nx=Math.floor(canvas.width/w),ny=Math.floor(canvas.height/h),w+=Math.floor(canvas.width%(nx*w)/nx),h+=Math.floor(canvas.height%(ny*h)/ny);for(var y=0;ny>y;y++)for(var x=0;nx>x;x++){var tile=new Tile(x*w,y*h,w-1,h-1);tile.grid=[x,y],tiles.push(tile),canvas.push(tile),tile.mine&&mines.push(tile)}text.write("MineField","center center",150,canvas),canvas.push(text),canvas.push(start)}function play(tile){return tile?(0===flooded&&(tile.mine=!1),tile.mine?boom=!0:tile.played||flood(tile),void(flooded+mines.length===tiles.length||boom?(mines.forEach(function(mine){return mine.play()}),text.write(boom?"BOOM!":"Kudos!","center center",150,canvas)):text.write("","right bottom",50,canvas))):!0}function flood(tile){var _tile$grid=_slicedToArray(tile.grid,2),x=_tile$grid[0],y=_tile$grid[1];if(!tile.played){flooded++;var edgeTiles=unique([Math.max(y-1,0)*nx+Math.max(x-1,0),Math.max(y-1,0)*nx+x,Math.max(y-1,0)*nx+Math.min(x+1,nx-1),y*nx+Math.min(x+1,nx-1),Math.min(y+1,ny-1)*nx+Math.min(x+1,nx-1),Math.min(y+1,ny-1)*nx+x,Math.min(y+1,ny-1)*nx+Math.max(x-1,0),y*nx+Math.max(x-1,0)]);tile.heat=edgeTiles.reduce(function(prev,curr){return prev+ +tiles[curr].mine},0),tile.play(),0===tile.heat&&edgeTiles.forEach(function(x){return flood(tiles[x])})}}function unique(arr){var o={};return arr.forEach(function(item){return o[item]=1}),Object.keys(o)}var h,w,nx,ny,_slicedToArray=function(){function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i["return"]&&_i["return"]()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return sliceIterator(arr,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function(_x,_x2,_x3){for(var _again=!0;_again;){var object=_x,property=_x2,receiver=_x3;desc=parent=getter=void 0,_again=!1,null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0!==desc){if("value"in desc)return desc.value;var getter=desc.get;return void 0===getter?void 0:getter.call(receiver)}var parent=Object.getPrototypeOf(object);if(null===parent)return void 0;_x=parent,_x2=property,_x3=receiver,_again=!0}},_classesCanvas=require("./classes/canvas"),_classesCanvas2=_interopRequireDefault(_classesCanvas),_classesText=require("./classes/text"),_classesText2=_interopRequireDefault(_classesText),_classesRect=require("./classes/rect"),_classesRect2=_interopRequireDefault(_classesRect),Tile=function(_Rect){function Tile(){_classCallCheck(this,Tile);for(var _len=arguments.length,args=Array(_len),_key=0;_len>_key;_key++)args[_key]=arguments[_key];_get(Object.getPrototypeOf(Tile.prototype),"constructor",this).apply(this,args),this.mine=Math.random()<1/8,this.played=!1,this.grid=[0,0],this.type="tile",this.played=!1,this.fillStyle="#ccc",this.heat=0}return _inherits(Tile,_Rect),_createClass(Tile,[{key:"play",value:function(){if(this.played=!0,this.fillStyle=this.mine?"red":"#eee",this.heat){var text=new _classesText2["default"];text.text=this.heat,text.textBaseline="middle",text.textAlign="center",text.strokeStyle=null,text.fillStyle="black",text.font="30px Arial bold",text.x=this.x+this.w/2,text.y=this.y+this.h/2,canvas.push(text)}this.dirty=!0}}]),Tile}(_classesRect2["default"]),tiles=[],mines=[],flooded=0,boom=!1,canvas=new _classesCanvas2["default"],text=new _classesText2["default"];text.write("MineField","center center",150,canvas);var start=new _classesText2["default"];start.write("►","left top",40,canvas),start.addEventListener("click",function(e){return setup()},!1),setup(),canvas.addEventListener("click",function(e){"tile"===e.target.type&&play(e.target)},!1),canvas.addEventListener("resize",setup)},{"./classes/canvas":1,"./classes/rect":2,"./classes/text":4}],6:[function(require,module,exports){"use strict";window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1e3/60)}}()},{}]},{},[5]);
//# sourceMappingURL=../dist/mineField.js.map