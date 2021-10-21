const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight
let input;
let volume;
let analyzer;
// let protestCrowd
// let amp;
let myLevels = [];
let started  = false;
// let loaded = false;


function setup() {
  createCanvas(canvasWidth, canvasHeight);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  // console.log(volume)

  if (!started) {
    drawStartScreen();
  } else {
    drawAmplitude();
  }
}

function drawStartScreen() {
  textSize(29)
  noStroke()
  fill(255)
  text("Click to Start!", canvasWidth/2 - 100, canvasHeight/2)
}

function drawAmplitude(){
  //get the current amplitude
  
  if (input) {
    volume = input.getLevel();
    if (volume > 0){
      //if current amplitude is greater than zero, push it to levels array
      myLevels.push(volume);
    }

    // if the number of levels is bigger than half of the screen, delete the first one
    // this creates the scrolling effect
    if(myLevels.length > 360){
      myLevels.splice(0, 1);
    }
  }
  // let vol = amp.getLevel();


  // no fill color ie just a line
  let color1 = map(volume, 0.0, 0.2, 0, 255, true);
  let color2 = map(volume, 0.0, 0.2, 255, 0, true);
  noFill();
  stroke(100, color1, color2);
  
  //begin shape starts a new shape with any number of vertexes
  beginShape()

  myLevels.forEach((level, i) => {
    // remap the value
    let radius = map(level, 0.001, 0.1, min(canvasHeight, canvasWidth) / 4, 0, true);
    // let radius = 100
    // console.log(y);
    // const radius = level
    const x = - radius * sin(i) + canvasWidth / 2;
    const y = - radius * cos(i) + canvasHeight / 2;

    vertex(x,y);
    line(canvasWidth / 2, canvasHeight / 2, x, y)
  })

  //end the shape
  endShape();

  stroke(color1, 100, color2);
  fill(color1, 100, color2);
  let circleSize = map(volume, 0.0,  0.2, 1, min(canvasHeight, canvasWidth) / 2, true);
  ellipse(width/2, height/2, circleSize);
}

function mousePressed() {
  started = true
  // Create an Audio input
  input = new p5.AudioIn();
  // amp = new p5.Amplitude();
  input.start();
}



// [finished code]()
// add a note that sound library must be included
// we use this "height" and "width" without defining them