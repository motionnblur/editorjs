class SelectArea {
  constructor(pos) {
    const selectArea = document.createElement("div");
    selectArea.classList.add("select-area");

    selectArea.style.display = "none";
    selectArea.style.left = pos.x + "px";
    selectArea.style.top = pos.y + "px";
    this.selectArea = selectArea;

    _root.appendChild(selectArea);
  }
  UpdatePos(pos) {
    this.selectArea.style.left = pos.x + "px";
    this.selectArea.style.top = pos.y + "px";
  }
  Show() {
    this.selectArea.style.display = "block";
  }
  Hide() {
    this.selectArea.style.display = "none";
  }
  GetDivImage() {
    return this.selectArea;
  }
}
