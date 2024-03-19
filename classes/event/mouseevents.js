function onMouseDownRoot(e) {
  if (_editor.HasCurrentSpriteSelected() && !_editor.IsPointerOnSpriteNow()) {
    _editor.ClearCurrentSelectedSprite();
  }
}
function onMouseUpRoot() {
  if (_editor.IsPointerOnSpriteNow()) {
    _editor.SetIsPointerOnSpriteNow(false);
    _editor.ClearCurrentSelectedSprite();
  }
}

function onMouseMoveRoot(e) {
  if (_editor.HasCurrentSpriteSelected()) {
    const currentSelectedSprite = _editor.GetCurrentSelectedSprite();
    currentSelectedSprite.SetSpritePosition(
      e.clientX,
      e.clientY,
      _editor.GetMouseOffsetFromSprite()
    );
  }
}
