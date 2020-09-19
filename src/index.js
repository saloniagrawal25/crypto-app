const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require("axios");
const ipc = electron.ipcRenderer;

const notifyBtn = document.getElementById("notifyBtn");
var price = document.querySelector("h1");
var targetPrice = document.getElementById("targetPrice");
var targetPriceVal;

const notification = {
  title: "BTC Alert",
  body: "BTC just beat your target price!",
  icon: "../assets/images/btc.png",
};

function getBTC() {
  axios
    .get(
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD"
    )
    .then((res) => {
      const cryptos = res.data.BTC.USD;
      price.innerHTML = "$" + cryptos.toLocaleString("en");
      if (targetPrice.innerHTML != "" && targetPriceVal < res.data.BTC.USD) {
        const myNotification = new window.Notification(
          notification.title,
          notification
        );
      }
    });
}
getBTC();
setInterval(getBTC, 10000);
notifyBtn.addEventListener("click", function (event) {
  let win = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  win.on("close", function () {
    win = null;
  });
  win.loadFile("src/add.html");
  // win.webContents.openDevTools();
});

ipc.on("targetPriceVal", function (event, arg) {
  targetPriceVal = Number(arg);
  targetPrice.innerHTML = "$" + targetPriceVal.toLocaleString("en");
});
