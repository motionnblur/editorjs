const TextureMixin = {
  constructor(width, height, pos) {
    this.image.style.width = width + "px";
    this.image.style.height = height + "px";
    this.image.style.left = pos.x + "px";
    this.image.style.top = pos.y + "px";
  },
};
const EventObjectMixin = {
  constructor() {
    this.image.addEventListener("mousedown", this.onMouseDown.bind(this));
  },
  onMouseDown(e) {
    this.onMouseDownCallback(e);
  },
};
