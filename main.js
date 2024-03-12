/////// variables
var currentSelectedSprite;
var offset = {
  x: 0,
  y: 0,
};
////// variables

document.addEventListener("DOMContentLoaded", function (event) {
  var _root = document.getElementById("root");
  _root.addEventListener("mousedown", onMouseDownRoot);
  _root.addEventListener("mouseup", onMouseUpRoot);
  _root.addEventListener("mousemove", onMouseMoveRoot);
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

function dragOverHandler(ev) {
  ev.preventDefault();
}
function onMouseDownRoot() {
  console.log("mouse down root page");
}
function onMouseUpRoot() {
  console.log("mouse up root page");
  currentSelectedSprite = null;
}

function onMouseDownSprite(e) {
  console.log("mouse down sprite");
  console.log(e);
  currentSelectedSprite = this;
  const leftInt = parseInt(this.style.left);
  const topInt = parseInt(this.style.top);
  offset = {
    x: e.clientX - leftInt,
    y: e.clientY - topInt,
  };
  console.log(offset);
}
function onMouseMoveRoot(e) {
  if (currentSelectedSprite) {
    currentSelectedSprite.style.left = e.clientX - offset.x + "px";
    currentSelectedSprite.style.top = e.clientY - offset.y + "px";
  }
}
