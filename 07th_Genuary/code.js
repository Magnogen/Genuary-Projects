// jshint esversion: 10

Elements.install(this);

async function setup() {
  createCanvas(1920, 1920, WEBGL);
  
  background(0)
  let g = createGraphics(width, height)
  
  g.background(250)
  g.noFill()
  for (let i of [...Array(10)]) {
    let col = new Colour('hsl', random(360), random(0.4, 0.7), 0.5)
    g.stroke(col.r, col.g, col.b)
    g.strokeWeight(random(0.5, 4)*width/400)
    let r = random(25*width/400, 100*width/400)/2
    g.circle(random(r+8*width/400, width-r-8*width/400),
             random(r+8*height/400, height-r-8*height/400), r*2)
    
    if (random() < 0.5) continue
    col = new Colour('hsl', random(360), random(0.4, 0.7), 0.8)
    g.stroke(col.r, col.g, col.b)
    g.strokeWeight(random(0.5, 2)*width/400)
    g.line(random(width), random(height), random(width), random(height))
  }
  
  let over1R = random(50*width/400, 100*width/400)/2
  let over1X = random(width)
  let over1Y = random(-over1R/3, over1R/3)
  let over1C = new Colour('hsl', random(360), random(0.4, 0.7), 0.5)
  let over1W = random(2, 8)*width/400
  g.stroke(over1C.r, over1C.g, over1C.b)
  g.strokeWeight(over1W)
  g.circle(over1X, height+over1Y, over1R*2)
  
  let over2R = random(50*width/400, 100*width/400)/2
  let over2X = random(-over2R/3, over2R/3)
  let over2Y = random(height)
  let over2C = new Colour('hsl', random(360), random(0.4, 0.7), 0.5)
  let over2W = random(2, 8)*width/400
  g.stroke(over2C.r, over2C.g, over2C.b)
  g.strokeWeight(over2W)
  g.circle(width+over2X, over2Y, over2R*2)
  
  push()
  rotateY(random(0.4, 1.17))
  push()
  translate(-width/2, -height/2, -width/2)
  image(g, 0, 0, 0)
  pop()
  
  g.background(240)
  g.noFill()
  for (let i of [...Array(10)]) {
    let col = new Colour('hsl', random(360), random(0.4, 0.7), 0.5)
    g.stroke(col.r, col.g, col.b)
    g.strokeWeight(random(0.5, 4)*width/400)
    let r = random(25*width/400, 100*width/400)/2
    g.circle(random(r, width-r), random(r, height-r), r*2)
    
    if (random() < 0.8) continue
    col = new Colour('hsl', random(360), random(0.4, 0.7), 0.8)
    g.stroke(col.r, col.g, col.b)
    g.strokeWeight(random(0.5, 2)*width/400)
    g.line(random(width), random(height), random(width), random(height))
  }
  
  g.stroke(over2C.r, over2C.g, over2C.b)
  g.strokeWeight(over2W)
  g.circle(over2X, over2Y, over2R*2)
  
  push()
  rotateY(PI * 1.5)
  translate(-width/2, -height/2, -width/2)
  image(g, 0, 0, 0)
  pop()
  
  let col = new Colour('hsl', 20, 0.6, 0.6)
  g.background(col.r, col.g, col.b)
  col = new Colour('hsl', 20, 0.6, 0.55)
  g.stroke(col.r, col.g, col.b)
  g.strokeWeight(2*width/400)
  for (let i in [...Array(30)]) {
    g.line(g.height*i/30, 0, g.height*i/30, g.width)
    let x = (0|random(0, 30)) * width / 30
    let y = random(height)
    g.line(x, y, x+width/30, y)
  }
  
  g.stroke(over1C.r, over1C.g, over1C.b)
  g.strokeWeight(over1W)
  g.circle(over1X, over1Y, over1R*2)
  
  push()
  rotateX(PI/2)
  translate(-width/2, -height/2, -height/2)
  image(g, 0, 0, 0)
  pop()
  
  col = new Colour('hsl', 20, 0.6, 0.75)
  g.background(col.r, col.g, col.b)
  col = new Colour('hsl', 20, 0.6, 0.7)
  g.stroke(col.r, col.g, col.b)
  g.strokeWeight(2*width/400)
  for (let i in [...Array(30)]) {
    g.line(g.height*i/30, 0, g.height*i/30, g.width)
    let x = (0|random(0, 30)) * width / 30
    let y = random(height)
    g.line(x, y, x+width/30, y)
  }
  
  push()
  rotateX(PI/2)
  translate(-width/2, -height/2, height/2)
  image(g, 0, 0, 0)
  pop()
}
