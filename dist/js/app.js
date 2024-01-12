import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");

let lastTime;

// UPDATE LOOP
function update(time) {
  // console.log(time);

  // CHECK FOR LAST TIME VARIABLE
  if (lastTime != null) {

    // DETERMINE HOW MUCH TIME HAS PASSED FROM THE PREVIOUS FRAME TO THE NEW FRAME
    const delta = time - lastTime;

    // UPDATE THE BALL DIRECTION
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);

    // UPDATE THE COMPUTER PADDLE POSITION
    computerPaddle.update(delta, ball.y);
    // console.log(delta);

    // GET THE HUE VARIABLE FROM THE CSS FILE
    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));

    // CHANGE THE HUE VARIABLE
    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    // CHECK IF THE BALL HAS GONE OFF THE SIDE OF THE SCREEN : CHECK IF WE LOST THE GAME THEN FIRE THE HANDLE LOOSE FUNCTION
    if (isLoose()) {
      handleLoose();
    }
  }

  lastTime = time;

  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);

// ADD MOUSE MOVE EVENT LISTENER TO THE WINDOW ELEMENT
window.addEventListener("mousemove", (e) => {

  // GENERATE THE PERCENTAGE OF THE POSITION VALUE FROM THE EVENT Y AXIS 
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

// IS LOOSE FUNCTION: DETERMINE IF WE LOOSE THE GAME
function isLoose() {

  // GET THE RECT VARIABLE
  const rect = ball.rect();

  // CHECK IF WE PASSED THE RIGHT OF THE SCREEN OR WE HAVE GONE OFF THE LEFT OF THE SCREEN
  return (rect.right >= window.innerWidth) || (rect.left <= 0);
}

// HANDLE LOOSE FUNCTION
function handleLoose() {

  const rect = ball.rect();

  // DETERMINE IF WE WENT OFF THE RIGHT SIDE OF THE SCREEN 
  if (rect.right >= window.innerWidth) {
    // IF YES: INCREMENT THE PLAYER SCORE BY 1
    playerScoreElement.textContent = parseInt(playerScoreElement.textContent) + 1;
  } else {
    // IF NO: INCREMENT THE COMPUTER SCORE BY 1
    computerScoreElement.textContent = parseInt(computerScoreElement.textContent) + 1;
  }

  // RESET EVERYTHING
  ball.reset();
  computerPaddle.reset();
}