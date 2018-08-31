// VCE Project - vce_utils.js
//
// This file serves as a library of useful functions for the
// visualchemeng project
//
// Requires:
// - plotly.js or minified equivalent
//
// Andrew D. McGuire 2017
// amcguire227@gmail.com
//----------------------------------------------------------


function newtonsMethod(f,x0,args) {

    // A basic implmentation of newtons root finder method
    // based on https://en.wikipedia.org/wiki/Newton%27s_method
    //
    // args:
    // f - function in x, args to be evaluated (2 inputs)
    // x0 - intial guess
    //
    // returns an array of the form [bool passed_log, double xsoln]
    
    var epsilon = 10e-14;
    var tolerance = 1e-7;
    var maxIterations = 20;
    var solution_found_log = false;
    var x1 = x0
    
    for (i = 0; i < maxIterations; i++) {

	var x0 = x1
	var y = f(x0,args);
	var yprime = derivative(f,x0,args)
	
	// Don't want to divide by too small of a number denominator
	// is too small
	if (Math.abs(yprime) < epsilon) {
	    break; //Leave the loop
	}

	var x1 = x0 - y/yprime //Do Newton's computation

	//console.log("x=",x0,"y=",f(x0));

	if (Math.abs(x1 - x0) <= tolerance * Math.abs(x1)) {
	    //If the result is within the desired tolerance
	    solution_found_log = true;
	    break; //Done, so leave the loop
	}
    }

    var result = [solution_found_log,x1]
    return result	
    
}

function derivative(f,x,args) {

    // Numerical derivative approximation of a function f
    // evaluated at x
    
    var h = 0.001;
    return (f(x + h,args) - f(x - h,args)) / (2 * h); 
}


function sleep (time) {
    // time delay functionality
    // use as await sleep(sleep_time);
    // must be called within an async function
  return new Promise((resolve) => setTimeout(resolve, time));
}


var isEqual = function (value, other) {

    // Check if two arrays are equal.
    // Credit Chris Ferdinandi
    // https://gomakethings.com/check-if-two-arrays-or-objects-are-equal-with-javascript/

    // Get the value type
    var type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false;

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;

    // Compare two items
    var compare = function (item1, item2) {
        if (item1 !== item2) return false;
    };

    // Compare properties
    var match;
    if (type === '[object Array]') {
        for (var i = 0; i < valueLen; i++) {
            compare(value[i], other[i]);
        }
    } else {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                compare(value[key], other[key]);
            }
        }
    }

    // If nothing failed, return true
    return true;

};

function getSimBoxDimensions() {
    //get the dimension of the simbox
    var sb_ymax = $('#sim_container').outerHeight()*0.95;
    var sb_xmax = $('#sim_container').outerWidth()*0.97;
    return {
	ymax: sb_ymax,
        xmax: sb_xmax
    };
};

function loadImgErrFix(errEvt) {
    // load an image and handle any CORS errors that may
    // occur.
    const pic = errEvt.target;
    
    if (!pic.crossOrigin)  return print(`Failed to reload ${pic.src}!`);
    
    print(`Attempting to reload ${pic.src} as a tainted image now...`);
    pic.crossOrigin = null, pic.src = pic.src;
};


function getRandomSigned() {
    // generate a random number between 1 and -1
    return Math.random()*2.0-1.0
};

function getRandomSingnedInt() {
    // randomly return either -1 or 1
    var dir = [-1,1];
    return dir[Math.floor(Math.random() * dir.length)]
};

function resizePlotlyWidth(gd,id,frac=0.33) {

    // resize the width of a plotly svg container with
    var container_id = id;
    var window_width = document.getElementById(container_id).offsetWidth;
    var svg_container = document.getElementById(container_id).getElementsByClassName('svg-container')[0];
    svg_container.style.width = (window_width*frac) + 'px';
    Plotly.Plots.resize(gd);
};

function resizePlotlyHeight(gd,container_id) {
    var window_height = document.getElementById(container_id).offsetHeight;
    var svg_container = document.getElementById(container_id).getElementsByClassName('svg-container')[0];
    svg_container.style.height = (window_height - 25) + 'px';
    Plotly.Plots.resize(gd);
};


function resizePlotly(container_id) {
    // resize a plotly graph to fill its container
    var d3 = Plotly.d3;
    var d3_string = "div[id='".concat(container_id,"']");
    var gd0 = d3.select(d3_string);
    var gd0_node = gd0.node();
    resizePlotlyHeight(gd0_node, container_id)
};


function generateLabels(arrx,letter) {
    
    // generate a number based label array based on an array length
    // and a letter
    //
    // example: axrr = [1.0,0.0,0.0], letter = 'z'
    //          => returns ['z1','z2','z3']
    
    labels = []
    for (var i = 0; i < arrx.length; i++) {
	labels.push(letter + (i + 1));
    };
    return labels;
};

function getImgScaledDimensions(img,img_shrink_factor,ymax) {

    // return the scaled image dimensions
    // that maintain the apect ratio.
    var scaled_height =  ymax*img_shrink_factor;
    var scaled_width = img.width*scaled_height/img.height;
    return { width : scaled_width,
	     height: scaled_height }

};

function add(a,b) {
    return a + b;
};


function sum(mylist) {

    // I'm here becuase JS doesn't know how to
    // sum an array of numbers...
    
    return mylist.reduce(add,0);
}

//From: https://p5js.org/examples/form-regular-polygon.html
function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

//From: https://jsfiddle.net/1vrkw1pc/
//extend two javascript objects (useful if you want to merge some arg
//options object with a default options object.
function extend(){
    for(var i=1; i<arguments.length; i++)
        for(var key in arguments[i])
            if(arguments[i].hasOwnProperty(key)) { 
                if (typeof arguments[0][key] === 'object'
                    && typeof arguments[i][key] === 'object')
             				extend(arguments[0][key], arguments[i][key]);
                else
                   arguments[0][key] = arguments[i][key];
             }
    return arguments[0];
};

// Merge two object without affecting the inputs.
// From: https://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
};


// deep copy an object (attributes only)
function deep_copy(obj) {
    return JSON.parse(JSON.stringify(obj));
};


// check if coordinates are in the canvas
function is_on_canvas(x, y) {
    var dimensions = getSimBoxDimensions();
    if (x > 0 && x <= dimensions.xmax && y > 0 && y <= dimensions.ymax) {
	return true;
    }
    return false;
};


function rotate_point_with_body(body, point) {
    // adpated from https://stackoverflow.com/a/38285610/4530680
    var dx = point.x - body.position.x;
    var dy = point.y - body.position.y;
    var mouseAngle = Math.atan2(dy, dx);
    var mouseDistance = Math.sqrt(dx*dx + dy*dy);
    var x = body.position.x + mouseDistance*Math.cos(mouseAngle - body.angle);
    var y = body.position.y + mouseDistance*Math.sin(mouseAngle - body.angle);
    return { x : x, y : y};
};


function get_absolute_coordinates(xmax, ymax, img_width, img_height, scaling) {
    // Convert canvas, image dimension and positional scaling factors
    // into absoloute positions, width and heights
    return {
	x : (xmax + scaling.x_scaling*img_width)/2.0,
	y : (ymax + scaling.y_scaling*img_height)/2.0,
	w : scaling.w_scaling*img_width,
	h : scaling.h_scaling*img_height,
	a : scaling.a
    };

};


// load a script and run a cal back function when it is done
// source: https://stackoverflow.com/a/950146/4530680
function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}