function onKeyDownRoot(e) {
  if (e.key === "Delete") {
    if (_editor.areSpritesSelectedAsGroup()) {
      _editor.DestroyAllSelectedSprites();
    } else if (_editor.isAnySpriteSelectedBeforeAndStillThere()) {
      _editor.GetCurrentSelectedSprite().Destroy();
    }
  }
}
