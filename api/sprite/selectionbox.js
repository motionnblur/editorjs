class SelectionBox extends DynamicTexture {
  constructor(image, x, y, name, width, height) {
    super(
      {
        x: x,
        y: y,
      },
      image
    );

    this.name = name;
    image.style.display = "none";

    super.SetWidth(width);
    super.SetHeight(height);
  }
  updatePos(x, y) {
    this.posX = x;
    this.posY = y;

    this.Draw(x, y);
  }

  MouseDown(x, y) {}
  onMouseDown(e) {
    reactor.dispatchEvent("onSelectionBox", { box_name: this.name });
  }

  /* ResizeSprite(e) {
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
  } */
}
