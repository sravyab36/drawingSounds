const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight
let input;
let analyzer;
// let protestCrowd
// let amp;
let myLevels = [];
// let started  = false;
// let loaded = false;


function setup() {
  createCanvas(canvasWidth, canvasHeight);
    // Create an Audio input
  input = new p5.AudioIn();
  // amp = new p5.Amplitude();
  input.start();

}

function draw() {
  background(220);
  // console.log(volume)
  drawAmplitude();

  // x = sin(angle) * radius;
  // y = cos(angle) * radius;
}

function drawAmplitude(){
  //get the current amplitude
  // let vol = amp.getLevel();
  let volume = input.getLevel();

  // // draws an ellipse!
  // let color1 = map(volume, 0.0, 1.0, 0, 255);
  // console.log("color", color1)
  // fill(color1);
  // let circleSize = map(volume, 0.0, 1.0, 1, 500);
  // ellipse(width/2, height/2, circleSize);


  if (volume > 0){
    //if current amplitude is greater than zero, push it to levels array
    myLevels.push(volume);
  }
  
  // no fill color ie just a line
  noFill();
  
  //begin shape starts a new shape with any number of vertexes
  beginShape()

  myLevels.forEach((level, i) => {
    // remap the value
    let y = map(level, 0.001, 0.4, canvasHeight, 0);
    console.log(y);
    vertex(i,y);
  })

  //end the shape
  endShape();
  
  // if the number of levels is bigger than half of the screen, delete the first one
  // this creates the scrolling effect
  if(myLevels.length > canvasWidth - 150){
    myLevels.splice(0, 1);
  }
}
  

// [finished code]()
// add a note that sound library must be included
// we use this "height" and "width" without defining them