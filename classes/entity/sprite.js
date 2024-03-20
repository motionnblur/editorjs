class Sprite {
  constructor(file, width, height, pos) {
    this.AssignToDom(file, pos);

    Object.assign(this, TextureMixin, EventObjectMixin);
    TextureMixin.constructor.call(this, width, height, pos);
    EventObjectMixin.constructor.call(this);

    this.isdraggable = true;
    this.selectAreaObj = new SelectArea({
      x: this.image.offsetLeft + width / 2 - 5,
      y: this.image.offsetTop - 20,
    });
  }

  AssignToDom(file, pos) {
    var img = document.createElement("img");
    var src = document.getElementById("root");
    img.src = URL.createObjectURL(file);
    img.draggable = false;

    img.classList.add("img");

    img.style.position = "absolute";
    img.style.left = pos.x + "px";
    img.style.top = pos.y + "px";

    this.image = img;
    src.appendChild(img);
  }
  GetSpritePosition() {
    return {
      x: parseFloat(this.image.style.left),
      y: parseFloat(this.image.style.top),
    };
  }
  GetSpriteWidth() {
    return parseFloat(this.image.style.width);
  }
  GetSpriteHeight() {
    return parseFloat(this.image.style.height);
  }
  SetSpritePosition(mousePosX, mousePosY, offset) {
    this.image.style.left = mousePosX - offset.x + "px";
    this.image.style.top = mousePosY - offset.y + "px";
    this.UpdateSelectAreaPos();
  }
  SetDraggable(_bool) {
    this.isdraggable = _bool;
  }
  isDraggable() {
    return this.isdraggable;
  }
  Destroy() {
    this.selectAreaObj.GetDivImage().remove();
    this.image.remove();
  }
  onMouseDownCallback(e) {
    this.ShowSelectArea();
    _editor.onMouseDownCallback(e, this);
  }
  SelectSprite() {
    this.ShowSelectArea();
  }
  DeSelectSprite() {
    this.HideSelectArea();
  }
  ShowSelectArea() {
    this.selectAreaObj.Show();
  }
  HideSelectArea() {
    this.selectAreaObj.Hide();
  }
  UpdateSelectAreaPos() {
    this.selectAreaObj.UpdatePos({
      x: this.image.offsetLeft + this.image.offsetWidth / 2 - 5,
      y: this.image.offsetTop - 20,
    });
  }
  SelfDeselect() {
    this.DeSelectSprite();
  }
}
