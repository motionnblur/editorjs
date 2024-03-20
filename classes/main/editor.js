class Editor {
  constructor() {
    this.spriteArray = [];
    this.currentSelectedSpritesArray = [];
    this.currentSelectedSprite = null;
    this.mouseOffsetFromSprite = {
      x: 0,
      y: 0,
    };
    this.isAnySpriteSelectedBefore = false;
    this.areSpritesSelectedAsGroupBool = false;
  }
  isPointerOnSpriteNow() {
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
  isAnySpriteSelectedBeforeAndStillThere() {
    return this.isAnySpriteSelectedBefore;
  }
  SetMouseOffsetFromSprite(mosePosX, mousePosY, currentSpritePos) {
    this.mouseOffsetFromSprite = {
      x: mosePosX - currentSpritePos.x,
      y: mousePosY - currentSpritePos.y,
    };
  }
  DestroyAllSelectedSprites() {
    this.currentSelectedSpritesArray.forEach((sprite) => {
      sprite.Destroy();
    });
    this.currentSelectedSpritesArray = [];
    this.areSpritesSelectedAsGroupBool = false;
  }
  GetMouseOffsetFromSprite() {
    return this.mouseOffsetFromSprite;
  }
  SetCurrentSelectedSprite(sprite) {
    this.currentSelectedSprite = sprite;
    this.isAnySpriteSelectedBefore = true;
  }
  GetCurrentSelectedSprite() {
    return this.currentSelectedSprite;
  }
  ClearCurrentSelectedSprite() {
    this.currentSelectedSprite.SelfDeselect();
    this.currentSelectedSprite = null;
    this.isAnySpriteSelectedBefore = false;
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
  HideSelectArea() {
    selectAreaDiv.style.display = "none";
    selectAreaDiv.style.left = 0 + "px";
    selectAreaDiv.style.top = 0 + "px";
    selectAreaDiv.style.width = 0 + "px";
    selectAreaDiv.style.height = 0 + "px";
  }
  ShowSelectArea() {
    selectAreaDiv.style.display = "block";
  }
  areSpritesSelectedAsGroup() {
    return this.areSpritesSelectedAsGroupBool;
  }
  DoSelect(firstAreaPos, lastAreaPos) {
    const minX = Math.min(firstAreaPos.x, lastAreaPos.x);
    const maxX = Math.max(firstAreaPos.x, lastAreaPos.x);
    const minY = Math.min(firstAreaPos.y, lastAreaPos.y);
    const maxY = Math.max(firstAreaPos.y, lastAreaPos.y);

    this.spriteArray.forEach((sprite) => {
      const spriteCenterX =
        sprite.GetSpritePosition().x + sprite.GetSpriteWidth() / 2;
      const spriteCenterY =
        sprite.GetSpritePosition().y + sprite.GetSpriteHeight() / 2;

      if (
        spriteCenterX >= minX &&
        spriteCenterX <= maxX &&
        spriteCenterY >= minY &&
        spriteCenterY <= maxY
      ) {
        sprite.SelectSprite();
        this.currentSelectedSpritesArray.push(sprite);
        this.areSpritesSelectedAsGroupBool = true;
      } else {
        sprite.DeSelectSprite();
        this.currentSelectedSpritesArray =
          this.currentSelectedSpritesArray.filter((s) => s !== sprite);
      }
    });
  }
  ClearSelectedSprites() {
    this.spriteArray.forEach((sprite) => {
      sprite.DeSelectSprite();
    });
    this.areSpritesSelectedAsGroupBool = false;
    this.isAnySpriteSelectedBefore = false;
  }

  onMouseDownCallback(e, obj) {
    this.SetMouseOffsetFromSprite(
      e.clientX,
      e.clientY,
      obj.GetSpritePosition()
    );

    if (_editor.areSpritesSelectedAsGroup()) {
      _editor.ClearSelectedSprites();
      obj.SelectSprite();
      this.SetCurrentSelectedSprite(obj);
      return;
    }

    if (this.isAnySpriteSelectedBeforeAndStillThere()) {
      const spriteSelected = this.GetCurrentSelectedSprite();
      if (spriteSelected !== obj) {
        spriteSelected.DeSelectSprite();
      }
    }
    this.SetCurrentSelectedSprite(obj);
  }
}
