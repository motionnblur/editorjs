class SelectionArea extends StaticTexture {
  constructor(sprite, pos, width) {
    super(pos, sprite.image);

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
    selectionArea.style.display = "none";

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

    this.UpdateSelectionBoxPositions(x, y);
  }

  UpdateSelectionBoxPositions(x, y) {
    this.selectionBoxLeft.updatePos(x, y);
    this.selectionBoxTop.updatePos(x, y);
    this.selectionBoxRight.updatePos(x, y);
    this.selectionBoxBottom.updatePos(x, y);
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
}
