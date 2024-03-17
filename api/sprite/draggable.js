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
  SetMovable(_bool) {
    this.movable = _bool;
  }
  onMouseDown(e) {
    this.isSelected = true;
    this.mouseDown = true;

    this.SetMovable(true);

    this.firstMousePos = {
      x: e.clientX,
      y: e.clientY,
    };
    this.offset = {
      x: e.clientX - this.image.offsetLeft,
      y: e.clientY - this.image.offsetTop,
    };

    const newPosX = e.clientX - this.offset.x;
    const newPosY = e.clientY - this.offset.y;

    this.pos = {
      x: newPosX,
      y: newPosY,
    };

    this.MouseDown(newPosX, newPosY);
  }
  onMouseMove(e) {
    /* this.mousePos = {
      x: e.clientX,
      y: e.clientY,
    }; */
  }
  onMouseUp(e) {
    this.mouseDown = false;
  }
  UpdatePos(e) {
    if (!this.movable) return;

    const newPosX = e.clientX - this.offset.x;
    const newPosY = e.clientY - this.offset.y;

    this.pos = {
      x: newPosX,
      y: newPosY,
    };

    this.Draw(newPosX, newPosY);
  }
}
