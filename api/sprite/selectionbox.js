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
  onMouseMove(e) {
    if (!isMouseDownSelectionBox) return;
    this.ResizeSprite(e);
  }

  ResizeSprite(e) {
    if (this.name === "left") {
      const newPosX = e.clientX - offsetFromSelectionArea.x;
      this.image.style.left = newPosX + "px";

      const newWidth =
        currentSpriteWidth +
        (this.posX - e.clientX) +
        offsetFromSelectionArea.x;

      currentSpriteImage.style.width = newWidth + "px";

      const slideAmountX =
        newPosX + 22.5 - parseFloat(currentSpriteImage.style.left);

      currentSpriteImage.style.left =
        parseFloat(currentSpriteImage.style.left) + slideAmountX + "px";

      currentSelectionAreaImage.style.width =
        newWidth + offsetFromSelectionArea.x + "px";
      currentSelectionAreaImage.style.left =
        parseFloat(currentSelectionAreaImage.style.left) + slideAmountX + "px";
    } else if (this.name === "top") {
      const newPosY = e.clientY - offsetFromSelectionArea.y;
      this.image.style.top = newPosY + "px";

      const newHeight =
        currentSpriteHeight +
        (this.posY - e.clientY) +
        offsetFromSelectionArea.y;

      currentSpriteImage.style.height = newHeight + "px";

      const slideAmountY =
        newPosY + 22.5 - parseFloat(currentSpriteImage.style.top);

      currentSpriteImage.style.top =
        parseFloat(currentSpriteImage.style.top) + slideAmountY + "px";

      currentSelectionAreaImage.style.height =
        newHeight + offsetFromSelectionArea.x + "px";
      currentSelectionAreaImage.style.top =
        parseFloat(currentSelectionAreaImage.style.top) + slideAmountY + "px";
    } else if (this.name === "right") {
      const newPosX = e.clientX - offsetFromSelectionArea.x;
      this.image.style.left = newPosX + "px";

      const newWidth =
        currentSpriteWidth +
        (e.clientX - this.posX) -
        offsetFromSelectionArea.x;

      currentSpriteImage.style.width = newWidth + "px";
      console.log(currentSpriteImage);
      currentSelectionAreaImage.style.width =
        newWidth + offsetFromSelectionArea.x + "px";
      currentSelectionAreaImage.style.left =
        parseFloat(currentSelectionAreaImage.style.left) + "px";
    } else if (this.name === "bottom") {
      const newPosY = e.clientY - offsetFromSelectionArea.y;
      this.image.style.top = newPosY + "px";

      const newHeight =
        currentSpriteHeight +
        (e.clientY - this.posY) -
        offsetFromSelectionArea.y;

      currentSpriteImage.style.height = newHeight + "px";

      currentSelectionAreaImage.style.height =
        newHeight + offsetFromSelectionArea.x + "px";
      currentSelectionAreaImage.style.top =
        parseFloat(currentSelectionAreaImage.style.top) + "px";
    }
  }
}
