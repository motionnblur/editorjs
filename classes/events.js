document.addEventListener("DOMContentLoaded", function (event) {
  _root = document.getElementById("root");
  _root.addEventListener("mousedown", onMouseDownRoot);
  _root.addEventListener("mouseup", onMouseUpRoot);
  _root.addEventListener("mousemove", onMouseMoveRoot);
  window.addEventListener("keydown", onKeyDownRoot);
});

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dropHandler(ev) {
  console.log("File(s) dropped");
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    [...ev.dataTransfer.items].forEach((item, i) => {
      if (item.kind === "file" && item.type === "image/png") {
        const file = item.getAsFile();

        const sprite = new Sprite(file, 80, 80, {
          x: ev.clientX,
          y: ev.clientY,
        });
        _editor.AddSpriteToArray(sprite);
      }
    });
  } else {
    [...ev.dataTransfer.files].forEach((file, i) => {
      //
    });
  }
}

function dragOverHandler(ev) {
  ev.preventDefault();
}
