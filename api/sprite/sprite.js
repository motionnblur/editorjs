class Sprite extends Draggable {
  constructor(image, ev, width, height) {
    super(ev, image);

    this.width = width;
    this.firstWidth = width;

    this.height = height;

    this.image = image;
    this.image.draggable = false;

    this.image.classList.add("img");

    this.image.style.position = "absolute";
    this.image.style.left = ev.clientX + "px";
    this.image.style.top = ev.clientY + "px";

    this.image.style.width = this.width + "px";
    this.image.style.height = this.height + "px";

    this.selectionArea = new SelectionArea(this, 30);
  }
  SetImage(image) {
    this.image = image;
  }
  GetImage() {
    return this.image;
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

  Destroy() {
    this.image.remove();
    this.selectionArea.Destroy();
  }

  //////////// events
}
