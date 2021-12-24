// jshint esversion: 10

// this is just to record gifs
// let capture = new CCapture({ format: "webm", framerate: 60 })

Elements.install(this) // my library (https://github.com/Magnogen/Elements)
// this code also uses P5.js (https://p5js.org/)

async function setup() {
  createCanvas(1920, 1920)
  pixelDensity(1)
  
  let col = new Colour()
  col.hsl = [200, 0.2, 0.2]
  let bg = col.render()
  background(bg)
  
  // a small scale - I upped this number to 10,000 for the final render, but it took a long time lmao
  let Ps = [...Array(500)].map(e => {
    col.h = random(190, 210)
    col.s = random(0.5, 0.8)
    col.l = random(0.6, 1)
    col.a = 2
    return ({
      x: random(width), y: random(height), size: random(0.5*width/400, 3*width/400),
      rot: random(2*PI), sides: floor(random(3, 7)), col: col.render(),
      render() {
        fill(this.col)
        noStroke()

        beginShape()
        for (let vert of [...Array(this.sides)].map((e,i,a) => ({
          x: sin(this.rot + i*2*PI/a.length), y: cos(this.rot + i*2*PI/a.length)
        }))) {
          vertex(this.x + vert.x*this.size, this.y + vert.y*this.size)
        }
        endShape(CLOSE)

      }
    })
  })
  
  let dist2 = (x1, y1, x2, y2) => Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2)
  
  let G = 16
  
  let last = performance.now()
  
  // gif rendering
  // capture.start()
  // let iters = 0
  while (true) {
    background(bg)
    for (let p of Ps) {
      p.render()
      for (let q of Ps) {
        let d = dist2(p.x, p.y, q.x, q.y)
        if (d == 0) continue;
        if (d > pow(0.002*width*width / (p.size + q.size), 2)) g = -G
        else g = G
        p.x += g * (p.x - q.x) / d
        p.y += g * (p.y - q.y) / d
        
        // let now = performance.now()
        // if (now - last > 1000/2) {
        //   await new Promise(requestAnimationFrame)
        //   last = now
        // }
      }
    }
    
    // gif again lol - this time capturing and saving
    // capture.capture(document.getElementById("defaultCanvas0"));
    // if (iters >= 360) { capture.save(); capture.stop(); console.log("saved"); break }
    // iters++
    
    await new Promise(requestAnimationFrame)
    // let now = performance.now()
    // if (now - last > 1000/30) {
    //   await new Promise(requestAnimationFrame)
    //   last = now
    // }
  }
  
  console.log('done')
}
