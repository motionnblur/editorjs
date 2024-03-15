const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/////// variables
var selectionArea = document.createElement("div");
selectionArea.classList.add("selection-area");
var _Editor;
////// variables

_Editor = new Editor(document);

function resizeSprite(e) {
  if (currentResizeBox === selectionBoxRight) {
    currentResizeBox.style.left = e.clientX - 7.5 + "px";

    ///////////////-----selection area
    const selectionAreaWidth = parseFloat(selectionArea.style.width);
    const selectionAreaLeftPos = parseFloat(selectionArea.style.left);
    const currentResizeBoxPosition =
      parseFloat(currentResizeBox.style.left) + 15;
    const selectionAreaRightPos = selectionAreaLeftPos + selectionAreaWidth;
    const factor = currentResizeBoxPosition - selectionAreaRightPos;

    const newWidth = selectionAreaWidth + factor;

    selectionArea.style.width = newWidth + "px";
    ///////////////-----selection area
    const offset = 20;
    const spriteWidth = parseFloat(
      window.getComputedStyle(currentSpriteTemp).width
    );

    const spriteLeftPos = parseFloat(currentSpriteTemp.style.left);
    const spriteRightPos = spriteLeftPos + spriteWidth;
    const _factor = currentResizeBoxPosition - offset - spriteRightPos;

    const _newWidth = spriteWidth + _factor;

    currentSpriteTemp.style.width = _newWidth + "px";
  } else if (currentResizeBox === selectionBoxLeft) {
    currentResizeBox.style.left = e.clientX - 7.5 + "px";

    ///////////////-----selection area
    const selectionAreaWidth = parseFloat(selectionArea.style.width);
    const selectionAreaLeftPos = parseFloat(selectionArea.style.left);
    const currentResizeBoxPosition = parseFloat(currentResizeBox.style.left);
    const factor = selectionAreaLeftPos - currentResizeBoxPosition;

    const newWidth = selectionAreaWidth + factor;

    selectionArea.style.width = newWidth + "px";
    selectionArea.style.left =
      parseFloat(selectionArea.style.left) - factor + "px";
    ///////////////-----selection area
    const offset = 20;
    const spriteWidth = parseFloat(
      window.getComputedStyle(currentSpriteTemp).width
    );

    const spriteLeftPos = parseFloat(currentSpriteTemp.style.left);
    const _factor = currentResizeBoxPosition + offset - spriteLeftPos;

    const _newWidth = spriteWidth - _factor;

    currentSpriteTemp.style.width = _newWidth + "px";
    currentSpriteTemp.style.left =
      parseFloat(currentSpriteTemp.style.left) + _factor + "px";
  }
}

function dragOverHandler(ev) {
  ev.preventDefault();
}
function dropHandler(ev) {
  console.log("File(s) dropped");
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    [...ev.dataTransfer.items].forEach((item, i) => {
      if (item.kind === "file" && item.type === "image/png") {
        const file = item.getAsFile();

        var img = document.createElement("img");
        img.src = URL.createObjectURL(file);

        const spriteObj = new Sprite(img, ev, 75, 75);
        _Editor.addSprite(spriteObj);

        var src = document.getElementById("root");
        src.appendChild(spriteObj.GetImage());
      }
    });
  } else {
    [...ev.dataTransfer.files].forEach((file, i) => {
      //
    });
  }
}
