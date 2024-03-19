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

  onMouseDownCallback(e, obj) {
    this.SetMouseOffsetFromSprite(
      e.clientX,
      e.clientY,
      obj.GetSpritePosition()
    );
    this.SetCurrentSelectedSprite(obj);
  }
}
