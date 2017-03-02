var canvas = document.getElementById("thing");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var clrBtn = document.getElementById("clearbtn");
var circBtn = document.getElementById("circle");
var dvdBtn = document.getElementById("dvd");
var stopBtn = document.getElementById("stop");
var mousex, mousey;
var rid;
var img = new Image();
img.src = "https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Dvd-video-logo.svg/1280px-Dvd-video-logo.svg.png";

canvas.addEventListener("mousemove", function(e) {
    mousex = e.offsetX;
    mousey = e.offsetY;
});


var drawDVD = function(x,y, imgW, imgH){
    ctx.drawImage(img, x, y, imgW, imgH);
}

var circleAnim = function() {

    var x = 25;
    var increase = true;
    window.cancelAnimationFrame(rid);
   
    var drawDot = function(e){
	ctx.clearRect(0, 0, width, height);
	console.log(rid);
	ctx.beginPath();
	ctx.arc(width/2, height/2, x, 0, 2 * Math.PI);
	ctx.fill();
	if (x >= 250) {
	    increase = false;
	}
	else if (x == 1 | x <= 0) {
	    increase = true;
	}
	if (increase) {
	    x = x + 2;
	}
	else {
	    x = x - 2;
	}
	rid = window.requestAnimationFrame( drawDot );
    };

    drawDot();
};

var dvdAnim = function(){
    window.cancelAnimationFrame(rid);
    var xVel = 2;
    var yVel = 2;
    var x = width / 4 + Math.random() * width / 2;
    var y = height / 4 + Math.random() * height / 2;
    var imgW = width/6;
    var imgH = height/6;
    
    var anim = function(){
	
	clrScreen();
	x += xVel;
	y += yVel;
	
	if (xVel >= 0 && x + imgW >= width){
	    xVel = -4;
	}
	if (xVel <= 0 && x <= 0){
	    xVel = 4;
	}
	if (yVel >= 0 && y + imgH >= height){
	    yVel = -3;
	}
	if (yVel <= 0 && y <= 0){
	    yVel = 3;
	}
	
	drawDVD(x,y,imgW, imgH);
	
	rid = window.requestAnimationFrame(anim);
	
    }
    
    anim();
    
    
}

var stopAll = function(){
    while (svgImage.hasChildNodes()){
	svgImage.removeChild(svgImage.lastChild);
    }
}


circBtn.addEventListener("click", circleAnim);
stopBtn.addEventListener("click", stopAll);
dvdBtn.addEventListener("click", dvdAnim);
