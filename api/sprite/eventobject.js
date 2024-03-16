class EventObject {
  constructor(elem) {
    elem.addEventListener("mousedown", this.onMouseDown.bind(this));
    elem.addEventListener("mouseup", this.onMouseUp.bind(this));
    elem.addEventListener("mousemove", this.onMouseMove.bind(this));
  }
  onMouseDown(e) {
    console.log("mousedown");
    this.onMouseDown(e);
  }
  onMouseMove(e) {
    console.log("mousemove");
    this.onMouseMove(e);
  }
  onMouseUp(e) {
    console.log("mouseup");
    this.onMouseUp(e);
  }
}
