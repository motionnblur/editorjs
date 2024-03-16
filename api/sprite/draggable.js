class Draggable extends EventObject {
  constructor(pos, image) {
    super(image);
    this.pos = {
      x: pos.clientX,
      y: pos.clientY,
    };
  }
  GetPos() {
    return this.pos;
  }
  SetPos(x, y) {
    this.pos = {
      x: x,
      y: y,
    };
  }
}
