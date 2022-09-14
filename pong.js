const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.height = 576;
canvas.width = 1024;
pong1SCR = 0;
pong2SCR = 0;
c.fillRect(0, 0, canvas.width, canvas.height);
class sprite {
  constructor({ position, vari, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.vari = vari;
  }
  draw() {
    c.fillStyle = "#ffffff44";
    c.fillRect(510, 0, 4, canvas.height);
    c.fillRect(46, 0, 4, canvas.height);
    c.fillRect(974, 0, 4, canvas.height);
    c.fillStyle = "#ffffffdd";
    c.fillRect(
      this.position.x,
      this.position.y,
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
    ball.position.y += ball.velocity.y;
    //reset ball position if scored
    if (ball.position.x > 1014) {
      ball.position.x = 512;
      ball.position.y = 288;
      ball.velocity.x = -ball.velocity.x;
      ball.velocity.y = 0;
      pong1.position.y = 238;
      pong2.position.y = 238;
      pong1SCR += 1;
      document.getElementById("pong1SCR").innerHTML = pong1SCR;
    } else if (ball.position.x < 10) {
      ball.position.x = 512;
      ball.position.y = 288;
      ball.velocity.x = -ball.velocity.x;
      ball.velocity.y = 0;
      pong1.position.y = 238;
      pong2.position.y = 238;
      pong2SCR += 1;
      document.getElementById("pong2SCR").innerHTML = pong2SCR;
    }
    //map borders
    if (ball.position.y > canvas.height || ball.position.y < 0) {
      ball.velocity.y = -ball.velocity.y;
    }
    //pong2 collision
    if (
      ball.position.x + ball.vari.width > pong2.position.x &&
      ball.position.y >= pong2.position.y &&
      ball.position.y <= pong2.position.y + pong2.vari.height / 2
    ) {
      ball.velocity.x = -ball.velocity.x;
      ball.velocity.y = -5;
    }
    if (
      ball.position.x + ball.vari.width > pong2.position.x &&
      ball.position.y >= pong2.position.y + pong2.vari.height / 2 &&
      ball.position.y <= pong2.position.y + pong2.vari.height
    ) {
      ball.velocity.x = -ball.velocity.x;
      ball.velocity.y = 5;
    }
    //pong1 collision
    if (
      ball.position.x < pong1.position.x + pong1.vari.width &&
      ball.position.y >= pong1.position.y &&
      ball.position.y <= pong1.position.y + pong1.vari.height / 2
    ) {
      ball.velocity.x = -ball.velocity.x;
      ball.velocity.y = -5;
    }
    if (
      ball.position.x < pong1.position.x + pong1.vari.width &&
      ball.position.y >= pong1.position.y + pong1.vari.height / 2 &&
      ball.position.y <= pong1.position.y + pong1.vari.height
    ) {
      ball.velocity.x = -ball.velocity.x;
      ball.velocity.y = 5;
    }
  }
}

//pong p1
const pong1 = new sprite({
  position: {
    x: 50,
    y: 238,
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
    y: 238,
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
    x: 502,
    y: 278,
  },
  velocity: {
    x: 7,
    y: 0,
  },
  vari: {
    width: 20,
    height: 20,
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
  k: {
    pressed: false,
  },
  i: {
    pressed: false,
  },
};
const hotkeys = {
  t: {
    pressed: false,
  },
  g: {
    pressed: false,
  },
  z: {
    pressed: false,
  },
  x: {
    pressed: false,
  },
  c: {
    pressed: false,
  },
  v: {
    pressed: false,
  },
};
let pong1lastkey;
let pong2lastkey;
//cycles
function animate() {
  window.requestAnimationFrame(animate);
  if (hotkeys.z.pressed == true) {
    c.fillStyle = "#660000";
  } else if (hotkeys.x.pressed == true) {
    c.fillStyle = "#000066";
  } else if (hotkeys.c.pressed == true) {
    c.fillStyle = "#006600";
  } else if (hotkeys.v.pressed == true) {
    c.fillStyle = "#660066";
  } else {
    c.fillStyle = "black";
  }
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
  if (pong2keys.k.pressed == true && pong2lastkey == "k") {
    pong2.velocity.y = +pong2.vari.speed;
  } else if (pong2keys.i.pressed == true && pong2lastkey == "i") {
    pong2.velocity.y = -pong2.vari.speed;
  }
  //pong2 AI
  if (
    hotkeys.t.pressed == true &&
    ball.position.y > pong2.position.y + pong2.vari.height / 2
  ) {
    pong2keys.k.pressed = true;
    pong2lastkey = "k";
  } else if (
    hotkeys.t.pressed == true &&
    ball.position.y < pong2.position.y + pong2.vari.height / 2
  ) {
    pong2keys.i.pressed = true;
    pong2lastkey = "i";
  }
  //pong1 AI
  if (
    hotkeys.g.pressed == true &&
    ball.position.y > pong1.position.y + pong1.vari.height / 2
  ) {
    pong1keys.s.pressed = true;
    pong1lastkey = "s";
  } else if (
    hotkeys.g.pressed == true &&
    ball.position.y < pong1.position.y + pong1.vari.height / 2
  ) {
    pong1keys.w.pressed = true;
    pong1lastkey = "w";
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
    case "k":
      pong2keys.k.pressed = true;
      pong2lastkey = "k";
      break;
    case "i":
      pong2keys.i.pressed = true;
      pong2lastkey = "i";
      break;
    case "t":
      hotkeys.t.pressed = true;
      break;
    case "y":
      hotkeys.t.pressed = false;
      pong2keys.k.pressed = false;
      pong2keys.i.pressed = false;
      break;
    case "g":
      hotkeys.g.pressed = true;
      break;
    case "h":
      hotkeys.g.pressed = false;
      pong1keys.s.pressed = false;
      pong1keys.w.pressed = false;
      break;
    case "z":
      hotkeys.z.pressed = true;
      hotkeys.x.pressed = false;
      hotkeys.c.pressed = false;
      hotkeys.v.pressed = false;
      break;
    case "x":
      hotkeys.x.pressed = true;
      hotkeys.z.pressed = false;
      hotkeys.c.pressed = false;
      hotkeys.v.pressed = false;
      break;
    case "c":
      hotkeys.c.pressed = true;
      hotkeys.z.pressed = false;
      hotkeys.x.pressed = false;
      hotkeys.v.pressed = false;
      break;
    case "v":
      hotkeys.v.pressed = true;
      hotkeys.z.pressed = false;
      hotkeys.x.pressed = false;
      hotkeys.c.pressed = false;
      break;
    case "m":
      hotkeys.z.pressed = false;
      hotkeys.x.pressed = false;
      hotkeys.c.pressed = false;
      hotkeys.v.pressed = false;
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
    case "k":
      pong2keys.k.pressed = false;
      break;
    case "i":
      pong2keys.i.pressed = false;
      break;
  }
});
