class SpriteItem extends DynamicTexture {
  constructor(image, ev, width, height) {
    super(ev, image, width, height);

    this.width = width;
    this.height = height;

    currentSpriteWidth = width;
    currentSpriteHeight = height;

    this.selectionArea = new SelectionArea(
      this,
      {
        x: ev.clientX,
        y: ev.clientY,
      },
      25
    );
  }

  MouseDown(x, y) {
    this.selectionArea.updatePos(x, y);
    this.ShowSelectionArea();
    currentSpriteImage = this.image;
  }

  ShowSelectionArea() {
    this.isSelectionAreaOpen = true;
    this.selectionArea.Show();
  }
  HideSelectionArea() {
    this.isSelectionAreaOpen = false;
    this.selectionArea.Hide();
  }
  OnDrawCallback() {
    this.selectionArea.updatePos(this.pos.x, this.pos.y);
  }

  //////////// events
  Destroy() {
    this.image.remove();
    this.selectionArea.Destroy();
  }
  //////////// events
}
