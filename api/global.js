var _root;
var _editor;

var mouseOnElement = false;
var rootMouseDown = false;
var resizeStage = false;
var isMouseDownSelectionBox = false;
var currentSpriteImage = null;
var currentSelectionAreaImage = null;

var currentSpriteWidth = 0;
var currentSpriteHeight = 0;

var firstAreaPos = { x: 0, y: 0 };
var lastAreaPos = { x: 0, y: 0 };
var offsetFromSelectionArea = { x: 0, y: 0 };
var offsetFromSelectionBos = { x: 0, y: 0 };
