import Store from "electron-store";
const storage = new Store();

function getWinSettings() {
  const size = storage.get("win-size");

  if (size) {
    return size;
  } else {
    storage.set("win-size", [800, 600]);
    return { width: 800, height: 600 };
  }
}

function saveBounds(bounds: any) {
  storage.set("win-size", bounds);
  console.log(bounds);
}

export { getWinSettings, saveBounds };