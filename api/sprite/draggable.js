class Draggable {
  constructor(pos) {
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
