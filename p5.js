const canvasSketch = require('canvas-sketch');
const p5Lib = require('p5');
let colors = require('nice-color-palettes');
let ran = require('canvas-sketch-util/random');

console.log('colors:', colors);

const random = ran.createRandom();
random.setSeed(5);

const preload = p5 => {
  // You can use p5.loadImage() here, etc...
};

const SIZE = 1000;

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: { p5: p5Lib, preload },
  dimensions: [ SIZE, SIZE ],
  // Turn on a render loop
  animate: true,
  fps: 24,
  playbackRate: 'throttle'
  //units: 'px',
  //scaleToFit: true
};

const NUM_CIRCLES = 1000;
const CIRCLE_SIZE = 50;
const COLOR_RANGE = 100;

class Circle {
  constructor(x, y, size, col, colNice){
    this.x = x;
    this.y =y;
    this.color = col;
    this.colorNice = colNice;
    this.size = size;
  }
  render(p5, time) {
    const size = this.size * 10 * random.noise3D(this.x, this.y, time/15);
    //const size = this.size;
    //p5.fill(this.color[0], this.color[1], this.color[2]);
    p5.fill(p5.color(this.colorNice));
    p5.ellipse(this.x, this.y, size, size);
  }
}

// Generate circles
const circles = [];
for (let i = 0; i < NUM_CIRCLES; i++) {
  const r = random.range(0, COLOR_RANGE);
  const g = random.range(0, COLOR_RANGE);
  const b = random.range(0, COLOR_RANGE);
  const c = new Circle(random.range(0, SIZE), random.range(0, SIZE), random.range(10, 50), [r, g, b], random.pick(colors[0]));
  circles.push(c);
}

canvasSketch(() => {
  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things
    p5.background(0);
    p5.fill(255);
    p5.noStroke();

    p5.colorMode(p5.RGB, COLOR_RANGE);

    // Random circles
    // for (let i = 0; i < 100; i++) {
    //   const size = random.range(10, 100);
    //   // Color
    //   p5.fill(random.range(50, COLOR_RANGE), random.range(0, 50), random.range(0, 50));
    //   // Draw circle
    //   p5.ellipse(random.range(0, SIZE), random.range(0, SIZE), size, size);
    // }

    // Controlled Circles
    circles.map((c) => {
      c.render(p5, time);
    });

  };
}, settings);
