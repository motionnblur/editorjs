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

    this.image.addEventListener("mousedown", this.onMouseDownSprite.bind(this));

    this.selectionArea = new SelectionArea(this, 30);

    this.clickCount = 0;
    this.isSelected = false;
    this.movable = false;
  }
  SetImage(image) {
    this.image = image;
  }
  GetImage() {
    return this.image;
  }
  SetPos(x, y) {
    const newPosX = x - this.offset.x;
    const newPosY = y - this.offset.y;

    this.image.style.left = newPosX + "px";
    this.image.style.top = newPosY + "px";

    this.posX = newPosX;
    this.posY = newPosY;

    this.selectionArea.updatePos(newPosX, newPosY);
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
  StopDrag() {
    this.movable = false;
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
  //////////// events
}
