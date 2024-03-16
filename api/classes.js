var _root;
var _editor;
var mouseOnElement = false;
var firstAreaPos = {
  x: 0,
  y: 0,
};
var lastAreaPos = {
  x: 0,
  y: 0,
};
var rootMouseDown = false;
var resizeStage = false;

class Editor {
  sprites = new Array();
  constructor(document) {
    this.document = document;
    this.currentSelectedSprite = null;
    document.addEventListener("DOMContentLoaded", () => {
      _root = document.getElementById("root");
      _root.addEventListener("mousedown", (e) => {
        if (!mouseOnElement) {
          this.DeSelectSprites();
          this.selectAreaDiv.style.display = "block";
          rootMouseDown = true;
          firstAreaPos = {
            x: e.clientX,
            y: e.clientY,
          };
        }
      });
      _root.addEventListener("mouseup", () => {
        rootMouseDown = false;
        mouseOnElement = false;
        this.selectAreaDiv.style.display = "none";
        this.ClearSelectArea();

        if (this.currentSelectedSprite) {
          this.currentSelectedSprite.StopDrag();
        }
        if (resizeStage) {
          resizeStage = false;
        }
      });
      _root.addEventListener("mousemove", (e) => {
        if (rootMouseDown) {
          lastAreaPos = {
            x: e.clientX,
            y: e.clientY,
          };
          this.DrawSelectArea(firstAreaPos, lastAreaPos);
          this.DoSelect(firstAreaPos, lastAreaPos);
        }
        if (this.currentSelectedSprite && this.currentSelectedSprite.movable) {
          this.currentSelectedSprite.SetPos(e.clientX, e.clientY);
        }
        if (resizeStage) {
          this.currentSelectedBox.ResizeSprite(e);
        }
      });
      window.addEventListener("keydown", this.handleKeyDown.bind(this));
      this.selectAreaDiv = document.getElementById("group-select");
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
      //if (!this.currentSelectedSprite) return;
      this.sprites.forEach((sprite) => {
        if (sprite.isSelected) {
          sprite.Destroy();
        }
      });
      this.sprites = this.sprites.filter((sprite) => !sprite.isSelected);
    } else if (e.key === "Escape") {
      if (!mouseOnElement) {
        this.sprites.forEach((sprite) => {
          sprite.DeSelectSprite();
        });
      }
    }
  }
  DrawSelectArea(firstAreaPos, lastAreaPos) {
    const top = Math.min(firstAreaPos.y, lastAreaPos.y);
    const left = Math.min(firstAreaPos.x, lastAreaPos.x);
    const width = Math.abs(lastAreaPos.x - firstAreaPos.x);
    const height = Math.abs(lastAreaPos.y - firstAreaPos.y);

    this.selectAreaDiv.style.left = left + "px";
    this.selectAreaDiv.style.top = top + "px";
    this.selectAreaDiv.style.width = width + "px";
    this.selectAreaDiv.style.height = height + "px";
  }
  DoSelect(firstAreaPos, lastAreaPos) {
    const minX = Math.min(firstAreaPos.x, lastAreaPos.x);
    const maxX = Math.max(firstAreaPos.x, lastAreaPos.x);
    const minY = Math.min(firstAreaPos.y, lastAreaPos.y);
    const maxY = Math.max(firstAreaPos.y, lastAreaPos.y);

    this.sprites.forEach((sprite) => {
      const spriteCenterX = sprite.posX + sprite.width / 2;
      const spriteCenterY = sprite.posY + sprite.height / 2;

      if (
        spriteCenterX >= minX &&
        spriteCenterX <= maxX &&
        spriteCenterY >= minY &&
        spriteCenterY <= maxY
      ) {
        sprite.SelectSprite();
      } else {
        sprite.DeSelectSprite();
      }
    });
  }
  DeSelectSprites() {
    this.sprites.forEach((sprite) => {
      sprite.DeSelectSprite();
    });
  }
  ClearSelectArea() {
    this.selectAreaDiv.style.left = 0 + "px";
    this.selectAreaDiv.style.top = 0 + "px";
    this.selectAreaDiv.style.width = 0 + "px";
    this.selectAreaDiv.style.height = 0 + "px";
  }
}
/////////////////////////////////////////
class SelectionArea {
  constructor(sprite, width) {
    this.sprite = sprite;

    this.widthOffset = width;

    this.width = sprite.width + width;
    this.height = sprite.height + width;

    this.posX = sprite.posX - width / 2;
    this.posY = sprite.posY - width / 2;

    ///////////////////////////////////////////
    const selectionArea = document.createElement("div");
    this.image = selectionArea;
    selectionArea.classList.add("selection-area");

    const selectionBoxLeftDiv = document.createElement("div");
    const selectionBoxTopDiv = document.createElement("div");
    const selectionBoxRightDiv = document.createElement("div");
    const selectionBoxBottomDiv = document.createElement("div");

    selectionBoxLeftDiv.classList.add("selection-box");
    selectionBoxTopDiv.classList.add("selection-box");
    selectionBoxRightDiv.classList.add("selection-box");
    selectionBoxBottomDiv.classList.add("selection-box");
    ///////////////////////////////////////////

    selectionArea.style.left = this.posX + "px";
    selectionArea.style.top = this.posY + "px";
    selectionArea.style.width = this.width + "px";
    selectionArea.style.height = this.height + "px";

    _root.appendChild(selectionBoxLeftDiv);
    _root.appendChild(selectionBoxTopDiv);
    _root.appendChild(selectionBoxRightDiv);
    _root.appendChild(selectionBoxBottomDiv);

    _root.appendChild(selectionArea);

    this.selectionBoxLeft = new SelectionBox(
      selectionBoxLeftDiv,
      this.posX,
      this.posY + this.height / 2,
      this,
      "left"
    );
    this.selectionBoxTop = new SelectionBox(
      selectionBoxTopDiv,
      this.posX + this.width / 2,
      this.posY,
      this,
      "top"
    );
    this.selectionBoxRight = new SelectionBox(
      selectionBoxRightDiv,
      this.posX + this.width,
      this.posY + this.height / 2,
      this,
      "right"
    );
    this.selectionBoxBottom = new SelectionBox(
      selectionBoxBottomDiv,
      this.posX + this.width / 2,
      this.posY + this.height,
      this,
      "bottom"
    );
  }
  updatePos(x, y) {
    const widthOffset = this.widthOffset / 2;

    this.posX = x;
    this.posY = y;

    this.image.style.left = x - widthOffset + "px";
    this.image.style.top = y - widthOffset + "px";

    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;

    this.selectionBoxLeft.updatePos(this.posX, this.posY + halfHeight);
    this.selectionBoxTop.updatePos(this.posX + halfWidth, this.posY);
    this.selectionBoxRight.updatePos(
      this.posX + this.width,
      this.posY + halfHeight
    );
    this.selectionBoxBottom.updatePos(
      this.posX + halfWidth,
      this.posY + this.height
    );
  }
  GetMidPos() {
    return {
      x: this.posX + this.widthOffset / 2,
      y: this.posY + this.widthOffset / 2,
    };
  }
  GetSpriteWidth() {
    return this.sprite.width;
  }
  GetSpriteHeight() {
    return this.sprite.height;
  }
  GetSpriteImg() {
    return this.sprite.image;
  }
  SetSpriteWidth(width) {
    this.sprite.width = width;
  }
  Show() {
    this.image.style.display = "block";
    this.selectionBoxLeft.Display();
    this.selectionBoxTop.Display();
    this.selectionBoxRight.Display();
    this.selectionBoxBottom.Display();
  }
  Hide() {
    this.image.style.display = "none";
    this.selectionBoxLeft.Hide();
    this.selectionBoxTop.Hide();
    this.selectionBoxRight.Hide();
    this.selectionBoxBottom.Hide();
  }
  Destroy() {
    this.image.remove();
    this.selectionBoxLeft.image.remove();
    this.selectionBoxTop.image.remove();
    this.selectionBoxRight.image.remove();
    this.selectionBoxBottom.image.remove();
  }
  ReDraw() {
    selectionArea.style.width = this.width + "px";
    selectionArea.style.height = this.height + "px";
  }
}
///////////////////////////////////////////
class SelectionBox {
  constructor(image, x, y, selectionArea, name) {
    this.name = name;

    this.selectionArea = selectionArea;
    this.image = image;

    this.width = 15;
    const halfWidth = this.width / 2;

    const newXPos = x - halfWidth;
    const newYPos = y - halfWidth;

    image.style.left = newXPos + "px";
    image.style.top = newYPos + "px";
    image.style.display = "none";

    this.posX = newXPos;
    this.posY = newYPos;

    this.image.addEventListener("mousedown", (e) => {
      mouseOnElement = true;
      resizeStage = true;
      _editor.currentSelectedBox = this;

      this.offset = {
        x: e.clientX - this.image.offsetLeft,
        y: e.clientY - this.image.offsetTop,
      };

      this.offsetPivot = {
        x: x - parseFloat(this.image.style.left),
        y: y - parseFloat(this.image.style.top),
      };
      console.log(this.offsetPivot);
    });
  }
  updatePos(x, y) {
    const halfWidth = this.width / 2;

    const newXPos = x - halfWidth - this.width;
    const newYPos = y - halfWidth - this.width;

    this.posX = newXPos;
    this.posY = newYPos;

    this.image.style.left = newXPos + "px";
    this.image.style.top = newYPos + "px";
  }
  Display() {
    this.image.style.display = "block";
  }
  Hide() {
    this.image.style.display = "none";
  }
  ResizeSprite(e) {
    if (this.name === "left") {
      const newPosX = e.clientX - this.offset.x;
      this.image.style.left = newPosX + "px";

      const spriteWidth = this.selectionArea.GetSpriteWidth();
      const spriteImg = this.selectionArea.GetSpriteImg();
      const newWidth = spriteWidth + (this.posX - e.clientX) + this.offset.x;

      spriteImg.style.width = newWidth + "px";

      const slideAmountX = newPosX + 22.5 - parseFloat(spriteImg.style.left);

      spriteImg.style.left =
        parseFloat(spriteImg.style.left) + slideAmountX + "px";

      this.selectionArea.image.style.width =
        newWidth + this.selectionArea.widthOffset + "px";
      this.selectionArea.image.style.left =
        parseFloat(this.selectionArea.image.style.left) + slideAmountX + "px";
    } else if (this.name === "top") {
      const newPosY = e.clientY - this.offset.y;
      this.image.style.top = newPosY + "px";

      const spriteHeight = this.selectionArea.GetSpriteHeight();
      const spriteImg = this.selectionArea.GetSpriteImg();
      const newHeight = spriteHeight + (this.posY - e.clientY) + this.offset.y;

      spriteImg.style.height = newHeight + "px";

      const slideAmountY = newPosY + 22.5 - parseFloat(spriteImg.style.top);

      spriteImg.style.top =
        parseFloat(spriteImg.style.top) + slideAmountY + "px";

      this.selectionArea.image.style.height =
        newHeight + this.selectionArea.widthOffset + "px";
      this.selectionArea.image.style.top =
        parseFloat(this.selectionArea.image.style.top) + slideAmountY + "px";
    } else if (this.name === "right") {
      const newPosX = e.clientX - this.offset.x;
      this.image.style.left = newPosX + "px";

      const spriteWidth = this.selectionArea.GetSpriteWidth();
      const spriteImg = this.selectionArea.GetSpriteImg();
      const newWidth = spriteWidth + (e.clientX - this.posX) - this.offset.x;

      spriteImg.style.width = newWidth + "px";

      this.selectionArea.image.style.width =
        newWidth + this.selectionArea.widthOffset + "px";
      this.selectionArea.image.style.left =
        parseFloat(this.selectionArea.image.style.left) + "px";
    } else if (this.name === "bottom") {
      const newPosY = e.clientY - this.offset.y;
      this.image.style.top = newPosY + "px";

      const spriteHeight = this.selectionArea.GetSpriteHeight();
      const spriteImg = this.selectionArea.GetSpriteImg();
      const newHeight = spriteHeight + (e.clientY - this.posY) - this.offset.y;

      spriteImg.style.height = newHeight + "px";

      this.selectionArea.image.style.height =
        newHeight + this.selectionArea.widthOffset + "px";
      this.selectionArea.image.style.top =
        parseFloat(this.selectionArea.image.style.top) + "px";
    }
  }
}
////////////////////////////////////////////
class Sprite {
  constructor(image, ev, width, height) {
    this.posX = ev.clientX;
    this.posY = ev.clientY;

    this.width = width;
    this.firstWidth = width;

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
    const newPosX = x - this.offset.x;
    const newPosY = y - this.offset.y;

    this.image.style.left = newPosX + "px";
    this.image.style.top = newPosY + "px";

    this.posX = newPosX;
    this.posY = newPosY;

    this.selectionArea.updatePos(newPosX, newPosY);
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
    if (_editor.currentSelectedSprite) {
      _editor.DeSelectSprites();
    }

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
    this.selectionArea.Destroy();
  }
  //////////// events
}
