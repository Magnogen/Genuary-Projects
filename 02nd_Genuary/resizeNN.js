/**
 * Resize the image to a new width and height using nearest neigbor algorithm. To make the image scale
 * proportionally, use 0 as the value for the wide or high parameter.
 * For instance, to make the width of an image 150 pixels, and change
 * the height using the same proportion, use resize(150, 0). 
 * Otherwise same usage as the regular resize().
 * 
 * Note: Disproportionate resizing squashes the "pixels" from squares to rectangles. 
 * This works about 10 times slower than the regular resize. Any suggestions for performance increase are welcome.
 */

p5.Image.prototype.resizeNN = function(width, height) {
  if (width === 0 && height === 0) {
    width = this.canvas.width;
    height = this.canvas.height;
  } else if (width === 0) {
    width = this.canvas.width * height / this.canvas.height;
  } else if (height === 0) {
    height = this.canvas.height * width / this.canvas.width;
  }

  width = Math.floor(width);
  height = Math.floor(height);

  var temp = createImage(width,height),
    xScale = width / this.width ,
    yScale = height / this.height

  this.loadPixels()
  temp.loadPixels()
  for(var x=0; x<temp.width; x++) {
    for(var y=0; y<temp.height; y++) {
      var sourceInd = 4*(Math.floor(y/yScale)*this.width + Math.floor(x/xScale))
      var targetInd = 4*(y*temp.width + x)
      var sourceP = this.pixels.slice(sourceInd,sourceInd+4)//this.get(x/wScale, y/hScale)
      temp.pixels[targetInd] = sourceP[0]
      temp.pixels[targetInd+1] = sourceP[1]
      temp.pixels[targetInd+2] = sourceP[2]
      temp.pixels[targetInd+3] = sourceP[3]
    }
  }
  temp.updatePixels()
  this.updatePixels()

  this.canvas.width = this.width = width;
  this.canvas.height = this.height = height;

  this.drawingContext.drawImage(temp.canvas,
    0, 0, width, height,
    0, 0, width, height
  )
};