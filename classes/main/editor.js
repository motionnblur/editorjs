class Editor {
  constructor() {
    this.spriteArray = [];
    this.currentSelectedSprite = null;
    this.mouseOffsetFromSprite = {
      x: 0,
      y: 0,
    };
    this.hasCurrentSpriteSelected = false;
  }
  IsPointerOnSpriteNow() {
    return (
      mousePos.x >= this.currentSelectedSprite.image.offsetLeft &&
      mousePos.x <=
        this.currentSelectedSprite.image.offsetLeft +
          this.currentSelectedSprite.image.offsetWidth &&
      mousePos.y >= this.currentSelectedSprite.image.offsetTop &&
      mousePos.y <=
        this.currentSelectedSprite.image.offsetTop +
          this.currentSelectedSprite.image.offsetHeight
    );
  }
  HasCurrentSpriteSelected() {
    return this.hasCurrentSpriteSelected;
  }
  SetMouseOffsetFromSprite(mosePosX, mousePosY, currentSpritePos) {
    this.mouseOffsetFromSprite = {
      x: mosePosX - currentSpritePos.x,
      y: mousePosY - currentSpritePos.y,
    };
  }
  GetMouseOffsetFromSprite() {
    return this.mouseOffsetFromSprite;
  }
  SetCurrentSelectedSprite(sprite) {
    this.currentSelectedSprite = sprite;
    this.hasCurrentSpriteSelected = true;
  }
  GetCurrentSelectedSprite() {
    return this.currentSelectedSprite;
  }
  ClearCurrentSelectedSprite() {
    this.currentSelectedSprite = null;
    this.hasCurrentSpriteSelected = false;
  }
  AddSpriteToArray(sprite) {
    this.spriteArray.push(sprite);
  }
  RemoveSpriteFromArray(sprite) {
    this.spriteArray = this.spriteArray.filter((s) => s !== sprite);
  }
  DrawSelectArea(firstAreaPos, lastAreaPos) {
    const top = Math.min(firstAreaPos.y, lastAreaPos.y);
    const left = Math.min(firstAreaPos.x, lastAreaPos.x);
    const width = Math.abs(lastAreaPos.x - firstAreaPos.x);
    const height = Math.abs(lastAreaPos.y - firstAreaPos.y);

    selectAreaDiv.style.left = left + "px";
    selectAreaDiv.style.top = top + "px";
    selectAreaDiv.style.width = width + "px";
    selectAreaDiv.style.height = height + "px";
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
  ClearSelectArea() {
    this.selectAreaDiv.style.left = 0 + "px";
    this.selectAreaDiv.style.top = 0 + "px";
    this.selectAreaDiv.style.width = 0 + "px";
    this.selectAreaDiv.style.height = 0 + "px";
  }

  onMouseDownCallback(e, obj) {
    this.SetMouseOffsetFromSprite(
      e.clientX,
      e.clientY,
      obj.GetSpritePosition()
    );
    this.SetCurrentSelectedSprite(obj);
  }
}
