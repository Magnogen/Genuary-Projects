// jshint esversion: 10

Elements.install(this)

async function setup() {
  createCanvas(1920, 1920)
  pixelDensity(1)
  
  let seed = ~~random(0, 1000000)
  seed = 287675
  console.log(seed)
  randomSeed(seed)
  
  background(220)
  
  fill(35)
  rect(width * 0.1, height * 0.1, width * 0.8, height * 0.8)
  
  stroke(255)
  for (let _ of [...Array(35)]) {
    strokeWeight(random(4, 8)*width/400)
    line(random(width*0.1, width*0.9), 0, random(width*0.1, width*0.9), height)
    line(0, random(height*0.1, height*0.9), width, random(height*0.1, height*0.9))
    await new Promise(requestAnimationFrame)
  }
  
  fill(220)
    noStroke()
    rect(0, 0, width*0.1, height)
    rect(0, 0, width, height*0.1)
    rect(width, height, -width, -height*0.1)
    rect(width, height, -width*0.1, -height)
  
  let coords = [...Array(width*height)].map((e, i) => ({
    i: 4*i, x: i%width, y: Math.floor(i/width)
  }));
  
  let last = performance.now()
  
  loadPixels()
  for (let {x, y, i} of coords) {
    
    let col = new Colour('hsl', random(360), 1, 0.5)
    
    if (pixels[i] > 200) {
      if (random() < 0.0002) {
        if (x < width*0.1 || x > width*0.9) continue
        if (y < height*0.1 || y > height*0.9) continue
        pixels[i + 0] = col.r
        pixels[i + 1] = col.g
        pixels[i + 2] = col.b
        pixels[i + 0] = Math.max(35, pixels[i + 0])
        pixels[i + 1] = Math.max(35, pixels[i + 1])
        pixels[i + 2] = Math.max(35, pixels[i + 2])
      }
      continue
    }
    
    pixels[i + 0] = 255-((255-pixels[i + 0]) * col.r)
    pixels[i + 1] = 255-((255-pixels[i + 1]) * col.g)
    pixels[i + 2] = 255-((255-pixels[i + 2]) * col.b)
      
    pixels[i + 0] = Math.max(35, pixels[i + 0])
    pixels[i + 1] = Math.max(35, pixels[i + 1])
    pixels[i + 2] = Math.max(35, pixels[i + 2])

    let now = performance.now()
    if (now - last > 1000/30) {
      last = now
      updatePixels()
      await new Promise(requestAnimationFrame)
    }
  }
  updatePixels()
  
  function fy(a,b,c,d){//array,placeholder,placeholder,placeholder
    c=a.length;while(c)b=random()*(--c+1)|0,d=a[c],a[c]=a[b],a[b]=d;
  }
  
  fy(coords)
  
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
      
      pixels[i + 0] = Math.min(pixels[L + 0], pixels[R + 0], pixels[U + 0], pixels[D + 0])
      pixels[i + 1] = Math.min(pixels[L + 1], pixels[R + 1], pixels[U + 1], pixels[D + 1])
      pixels[i + 2] = Math.min(pixels[L + 2], pixels[R + 2], pixels[U + 2], pixels[D + 2])
      
      let now = performance.now()
      if (now - last > 1000/30) {
        last = now
        updatePixels()
        await new Promise(requestAnimationFrame)
      }
    }
    updatePixels()
    
    console.log(`iteration ${iter} done`)
    
  } while (iter < Math.floor(0.9*width/192))
    
    fill(220)
    noStroke()
    rect(0, 0, width*0.1, height)
    rect(0, 0, width, height*0.1)
    rect(width, height, -width, -height*0.1)
    rect(width, height, -width*0.1, -height)
    
  console.log('all done')
  
}
