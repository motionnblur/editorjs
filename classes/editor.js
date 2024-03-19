class Editor {
  constructor() {
    this.spriteArray = [];
    this.currentSelectedSprite = null;
    this.mouseOffsetFromSprite = {
      x: 0,
      y: 0,
    };
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
  }
  GetCurrentSelectedSprite() {
    return this.currentSelectedSprite;
  }
  ClearCurrentSelectedSprite() {
    this.currentSelectedSprite = null;
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
