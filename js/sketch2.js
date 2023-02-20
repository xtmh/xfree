let faceapi;
let img;
let img0;
let detections;
let str;

function onFileSelected(input) {
    var file = input.files[0];
    var str = "images/"+file.name;    //input.value;
    //var str = file.name;    //input.value;
    img = await loadImage(str);
    //
    createCanvas(width, height);
    img.resize(width, height);
    //img.resize(256, 256);
    //
    faceapi = ml5.faceApi(detection_options, modelReady);
    textAlign(RIGHT);
}

// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}

//  setup前に処理される
function preload(){
    //img = loadImage('images/frida.jpg')
    //img = loadImage('images/lena_gray.jpg')
}

//  最初に処理される
function setup() {
    //createCanvas(200, 200);
    //img.resize(width, height);

    //faceapi = ml5.faceApi(detection_options, modelReady)
    //textAlign(RIGHT);
}

function draw(){
    //image(img, 0, 0);
}


function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    const detections = await faceapi.detectSingle(img, gotResults)

}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    detections = result;

    /////////////////////////////////////
    const displaySize = { width: input.width, height: input.height };
    // resize the detected boxes in case your displayed image has a different size than the original
    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    ///////////////////////////////////////

    // background(220);
    background(255);
    image(img, 0,0, width, height)
    if (detections) {
        // console.log(detections)
        drawBox(detections)
        drawLandmarks(detections)
    }
}

function drawBox(detections){
    const alignedRect = detections.alignedRect;
    const {_x, _y, _width, _height} = alignedRect._box;
    noFill();
    stroke(161, 95, 251);
    strokeWeight(2)
    rect(_x, _y, _width, _height)
}

function drawLandmarks(detections){
    noFill();
    stroke(161, 95, 251);
    strokeWeight(2)
    
    push()
    // mouth
    beginShape();
    detections.parts.mouth.forEach(item => {
        vertex(item._x, item._y)
    })
    endShape(CLOSE);

    // nose
    beginShape();
    detections.parts.nose.forEach(item => {
        vertex(item._x, item._y)
    })
    endShape(CLOSE);

    // left eye
    beginShape();
    detections.parts.leftEye.forEach(item => {
        vertex(item._x, item._y)
    })
    endShape(CLOSE);

    // right eye
    beginShape();
    detections.parts.rightEye.forEach(item => {
        vertex(item._x, item._y)
    })
    endShape(CLOSE);

    // right eyebrow
    beginShape();
    detections.parts.rightEyeBrow.forEach(item => {
        vertex(item._x, item._y)
    })
    endShape();

    // left eye
    beginShape();
    detections.parts.leftEyeBrow.forEach(item => {
        vertex(item._x, item._y)
    })
    endShape();

    pop();
}