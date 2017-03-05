var svgImage = document.getElementById("svg");
var width = parseInt(svgImage.getAttribute("width"));
var height = parseInt(svgImage.getAttribute("height"));
var circBtn = document.getElementById("circle");
var dvdBtn = document.getElementById("dvd");
var stopBtn = document.getElementById("stop");
var mousex, mousey;
var rid;

var namespace = "http://www.w3.org/2000/svg";

svgImage.addEventListener("mousemove", function(e) {
    mousex = e.offsetX;
    mousey = e.offsetY;
});


var drawDVD = function(x,y, imgW, imgH){
    var c = document.createElementNS(namespace, "image");
    c.setAttribute("x", String(x));
    c.setAttribute("y", String(y));
    c.setAttribute("width", String(imgW));
    c.setAttribute("height", String(imgH));
    c.setAttributeNS('http://www.w3.org/1999/xlink','href','https://upload.wikimedia.org/wikipedia/en/1/18/Dvd-video-logo.svg');
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
	circle.setAttribute("cx", String(width/2));
	circle.setAttribute("cy", String(height/2));
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
	svgImage.appendChild(circle);
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
    var imgW = 210/2;
    var imgH = 130/2;
    
    var anim = function(){
	
	stopAll();
	x += xVel;
	y += yVel;
	
	if (xVel >= 0 && x + imgW >= width){
	    xVel = -3;
	}
	if (xVel <= 0 && x <= 0){
	    xVel = 3;
	}
	if (yVel >= 0 && y + imgH >= height){
	    yVel = -2;
	}
	if (yVel <= 0 && y <= 0){
	    yVel = 2;
	}
	
	drawDVD(String(x),String(y),String(imgW), String(imgH));
	
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
