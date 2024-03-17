class DynamicTexture extends Draggable {
  constructor(pos, image, width, height) {
    super(pos, image);

    this.image = image;
    image.style.display = "block";

    this.image.style.position = "absolute";
    this.image.style.left = pos.x + "px";
    this.image.style.top = pos.y + "px";
    this.image.draggable = false;
    this.image.classList.add("img");
    this.image.style.width = width + "px";
    this.image.style.height = height + "px";
  }
  Display() {
    this.image.style.display = "block";
  }
  Hide() {
    this.image.style.display = "none";
  }
  Draw(x, y) {
    this.image.style.left = x + "px";
    this.image.style.top = y + "px";
    this.onDraw();
  }
  onDraw() {}
}
