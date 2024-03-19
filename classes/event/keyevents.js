function onKeyDownRoot(e) {
  if (e.key === "Delete") {
    if (currentSpriteTemp) {
      currentSpriteTemp.remove();
      if (selectionArea) {
        selectionArea.style.display = "none";
      }
    }
  }
}
