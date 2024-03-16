class Editor {
  items = new Array();
  constructor(document) {
    this.document = document;
    this.currentSelectedItem = null;
    document.addEventListener("DOMContentLoaded", () => {
      _root = document.getElementById("root");
      _root.addEventListener("mousedown", (e) => {
        if (!mouseOnElement) {
          this.DeSelectSprites();
          this.selectAreaDiv.style.display = "block";
          rootMouseDown = true;
          firstAreaPos = {
            x: e.clientX,
            y: e.clientY,
          };
        }
      });
      _root.addEventListener("mouseup", () => {
        rootMouseDown = false;
        mouseOnElement = false;
        this.selectAreaDiv.style.display = "none";
        this.ClearSelectArea();

        if (this.currentSelectedItem) {
          this.currentSelectedItem.StopDrag();
        }
        if (resizeStage) {
          resizeStage = false;
        }
      });
      _root.addEventListener("mousemove", (e) => {
        if (rootMouseDown) {
          lastAreaPos = {
            x: e.clientX,
            y: e.clientY,
          };
          this.DrawSelectArea(firstAreaPos, lastAreaPos);
          this.DoSelect(firstAreaPos, lastAreaPos);
        }
        if (this.currentSelectedItem && this.currentSelectedItem.movable) {
          this.currentSelectedItem.SetPos(e.clientX, e.clientY);
        }
        if (resizeStage) {
          this.currentSelectedBox.ResizeSprite(e);
        }
      });
      window.addEventListener("keydown", this.handleKeyDown.bind(this));
      this.selectAreaDiv = document.getElementById("group-select");
    });

    _editor = this;
  }
  addItem(item) {
    this.items.push(item);
    this.currentSprite = item;
  }
  setCurrentSprite(item) {
    this.currentSprite = item;
  }
  getCurrentSprite() {
    return this.currentSprite;
  }
  handleKeyDown(e) {
    if (e.key === "Delete") {
      //if (!this.currentSelectedItem) return;
      this.items.forEach((item) => {
        if (item.isSelected) {
          item.Destroy();
        }
      });
      this.items = this.items.filter((item) => !item.isSelected);
    } else if (e.key === "Escape") {
      if (!mouseOnElement) {
        this.items.forEach((item) => {
          item.DeSelectSprite();
        });
      }
    }
  }
  DrawSelectArea(firstAreaPos, lastAreaPos) {
    const top = Math.min(firstAreaPos.y, lastAreaPos.y);
    const left = Math.min(firstAreaPos.x, lastAreaPos.x);
    const width = Math.abs(lastAreaPos.x - firstAreaPos.x);
    const height = Math.abs(lastAreaPos.y - firstAreaPos.y);

    this.selectAreaDiv.style.left = left + "px";
    this.selectAreaDiv.style.top = top + "px";
    this.selectAreaDiv.style.width = width + "px";
    this.selectAreaDiv.style.height = height + "px";
  }
  DoSelect(firstAreaPos, lastAreaPos) {
    const minX = Math.min(firstAreaPos.x, lastAreaPos.x);
    const maxX = Math.max(firstAreaPos.x, lastAreaPos.x);
    const minY = Math.min(firstAreaPos.y, lastAreaPos.y);
    const maxY = Math.max(firstAreaPos.y, lastAreaPos.y);

    this.items.forEach((item) => {
      const itemCenterX = item.posX + item.width / 2;
      const itemCenterY = item.posY + item.height / 2;

      if (
        itemCenterX >= minX &&
        itemCenterX <= maxX &&
        itemCenterY >= minY &&
        itemCenterY <= maxY
      ) {
        item.SelectSprite();
      } else {
        item.DeSelectSprite();
      }
    });
  }
  DeSelectSprites() {
    this.items.forEach((item) => {
      item.DeSelectSprite();
    });
  }
  ClearSelectArea() {
    this.selectAreaDiv.style.left = 0 + "px";
    this.selectAreaDiv.style.top = 0 + "px";
    this.selectAreaDiv.style.width = 0 + "px";
    this.selectAreaDiv.style.height = 0 + "px";
  }

  addItemToPage(file, ev) {
    var img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    const _item = new Item(img, ev, 75, 75);
    _editor.addItem(_item);

    var src = document.getElementById("root");
    src.appendChild(_item.GetImage());
  }
}
/////////////////////////////////////////

///////////////////////////////////////////

////////////////////////////////////////////
