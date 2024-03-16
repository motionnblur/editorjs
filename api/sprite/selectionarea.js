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
