var svgImage = document.getElementById("svg");
var width = parseInt(svgImage.getAttribute("width"));
var height = parseInt(svgImage.getAttribute("height"));
var circBtn = document.getElementById("circle");
var dvdBtn = document.getElementById("dvd");
var stopBtn = document.getElementById("stop");
var mousex, mousey;
var rid;

var namespace = "http://www.w3.org/2000/svg";

var img = new Image();
img.src = "https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Dvd-video-logo.svg/1280px-Dvd-video-logo.svg.png";

svgImage.addEventListener("mousemove", function(e) {
    mousex = e.offsetX;
    mousey = e.offsetY;
});


var drawDVD = function(x,y, imgW, imgH){
    var c = document.createElementNS(namespace, "image");
    c.setAttribute("x", toString(x));
    c.setAttribute("y", toString(y));
    c.setAttribute("width", toString(imgW));
    c.setAttribute("height", toString(imgH));
    c.setAttributeNS('http://www.w3.org/1999/xlink','href','http://i.imgur.com/LQIsf.jpg');
    svgImage.appendChild(c);
}

var circleAnim = function() {
    var x = 25;
    var increase = true;
    window.cancelAnimationFrame(rid);
    
    var drawDot = function(e){
	while (svgImage.hasChildNodes()){
	    svgImage.removeChild(svgImage.lastChild);
	}
	console.log(rid);
	var circle = document.createElementNS(namespace, "circle")
	circle.setAttribute("cx", "0");
	circle.setAttribute("cy", "0");
	circle.setAttribute("r", x.toString());
	circle.setAttribute("fill", "black");
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
