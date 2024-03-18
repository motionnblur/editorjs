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

    this.offsetFromSelectionArea = {
      x: 0,
      y: 0,
    };
    this.offsetFromMouse = {
      x: 0,
      y: 0,
    };
    this.firstMousePos = {
      x: 0,
      y: 0,
    };
    reactor.addEventListener("onUpdateOffsets", this.onUpdateOffset.bind(this));
  }
  onUpdateOffset(e) {
    this.offsetFromSelectionArea = {
      x: this.posX - parseFloat(currentSelectionAreaImage.style.left),
      y: this.posY - parseFloat(currentSelectionAreaImage.style.top),
    };
    this.offsetFromMouse = {
      x: e.clientX - this.posX,
      y: e.clientY - this.posY,
    };
  }
  updatePos(x, y) {
    this.posX = x;
    this.posY = y;

    this.Draw(x, y);
  }

  MouseDown(x, y) {}
  onMouseDown(e) {
    reactor.dispatchEvent("onSelectionBox", { box_name: this.name });
    this.offsetFromSelectionArea = {
      x: this.posX - parseFloat(currentSelectionAreaImage.style.left),
      y: this.posY - parseFloat(currentSelectionAreaImage.style.top),
    };
    this.offsetFromMouse = {
      x: e.clientX - this.posX,
      y: e.clientY - this.posY,
    };
    this.firstMousePos = {
      x: e.clientX,
      y: e.clientY,
    };
  }
  onMouseMove(e) {
    if (!isMouseDownSelectionBox) return;

    if (this.name === "left") {
      super.Draw(e.clientX - this.offsetFromMouse.x, this.posY);
      this.posX = e.clientX - this.offsetFromMouse.x;
    } else if (this.name === "top") {
      super.Draw(this.posX, e.clientY - this.offsetFromMouse.y);
      this.posY = e.clientY - this.offsetFromMouse.y;
    } else if (this.name === "right") {
      super.Draw(e.clientX - this.offsetFromMouse.x, this.posY);
      this.posX = e.clientX - this.offsetFromMouse.x;
    } else if (this.name === "bottom") {
      super.Draw(this.posX, e.clientY - this.offsetFromMouse.y);
      this.posY = e.clientY - this.offsetFromMouse.y;
    }

    this.ResizeSprite(e);
  }

  ResizeSprite(e) {
    if (this.name === "left") {
      const newWidth =
        currentSpriteWidth +
        (this.posX - e.clientX) +
        this.offsetFromSelectionArea.x;

      currentSpriteImage.style.width = newWidth + "px";

      const slideAmountX =
        newPosX + 22.5 - parseFloat(currentSpriteImage.style.left);

      currentSpriteImage.style.left =
        parseFloat(currentSpriteImage.style.left) + slideAmountX + "px";

      currentSelectionAreaImage.style.width =
        newWidth + this.offsetFromSelectionArea.x + "px";
      currentSelectionAreaImage.style.left =
        parseFloat(currentSelectionAreaImage.style.left) + slideAmountX + "px";
    } else if (this.name === "top") {
      const newHeight =
        currentSpriteHeight +
        (this.posY - e.clientY) +
        this.offsetFromSelectionArea.y;

      currentSpriteImage.style.height = newHeight + "px";

      const slideAmountY =
        newPosY + 22.5 - parseFloat(currentSpriteImage.style.top);

      currentSpriteImage.style.top =
        parseFloat(currentSpriteImage.style.top) + slideAmountY + "px";

      currentSelectionAreaImage.style.height =
        newHeight + this.offsetFromSelectionArea.x + "px";
      currentSelectionAreaImage.style.top =
        parseFloat(currentSelectionAreaImage.style.top) + slideAmountY + "px";
    } else if (this.name === "right") {
      const lastBoxPosX = this.posX;
      const diff = lastBoxPosX - this.firstMousePos.x + this.offsetFromMouse.x;

      const newWidth = currentSpriteWidth + diff;

      currentSpriteImage.style.width = newWidth + "px";

      currentSelectionAreaImage.style.width =
        newWidth + this.offsetFromSelectionArea.x + "px";
      currentSelectionAreaImage.style.left =
        parseFloat(currentSelectionAreaImage.style.left) + "px";
    } else if (this.name === "bottom") {
      const newPosY = e.clientY - this.offsetFromSelectionArea.y;
      this.image.style.top = newPosY + "px";

      const newHeight =
        currentSpriteHeight +
        (e.clientY - this.posY) -
        this.offsetFromSelectionArea.y;

      currentSpriteImage.style.height = newHeight + "px";

      currentSelectionAreaImage.style.height =
        newHeight + this.offsetFromSelectionArea.x + "px";
      currentSelectionAreaImage.style.top =
        parseFloat(currentSelectionAreaImage.style.top) + "px";
    }
  }
}
