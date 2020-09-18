const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;

const notifyBtn = document.getElementById("notifyBtn");

notifyBtn.addEventListener("click", function (event) {
  let win = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
  });
  win.on("close", function () {
    win = null;
  });
  // and load the index.html of the app.
  win.loadFile("src/add.html");
});
