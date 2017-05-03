var rocky = require('rocky');
var UI = require('./ui.js');

var settings = {
  "color":{
    "bg": "white",
    "second": "#FF0000",
    "minute": "black",
    "hour": "black",
    "date": "black"
  }
};

var asettings = {
  "color":{
    "bg": "#555555",
    "second": "white",
    "minute": "white",
    "hour": "white",
    "date": "white"
  }
}; 

UI.settings(settings);

function drawRequest(event){
  rocky.requestDraw();
}

function padColorString(color) {
  color = color.toLowerCase();
  while (color.length < 6) {
    color = '0' + color;
  }
  return color;
}
function convertColor(color) {
  if (typeof color === 'number') {
    color = color.toString(16);
  }
  color = padColorString(color);
  return '#' + color;
}

//rocky.on('minutechange', drawRequest);
//rocky.on('hourchange', drawRequest);
//rocky.on('daychange', drawRequest);
rocky.on('secondchange', drawRequest);

rocky.on('draw', function(event){
  UI.init(event, function(){
    rocky.on('draw', function(event){
      UI.onDraw(event);
    });  
  });
});


rocky.on('message', function(event) {
    
    
    settings.color.bg = convertColor(event.data.bg);
    settings.color.second = convertColor(event.data.second);
    settings.color.minute = convertColor(event.data.minute);
    settings.color.hour = convertColor(event.data.hour);
    settings.color.date = convertColor(event.data.date);
    console.log(settings.color.bg);
    UI.settings(settings);
    drawRequest();
});


//rocky.postMessage({command: 'settings'});


