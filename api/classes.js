var _root;
var _editor;
var mouseOnElement = false;

class Editor {
  sprites = new Array();
  constructor(document) {
    this.document = document;
    this.currentSelectedSprite = null;
    document.addEventListener("DOMContentLoaded", () => {
      _root = document.getElementById("root");
      _root.addEventListener("mousedown", () => {
        console.log("mousedown");
        if (!mouseOnElement) {
          this.sprites.forEach((sprite) => {
            sprite.DeSelectSprite();
          });
        }
      });
      _root.addEventListener("mouseup", () => {
        console.log("mouseup");

        mouseOnElement = false;

        if (this.currentSelectedSprite) {
          this.currentSelectedSprite.StopDrag();
        }
      });
      _root.addEventListener("mousemove", (e) => {
        if (this.currentSelectedSprite && this.currentSelectedSprite.movable) {
          this.currentSelectedSprite.SetPos(e.clientX, e.clientY);
        }
      });
      window.addEventListener("keydown", this.handleKeyDown.bind(this));
    });
    _editor = this;
  }
  addSprite(sprite) {
    this.sprites.push(sprite);
    this.currentSprite = sprite;
  }
  setCurrentSprite(sprite) {
    this.currentSprite = sprite;
  }
  getCurrentSprite() {
    return this.currentSprite;
  }
  handleKeyDown(e) {
    if (e.key === "Delete") {
      if (!this.currentSelectedSprite) return;
      this.sprites.forEach((sprite) => {
        if (sprite.isSelected) {
          sprite.Destroy();
        }
      });
      this.sprites = this.sprites.filter((sprite) => !sprite.isSelected);
    }
  }
}
/////////////////////////////////////////
class SelectionArea {
  selectionBoxLeft;
  selectionBoxTop;
  selectionBoxRight;
  selectionBoxBottom;

  constructor(sprite, width) {
    this.sprite = sprite;

    this.widthOffset = width;

    this.width = sprite.width + width;
    this.height = sprite.width + width;

    this.posX = sprite.posX - width / 2;
    this.posY = sprite.posY - width / 2;

    const selectionArea = document.createElement("div");
    this.image = selectionArea;
    selectionArea.classList.add("selection-area");

    selectionArea.style.left = this.posX + "px";
    selectionArea.style.top = this.posY + "px";
    selectionArea.style.width = this.width + "px";
    selectionArea.style.height = this.height + "px";

    _root.appendChild(selectionArea);
  }
  updatePos(x, y) {
    this.posX = x;
    this.posY = y;

    this.image.style.left =
      this.sprite.GetPos().x - this.widthOffset / 2 + "px";
    this.image.style.top = this.sprite.GetPos().y - this.widthOffset / 2 + "px";
  }
  Show() {
    this.image.style.display = "block";
  }
  Hide() {
    this.image.style.display = "none";
  }
}
///////////////////////////////////////////
class SelectionBox {
  constructor(img) {
    this.imgAttachedTo = img;

    selectionBoxLeft = document.getElementById("selection-box-left");
    selectionBoxTop = document.getElementById("selection-box-top");
    selectionBoxRight = document.getElementById("selection-box-right");
    selectionBoxBottom = document.getElementById("selection-box-bottom");

    selectionBoxLeft.addEventListener("mousedown", onMouseDownSelectionBoxLeft);
    selectionBoxTop.addEventListener("mousedown", onMouseDownSelectionBoxTop);
    selectionBoxRight.addEventListener(
      "mousedown",
      onMouseDownSelectionBoxRight
    );
    selectionBoxBottom.addEventListener(
      "mousedown",
      onMouseDownSelectionBoxBottom
    );

    selectionBoxLeft.addEventListener(
      "mouseenter",
      onMouseEnterSelectionBoxLeft
    );
    selectionBoxTop.addEventListener("mouseenter", onMouseEnterSelectionBoxTop);
    selectionBoxRight.addEventListener(
      "mouseenter",
      onMouseEnterSelectionBoxRight
    );
    selectionBoxBottom.addEventListener(
      "mouseenter",
      onMouseEnterSelectionBoxBottom
    );

    selectionBoxLeft.addEventListener(
      "mouseleave",
      onMouseLeaveSelectionBoxLeft
    );
    selectionBoxTop.addEventListener("mouseleave", onMouseLeaveSelectionBoxTop);
    selectionBoxRight.addEventListener(
      "mouseleave",
      onMouseLeaveSelectionBoxRight
    );
    selectionBoxBottom.addEventListener(
      "mouseleave",
      onMouseLeaveSelectionBoxBottom
    );
  }
  updatePos() {
    this.posX = this.imgAttachedTo.left + "px";
    this.posX = this.imgAttachedTo.top + "px";
  }
  updateGraphics() {
    this.style.left = this.posX;
    this.style.top = this.posY;
  }
  onMouseDownSelectionBoxLeft() {}
  onMouseDownSelectionBoxTop() {}
  onMouseDownSelectionBoxRight() {}
  onMouseDownSelectionBoxBottom() {}
  onMouseEnterSelectionBoxLeft() {}
  onMouseEnterSelectionBoxTop() {}
  onMouseEnterSelectionBoxRight() {}
  onMouseEnterSelectionBoxBottom() {}
  onMouseLeaveSelectionBoxLeft() {}
  onMouseLeaveSelectionBoxTop() {}
  onMouseLeaveSelectionBoxRight() {}
  onMouseLeaveSelectionBoxBottom() {}
}
////////////////////////////////////////////
class Sprite {
  constructor(image, ev, width, height) {
    this.posX = ev.clientX;
    this.posY = ev.clientY;

    this.width = width;
    this.height = height;

    this.image = image;
    this.image.draggable = false;

    this.image.classList.add("img");

    this.image.style.position = "absolute";
    this.image.style.left = ev.clientX + "px";
    this.image.style.top = ev.clientY + "px";

    this.image.style.width = this.width + "px";
    this.image.style.height = this.height + "px";

    this.image.addEventListener("mousedown", this.onMouseDownSprite.bind(this));

    this.selectionArea = new SelectionArea(this, 30);

    this.clickCount = 0;
    this.isSelected = false;
    this.movable = false;
  }
  SetImage(image) {
    this.image = image;
  }
  GetImage() {
    return this.image;
  }
  SetPos(x, y) {
    this.image.style.left = x - this.offset.x + "px";
    this.image.style.top = y - this.offset.y + "px";

    this.selectionArea.updatePos(x, y);

    this.posX = parseFloat(this.image.style.left);
    this.posY = parseFloat(this.image.style.top);
  }
  GetPos() {
    return {
      x: this.posX,
      y: this.posY,
    };
  }
  SetWidth(width) {
    this.image.style.width = width;
    this.widthAsFloat = width;
  }
  GetWidth() {
    return this.widthAsFloat;
  }
  SetHeight(height) {
    this.image.style.height = height;
    this.heightAsFloat = height;
  }
  GetHeight() {
    return this.heightAsFloat;
  }
  StopDrag() {
    this.movable = false;
  }
  SelectSprite() {
    this.selectionArea.Show();
    _editor.currentSelectedSprite = this;
    this.isSelected = true;
  }
  DeSelectSprite() {
    this.selectionArea.Hide();
    _editor.currentSelectedSprite = null;
    this.isSelected = false;
  }

  //////////// events
  onMouseDownSprite(e) {
    mouseOnElement = true;
    this.movable = true;
    this.SelectSprite();

    this.offset = {
      x: e.clientX - this.image.offsetLeft,
      y: e.clientY - this.image.offsetTop,
    };
  }

  Destroy() {
    this.image.remove();
    this.selectionArea.image.remove();
  }
  //////////// events
}
