import {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  Menu,
  nativeImage,
  dialog,
} from "electron";
import path from "node:path";
import axios from "axios";
import os from "os";
import { getWinSettings, saveBounds } from "./Storage/setting";
import {
  setTokensBeforeRequest,
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  getRefreshToken,
} from "./Service/auth-service";
import {
  UpdateDownloadedEvent,
  UpdateInfo,
  autoUpdater,
} from "electron-updater";

const image = nativeImage.createFromPath(__dirname + "/img/icon.png");

// where public folder on the root dir
image.setTemplateImage(true);
const openedWindowURLs: string[] = [];
// Function to extract the Electron version from the user agent string
function getElectronVersion(userAgent: any) {
  const match = userAgent.match(/Electron\/(\S+)/);
  return match ? match[1] : "";
}

// Function to extract the Chrome version from the user agent string
function getChromeVersion(userAgent: any) {
  const match = userAgent.match(/Chrome\/(\S+)/);
  return match ? match[1] : "";
}

// Function to create the formatted user agent string
function formatUserAgentString() {
  const operatingSystem = os.platform();
  const cpuModel = os.cpus()[0].model;

  // Get all open windows
  const windows = BrowserWindow.getAllWindows();

  // Get the user agent from the first window (you can modify this as needed)
  const userAgent = windows.length > 0 ? windows[0].webContents.userAgent : "";

  const electronVersion = getElectronVersion(userAgent);
  const chromeVersion = getChromeVersion(userAgent);

  return `Mozilla/5.0 (${
    operatingSystem === "darwin" ? "macOs" : operatingSystem
  }; ${cpuModel}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36 Electron/${electronVersion}`;
}

const formattedUserAgentString = formatUserAgentString();

//return userArgent to browser
ipcMain.handle("userAgent", () => {
  return formattedUserAgentString;
});

// const image = nativeImage.createFromPath(__dirname + "/img/icon.png");
// // where public folder on the root dir
// image.setTemplateImage(true);

// let icon: any;
// switch (process.platform) {
//   case "win32":
//     icon = path.resolve(__dirname, "img", "icon.ico");
//     break;
//   case "darwin":
//     icon = path.resolve(__dirname, "img", "icon.icns");
//     break;
//   case "linux":
//     icon = path.resolve(__dirname, "img", "icon.png");
//     break;
// }

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
const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36";

//reload app 1 time when app is ready

function createWindow() {
  const size: any = getWinSettings();

  win = new BrowserWindow({
    width: size[0],
    height: size[1],
    title: "Webspy",
    icon: path.join(__dirname, "/img/icons.icns"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
    skipTaskbar: true,
  });
  win.setIcon(path.join(__dirname, "/img/icon.png"));

  const isMac = process.platform === "darwin";

  const isProduction = process.env.NODE_ENV === "development";

  const menuTemplate = [
    {
      label: "Application",
      submenu: [
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+R",
          click: () => {
            // Get the focused window and reload it
            const win = BrowserWindow.getFocusedWindow();
            if (win) {
              win.reload();
            }
          },
        },
        {
          label: "Exit",
          accelerator: isMac ? "Command+Q" : "Alt+F4",
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: "Window",
      submenu: [
        {
          label: "Refresh",
          accelerator: "CmdOrCtrl+R",
          click: () => {
            // Get the focused window and reload it
            const win = BrowserWindow.getFocusedWindow();
            if (win) {
              win.reload();
            }
          },
        },
        {
          label: "Full Screen",
          accelerator: "CmdOrCtrl+F",
          click: () => {
            // Get the focused window and toggle full screen
            const win = BrowserWindow.getFocusedWindow();
            if (win) {
              win.setFullScreen(!win.isFullScreen());
            }
          },
        },
        {
          label: "Maximize",
          accelerator: "CmdOrCtrl+M",
          click: () => {
            // Get the focused window and maximize it
            const win = BrowserWindow.getFocusedWindow();
            if (win) {
              win.maximize();
            }
          },
        },
        {
          label: "Minimize",
          accelerator: "CmdOrCtrl+M",
          click: () => {
            // Get the focused window and minimize it
            const win = BrowserWindow.getFocusedWindow();
            if (win) {
              win.minimize();
            }
          },
        },
        {
          label: "Zoom In",
          accelerator: "CmdOrCtrl+=",
          click: () => {
            // Get the focused window and zoom in
            const win = BrowserWindow.getFocusedWindow();
            if (win) {
              win.webContents.zoomLevel += 0.5;
            }
          },
        },
        {
          label: "Zoom Out",
          accelerator: "CmdOrCtrl+-",
          click: () => {
            // Get the focused window and zoom out
            const win = BrowserWindow.getFocusedWindow();
            if (win) {
              win.webContents.zoomLevel -= 0.5;
            }
          },
        },
        {
          label: "Reset Zoom",
          accelerator: "CmdOrCtrl+0",
          click: () => {
            // Get the focused window and reset zoom
            const win = BrowserWindow.getFocusedWindow();
            if (win) {
              win.webContents.zoomLevel = 0;
            }
          },
        },
      ],
    },
  ];

  if (isProduction) {
    menuTemplate.push({
      label: "Dev",
      submenu: [
        {
          label: "Debug",
          accelerator:
            process.platform === "win32" ? "Ctrl+Shift+I" : "Cmd+Alt+I",
          click: () => {
            const win = BrowserWindow.getFocusedWindow();
            if (win) {
              win.webContents.openDevTools();
            }
          },
        },
      ],
    });
  }

  // autoUpdater.checkForUpdates = () => {
  //   // You can simulate an update being available in development by calling the following method
  //   autoUpdater.emit("update-available");
  // };

  // Simulate download progress
  // autoUpdater.emit("download-progress", {
  //   bytesPerSecond: 1024,
  //   percent: 50,
  //   transferred: 512,
  //   total: 1024,
  // });

  // Simulate the update being downloaded
  // autoUpdater.emit("update-downloaded", {
  //   releaseNotes: "Your release notes here",
  //   releaseName: "v1.2.3",
  // });

  //simulate an download progress event calling the following method

  // if (isProduction) {
  autoUpdater.checkForUpdates();
  // }

  // Add more menu items or submenus as needed

  // Set the menu template
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  const mainSession = win.webContents.session;

  mainSession.webRequest.onBeforeRequest((details: any, callback: any) => {
    // Execute your action here before the request
    if (
      (details.url.includes("semrush") && details.url.includes("logout")) ||
      (details.url.includes("bigspy") && details.url.includes("logout")) ||
      details.url.includes("unbind-user-device") ||
      (details.url.includes("pipiads") && details.url.includes("logout"))
    ) {
      // Cancel the request
      console.log("você não tem permissao para fazer isso");
      callback({ cancel: true });
      throw new Error("você não tem permissao para fazer isso");
    } else {
      // Continue the request for other URLs
      callback({ cancel: false });
    }
  });

  const cookie = [
    {
      domain: ".semrush.com",
      expirationDate: 1722365557,
      hostOnly: false,
      httpOnly: false,
      name: "_mkto_trk",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: "id:519-IIY-869&token:_mch-semrush.com-1690224239981-39201",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1690829614,
      hostOnly: false,
      httpOnly: false,
      name: "_dc_gtm_UA-6197637-22",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: "1",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1721760239,
      hostOnly: false,
      httpOnly: false,
      name: "ref_code",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: "__default__",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1723920240,
      hostOnly: false,
      httpOnly: false,
      name: "_ttp",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: "FLnHa96xN70wA_ATBHSu3bvut5E",
    },
    {
      domain: "pt.semrush.com",
      expirationDate: 1718387194,
      hostOnly: true,
      httpOnly: false,
      name: "sa-user-id",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value:
        "s%253A0-0b1dfa82-6462-5fd5-68fe-25f6ceabc56c.EkfWLsGA6f4vmz8CcJ%252BjM6Lusw3gqdViP695xDEOmWQ",
    },
    {
      domain: ".pt.semrush.com",
      expirationDate: 1724539809.741487,
      hostOnly: false,
      httpOnly: false,
      name: "G_ENABLED_IDPS",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: "google",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1722365554,
      hostOnly: false,
      httpOnly: false,
      name: "_ga_HYWKMHR981",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: "GS1.1.1690818190.48.1.1690829554.17.0.0",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1713554232,
      hostOnly: false,
      httpOnly: false,
      name: "intercom-id-cs07vi2k",
      path: "/",
      sameSite: "lax",
      secure: false,
      session: false,
      storeId: null,
      value: "0c4664a2-3549-4628-9b32-af18691cb0b2",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1723920240,
      hostOnly: false,
      httpOnly: false,
      name: "_tt_enable_cookie",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: "1",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1698605563,
      hostOnly: false,
      httpOnly: false,
      name: "_fbp",
      path: "/",
      sameSite: "lax",
      secure: false,
      session: false,
      storeId: null,
      value: "fb.1.1690224240063.1556389571",
    },
    {
      domain: "pt.semrush.com",
      expirationDate: 1718387194,
      hostOnly: true,
      httpOnly: false,
      name: "sa-user-id-v2",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value:
        "s%253ACx36gmRiX9Vo_iX2zqvFbMiFgTw.1zL7TqFC7f2%252FrgCHnzGuUubWf4H019Tib8RPI1jtRH8",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1721760268.148851,
      hostOnly: false,
      httpOnly: true,
      name: "sso_token",
      path: "/",
      sameSite: null,
      secure: true,
      session: false,
      storeId: null,
      value: "d9e9b3734b229763fd34c389f569dfeb000b9c7dda326e45dcae48878ad37a6d",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1721760239,
      hostOnly: false,
      httpOnly: false,
      name: "refer_source",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: '""',
    },
    {
      domain: ".semrush.com",
      expirationDate: 1690915953,
      hostOnly: false,
      httpOnly: false,
      name: "_uetsid",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: "f42157e02fb811ee96989741a83e5951",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1725378188.348922,
      hostOnly: false,
      httpOnly: false,
      name: "visit_first",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: "1690818188347",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1691434203,
      hostOnly: false,
      httpOnly: false,
      name: "intercom-session-cs07vi2k",
      path: "/",
      sameSite: "lax",
      secure: false,
      session: false,
      storeId: null,
      value:
        "TVJSZFcvVGswNHZSMVpCaEtlTTlhRnp2WnpOWVJ2c0hGS0ZodURwSnlTSW5wSXlyWVpuN0R4akFYNTh6SmFFQS0tcytSUmdTbERGVVpIUVVEQTBuY29xdz09--d2ddfdc638e6205cbefc16c567342b6557b118d9",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1724525553,
      hostOnly: false,
      httpOnly: false,
      name: "_uetvid",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: "7918cbb00ba411ee9a079335f2f49ded",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1722365546,
      hostOnly: false,
      httpOnly: false,
      name: "_ga_BPNLXP3JQG",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: "GS1.1.1690818190.48.1.1690829546.0.0.0",
    },
    {
      domain: "pt.semrush.com",
      expirationDate: 1691001172,
      hostOnly: true,
      httpOnly: false,
      name: "_ampl",
      path: "/",
      sameSite: "no_restriction",
      secure: true,
      session: false,
      storeId: null,
      value: "EiScKprSiNHTk7i4QzgOz",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1722365563,
      hostOnly: false,
      httpOnly: false,
      name: "_ga",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: "GA1.2.568034475.1690224236",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1698000240,
      hostOnly: false,
      httpOnly: false,
      name: "_gcl_au",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: "1.1.1114613256.1690224240",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1690915963,
      hostOnly: false,
      httpOnly: false,
      name: "_gid",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: "GA1.2.1702962395.1690818190",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1721760239,
      hostOnly: false,
      httpOnly: false,
      name: "cookiehub",
      path: "/",
      sameSite: "lax",
      secure: false,
      session: false,
      storeId: null,
      value:
        "eyJhbnN3ZXJlZCI6dHJ1ZSwicmV2aXNpb24iOjEsImRudCI6ZmFsc2UsImFsbG93U2FsZSI6dHJ1ZSwiaW1wbGljdCI6ZmFsc2UsInJlZ2lvbiI6IkMxIiwidG9rZW4iOiIxcURXV2Q4MHpXUGZBTkpPcEttUEZPOFF0dzRJaTF2a3lhek5JN0pOdXkxaVVpQzAzMzcxb0c4ZVBEblhLQnhTIiwidGltZXN0YW1wIjoiMjAyMy0wNy0yNFQxODo0Mzo1OS41MjBaIiwiYWxsQWxsb3dlZCI6dHJ1ZSwiY2F0ZWdvcmllcyI6W10sInZlbmRvcnMiOltdLCJzZXJ2aWNlcyI6W10sImltcGxpY2l0IjpmYWxzZX0=",
    },
    {
      domain: "pt.semrush.com",
      expirationDate: 1718395374.535357,
      hostOnly: true,
      httpOnly: false,
      name: "csrftoken",
      path: "/",
      sameSite: "lax",
      secure: false,
      session: false,
      storeId: null,
      value: "ydOfTnoWcQkLQnPuOSPSaH3IZ5w39n9IFskRU6zQrzRAHqxRDWXyaBI0A8dEvU19",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1692816231,
      hostOnly: false,
      httpOnly: false,
      name: "ga_exp_c41234be21bd4796bbf8e763",
      path: "/",
      sameSite: "lax",
      secure: false,
      session: false,
      storeId: null,
      value: "1",
    },
    {
      domain: "pt.semrush.com",
      expirationDate: 1690904586.673304,
      hostOnly: true,
      httpOnly: true,
      name: "GCLB",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: "CLPi55y7r62kWw",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1714159403,
      hostOnly: false,
      httpOnly: false,
      name: "intercom-device-id-cs07vi2k",
      path: "/",
      sameSite: "lax",
      secure: false,
      session: false,
      storeId: null,
      value: "a6aaa019-e2b7-4803-80c1-50073db904bc",
    },
    {
      domain: "pt.semrush.com",
      expirationDate: 1690904591,
      hostOnly: true,
      httpOnly: false,
      name: "ln_or",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value: "eyIzODc1MzgiOiJkIn0%3D",
    },
    {
      domain: "pt.semrush.com",
      expirationDate: 1690831346.531313,
      hostOnly: true,
      httpOnly: false,
      name: "lux_uid",
      path: "/",
      sameSite: "lax",
      secure: false,
      session: false,
      storeId: null,
      value: "169082929359816141",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1690904587.672989,
      hostOnly: false,
      httpOnly: true,
      name: "PHPSESSID",
      path: "/",
      sameSite: null,
      secure: true,
      session: false,
      storeId: null,
      value: "0c40b70347614357590d09c1a5af2fd5",
    },
    {
      domain: "pt.semrush.com",
      expirationDate: 1722004666,
      hostOnly: true,
      httpOnly: false,
      name: "sa-user-id-v3",
      path: "/",
      sameSite: null,
      secure: false,
      session: false,
      storeId: null,
      value:
        "s%253AAQAKIBzTquztlB_TmiC7g-nbGWb1BYopda_2iGNr16nnuLG1EAMYAyDqp9ulBjABOgR49CRIQgTn8fO-.QFodUIlCmG6889Emw0QwRGjo6mT19uXrH24HJ7qbtRc",
    },
    {
      domain: ".semrush.com",
      expirationDate: 1690904587.673259,
      hostOnly: false,
      httpOnly: true,
      name: "SSO-JWT",
      path: "/",
      sameSite: null,
      secure: true,
      session: false,
      storeId: null,
      value:
        "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYzQwYjcwMzQ3NjE0MzU3NTkwZDA5YzFhNWFmMmZkNSIsImlhdCI6MTY5MDgxODE5MywiaXNzIjoic3NvIiwidWlkIjoxNjM4ODk4Mn0.ypm97LkLDzeIXVZSqxlwVYq0gu21FvHZdfqyxaFZnOLxwW8r4U8nrbnGD0M1KqFIPuZWapAwiVMRjFrbiF6UjA",
    },
  ];

  win.webContents.on("will-navigate", (event: any, url: any) => {
    // Check if the URL should be blocked
    if (url.includes("https://google.com")) {
      event.preventDefault(); // Prevent the navigation
      console.log("Blocked navigation to:", url);
    } else {
      console.log("Allowed navigation to:", url);
    }
  });

  win.on("resize", () => saveBounds(win.getSize()));
  win.on("closed", () => app.quit());

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL, { userAgent });
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"), { userAgent });
  }
}

app.on("window-all-closed", () => {
  win = null;
});

ipcMain.handle("open-new-window", async (event, arg) => {
  const ignore = event;
  try {
    const mensagem = await createNewWindow(arg);
    return mensagem; // Return the resolved value from createNewWindow
  } catch (error) {
    return "Ops... ocorreu um error!"; // Return an error message if createNewWindow throws an error
  }
});
async function createNewWindow(arg: any) {
  try {
    if (!openedWindowURLs.includes(arg?.tool)) {
      const request = await axios.get(
        `https://api.webspy.com.br/requests/tool/${arg.tool}`,
        {
          headers: {
            authorization: `Bearer ${arg.token}`,
          },
        }
      );
      console.log(arg?.tool);
      const cookies = JSON.parse(request.data.cookies);

      const updatedData = cookies?.map((item: any) => {
        const newObj = {
          ...item,
          url: `https://www.${arg.tool}.com`,
          domain: `${arg.tool}.com`,
          sameSite: item.sameSite === null ? "unspecified" : item.sameSite,
        };
        return newObj;
      });

      const newWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        title: `${arg?.tool} - Webspy`,
        webPreferences: {
          nodeIntegration: true,
        },
        skipTaskbar: true,
      });

      const mainSession = newWindow.webContents.session;

      mainSession.webRequest.onBeforeRequest((details, callback) => {
        // Execute your action here before the request
        if (
          (details.url.includes("semrush") && details.url.includes("logout")) ||
          (details.url.includes("bigspy") && details.url.includes("logout")) ||
          details.url.includes("unbind-user-device") ||
          (details.url.includes("pipiads") && details.url.includes("logout"))
        ) {
          // Cancel the request
          const NOTIFICATION_TITLE = "Você não tem permissao ";
          const NOTIFICATION_BODY =
            "Você não tem permissão para efetuar essa ação, por favor, use sua ferramenta com moderação.";

          new Notification({
            title: NOTIFICATION_TITLE,
            body: NOTIFICATION_BODY,
          }).show();
          newWindow.loadURL(`${arg.url}`);
          callback({ cancel: true });
        } else {
          // Continue the request for other URLs
          callback({ cancel: false });
        }
      });
      win.webContents.on("will-navigate", (event: any, url: any) => {
        // Check if the URL should be blocked
        if (url.includes("https://google.com")) {
          event.preventDefault(); // Prevent the navigation
          console.log("Blocked navigation to:", url);
        } else {
          console.log("Allowed navigation to:", url);
        }
      });

      updatedData.forEach(async (cookie: any) => {
        try {
          const result = await mainSession.cookies.set(cookie);
        } catch (error) {
          console.error("Error setting cookie:", error);
        }
      });
      openedWindowURLs.push(arg?.tool);
      newWindow.on("closed", () => {
        const index = openedWindowURLs.indexOf(arg?.tool);
        if (index !== -1) {
          openedWindowURLs.splice(index, 1);
        }
      });
      newWindow.loadURL(`${arg.url}`, { userAgent });
      return "Success";
    } else {
      const NOTIFICATION_TITLE = "Janela já aberta";
      const NOTIFICATION_BODY =
        "Você já tem uma janela aberta com essa ferramenta, por favor, feche a janela atual para abrir uma nova";

      new Notification({
        title: NOTIFICATION_TITLE,
        body: NOTIFICATION_BODY,
      }).show();
      return "Janela já aberta";
    }
  } catch (e) {
    return "Ops... ocorreu um error!";
  }
}

ipcMain.handle("open-new-window-to-webspy", async (event, arg) => {
  const ignore = event;

  try {
    const mensagem = await createNewWindowToWebspyTool(arg);
    return mensagem; // Return the resolved value from createNewWindow
  } catch (error) {
    console.error("Error opening new window:", error);
    return "Ops... ocorreu um error!"; // Return an error message if createNewWindow throws an error
  }
});

async function createNewWindowToWebspyTool(arg: any) {
  try {
    if (!openedWindowURLs.includes(arg?.tool)) {
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
          name: "accessToken2",
          path: "/",
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

      const newWindowToWebspy = new BrowserWindow({
        width: 1000,
        height: 700,
        title: `${arg?.tool} - Webspy`,
        webPreferences: {
          nodeIntegration: true,
        },
      });

      //clear all cookies from windows

      const mainSessionToWebspy = newWindowToWebspy.webContents.session;

      mainSessionToWebspy.webRequest.onBeforeRequest((details, callback) => {
        // Execute your action here before the request
        if (
          (details.url.includes("dashboard") &&
            details.url.includes("webspy")) ||
          (details.url.includes("dashboard") && details.url.includes("webspy"))
        ) {
          newWindowToWebspy.close();
          callback({ cancel: true });
        } else {
          // Continue the request for other URLs
          callback({ cancel: false });
        }
      });
      mainSessionToWebspy.clearStorageData({
        storages: ["cookies"],
      });

      const getCookie = await mainSessionToWebspy.cookies.get({});

      cookies.forEach(async (cookie: any) => {
        try {
          const result = await mainSessionToWebspy.cookies.set(cookie);
          console.log("new cookie to webspy");
        } catch (error) {
          console.error("Error setting cookie:", error);
        }
      });
      openedWindowURLs.push(arg?.tool);
      newWindowToWebspy.on("closed", () => {
        const index = openedWindowURLs.indexOf(arg?.tool);
        if (index !== -1) {
          openedWindowURLs.splice(index, 1);
        }
      });
      newWindowToWebspy.loadURL(`${arg.url}`, {
        userAgent: formattedUserAgentString,
      });
      return "Success";
    } else {
      const NOTIFICATION_TITLE = "Janela já aberta";
      const NOTIFICATION_BODY =
        "Você já tem uma janela aberta com essa ferramenta, por favor, feche a janela atual para abrir uma nova";

      new Notification({
        title: NOTIFICATION_TITLE,
        body: NOTIFICATION_BODY,
      }).show();
      return "Janela já aberta";
    }
  } catch (e) {
    console.log(e);
    return "Ops... ocorreu um error!";
  }
}

autoUpdater.on("update-available", (_event: UpdateInfo) => {
  const dialogOpts: any = {
    type: "info",
    buttons: ["Ok"],
    icon: image,
    title: "Application Update",
    message: "Uma nova versão do app da webspy está disponivel.",
    detail:
      "Uma nova versão do app da webspy está disponivel, clique em ok para atualizar.",
  };

  dialog.showMessageBox(dialogOpts).then((response) => {
    if (response.response === 0) {
      console.log("quit and install");

      autoUpdater.quitAndInstall();
    }
  });
});

autoUpdater.on("update-downloaded", (event: UpdateDownloadedEvent) => {
  const dialogOpts: any = {
    type: "info",
    buttons: ["Reiniciar App"],
    icon: image,
    title: "Application Update",
    message:
      process.platform === "win32" ? event.releaseNotes : event.releaseName,
    detail:
      "Uma nova versão do app foi baixada. Reinicie o aplicativo para aplicar as atualizações.",
  };

  dialog.showMessageBox(dialogOpts).then((response) => {
    if (response.response === 0) {
      // Restart the app
      app.relaunch();
    }
  });
});

// let downloadWindow:any;

// function createDownloadWindow() {
//   downloadWindow = new BrowserWindow({
//     width: 400,
//     height: 200,
//     webPreferences: {
//       nodeIntegration: true, // This enables Node.js integration in the window.
//     },
//   });

//   downloadWindow.loadFile('download-progress.html'); // Load an HTML file to show the progress.
//   // Replace 'download-progress.html' with the path to your HTML file that displays the download progress.
// }

// autoUpdater.on('download-progress', (progressObj) => {
//   // Create the download window if it hasn't been created yet
//   if (!downloadWindow) {
//     createDownloadWindow();
//   }
//   console.log(`Download speed: ${progressObj.bytesPerSecond}`);
//   console.log(`Downloaded ${progressObj.percent}%`);
//   console.log(
//     `Total downloaded: ${progressObj.transferred}/${progressObj.total}`
//   );

//   // Send progress to the download window
//   if (downloadWindow) {
//     downloadWindow.webContents.send('update-download-progress', progressObj);
//   }
// });

app.whenReady().then(createWindow);
