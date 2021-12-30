// jshint esversion: 10

Elements.install(this)

var Body = function (id, x=0, y=0, mass=1) {
  let body = {}
  body.id = id
  body.x = x
  body.y = y
  body.xv = 0.0001*(2*Math.random()-1)
  body.yv = 0.0001*(2*Math.random()-1)
  body.m = mass
  body.inactive = false
  return body
}

async function setup() {
  createCanvas(1920, 1920)
  background(0)
  
  let dist2 = (x1, y1, x2, y2) => {
    return pow(x2 - x1, 2) + pow(y2 - y1, 2)
  }
  
  let s = floor(random(1000000))
  s = 962508
  console.log(s)
  noiseSeed(s)
  randomSeed(s)
  
  for (let _ of [...Array(floor(width*height/333))]) {
    let x = random(width),
        y = random(height);
    [x, y] = [noise(x/width, y/width, 0)-0.5, noise(x/width, y/width, 1)-0.5]
    x *= width*4
    y *= height*4
    x += width/2
    y += height/2
    let d00 = dist2(x, y, width/2, height/2)/(width*width)
    strokeWeight(random(0.5, 2) * width/400)
    stroke(150, 200, 255, (1-Limit.clamp(d00+0.25, 0, 1))*255)
    point(x, y)
  }
  filter(BLUR, 8)
  for (let _ of [...Array(floor(width*height/1000))]) {
    let x = random(width),
        y = random(height);
    let d00 = dist2(x, y, width/2, height/2)/(width*width)
    let s = random(0.2, 1) * width/400
    noStroke()
    fill(255, (1-Limit.clamp(d00+0.25, 0, 1))*255)
    beginShape()
    let rot = random(0, 2*PI)
    for (let vert of [...Array(floor(random(3, 12)))].map((e,i,a) => ({
      x: sin(rot + i*2*PI/a.length), y: cos(rot + i*2*PI/a.length)
    }))) {
      vertex(x + vert.x*s, y + vert.y*s)
    }
    endShape(CLOSE)
  }
  
  let N = 4
  let Bs = [...Array(N)].map((e, i) => {
    let a = random()
    let x = 1*sin(2 * PI * i/N + a),
        y = 1*cos(2 * PI * i/N + a),
        m = 2 + random(3)
    return Body(i, x, y, m)
  })
  
  let G = 0.000005
  
  // Bs.forEach((b, i, a) => {
  //   a[i].xv -= 0.002 * sin(2 * PI * b.id/N)
  //   a[i].yv -= 0.002 * cos(2 * PI * b.id/N)
  // })
  
  drawingContext.globalCompositeOperation = 'lighten'
  
  while (true) {
    for (let b of Bs) {
      let d00 = dist2(b.x, b.y, 0, 0)
      if (d00 > 2) {
        if (Bs.filter(b => !b.inactive).length > 2) b.inactive = true
      }
      if (b.inactive) continue
      fill((1-Limit.clamp(d00-1, 0, 1))*255)
      noStroke()
      circle(map(b.x, -1.75, 1.75, 0, width), map(b.y, -1.75, 1.75, 0, height), 3*width/400)
      let xv = 0, yv = 0
      for (let n of Bs) {
        if (n.id == b.id) continue
        let d = dist2(b.x, b.y, n.x, n.y)
        // if (d < 0.005**2) {
        //   n.inactive = true
        //   b.m += n.m
        //   b.m /= 2
        // }
        if (n.inactive) continue
        xv -= G * n.m * (b.x - n.x) / d
        yv -= G * n.m * (b.y - n.y) / d
      }
      b.xv += xv
      b.yv += yv
      b.x += b.xv
      b.y += b.yv
    }
    await new Promise(requestAnimationFrame);
  }
}