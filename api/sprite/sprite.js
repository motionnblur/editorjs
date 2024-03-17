class SpriteItem extends DynamicTexture {
  constructor(image, ev, width, height) {
    super(ev, image);

    this.width = width;
    this.height = height;

    const pos = {
      x: ev.clientX,
      y: ev.clientY,
    };
    this.selectionArea = new SelectionArea(this, pos, 30);
  }

  MouseDown(x, y) {
    this.selectionArea.updatePos(x, y);
    this.ShowSelectionArea();
  }

  ShowSelectionArea() {
    this.isSelectionAreaOpen = true;
    this.selectionArea.Show();
  }
  HideSelectionArea() {
    this.isSelectionAreaOpen = false;
    this.selectionArea.Hide();
  }
  onDraw() {
    this.selectionArea.updatePos(this.pos.x, this.pos.y);
  }

  //////////// events
  Destroy() {
    this.image.remove();
    this.selectionArea.Destroy();
  }
  //////////// events
}
