
function POINT(x,y){ return {'x': x, 'y': y}; }

function VECTOR(start, angle, distance){
  return POINT(
		start.x + Math.sin(angle) * distance,
		start.y - Math.cos(angle) * distance 
	);
}

function fractionToRadian(fraction) { return fraction * 2 * Math.PI; }

function drawTimeDot(ctx, center, angle, distance, size, color){
	var dotPoint = VECTOR(center, angle, distance);
	ctx.fillStyle = color;
  ctx.rockyFillRadial(dotPoint.x, dotPoint.y, 0, size, 0, 2 * Math.PI);
}

function drawClockHand(ctx, center, angle, length, color, width) {  
  var endPoint = VECTOR(center, angle, length);
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(center.x, center.y);
  ctx.lineTo(endPoint.x, endPoint.y);
  ctx.stroke();
}

function drawDate(ctx, center, day, color){
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    if(day <10){
        day = "0"+day;
    }
    ctx.fillText(""+day, center.x, center.y);
}

function UI(){
	this.ctx = null;
	this.screen = {
		'h': 0,
		'w': 0,
		'center': null,
    'maxRadius': 0
	};
  this.prefs = null;
  
  this.settings = function(set){
    this.prefs = {
      "color":{
        "bg": (set.color.bg || "#4D5670"),
        "hour": (set.color.hour || "black"),
        "minute": (set.color.minute || "black"),
        "second": (set.color.second || "red"),
        "date": (set.color.date || "black")
      }
    };
  };
  
  this.init = function(event, callback){
    var ctx = event.context;  
    this.screen.w = ctx.canvas.unobstructedWidth;
    this.screen.h = ctx.canvas.unobstructedHeight;
    this.screen.center = POINT(this.screen.w/2, this.screen.h/2);
    this.screen.maxRadius = (Math.min(this.screen.w, this.screen.h) - 20) / 2;
    callback();
  };
  
  this.onDraw = function(event){
    this.ctx = event.context;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.prefs.color.bg;
    this.ctx.fillRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight);
    this.ctx.closePath();
    var d = new Date();
    // var month = d.getUTCMonth() + 1; //months from 1-12
    var day = d.getUTCDate();
    // var year = d.getUTCFullYear();
    var secondAngle = fractionToRadian((d.getSeconds()) / 60);
    var minuteFraction = (d.getMinutes()) / 60;
    var minuteAngle = fractionToRadian(minuteFraction);
    var hourAngle = fractionToRadian( (d.getHours() % 12 + minuteFraction) / 12);
    
    drawClockHand(this.ctx, this.screen.center, hourAngle, this.screen.maxRadius * 0.75, this.prefs.color.hour, 4);
    drawClockHand(this.ctx, this.screen.center, minuteAngle, this.screen.maxRadius - 8, this.prefs.color.minute, 4);
    drawTimeDot(this.ctx, this.screen.center, secondAngle, this.screen.maxRadius, 3, this.prefs.color.second);
    drawDate(this.ctx, POINT(this.screen.center.x * 1.5, this.screen.center.y-9), day, this.prefs.color.date);
  };
}

module.exports = new UI();