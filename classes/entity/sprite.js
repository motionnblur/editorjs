class Sprite {
  constructor(file, width, height, pos) {
    this.AssignToDom(file, pos);

    Object.assign(this, TextureMixin, EventObjectMixin);
    TextureMixin.constructor.call(this, width, height, pos);
    EventObjectMixin.constructor.call(this);

    this.isdraggable = true;
  }
  AssignToDom(file, pos) {
    var img = document.createElement("img");
    var src = document.getElementById("root");
    img.src = URL.createObjectURL(file);
    img.draggable = false;

    img.classList.add("img");
    img.classList.add("onMouseDownAnim");

    img.style.position = "absolute";
    img.style.left = pos.x + "px";
    img.style.top = pos.y + "px";

    this.image = img;
    src.appendChild(img);
  }
  GetSpritePosition() {
    return {
      x: parseFloat(this.image.style.left),
      y: parseFloat(this.image.style.top),
    };
  }
  SetSpritePosition(mousePosX, mousePosY, offset) {
    this.image.style.left = mousePosX - offset.x + "px";
    this.image.style.top = mousePosY - offset.y + "px";
  }
  SetDraggable(_bool) {
    this.isdraggable = _bool;
  }
  isDraggable() {
    return this.isdraggable;
  }
  Destroy() {
    this.image.remove();
  }
  onMouseDownCallback(e) {
    _editor.onMouseDownCallback(e, this);
  }
}
