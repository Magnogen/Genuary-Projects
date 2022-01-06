// jshint esversion: 10

// this is just to record gifs
let FPS = 60
let capture = new CCapture({ format: "webm", framerate: FPS })
let do_capture = false

Habitat.Colour.install(this)

async function setup() {
  createCanvas(1920, 1920)
  
  let tode = {
    x: 0, y: 0.7999,
    xv: 0.01, yv: 0
  }
  
  let toCanvas = (x, y) => [map(x, -1, 1, 0, width), map(y, -1, 1, height, 0)]
  let toWorld = (x, y) => [map(x, 0, width, -1, 1), map(y, height, 0, -1, 1)]
  
  let iters;
  if (do_capture) {
    capture.start()
    iters = 0
  }
  
  let last = performance.now()
  let g = 1
  let dt = 0.1/100
  tode.xv = Math.sqrt(dt) * 0.4
  let time = 0
  do {
    let [px, py] = [tode.x, tode.y]
    
    tode.yv -= g * dt
    tode.yv *= 0.9995
    tode.x += tode.xv
    tode.y += tode.yv
    if (tode.y < -0.8) {
      tode.yv = -tode.yv
      tode.y = -0.8
    }
    if (tode.x > 0.8) {
      tode.xv = -tode.xv
      tode.x = 0.8
    }
    if (tode.x < -0.8) {
      tode.xv = -tode.xv
      tode.x = -0.8
    }
    
    let [x, y] = [tode.x, tode.y]
    
    stroke(...Colour.Red)
    strokeWeight(3*width/400)
    line(...toCanvas(px, py), ...toCanvas(x, y))
    
    if (do_capture) {
      capture.capture(document.getElementById("defaultCanvas0"))
      if (iters >= 60*FPS) { capture.save(); capture.stop(); console.log("saved"); break }
      iters++
      document.querySelector('div').innerHTML = iters + ' / ' + 60*FPS
    }
    
    if (Math.random() < 0.1) await new Promise(requestAnimationFrame)
    time++
    
  } while (time < 4000)
  
  let bgtop = Colour.White
  let bgbtm = Colour.make(192, 195, 197)
  
  let todetop = Colour.Red
  let todebtm = Colour.Purple
  
  loadPixels()
  let coords = [...Array(width*height)].map((e, i) => ({
    i: 4*i, x: i%width, y: Math.floor(i/width)
  }));
  for (let {x, y, i} of coords) {
    let r = Math.random()
    if (pixels[i + 3] == 0) {
      pixels[i + 0] = r > y/height ? bgtop[0] : bgbtm[0]
      pixels[i + 1] = r > y/height ? bgtop[1] : bgbtm[1]
      pixels[i + 2] = r > y/height ? bgtop[2] : bgbtm[2]
    } else {
      pixels[i + 0] = r + 5/6 > map(y, height*0.2, height*0.8, 0, 1) ? todetop[0] : todebtm[0]
      pixels[i + 1] = r + 5/6 > map(y, height*0.2, height*0.8, 0, 1) ? todetop[1] : todebtm[1]
      pixels[i + 2] = r + 5/6 > map(y, height*0.2, height*0.8, 0, 1) ? todetop[2] : todebtm[2]
    }
    pixels[i + 3] = 255
  }
  updatePixels()
}
