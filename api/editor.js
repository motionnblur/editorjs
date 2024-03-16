class Editor extends EventObject {
  items = new Array();
  constructor(document) {
    super(document);
    this.document = document;
    this.currentSprite = null;

    document.addEventListener("DOMContentLoaded", () => {
      _root = document.getElementById("root");

      this.selectAreaDiv = document.getElementById("group-select");
    });

    _editor = this;
    this.spriteMap = new Map();
  }

  onMouseDown(e) {
    console.log("down editor");

    //console.log(e);
    if (e.target.tagName === "IMG") {
      this.currentSprite = this.spriteMap.get(e.target);
    }
  }
  onMouseUp(e) {
    console.log("up editor");

    this.currentSprite = null;
  }
  onMouseMove(e) {
    console.log("move editor");
    if (this.currentSprite) {
      this.currentSprite.Move(e);
    }
  }

  addItemToPage(file, ev) {
    var img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    const _item = new Item(img, ev, 75, 75);
    _editor.addItem(_item);

    var src = document.getElementById("root");
    src.appendChild(_item.GetImage());

    this.spriteMap.set(img, _item);
  }
  addItem(item) {
    this.items.push(item);
    //this.currentSprite = item;
  }
}
/////////////////////////////////////////

///////////////////////////////////////////

////////////////////////////////////////////
