// VCE Project - rotating_impeller.js
//
// This script is used to test the animation of a rotating impeller
// within a vessel.
//
// Requires:
// - p5.js or p5.min.js
// - vce_utils.js
//
//
// Andrew D. McGuire 2018
// a.mcguire227@gmail.com
//----------------------------------------------------------
// --------------------------------------------------
//               set-up variables
// --------------------------------------------------
var debug = false;
var paused_log = false;
var xmax;
var ymax;
var img_shrink_factor = 0.9;
var sid;
var tank;
var imp_array;
var impeller;

// --------------------------------------------------
//             p5 visualisation functionality
// --------------------------------------------------
function preload() {
    var tank_URL = "../../../../../lib/images/reactor_ni.svg";
    var imp1_URL = "../../../../../lib/images/imp_0deg.svg";
    var imp2_URL = "../../../../../lib/images/imp_45deg.svg";
    var imp3_URL = "../../../../../lib/images/imp_90deg.svg";
    var imp4_URL = "../../../../../lib/images/imp_135deg.svg";
    tank = loadImage(tank_URL, pic => print(pic), utils.loadImgErrFix);
    var imp1 = loadImage(imp1_URL, pic => print(pic), utils.loadImgErrFix);
    var imp2 = loadImage(imp2_URL, pic => print(pic), utils.loadImgErrFix);
    var imp3 = loadImage(imp3_URL, pic => print(pic), utils.loadImgErrFix);
    var imp4 = loadImage(imp4_URL, pic => print(pic), utils.loadImgErrFix);
    imp_array = [imp1, imp2, imp3, imp4];
};

function setup() {

    /* This function is called upon entry to create the
       simulation canvas which we draw onto  */

    var dimensions = utils.getSimBoxDimensions();
    xmax = dimensions.xmax;
    ymax = dimensions.ymax;
    var canvas= createCanvas(xmax, ymax);
    canvas.parent("sim_container");
    sid = utils.getImgScaledDimensions(tank, img_shrink_factor, ymax);
    var imp_height = sid.height*0.6297;
    impeller = new Impeller(imp_array, imp_height, ymax, [xmax/2.0,ymax/2.0], speed=0.2)
    impeller.updateSpeed(0.1);
    console.log(impeller);
}

function draw() {

    /* Draws background and img to the canvas.
       This function is continuously called for the
       lifetime of the scripts executions after setup()
       has completed. Effectively advances time. */

    frames = frames + 1;
    background(51);
    imageMode(CENTER);
    image(tank, xmax/2 , ymax/2, sid.width, sid.height);
    impeller.show();
    if (!paused_log) {
	impeller.rotate();
    };
};


// run button
$('#run').click(async function(){

    // run/pause button functionality
    console.log("You just clicked stream/pause!");
    paused_log = !(paused_log);
    if (paused_log) {
	$("#run").text('Run');
    }
    else {
	$("#run").text('Pause');
    }
});
