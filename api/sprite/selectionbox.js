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
    this.firstPos = {
      x: x,
      y: y,
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

    this.firstPos = {
      x: x,
      y: y,
    };

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
      const lastBoxPosX = this.posX;
      const diff = lastBoxPosX - this.firstMousePos.x + this.offsetFromMouse.x;

      const newWidth = currentSpriteWidth + diff * -1;

      currentSpriteImage.style.width = newWidth + "px";
      currentSelectionAreaImage.style.width = newWidth + "px";

      currentSpriteImage.style.left = this.posX + "px";
      currentSelectionAreaImage.style.left = this.posX + "px";

      widthTemp = newWidth;
    } else if (this.name === "top") {
      const lastBoxPosY = this.posY;
      const diff = lastBoxPosY - this.firstMousePos.y + this.offsetFromMouse.y;

      const newHeight = currentSpriteHeight + diff * -1;

      currentSpriteImage.style.height = newHeight + "px";
      currentSelectionAreaImage.style.height = newHeight + "px";

      currentSpriteImage.style.top = this.posY + "px";
      currentSelectionAreaImage.style.top = this.posY + "px";

      heightTemp = newHeight;
    } else if (this.name === "right") {
      const lastBoxPosX = this.posX;
      const diff = lastBoxPosX - this.firstMousePos.x + this.offsetFromMouse.x;

      const newWidth = currentSpriteWidth + diff;

      currentSpriteImage.style.width = newWidth + "px";
      currentSelectionAreaImage.style.width = newWidth + "px";

      widthTemp = newWidth;
    } else if (this.name === "bottom") {
      const lastBoxPosY = this.posY;
      const diff = lastBoxPosY - this.firstMousePos.y + this.offsetFromMouse.y;

      const newHeight = currentSpriteHeight + diff;

      currentSpriteImage.style.height = newHeight + "px";
      currentSelectionAreaImage.style.height = newHeight + "px";
      //currentSpriteImage.style.top = this.posY + "px";

      heightTemp = newHeight;
    }
  }
}
