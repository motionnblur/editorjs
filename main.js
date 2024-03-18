class Editor {
  constructor() {
    this.spriteArray = [];
    this.currentSelectedSprite = null;
    this.mouseOffsetFromSprite = {
      x: 0,
      y: 0,
    };
  }
  SetMouseOffsetFromSprite(mosePosX, mousePosY, currentSpritePos) {
    this.mouseOffsetFromSprite = {
      x: mosePosX - currentSpritePos.x,
      y: mousePosY - currentSpritePos.y,
    };
  }
  GetMouseOffsetFromSprite() {
    return this.mouseOffsetFromSprite;
  }
  SetCurrentSelectedSprite(sprite) {
    this.currentSelectedSprite = sprite;
  }
  GetCurrentSelectedSprite() {
    return this.currentSelectedSprite;
  }
  ClearCurrentSelectedSprite() {
    this.currentSelectedSprite = null;
  }
  AddSpriteToArray(sprite) {
    this.spriteArray.push(sprite);
  }
  RemoveSpriteFromArray(sprite) {
    this.spriteArray = this.spriteArray.filter((s) => s !== sprite);
  }

  onMouseDownCallback(e, obj) {
    this.SetMouseOffsetFromSprite(
      e.clientX,
      e.clientY,
      obj.GetSpritePosition()
    );
    this.SetCurrentSelectedSprite(obj);
  }
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
  GetSpritePosition() {
    return {
      x: parseInt(this.image.style.left),
      y: parseInt(this.image.style.top),
    };
  }
  onMouseDownCallback(e) {
    _editor.onMouseDownCallback(e, this);
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
  onMouseDown(e) {
    this.onMouseDownCallback(e);
  },
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////-->CLASSES

/////// variables
var _root;
var offset = {
  x: 0,
  y: 0,
};
var _editor = new Editor();
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
        _editor.AddSpriteToArray(sprite);
      }
    });
  } else {
    [...ev.dataTransfer.files].forEach((file, i) => {
      //
    });
  }
}
////////////////////////////////////////////////////////////////////////////////--> MAIN DOM EVENTS
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
    _editor.GetCurrentSelectedSprite().image.style.left =
      e.clientX - offset.x + "px";
    _editor.GetCurrentSelectedSprite().image.style.top =
      e.clientY - offset.y + "px";
  }
}
////////////////////////////////////////////////////////////////////////////////--> MAIN DOM EVENTS

function dragOverHandler(ev) {
  ev.preventDefault();
}
