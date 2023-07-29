// main-process/userStore.js
import Store from "electron-store";

const userStore = new Store({
  defaults: {
    token: null, // You can add other user-related data here if needed
    refreshToken: null,
  },
});

export default userStore;
