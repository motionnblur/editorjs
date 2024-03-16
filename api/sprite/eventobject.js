class EventObject {
  constructor(image) {
    image.addEventListener("mousedown", this.onMouseDown.bind(this));
    image.addEventListener("mousemove", this.onMouseMove.bind(this));
  }
  onMouseDown(e) {
    console.log("mousedown");
    this.mousePos = {
      x: e.clientX,
      y: e.clientY,
    };

    this.ReDraw();
  }
  onMouseMove(e) {
    console.log("mousemove");
    this.mousePos = {
      x: e.clientX,
      y: e.clientY,
    };
    this.ReDraw();
  }
}
