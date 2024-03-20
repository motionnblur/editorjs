function onMouseDownRoot(e) {
  UpdateMousePosGlobally(e);
  _editor.ShowSelectArea();
  isMouseDownBefore = true;

  lastMousePos = {
    x: e.clientX,
    y: e.clientY,
  };

  const currentSelectedSprite = _editor.GetCurrentSelectedSprite();

  if (currentSelectedSprite === null) {
    if (_editor.areSpritesSelectedAsGroup()) {
      _editor.ClearSelectedSprites();
      return;
    }
  }
  if (_editor.areSpritesSelectedAsGroup()) {
    if (_editor.isPointerOnSpriteNow()) {
      currentSelectedSprite.SetDraggable(true);
    } else {
      _editor.ClearSelectedSprites();
    }
  } else {
    if (_editor.isAnySpriteSelectedBeforeAndStillThere()) {
      if (_editor.isPointerOnSpriteNow()) {
        currentSelectedSprite.SetDraggable(true);
      } else {
        _editor.ClearCurrentSelectedSprite();
      }
    }
  }
}
function onMouseUpRoot(e) {
  UpdateMousePosGlobally(e);
  isMouseDownBefore = false;
  _editor.HideSelectArea();

  if (_editor.isAnySpriteSelectedBeforeAndStillThere()) {
    const currentSelectedSprite = _editor.GetCurrentSelectedSprite();
    if (currentSelectedSprite.isDraggable()) {
      currentSelectedSprite.SetDraggable(false);
    }
  }
}

function onMouseMoveRoot(e) {
  UpdateMousePosGlobally(e);
  if (_editor.isAnySpriteSelectedBeforeAndStillThere()) {
    const currentSelectedSprite = _editor.GetCurrentSelectedSprite();
    if (currentSelectedSprite.isDraggable()) {
      currentSelectedSprite.SetSpritePosition(
        e.clientX,
        e.clientY,
        _editor.GetMouseOffsetFromSprite()
      );
    }
  } else {
    if (isMouseDownBefore) {
      _editor.DrawSelectArea(mousePos, lastMousePos);
      _editor.DoSelect(mousePos, lastMousePos);
    }
  }
}

function UpdateMousePosGlobally(e) {
  mousePos = {
    x: e.clientX,
    y: e.clientY,
  };
}
