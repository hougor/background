// text
// TextObject, defines a shape object which contains text.

import Shape from './shape';

export default class Text extends Shape{

	// Initiate a new shape object.
	constructor (text){
		// initiate inheritance
		super();

		this.type = 'text';

		// Define text
		this.text = text||'';

		this.shadowColor = "black";
		this.fillStyle="black";
		this.strokeStyle="white";
		this.textAlign = 'left';
		this.textBaseline = 'top';
		this.lineWidth = 0;

	}

	// Define the text and the alignment of the object
	write (text, align, fontSize, canvas) {

		canvas.cleanItem(this);

		// Define text
		this.text = text;
		this.textAlign=align.split(" ")[0];
		this.textBaseline=align.split(" ")[1];
		this.fontSize = fontSize;
		this.dirty = true;

		var ctx = canvas.ctx;

		// Mark that it needs to be redrawn
		this.dirty = true;

		var fontSize = this.fontSize;

		// Split text by line breaks
		this.lines = this.text.split('\n');

		// Which is the longest line?
		var _width = 0, default_text = this.lines[0];
		for(var i=0;i<this.lines.length;i++){
			var _w = ctx.measureText(this.lines[i]).width;
			if(_w>_width){
				_width = _w;
				default_text = this.lines[i];
			}
		}


		// Find the width and height of the item
		// Using the canvas context
		ctx.save();

		ctx.shadowColor = "black";
		ctx.fillStyle="black";
		ctx.strokeStyle="rgba(255,255,255,0.5)";
		ctx.font= fontSize + "px Arial bold";

		while(ctx.measureText(default_text).width>canvas.width){
			fontSize *= 0.9;
			fontSize = Math.round(fontSize);
			ctx.font = fontSize + "px Arial bold";
		}
		this.shadowBlur = ctx.shadowBlur = Math.round(fontSize/10);
		this.font = ctx.font;

		this.w = ctx.measureText(default_text).width + (this.shadowBlur*2);
		this.h = (fontSize + (this.shadowBlur*2))*this.lines.length;

		ctx.restore();

		// Store style attributes
		// Store the new attributes of the text item
		this.lineWidth=Math.floor(fontSize/30);


		// HEIGHT and WIDTH
		switch(this.textAlign){
			case "center":
			case "middle":
				this.textAlign="center";
				this.x = (canvas.width/2) - (this.w/2);
			break;
			case "left":
				this.x = 0;
			break;
			case "right":
				this.x = canvas.width - this.w;
			break;
		}

		switch(this.textBaseline){
			case "center":
			case "middle":
				this.textBaseline="middle";
				this.y = (canvas.height/2) - (this.h/2);
			break;
			case "top":
				this.y = 0;
			break;
			case "bottom":
				this.y = canvas.height - this.h;
			break;
		}

		this.textAlign = 'left';
		this.textBaseline = 'top';
	}

	// Draw
	draw (canvas) {

		var ctx = canvas.ctx;

		ctx.save();

		ctx.shadowColor = this.shadowColor;
		if (this.shadowBlur) {
			ctx.shadowBlur = this.shadowBlur;
		}
		ctx.fillStyle=this.fillStyle;
		ctx.strokeStyle=this.strokeStyle;
		ctx.font = this.font;

		ctx.textAlign = this.textAlign;
		ctx.textBaseline = this.textBaseline;
		ctx.lineWidth = this.lineWidth;

		if (this.lineWidth) {
			ctx.lineWidth = this.lineWidth;
		}

		this.lines = this.text.toString().split('\n');

		var len = this.lines.length;

		this.lines.forEach( (item, index) => {
			let y = this.y + (this.h ? (index*(this.h/len)) : 0);

			ctx.fillText(item, this.x, y);
			if (this.strokeStyle) {
				ctx.strokeText(item, this.x, y);
			}
		});

		ctx.restore();
	}
}