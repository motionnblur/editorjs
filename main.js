var _editor = new Editor();

function InitDomElements() {
  const selectArea = document.createElement("div");
  selectArea.classList.add("selection-area");

  selectAreaDiv = selectArea;
  _root.appendChild(selectArea);
}
