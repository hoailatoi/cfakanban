import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronApi", {
  send: (channel: string, data: any) => {
    // whitelist channels
    let validChannels = ["toMain"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: string, func: (...args: any[]) => void) => {
    let validChannels = ["fromMain"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});

contextBridge.exposeInMainWorld("electronAppVersion", {
  getVersion: () => {
    return new Promise((resolve) => {
      ipcRenderer.send("get-app-version");
      ipcRenderer.once("app-version", (_, version) => {
        resolve(version);
      });
    });
  },
});

// Expose update-related functions to renderer process
contextBridge.exposeInMainWorld("electronUpdateApi", {
  receiveUpdateStatus: (func: (status: string, ...args: any[]) => void) => {
    ipcRenderer.on("update-status", (event, status, ...args) =>
      func(status, ...args)
    );
  },
});

contextBridge.exposeInMainWorld('electronDeviceInfo', {
  getDeviceName: () => {
    return new Promise((resolve) => {
      ipcRenderer.send('get-device-name');
      ipcRenderer.once('device-name', (_, deviceName) => resolve(deviceName));
    });
  },
});

// Đặt đoạn mã này ở đâu đó trong mã của renderer process
// window.electronApi.updateStatus("update-status", (status, data) => {
//   switch (status) {
//     case "checking-for-update":
//       console.log("Đang kiểm tra cập nhật...");
//       break;
//     case "update-available":
//       console.log("Cập nhật có sẵn");
//       break;
//     case "update-not-available":
//       console.log("Không có cập nhật");
//       break;
//     case "download-progress":
//       console.log(`Tiến trình tải: ${data.percent.toFixed(2)}%`);
//       break;
//     case "update-downloaded":
//       console.log("Cập nhật đã tải xong");
//       break;
//     case "error":
//       console.error(`Lỗi cập nhật: ${data}`);
//       break;
//   }
// });
