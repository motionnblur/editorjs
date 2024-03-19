function onMouseDownRoot(e) {
  UpdateMousePosGlobally(e);
  lastMousePos = {
    x: e.clientX,
    y: e.clientY,
  };

  if (_editor.HasCurrentSpriteSelected()) {
    const currentSelectedSprite = _editor.GetCurrentSelectedSprite();
    if (_editor.IsPointerOnSpriteNow()) {
      currentSelectedSprite.SetDraggable(true);
    } else {
      _editor.ClearCurrentSelectedSprite();
    }
  }
}
function onMouseUpRoot(e) {
  UpdateMousePosGlobally(e);
  if (_editor.HasCurrentSpriteSelected()) {
    const currentSelectedSprite = _editor.GetCurrentSelectedSprite();
    if (currentSelectedSprite.isDraggable()) {
      currentSelectedSprite.SetDraggable(false);
    }
  }
}

function onMouseMoveRoot(e) {
  UpdateMousePosGlobally(e);
  if (_editor.HasCurrentSpriteSelected()) {
    const currentSelectedSprite = _editor.GetCurrentSelectedSprite();
    if (currentSelectedSprite.isDraggable()) {
      currentSelectedSprite.SetSpritePosition(
        e.clientX,
        e.clientY,
        _editor.GetMouseOffsetFromSprite()
      );
    }
  }
  _editor.DrawSelectArea(mousePos, lastMousePos);
}

function UpdateMousePosGlobally(e) {
  mousePos = {
    x: e.clientX,
    y: e.clientY,
  };
}
