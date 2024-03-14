const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/////// variables
var _root;
var currentSelectedSprite;
var currentSpriteTemp;
var offset = {
  x: 0,
  y: 0,
};
var selectionAreaWidth = 40;
var selectionArea = document.createElement("div");
selectionArea.classList.add("selection-area");
var selectionBoxLeft,
  selectionBoxLeftTop,
  selectionBoxRight,
  selectionBoxBottom;

var isMouseEnterSelectionBox = false;
var isResizeSprite = false;
var currentResizeBox;
////// variables

document.addEventListener("DOMContentLoaded", function (event) {
  _root = document.getElementById("root");
  _root.addEventListener("mousedown", onMouseDownRoot);
  _root.addEventListener("mouseup", onMouseUpRoot);
  _root.addEventListener("mousemove", onMouseMoveRoot);
  window.addEventListener("keydown", onKeyDownRoot);

  selectionBoxLeft = document.getElementById("selection-box-left");
  selectionBoxTop = document.getElementById("selection-box-top");
  selectionBoxRight = document.getElementById("selection-box-right");
  selectionBoxBottom = document.getElementById("selection-box-bottom");

  selectionBoxLeft.addEventListener("mousedown", onMouseDownSelectionBoxLeft);
  selectionBoxTop.addEventListener("mousedown", onMouseDownSelectionBoxTop);
  selectionBoxRight.addEventListener("mousedown", onMouseDownSelectionBoxRight);
  selectionBoxBottom.addEventListener(
    "mousedown",
    onMouseDownSelectionBoxBottom
  );

  selectionBoxLeft.addEventListener("mouseenter", onMouseEnterSelectionBoxLeft);
  selectionBoxTop.addEventListener("mouseenter", onMouseEnterSelectionBoxTop);
  selectionBoxRight.addEventListener(
    "mouseenter",
    onMouseEnterSelectionBoxRight
  );
  selectionBoxBottom.addEventListener(
    "mouseenter",
    onMouseEnterSelectionBoxBottom
  );

  selectionBoxLeft.addEventListener("mouseleave", onMouseLeaveSelectionBoxLeft);
  selectionBoxTop.addEventListener("mouseleave", onMouseLeaveSelectionBoxTop);
  selectionBoxRight.addEventListener(
    "mouseleave",
    onMouseLeaveSelectionBoxRight
  );
  selectionBoxBottom.addEventListener(
    "mouseleave",
    onMouseLeaveSelectionBoxBottom
  );
});

function dropHandler(ev) {
  console.log("File(s) dropped");
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    [...ev.dataTransfer.items].forEach((item, i) => {
      if (item.kind === "file" && item.type === "image/png") {
        const file = item.getAsFile();

        var img = document.createElement("img");
        var src = document.getElementById("root");
        img.src = URL.createObjectURL(file);
        img.draggable = false;

        img.classList.add("img");
        img.classList.add("onMouseDownAnim");

        img.style.position = "absolute";
        img.style.left = ev.clientX + "px";
        img.style.top = ev.clientY + "px";

        img.addEventListener("mousedown", onMouseDownSprite);

        src.appendChild(img);
      }
    });
  } else {
    [...ev.dataTransfer.files].forEach((file, i) => {
      //
    });
  }
}

function onKeyDownRoot(e) {
  console.log("keydown");
  if (e.key === "Delete") {
    if (currentSpriteTemp) {
      currentSpriteTemp.remove();
      if (selectionArea) {
        selectionArea.style.display = "none";
        hideSelectionBoxes();
      }
    }
  }
}
function dragOverHandler(ev) {
  ev.preventDefault();
}
function onMouseDownRoot(e) {
  console.log("mouse down root page");
  if (isMouseEnterSelectionBox) return;

  if (currentSpriteTemp && !isMouseOnSprite(e)) {
    currentSpriteTemp = null;
    hideSelectionArea();
  }
}
function onMouseUpRoot() {
  console.log("mouse up root page");
  selectionArea.style.zIndex = 1;
  if (currentSelectedSprite) {
    currentSelectedSprite.style.zIndex = 5;
    currentSelectedSprite = null;
  }
  isResizeSprite = false;
}

function onMouseDownSprite(e) {
  showSelectionBoxes();

  console.log("mouse down sprite");
  currentSelectedSprite = this;
  currentSelectedSprite.style.zIndex = 100;

  currentSpriteTemp = this;
  const leftInt = parseFloat(this.style.left);
  const topInt = parseFloat(this.style.top);
  offset = {
    x: e.clientX - leftInt,
    y: e.clientY - topInt,
  };

  addSelectionAreaToSprite(currentSpriteTemp);
}
function onMouseMoveRoot(e) {
  if (currentSelectedSprite) {
    moveSprite(e);
  }
  if (isResizeSprite) {
    resizeSprite(e);
  }
}

function isMouseOnSprite(e) {
  return (
    e.clientX >= currentSpriteTemp.offsetLeft &&
    e.clientX <= currentSpriteTemp.offsetLeft + currentSpriteTemp.offsetWidth &&
    e.clientY >= currentSpriteTemp.offsetTop &&
    e.clientY <= currentSpriteTemp.offsetTop + currentSpriteTemp.offsetHeight
  );
}
function addSelectionAreaToSprite() {
  if (selectionArea) {
    selectionArea.style.display = "block";
    selectionArea.style.zIndex = 99;
  }
  selectionArea.style.left =
    currentSpriteTemp.offsetLeft - selectionAreaWidth / 2 + "px";
  selectionArea.style.top =
    currentSpriteTemp.offsetTop - selectionAreaWidth / 2 + "px";
  selectionArea.style.width =
    currentSpriteTemp.offsetWidth + selectionAreaWidth + "px";
  selectionArea.style.height =
    currentSpriteTemp.offsetHeight + selectionAreaWidth + "px";
  selectionArea.style.position = "absolute";
  _root.appendChild(selectionArea);

  addSelectionBoxesToSelectionArea();
}

function showSelectionBoxes() {
  selectionBoxLeft.style.display = "block";
  selectionBoxTop.style.display = "block";
  selectionBoxRight.style.display = "block";
  selectionBoxBottom.style.display = "block";
}

function hideSelectionArea() {
  selectionArea.style.display = "none";
  hideSelectionBoxes();
}
function hideSelectionBoxes() {
  selectionBoxLeft.style.display = "none";
  selectionBoxTop.style.display = "none";
  selectionBoxRight.style.display = "none";
  selectionBoxBottom.style.display = "none";
}

function moveSprite(e) {
  currentSelectedSprite.style.left =
    clamp(e.clientX - offset.x, 0, window.innerWidth - 70) + "px";
  currentSelectedSprite.style.top =
    clamp(e.clientY - offset.y, 0, window.innerHeight - 70) + "px";
  if (selectionArea) {
    moveSelectionArea(e);
  }
}

function addSelectionBoxesToSelectionArea() {
  selectionBoxLeft.style.left = parseFloat(selectionArea.style.left) + "px";
  selectionBoxLeft.style.top =
    parseFloat(selectionArea.style.top) +
    parseFloat(selectionArea.style.width) / 2 -
    7.5 +
    "px";

  selectionBoxTop.style.left =
    parseFloat(selectionArea.style.left) +
    parseFloat(selectionArea.style.width) / 2 -
    7.5 +
    "px";
  selectionBoxTop.style.top = parseFloat(selectionArea.style.top) + "px";

  selectionBoxRight.style.left =
    parseFloat(selectionArea.style.left) +
    parseFloat(selectionArea.style.width) -
    15 +
    "px";
  selectionBoxRight.style.top =
    parseFloat(selectionArea.style.top) +
    parseFloat(selectionArea.style.width) / 2 -
    7.5 +
    "px";

  selectionBoxBottom.style.left =
    parseFloat(selectionArea.style.left) +
    parseFloat(selectionArea.style.width) / 2 -
    7.5 +
    "px";
  selectionBoxBottom.style.top =
    parseFloat(selectionArea.style.top) +
    parseFloat(selectionArea.style.width) -
    15 +
    "px";
}

function moveSelectionArea(e) {
  selectionArea.style.left =
    parseFloat(currentSelectedSprite.style.left) -
    selectionAreaWidth / 2 +
    "px";
  selectionArea.style.top =
    parseFloat(currentSelectedSprite.style.top) - selectionAreaWidth / 2 + "px";

  moveSelectionBoxes(e);
}
function moveSelectionBoxes(e) {
  selectionBoxLeft.style.left = parseFloat(selectionArea.style.left) + "px";
  selectionBoxLeft.style.top =
    parseFloat(selectionArea.style.top) +
    parseFloat(selectionArea.style.width) / 2 -
    7.5 +
    "px";

  selectionBoxTop.style.left =
    parseFloat(selectionArea.style.left) +
    parseFloat(selectionArea.style.width) / 2 -
    7.5 +
    "px";
  selectionBoxTop.style.top = parseFloat(selectionArea.style.top) + "px";

  selectionBoxRight.style.left =
    parseFloat(selectionArea.style.left) +
    parseFloat(selectionArea.style.width) -
    15 +
    "px";
  selectionBoxRight.style.top =
    parseFloat(selectionArea.style.top) +
    parseFloat(selectionArea.style.width) / 2 -
    7.5 +
    "px";

  selectionBoxBottom.style.left =
    parseFloat(selectionArea.style.left) +
    parseFloat(selectionArea.style.width) / 2 -
    7.5 +
    "px";
  selectionBoxBottom.style.top =
    parseFloat(selectionArea.style.top) +
    parseFloat(selectionArea.style.width) -
    15 +
    "px";
}
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

function onMouseDownSelectionBoxBottom() {
  if (isMouseEnterSelectionBox) {
    isResizeSprite = true;
    currentResizeBox = selectionBoxBottom;
  }
}
function onMouseDownSelectionBoxTop() {
  if (isMouseEnterSelectionBox) {
    isResizeSprite = true;
    currentResizeBox = selectionBoxDown;
  }
}
function onMouseDownSelectionBoxLeft() {
  if (isMouseEnterSelectionBox) {
    isResizeSprite = true;
    currentResizeBox = selectionBoxLeft;
  }
}
function onMouseDownSelectionBoxRight() {
  if (isMouseEnterSelectionBox) {
    isResizeSprite = true;
    currentResizeBox = selectionBoxRight;
  }
}

function onMouseEnterSelectionBoxLeft() {
  isMouseEnterSelectionBox = true;
}
function onMouseEnterSelectionBoxTop() {
  isMouseEnterSelectionBox = true;
}
function onMouseEnterSelectionBoxRight() {
  isMouseEnterSelectionBox = true;
}
function onMouseEnterSelectionBoxBottom() {
  isMouseEnterSelectionBox = true;
}

function onMouseLeaveSelectionBoxLeft() {
  isMouseEnterSelectionBox = false;
}
function onMouseLeaveSelectionBoxTop() {
  isMouseEnterSelectionBox = false;
}
function onMouseLeaveSelectionBoxRight() {
  isMouseEnterSelectionBox = false;
}
function onMouseLeaveSelectionBoxBottom() {
  isMouseEnterSelectionBox = false;
}
