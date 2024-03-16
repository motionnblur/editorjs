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

    if (e.target.tagName !== "IMG") {
      if (this.currentSprite) {
        this.currentSprite.HideSelectionArea();
        this.currentSprite = null;
      }
    } else if (e.target.tagName === "IMG") {
      const newSelectedSprite = this.spriteMap.get(e.target);
      if (this.currentSprite === null) {
        this.currentSprite = newSelectedSprite;
        this.currentSprite.ShowSelectionArea();
        console.log("return");
        return;
      }

      if (this.currentSprite) {
        if (this.currentSprite !== newSelectedSprite) {
          this.currentSprite.HideSelectionArea();
        }
        if (!this.currentSprite.isSelectionAreaOpen) {
          if (this.currentSprite.isSelected) {
          } else {
            this.currentSprite.HideSelectionArea();
            this.currentSprite = null;
          }
        }
      }
      this.currentSprite = newSelectedSprite;
    }
  }
  onMouseUp(e) {
    console.log("up editor");

    if (this.currentSprite) {
      this.currentSprite.StopDrag();
    }
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
