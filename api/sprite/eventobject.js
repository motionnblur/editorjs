class EventObject {
  constructor(image) {
    image.addEventListener("mousedown", this.onMouseDown.bind(this));
  }
  onMouseDown(e) {
    alert("mousedown");
  }
}
