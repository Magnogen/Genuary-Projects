// jshint esversion: 10

Elements.install(this)

async function setup() {
  createCanvas(1920, 1920)
  pixelDensity(1)
  
  let seed = ~~random(0, 1000000)
  seed = 287676
  console.log(seed)
  randomSeed(seed)
  
  background(220)
  
  fill(0)
  rect(width * 0.1, height * 0.1, width * 0.8, height * 0.8)
  
  stroke(220)
  for (let _ of [...Array(30)]) {
    strokeWeight(random(4, 8)*width/400)
    line(random(width*0.1, width*0.9), 0, random(width*0.1, width*0.9), height)
    line(0, random(height*0.1, height*0.9), width, random(height*0.1, height*0.9))
    await new Promise(requestAnimationFrame)
  }
  
  let coords = [...Array(width*height)].map((e, i) => ({
    i: 4*i, x: i%width, y: Math.floor(i/width)
  }));
  
  let last = performance.now()
  
  loadPixels()
  for (let {x, y, i} of coords) {
    pixels[i + 0] = 255-((255-pixels[i + 0]) * random())
    pixels[i + 1] = 255-((255-pixels[i + 1]) * random())
    pixels[i + 2] = 255-((255-pixels[i + 2]) * random())

    let now = performance.now()
    if (now - last > 1000/30) {
      last = now
      updatePixels()
      await new Promise(requestAnimationFrame)
    }
  }
  updatePixels()
  
  coords.sort(a => random(-1, 1))
  
  let iter = 0
  do {
    
    iter ++
    await new Promise(requestAnimationFrame)
    
    loadPixels()
    for (let {x, y, i} of coords) {
      let U = 4*(x                      + Math.max(y-1, 0)*width)
      let D = 4*(x                      + Math.min(y+1, height-1)*width)
      let L = 4*(Math.max(x-1, 0)       + y*width)
      let R = 4*(Math.min(x+1, width-1) + y*width)
      
      pixels[i + 0] = Math.min(pixels[L + 0], pixels[R + 0], pixels[U + 0], pixels[D + 0]) + 2
      pixels[i + 1] = Math.min(pixels[L + 1], pixels[R + 1], pixels[U + 1], pixels[D + 1]) + 2
      pixels[i + 2] = Math.min(pixels[L + 2], pixels[R + 2], pixels[U + 2], pixels[D + 2]) + 2
      
    }
    updatePixels()
    
  // } while (true)
  } while (iter < Math.floor(width/192))
  console.log('done')
  
}
