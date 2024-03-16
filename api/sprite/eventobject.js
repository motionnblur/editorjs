class EventObject {
  constructor(image) {
    image.addEventListener("mousedown", this.onMouseDown.bind(this));
    image.addEventListener("mouseup", this.onMouseUp.bind(this));
    image.addEventListener("mousemove", this.onMouseMove.bind(this));
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
    this.mouseDown = false;
    this.onMouseUp(e);
  }
}
