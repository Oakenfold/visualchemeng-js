// VCE Project - test_distillation_frontend.js
//
// This script facilitates the testing of a distillation simulation
// module.
//
//
// Requires:
// - p5.js or p5.min.js
// - vce_utils.js
//
// Andrew D. McGuire 2018
// a.mcguire227@gmail.com
//
// To do:
//
//
// --------------------------------------------------
//               set-up variables
// --------------------------------------------------
var paused_log = false;
var debug = true;
var Graphics,
    column_img;

// --------------------------------------------------
//             p5 visualisation functionality
// --------------------------------------------------
function preload() {
    // load the canvas images
    var column_img_URL = "../resources/distillation_grey.svg";
    column_img = loadImage(column_img_URL, pic => print(pic), loadImgErrFix);
};

function setup(first_time=true) {

    /* This function is called upon entry to create the
       simulation canvas which we draw onto.  */

    // Intialise the backend column
    
    
    // Create the canvas
    var dimensions = getSimBoxDimensions();
    var canvas= createCanvas(dimensions.xmax, dimensions.ymax);
    canvas.parent("sim_container");
    
    // Initialise the graphical reactor
    Graphics = new DistillationGraphics(canvas, column_img, debug);

    
}

function draw() {

    /* Draws background and img to the canvas.
       This function is continuously called for the
       lifetime of the scripts executions after setup()
       has completed. Effectively advances time. */

    if (!(paused_log)) {

	// step the system forward in time
	Graphics.update();
    };

    // render graphics
    Graphics.show()
    
};

// --------------------------------------------------
//                 Styling updaters
// --------------------------------------------------
function update_labels() {
    // Update the UI labels so that they are conistant wit the
    // application state.
    update_bounds_button_label();
};


function update_bounds_button_label() {
    // update bounds button label
    if (!Graphics.show_boundaries_log) {
	$("#bounds").text('Show Bounds');
    }
    else {
	$("#bounds").text('Hide Bounds');
    }    
};



// --------------------------------------------------
//                 UI event listners
// --------------------------------------------------
// run/pause button
$('#run').click(async function(){
    console.log("You just clicked stream/pause!");
    paused_log = !(paused_log);
    if (paused_log) {
	$("#run").text('Run');
	$('#run').prop('title', 'Un-pause the reaction');
    }
    else {
	$("#run").text('Pause');
	$('#run').prop('title', 'Pause the reaction');
    }
});


// show boundaries button
$('#bounds').click(async function(){

    // boundary show hide
    console.log("You just clicked show boundaries!");
    Graphics.show_boundaries_log = !(Graphics.show_boundaries_log);
    update_bounds_button_label();
});



// on-click functionality
function mousePressed() {
    if (is_on_canvas(mouseX, mouseY, canvas)) {
	$('#run').click();
    };
};
