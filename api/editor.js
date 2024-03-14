class Editor {
  sprites = new Array();
  constructor(document) {
    this.document = document;
    this.document.addEventListener("DOMContentLoaded", function () {
      _root = document.getElementById("root");
      _root.addEventListener("mousedown", onMouseDownRoot);
      _root.addEventListener("mouseup", onMouseUpRoot);
      _root.addEventListener("mousemove", onMouseMoveRoot);
      window.addEventListener("keydown", onKeyDownRoot);
    });
  }
  addSprite(sprite) {
    this.sprites.push(sprite);
    this.currentSprite = sprite;
  }
}
