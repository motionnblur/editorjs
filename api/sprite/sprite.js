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

  SelectSprite() {
    this.selectionArea.Show();
    _editor.currentSelectedSprite = this;
    this.isSelected = true;
  }
  DeSelectSprite() {
    this.selectionArea.Hide();
    _editor.currentSelectedSprite = null;
    this.isSelected = false;
  }

  //////////// events
  onMouseDownSprite(e) {
    if (_editor.currentSelectedSprite) {
      _editor.DeSelectSprites();
    }

    mouseOnElement = true;
    this.movable = true;
    this.SelectSprite();

    this.offset = {
      x: e.clientX - this.image.offsetLeft,
      y: e.clientY - this.image.offsetTop,
    };
  }

  Destroy() {
    this.image.remove();
    this.selectionArea.Destroy();
  }
  ReDraw() {
    this.image.style.left = this.mousePos.x - this.width / 2 + "px";
    this.image.style.top = this.mousePos.y - this.width / 2 + "px";
  }
  //////////// events
}
