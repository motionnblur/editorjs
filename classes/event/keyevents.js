function onKeyDownRoot(e) {
  if (e.key === "Delete") {
    if (_editor.GetCurrentSelectedSprite()) {
      _editor.GetCurrentSelectedSprite().Destroy();
    }
  }
}
