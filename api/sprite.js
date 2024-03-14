class Sprite {
  constructor(image, ev) {
    this.image = image;
    this.image.draggable = false;

    this.image.classList.add("img");
    this.image.classList.add("onMouseDownAnim");

    this.image.style.position = "absolute";
    this.image.style.left = ev.clientX + "px";
    this.image.style.top = ev.clientY + "px";

    this.image.addEventListener("mousedown", onMouseDownSprite);
  }
  SetImage(image) {
    this.image = image;
  }
  GetImage() {
    return this.image;
  }
  SetPos(x, y) {
    this.image.style.left = x + "px";
    this.image.style.top = y + "px";
    this.posXAsFloat = x;
    this.posYAsFloat = y;
  }
  GetPos() {
    return {
      x: this.posXAsFloat,
      y: this.posYAsFloat,
    };
  }
  SetWidth(width) {
    this.image.style.width = width;
    this.widthAsFloat = width;
  }
  GetWidth() {
    return this.widthAsFloat;
  }
  SetHeight(height) {
    this.image.style.height = height;
    this.heightAsFloat = height;
  }
  GetHeight() {
    return this.heightAsFloat;
  }

  //////////// events
  onMouseDownSprite(e) {
    console.log(e);
  }
  //////////// events
}
