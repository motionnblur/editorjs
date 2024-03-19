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
