/////// variables
var _root;
var currentSelectedSprite;
var currentSpriteTemp;
var offset = {
  x: 0,
  y: 0,
};
var spriteArray = [];
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

        const sprite = new Sprite(file, 50, 50, {
          x: ev.clientX,
          y: ev.clientY,
        });
        spriteArray.push(sprite);

        //currentSelectedSprite = sprite;
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
  currentSelectedSprite.image.style.zIndex = 5;
  currentSelectedSprite = null;
}

function onMouseDownSprite(e) {
  /* currentSelectedSprite = e.target;
  currentSelectedSprite.image.style.zIndex = 100;

  currentSpriteTemp = currentSelectedSprite;
  const leftInt = parseInt(this.style.left);
  const topInt = parseInt(this.style.top);
  offset = {
    x: e.clientX - leftInt,
    y: e.clientY - topInt,
  };

  addSelectionAreaToSprite(currentSpriteTemp); */
}
function onMouseMoveRoot(e) {
  if (currentSelectedSprite) {
    currentSelectedSprite.image.style.left = e.clientX - offset.x + "px";
    currentSelectedSprite.image.style.top = e.clientY - offset.y + "px";
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
class Sprite {
  constructor(file, width, height, pos) {
    this.AssignToDom(file, width, height, pos);

    Object.assign(this, TextureMixin, EventObjectMixin);
    TextureMixin.constructor.call(this, width, height, pos);
    EventObjectMixin.constructor.call(this);
  }
  AssignToDom(file, width, height, pos) {
    var img = document.createElement("img");
    var src = document.getElementById("root");
    img.src = URL.createObjectURL(file);
    img.draggable = false;

    img.classList.add("img");
    img.classList.add("onMouseDownAnim");

    img.style.position = "absolute";
    img.style.left = pos.x + "px";
    img.style.top = pos.y + "px";

    this.image = img;
    src.appendChild(img);
  }
  onMouseDownCallback() {
    currentSelectedSprite = this;
  }
}
const TextureMixin = {
  constructor(width, height, pos) {
    this.image.style.width = width + "px";
    this.image.style.height = height + "px";
    this.image.style.left = pos.x + "px";
    this.image.style.top = pos.y + "px";
  },
};
const EventObjectMixin = {
  constructor() {
    this.image.addEventListener("mousedown", this.onMouseDown.bind(this));
  },
  onMouseDown() {
    this.onMouseDownCallback();
  },
};
