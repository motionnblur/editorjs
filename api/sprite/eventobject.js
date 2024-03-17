class EventObject {
  constructor(elem) {
    elem.addEventListener("mousedown", this.onMouseDown.bind(this));
    elem.addEventListener("mouseup", this.onMouseUp.bind(this));
    elem.addEventListener("mousemove", this.onMouseMove.bind(this));

    if (elem === document) {
      elem.addEventListener("keydown", this.onKeyDown.bind(this));
    }
  }
  onMouseDown(e) {
    console.log("mousedown");
    this.onMouseDownCallback(e);
  }
  onMouseMove(e) {
    console.log("mousemove");
    this.onMouseMoveCallback(e);
  }
  onMouseUp(e) {
    console.log("mouseup");
    this.onMouseUpCallback(e);
  }
  onKeyDown(e) {
    if (e.key === "Escape") {
      this.onKeyEscapeDownCallback();
    } else if (e.key === "Delete") {
      this.onKeyDeleteDownCallback();
    }
  }

  onMouseDownCallback(e) {}
  onMouseMoveCallback(e) {}
  onMouseUpCallback(e) {}
  onKeyEscapeDownCallback() {}
  onKeyDeleteDownCallback() {}
}
