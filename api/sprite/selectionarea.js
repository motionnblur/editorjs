class SelectionArea extends StaticTexture {
  constructor(sprite, pos, width) {
    super(pos, sprite.image);

    this.spriteWidth = sprite.width;

    this.width = sprite.width + width;
    this.height = sprite.height + width;

    this.posX = sprite.posX - width / 2;
    this.posY = sprite.posY - width / 2;

    const selectionArea = document.createElement("div");
    this.image = selectionArea;

    selectionArea.classList.add("selection-area");
    selectionArea.style.left = this.posX + "px";
    selectionArea.style.top = this.posY + "px";
    selectionArea.style.width = this.width + "px";
    selectionArea.style.height = this.height + "px";
    selectionArea.style.display = "none";

    _root.appendChild(selectionArea);
    ////////////////////////////////////////////////////////////////////////////
    const selectionBoxLeftDiv = document.createElement("div");
    const selectionBoxTopDiv = document.createElement("div");
    const selectionBoxRightDiv = document.createElement("div");
    const selectionBoxBottomDiv = document.createElement("div");

    selectionBoxLeftDiv.classList.add("selection-box");
    selectionBoxTopDiv.classList.add("selection-box");
    selectionBoxRightDiv.classList.add("selection-box");
    selectionBoxBottomDiv.classList.add("selection-box");

    _root.appendChild(selectionBoxLeftDiv);
    _root.appendChild(selectionBoxTopDiv);
    _root.appendChild(selectionBoxRightDiv);
    _root.appendChild(selectionBoxBottomDiv);

    const selectionBoxWidth = 10;
    const selectionBoxHeight = 10;

    this.selectionBoxLeft = new SelectionBox(
      selectionBoxLeftDiv,
      this.posX + 55,
      this.posY + this.height / 2,
      "left",
      selectionBoxWidth,
      selectionBoxHeight
    );
    this.selectionBoxTop = new SelectionBox(
      selectionBoxTopDiv,
      this.posX + this.width / 2,
      this.posY,
      "top",
      selectionBoxWidth,
      selectionBoxHeight
    );
    this.selectionBoxRight = new SelectionBox(
      selectionBoxRightDiv,
      this.posX + this.width,
      this.posY + this.height / 2,
      "right",
      selectionBoxWidth,
      selectionBoxHeight
    );
    this.selectionBoxBottom = new SelectionBox(
      selectionBoxBottomDiv,
      this.posX + this.width / 2,
      this.posY + this.height,
      "bottom",
      selectionBoxWidth,
      selectionBoxHeight
    );

    const offsetX = sprite.width / 2 - selectionBoxWidth / 2;
    const offsetY = sprite.height / 2 - selectionBoxWidth / 2;
    this.selectionBoxOffsets = {
      x: offsetX,
      y: offsetY,
    };
    this.UpdateSelectionBoxPositions(pos.x, pos.y, offsetX, offsetY);

    ////////////////////////////////////////////////////////////////////////////
    reactor.addEventListener(
      "onUpdateOffsets",
      this.onUpdateOffsets.bind(this)
    );
  }
  onUpdateOffsets() {
    currentSpriteHeight = heightTemp;
    currentSpriteWidth = widthTemp;

    const offsetX = currentSpriteWidth / 2 - this.selectionBoxWidth / 2;
    const offsetY = currentSpriteHeight / 2 - this.selectionBoxWidth / 2;
    this.selectionBoxOffsets = {
      x: offsetX,
      y: offsetY,
    };
    this.UpdateSelectionBoxPositions(this.posX, this.posY, offsetX, offsetY);
  }
  updatePos(x, y) {
    this.posX = x;
    this.posY = y;

    const widthOffset = this.width - currentSpriteWidth;
    const half = widthOffset / 2;

    this.Draw(x - half, y - half);
    this.UpdateSelectionBoxPositions(
      x,
      y,
      this.selectionBoxOffsets.x,
      this.selectionBoxOffsets.y
    );
  }

  UpdateSelectionBoxPositions(x, y, offsetX, offsetY) {
    this.selectionBoxLeft.updatePos(x, y + offsetY);
    this.selectionBoxTop.updatePos(x + offsetX, y - offsetY / 2 + 15);
    this.selectionBoxRight.updatePos(x + offsetX * 2, y + offsetY);
    this.selectionBoxBottom.updatePos(x + offsetX, y + offsetY * 2);
  }
  Show() {
    this.image.style.display = "block";
    this.selectionBoxLeft.Display();
    this.selectionBoxTop.Display();
    this.selectionBoxRight.Display();
    this.selectionBoxBottom.Display();
    currentSelectionAreaImage = this.image;
  }
  Hide() {
    this.image.style.display = "none";
    this.selectionBoxLeft.Hide();
    this.selectionBoxTop.Hide();
    this.selectionBoxRight.Hide();
    this.selectionBoxBottom.Hide();
    currentSelectionAreaImage = null;
  }
  Destroy() {
    this.image.remove();
    this.selectionBoxLeft.image.remove();
    this.selectionBoxTop.image.remove();
    this.selectionBoxRight.image.remove();
    this.selectionBoxBottom.image.remove();
    currentSelectionAreaImage = null;
  }
  SetPos(x, y) {
    this.posX = x;
    this.posY = y;
    super.Draw(x, y);
  }
}
