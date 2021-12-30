// jshint esversion: 10

let last = performance.now()

async function setup() {
  createCanvas(1920, 1920)
  let C = createGraphics(width/8, height/8)
  
  // experimenting with randomised grid patterns
  let size = 4, max = 8
  let map = []
  for (let intensity of [...Array(max)].map((e, i) => i)) {
    map[intensity] = [...Array(size)].map(e => [])
    for (let {x, y, i} of [...Array(size*size)].map((e, i) => ({ i: i, x: i%size, y: floor(i/size) }))) {
      map[intensity][x][y] = random() < intensity/max ? 1 : 0
    }
  }
  
  // what i went for in the end lol (i wanted to toggle it quickly okay?)
  if (true) {
    size = 4
    max = 8
    map = [
      [
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ]
      ],
      [
        [ 1, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 1, 0, 0 ],
        [ 0, 0, 0, 0 ]
      ],
      [
        [ 1, 0, 1, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 1, 0, 1 ],
        [ 0, 0, 0, 0 ]
      ],
      [
        [ 1, 0, 1, 0 ],
        [ 0, 1, 0, 1 ],
        [ 0, 1, 0, 1 ],
        [ 1, 0, 1, 0 ]
      ],
      [
        [ 1, 0, 1, 0 ],
        [ 0, 1, 0, 1 ],
        [ 0, 1, 0, 1 ],
        [ 1, 0, 1, 0 ]
      ],
      [
        [ 1, 0, 1, 0 ],
        [ 1, 1, 1, 1 ],
        [ 0, 1, 0, 1 ],
        [ 1, 1, 1, 1 ]
      ],
      [
        [ 1, 0, 1, 1 ],
        [ 1, 1, 1, 1 ],
        [ 1, 1, 1, 1 ],
        [ 1, 1, 1, 1 ]
      ],
      [
        [ 1, 1, 1, 1 ],
        [ 1, 1, 1, 1 ],
        [ 1, 1, 1, 1 ],
        [ 1, 1, 1, 1 ]
      ]
    ]
  }
  
  let s = floor(random(1000000))
  // s = 429488
  s = 138921
  noiseSeed(s)
  console.log(s)
  
  C.loadPixels();
  let coords = [...Array(C.width*C.height)].map((e, i) => ({
    i: 4*i, x: i%C.width, y: Math.floor(i/C.width)
  }))
  // coords.sort(a => Math.random()-0.5)
  
  // from when I worked on Habitat - you should go ckeck it out https://github.com/l2wilson94/Habitat :)
  let f = (p) => (t) => {
    if (t > 1) return 1
    if (t < 0.5) return Math.pow(2, p-1)*Math.pow(t, p)
    return 1 - Math.pow(2 - 2*t, p)/2
  }
  
  for (let index in coords) {
    let {x, y, i} = coords[index]
    let r = C.pixels[i + 0],
        g = C.pixels[i + 1],
        b = C.pixels[i + 2],
        a = C.pixels[i + 3]
    
    // hues and stuff
    // let col = new Elements.Colour('hsl', f(3)(noise(6*x/C.width, 6*y/C.height, 0)) * 360, 1, 0.5)
    // col = new Elements.Colour('hsl', f(1)(x/C.width) * 360, 1, 0.5)
    // [r, g, b] = col.rgb
    
    // makes blue more prevalent, almost like increasing the contrast on the red aand green channels
    r = f(16)(noise(4*x/C.width, 4*y/C.height, 0)) * 255
    g = f(6)(noise(4*x/C.width, 4*y/C.height, 0)) * 255
    b = f(4)(noise(4*x/C.width, 4*y/C.height, 0)) * 255
    a = 255
    
    // the actual dithering - surprisingly simple!  
    C.pixels[i + 0] = map[floor(max*r/256)][x%size][y%size] * 255
    C.pixels[i + 1] = map[floor(max*g/256)][x%size][y%size] * 255
    C.pixels[i + 2] = map[floor(max*b/256)][x%size][y%size] * 255
    C.pixels[i + 3] = a
    
    if (performance.now() - last > 1000/10) {
      C.updatePixels()
      document.querySelector('div').innerHTML = 100*index/coords.length
      await new Promise(requestAnimationFrame)
      last = performance.now()
    }
  }
  C.updatePixels()
  document.querySelector('div').innerHTML = '100'
  
  // used https://gist.github.com/gncgnc/fc645b8db00ec43d43fecef37d58df73
  // to resize the image based on nearest neighbour - a pixelated effect
  var I = createImage(C.width, C.height)
  I.copy(C, 0, 0, C.width, C.height, 0, 0, C.width, C.height)
  I.resizeNN(width, 0)
  image(I, 0, 0)
  
}

