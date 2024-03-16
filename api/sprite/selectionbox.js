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
