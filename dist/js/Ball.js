// SET THE INITIAL VELOCITY VALUE
const INITIAL_VELOCITY = 0.025;

// SET THE VELOCITY INCREASE VALUE
const VELOCITY_INCREASE = 0.00001;

export default class Ball {
  constructor(ballElement) {
    this.ballElement = ballElement;
    this.reset();
  }

  // GET THE X VALUE FROM THE CSS FILE
  get x() {
    return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--x"));
  }

  // SET THE X VALUE TO THE CSS FILE
  set x(value) {
    this.ballElement.style.setProperty("--x", value);
  }

  // GET THE Y VALUE FROM THE CSS FILE
  get y() {
    return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--y"));
  }

  // SET THE Y VALUE TO THE CSS FILE
  set y(value) {
    this.ballElement.style.setProperty("--y", value);
  }

  // GET THE POSITION OF THE BALL
  rect() {
    return this.ballElement.getBoundingClientRect();
  }

  // RESET THE X & Y AXES TO DEFAULT VALUES  
  reset() {

    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };

    // CHECK OUT FOR THE DIRECTION: MAKE SURE THAT THE BALL MOVES TO THE LEFT & RIGHT DIRECTION TOO, NOT ONLY UP & DOWN
    while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {

      // CREATE A RANDOM VALUE BETWEEN 0 & 2 TIMES PI TO DETERMINE THE DIRECTION 
      const heading = randomNumberBetween(0, 2 * Math.PI);

      // CALCULATE THE DIRECTION: CALCULATE THE UNITE VECTOR FOR THESE POSITIONS
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };


      // SET THE VELOCITY
      this.velocity = INITIAL_VELOCITY;
    }
    // console.log(this.direction);
  }

  // UPDATE THE X & Y AXES VALUES USING THE DELTA TIME DIFFERENCE TIME 
  update(delta, paddleRects) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;

    // SPEED UP AS THE TIME GOES ON
    this.velocity += VELOCITY_INCREASE * delta;

    const rect = this.rect();

    // CHECK IF WE PASSED THE BOTTOM OF THE SCREEN OR WE HAVE GONE OFF THE TOP OF THE SCREEN
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {

      // THEN GO TO THE OPPOSITE DIRECTION
      this.direction.y *= -1;
    }

    // CHECK IF WE ANY OF OUR RECTANGLES HAD A COLLISION: IF ANY OF RECTS RETURN TRUE TO THE COLLISION, IT RETURNS TRUE TO THE WHOLE THING
    if (paddleRects.some((r) => { return isCollision(r, rect); })) {

      // THEN GO TO THE OPPOSITE DIRECTION
      this.direction.x *= -1;
    }
    // console.log(this.direction);
  }

}

// GENERATE A RANDOM BETWEEN TWO NUMBERS
function randomNumberBetween(min, max) {
  return Math.random() * (min - max) + min;
}


// IS COLLISION FUNCTION: CHECK THE BALL COLLISION WITH ANT OF OUR PADDLES5(COMPUTER OR PLAYER)
function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}