const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.height = 576;
canvas.width = 1024;

c.fillRect(0, 0, canvas.width, canvas.height);
class sprite {
  constructor({ position, vari, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.vari = vari;
  }
  draw() {
    c.fillStyle = "gray";
    c.fillRect(510, 0, 4, canvas.height);
    c.fillStyle = "gray";
    c.fillRect(46, 0, 4, canvas.height);
    c.fillStyle = "gray";
    c.fillRect(974, 0, 4, canvas.height);
    c.fillStyle = "white";
    c.fillRect(
      this.position.x - this.vari.Xoffset,
      this.position.y - this.vari.Yoffset,
      this.vari.width,
      this.vari.height
    );
  }
  update() {
    this.draw();
    this.position.y += this.velocity.y;
    if (this.position.y < 0) {
      this.position.y = 0;
    } else if (this.position.y > canvas.height - this.vari.height) {
      this.position.y = canvas.height - this.vari.height;
    }
  }
  ballmove() {
    this.draw();
    ball.position.x += ball.velocity.x;
    if (ball.position.x > 1014) {
      ball.position.x = 512;
      ball.position.y = 288;
    }
  }
}

//pong p1
const pong1 = new sprite({
  position: {
    x: 50,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  vari: {
    width: 20,
    height: 100,
    Xoffset: 0,
    Yoffset: 0,
    speed: 5,
  },
});
//pong p2
const pong2 = new sprite({
  position: {
    x: 954,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  vari: {
    width: 20,
    height: 100,
    Xoffset: 0,
    Yoffset: 0,
    speed: 5,
  },
});
//ball
const ball = new sprite({
  position: {
    x: 512,
    y: 288,
  },
  velocity: {
    x: 5,
    y: 0,
  },
  vari: {
    width: 20,
    height: 20,
    Xoffset: 10,
    Yoffset: 10,
  },
});

//keys
const pong1keys = {
  s: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
};
const pong2keys = {
  ArrowDown: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};
let pong1lastkey;
let pong2lastkey;
//cycles
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  pong1.update();
  pong2.update();
  ball.ballmove();
  //movement
  pong1.velocity.y = 0;
  if (pong1keys.s.pressed == true && pong1lastkey == "s") {
    pong1.velocity.y = +pong1.vari.speed;
  } else if (pong1keys.w.pressed == true && pong1lastkey == "w") {
    pong1.velocity.y = -pong1.vari.speed;
  }
  pong2.velocity.y = 0;
  if (pong2keys.ArrowDown.pressed == true && pong2lastkey == "ArrowDown") {
    pong2.velocity.y = +pong2.vari.speed;
  } else if (pong2keys.ArrowUp.pressed == true && pong2lastkey == "ArrowUp") {
    pong2.velocity.y = -pong2.vari.speed;
  }
}
animate();
//button

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "s":
      pong1keys.s.pressed = true;
      pong1lastkey = "s";
      break;
    case "w":
      pong1keys.w.pressed = true;
      pong1lastkey = "w";
      break;
    case "ArrowDown":
      pong2keys.ArrowDown.pressed = true;
      pong2lastkey = "ArrowDown";
      break;
    case "ArrowUp":
      pong2keys.ArrowUp.pressed = true;
      pong2lastkey = "ArrowUp";
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "s":
      pong1keys.s.pressed = false;
      break;
    case "w":
      pong1keys.w.pressed = false;
      break;
    case "ArrowDown":
      pong2keys.ArrowDown.pressed = false;
      break;
    case "ArrowUp":
      pong2keys.ArrowUp.pressed = false;
      break;
  }
});
