import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import axios from "axios";
import userStore from "./Storage/userStore";
import { getWinSettings, saveBounds } from "./Storage/setting";
import {
  setTokensBeforeRequest,
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  getRefreshToken,
} from "./Service/auth-service";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | any;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  const size: any = getWinSettings();
  const token = userStore.get("token");

  win = new BrowserWindow({
    width: size[0],
    height: size[1],
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    title: "New App Name",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // win.setMenu(null);
  // win.setMenuBarVisibility(false)

  // const {
  //   session: { webRequest },
  // } = win.webContents;

  // webRequest.onBeforeSendHeaders((details: any, callback: any) => {
  //   setTokensBeforeRequest(details); // Modify the request headers with tokens
  //   callback({ cancel: false, requestHeaders: details.requestHeaders });
  // });

  win.on("resize", () => saveBounds(win.getSize()));

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  win = null;
});

ipcMain.handle("open-new-window", async (event, arg) => {
  try {
    const mensagem = await createNewWindow(arg);
    console.log("console.log:", mensagem);
    return mensagem; // Return the resolved value from createNewWindow
  } catch (error) {
    console.error("Error opening new window:", error);
    return "Ops... ocorreu um error!"; // Return an error message if createNewWindow throws an error
  }
});
async function createNewWindow(arg: any) {
  console.log(arg);
  try {
    const request = await axios.get(
      `http://localhost:3004/requests/tool/${arg.tool}`,
      {
        headers: {
          authorization: `Bearer ${arg.token}`,
        },
      }
    );
    const cookies = JSON.parse(request.data.cookies);

    const updatedData = cookies.map((item: any) => {
      const newObj = {
        ...item,
        url: "https://www.semrush.com",
        domain: "semrush.com",
        sameSite: item.sameSite === null ? "unspecified" : item.sameSite,
      };
      return newObj;
    });

    const newWindow = new BrowserWindow({
      width: 1000,
      height: 700,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    const mainSession = newWindow.webContents.session;
    updatedData.forEach(async (cookie: any) => {
      try {
        const result = await mainSession.cookies.set(cookie);
      } catch (error) {
        console.error("Error setting cookie:", error);
      }
    });

    newWindow.loadURL(`${arg.url}`);
    return "Success";
  } catch (e) {
    console.log(e);
    return "Ops... ocorreu um error!";
  }
}
ipcMain.handle("open-new-window-to-webspy", async (event, arg) => {
  console.log("open-new-window-to-webspy foi execultado");

  try {
    const mensagem = await createNewWindowToWebspyTool(arg);
    console.log("console.log:", mensagem);
    return mensagem; // Return the resolved value from createNewWindow
  } catch (error) {
    console.error("Error opening new window:", error);
    return "Ops... ocorreu um error!"; // Return an error message if createNewWindow throws an error
  }
});

async function createNewWindowToWebspyTool(arg: any) {
  console.log("Arg foi execultado", arg);
  try {
    const accessTokenSplit = [
      arg.accessToken?.slice(0, arg.accessToken?.length / 2),
      arg.accessToken?.slice(
        arg.accessToken?.length / 2,
        arg.accessToken?.length
      ),
    ];

    const refreshTokenSplit = [
      arg.refreshToken?.slice(0, arg.refreshToken?.length / 2),
      arg.refreshToken?.slice(
        arg.refreshToken?.length / 2,
        arg.refreshToken?.length
      ),
    ];

    const cookies = [
      {
        url: "https://webspy.com.br",
        domain: "webspy.com.br",
        sameSite: "unspecified",
        expirationDate: 1722121868,
        hostOnly: false,
        httpOnly: false,
        name: "accessToken",
        path: "/",
        secure: false,
        session: false,
        storeId: null,
        value: accessTokenSplit[0],
      },
      {
        url: "https://webspy.com.br",
        domain: "webspy.com.br",
        sameSite: "unspecified",
        expirationDate: 1722121868,
        hostOnly: false,
        httpOnly: false,
        name: "'accessToken2",
        path: "/",
        name: "accessToken2",
        secure: false,
        session: false,
        storeId: null,
        value: accessTokenSplit[1],
      },
      {
        url: "https://webspy.com.br",
        domain: "webspy.com.br",
        sameSite: "unspecified",
        expirationDate: 1722121868,
        hostOnly: false,
        httpOnly: false,
        name: "refreshToken",
        path: "/",
        secure: false,
        session: false,
        storeId: null,
        value: refreshTokenSplit[0],
      },
      {
        url: "https://webspy.com.br",
        domain: "webspy.com.br",
        sameSite: "unspecified",
        expirationDate: 1722121868,
        hostOnly: false,
        httpOnly: false,
        name: "refreshToken2",
        path: "/",
        secure: false,
        session: false,
        storeId: null,
        value: refreshTokenSplit[1],
      },
    ];

    const newWindow = new BrowserWindow({
      width: 1000,
      height: 700,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    const mainSession = newWindow.webContents.session;
    cookies.forEach(async (cookie: any) => {
      try {
        const result = await mainSession.cookies.set(cookie);
      } catch (error) {
        console.error("Error setting cookie:", error);
      }
    });

    newWindow.loadURL(`${arg.url}`);
    return "Success";
  } catch (e) {
    console.log(e);
    return "Ops... ocorreu um error!";
  }
}

function destroyAuthWin() {
  if (!win) return;
  win.close();
  win = null;
}

ipcMain.on("set-user", (event, arg) => {
  setAccessToken(arg.token);
  setRefreshToken(arg.refreshToken);
});

ipcMain.handle("user", (event, arg) => {
  const token = getAccessToken();
  const refreshToken = getRefreshToken();
  return { token: token, refreshToken: refreshToken };
});

app.whenReady().then(createWindow);
