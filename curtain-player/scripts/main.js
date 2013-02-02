
(function(g){

'use strict';

window.onload = function(){
  g(document).on(g.event.touchmove, ontouchmove);

};

var light = document.getElementById('light');
var lis   = document.getElementById('list').children;
var width  = document.body.clientWidth;
var height = document.body.clientHeight;

var minWidth = 30;

var radius = 75;

function ontouchmove(e){
  e.preventDefault();
  var x = e.pageX;
  var y = e.pageY;
  positionCursor(x, y);
  var yPercent = y / height;
  var widthes = getWidthes(yPercent, x, width, 7);
  for(var i = 0; i < lis.length; i++){
    lis[i].style.width = widthes[i] + 'px';
  }
}

function getWidthes(yPercent, x, total, number){
  if(yPercent <= 0.2) return getAverageWidthes();

  var otherAverage = 60;
  var average = Math.floor(total / number);
  var widthes = [];
  var baseWidth = Math.floor(otherAverage + (average-otherAverage)/(1-0.2)*(1-yPercent));
  var leftWidth = width - baseWidth*7;
  var index = Math.ceil(x/average - 0.5);
  var widths = [];
  for(var i = 0; i < 7; i++){
    widths.push(baseWidth);
  }
  if(index <= 0){
    widths[0] = leftWidth + baseWidth;
  }else if(index >= 7){
    widths[6] = leftWidth + baseWidth;
  }else{
    var ratio = x/average - index + 0.5;
    var next = ratio * leftWidth + baseWidth;
    var prev = width - next - baseWidth * 5;
    widths[index-1] = prev;
    widths[index] = next;
  }
  return widths;
}

function getAverageWidthes(total, number){
  var average = Math.floor(total / number);
  var array = [];
  for(var i = 0; i < number; i++){
    array[i] = average;
  }
  array[i] = total - average * number;
  return array;
}

function positionCursor(x, y){
  light.style.cssText = 'left:' + (x - radius) + 'px; top:' + (y - radius) + 'px';
  clearTimeout(positionCursor.timeout);
  positionCursor.timeout = setTimeout(function(){
    light.style.display = 'none';
  }, 5000);
}

})(g);