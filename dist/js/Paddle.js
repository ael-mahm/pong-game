// SET THE MAXIMUM SPEED FOT THE COMPUTER
const SPEED = 0.02;

export default class Paddle {

  constructor(paddleElement) {
    this.paddleElement = paddleElement;
    this.reset();
  }

  get position() {
    return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue("--position"));
  }

  set position(value) {
    this.paddleElement.style.setProperty("--position", value);
  }

  // GET THE POSITION OF THE PADDLE: RECT
  rect() {
    return this.paddleElement.getBoundingClientRect();
  }

  // RESET THE COMPUTER PADDLE POSITION TO DEFAULT POSITION VALUE
  reset() {
    this.position = 50;
  }

  // UPDATE THE COMPUTER PADDLE POSITION USING THE DELTA TIME DIFFERENCE TIME AND THE BALL HEIGHT VALUE 
  update(delta, ballHeight) {

    // INCREMENT THE POSITION BY SPEED TIMES THE DELTA WITH DETECTING IF THE BALL IS ABOVE OR BELLOW OUR CURRENT POSITION
    this.position += SPEED * delta * (ballHeight - this.position);
  }
}