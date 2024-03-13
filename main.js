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
////// variables

document.addEventListener("DOMContentLoaded", function (event) {
  _root = document.getElementById("root");
  _root.addEventListener("mousedown", onMouseDownRoot);
  _root.addEventListener("mouseup", onMouseUpRoot);
  _root.addEventListener("mousemove", onMouseMoveRoot);
  window.addEventListener("keydown", onKeyDownRoot);
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
      }
    }
  }
}
function dragOverHandler(ev) {
  ev.preventDefault();
}
function onMouseDownRoot(e) {
  console.log("mouse down root page");
  if (currentSpriteTemp && !isMouseOnSprite(e)) {
    currentSpriteTemp = null;
    selectionArea.style.display = "none";
  }
}
function onMouseUpRoot() {
  console.log("mouse up root page");
  selectionArea.style.zIndex = 1;
  currentSelectedSprite.style.zIndex = 5;
  currentSelectedSprite = null;
}

function onMouseDownSprite(e) {
  console.log("mouse down sprite");
  currentSelectedSprite = this;
  currentSelectedSprite.style.zIndex = 100;

  currentSpriteTemp = this;
  const leftInt = parseInt(this.style.left);
  const topInt = parseInt(this.style.top);
  offset = {
    x: e.clientX - leftInt,
    y: e.clientY - topInt,
  };

  addSelectionAreaToSprite(currentSpriteTemp);
}
function onMouseMoveRoot(e) {
  if (currentSelectedSprite) {
    currentSelectedSprite.style.left = e.clientX - offset.x + "px";
    currentSelectedSprite.style.top = e.clientY - offset.y + "px";
    if (selectionArea) {
      selectionArea.style.left =
        e.clientX - offset.x - selectionAreaWidth / 2 + "px";
      selectionArea.style.top =
        e.clientY - offset.y - selectionAreaWidth / 2 + "px";
    }
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
}
