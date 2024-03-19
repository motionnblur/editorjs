function onMouseDownRoot(e) {
  ///
}
function onMouseUpRoot() {
  if (_editor.GetCurrentSelectedSprite()) {
    _editor.GetCurrentSelectedSprite().image.style.zIndex = 5;
    _editor.ClearCurrentSelectedSprite();
  }
}

function onMouseMoveRoot(e) {
  if (_editor.GetCurrentSelectedSprite()) {
    _editor
      .GetCurrentSelectedSprite()
      .SetSpritePosition(
        e.clientX,
        e.clientY,
        _editor.GetMouseOffsetFromSprite()
      );
  }
}
