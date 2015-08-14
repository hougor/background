// Shape



// CanvasShapes
// The parent object defining a basic shape, x,y,w,h, for starters.
// And basic operatings you might like to include on a shape

export default class Shape{

	constructor (...args){

		this.past = {};

		this.position(...args);

		// Whether or not to draw this out
		this.visible = true;

		// The default status is touched,
		// This means it needs to be drawn on to canvas
		this.dirty = true;

		// initieate  events
		this.events = [];
	}

	position(x = 0, y = 0, w = 0, h = 0) {

		this.past.x = this.x;
		this.past.y = this.y;
		this.past.w = this.w;
		this.past.h = this.h;

		// Assign, rectangle shape
		// Have a backup footprint
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	// Placeholder function for drawing to canvas
	frame(){}
	draw(){}
	setup(){}

	// Events
	// Assign Events to be fired when the user clicks this object
	// Awesome
	addEventListener (eventName, callback){
		if(!(eventName in this.events)){
			this.events[eventName] = [];
		}
		this.events[eventName].push(callback);
	}

	dispatchEvent(e){
		if(!(e.type in this.events)){
			return;
		}
		var a = this.events[e.type];
		for(var i=0;i<a.length;i++){
			a[i](e);
		}
	}
}