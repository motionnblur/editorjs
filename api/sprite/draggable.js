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
  StopDrag() {
    /* this.movable = false; */
  }
  onMouseDown(e) {
    this.mouseDown = true;

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

    this.image.style.left = newPosX + "px";
    this.image.style.top = newPosY + "px";

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
  Move(e) {
    const newPosX = e.clientX - this.offset.x;
    const newPosY = e.clientY - this.offset.y;

    this.image.style.left = newPosX + "px";
    this.image.style.top = newPosY + "px";

    this.DrawSelectionArea(newPosX, newPosY);
  }
}
