class Draggable extends EventObject {
  constructor(pos, image) {
    super(image);
    this.pos = {
      x: pos.clientX,
      y: pos.clientY,
    };
    this.isSelected = false;
    this.movable = false;
    this.clickCount = 0;
  }
  GetPos() {
    return this.pos;
  }
  SetPos(x, y) {
    const newPosX = x - this.offset.x;
    const newPosY = y - this.offset.y;

    this.image.style.left = newPosX + "px";
    this.image.style.top = newPosY + "px";

    this.pos = {
      x: newPosX,
      y: newPosY,
    };
  }
  StopDrag() {
    this.movable = false;
  }
  ReDraw() {
    this.ReDraw();
  }
}
