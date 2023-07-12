import { app, dialog, ipcMain } from "electron";
import { WindowManager } from "./windowsManager";
import { autoUpdater } from "electron-updater";

let winManager: WindowManager;
const os = require('os');


function createWindow() {
  winManager = new WindowManager();
  winManager.createMainWindow();
}

function checkForUpdates() {
  autoUpdater.autoDownload = false;

  autoUpdater.on("checking-for-update", () => {
    winManager
      .getMainWindow()!
      .webContents.send("update-status", "checking-for-update");
  });

  autoUpdater.on("update-available", () => {
    winManager
      .getMainWindow()!
      .webContents.send("update-status", "update-available");

    dialog
      .showMessageBox(winManager.getMainWindow()!, {
        type: "info",
        title: "Cập nhật ứng dụng",
        message: "Có bản cập nhật mới cho ứng dụng. Bạn có muốn cài đặt không?",
        buttons: ["Cài đặt", "Bỏ qua"],
        defaultId: 0,
        cancelId: 1,
      })
      .then(({ response }) => {
        if (response === 0) {
          autoUpdater.downloadUpdate().catch((error) => {
            dialog.showErrorBox(
              "Lỗi",
              `Không thể tải xuống bản cập nhật: ${error.message}`
            );
          });
        }
      });
  });

  autoUpdater.on("update-not-available", () => {
    winManager
      .getMainWindow()!
      .webContents.send("update-status", "update-not-available");
  });

  autoUpdater.on("download-progress", (progressObj) => {
    winManager
      .getMainWindow()!
      .webContents.send("update-status", "download-progress", progressObj);
  });

  autoUpdater.on("update-downloaded", () => {
    winManager
      .getMainWindow()!
      .webContents.send("update-status", "update-downloaded");

    dialog
      .showMessageBox(winManager.getMainWindow()!, {
        type: "info",
        title: "Cập nhật đã sẵn sàng",
        message:
          "Bản cập nhật đã được tải xuống, ứng dụng sẽ tự động cập nhật sau khi đóng.",
        buttons: ["Cập nhật ngay", "Đóng"],
        defaultId: 0,
        cancelId: 1,
      })
      .then(({ response }) => {
        if (response === 0) {
          autoUpdater.quitAndInstall(false, true);
        }
      });
  });

  autoUpdater.on("error", (error) => {
    winManager
      .getMainWindow()!
      .webContents.send("update-status", "error", error.message);
  });

  autoUpdater.checkForUpdates().catch((error) => {
    dialog.showErrorBox(
      "Lỗi",
      `Không thể kiểm tra bản cập nhật: ${error.message}`
    );
  });
}

app.on("ready", () => {
  createWindow();
  if (winManager.getMainWindow() !== null) {
    winManager.getMainWindow()!.webContents.on('did-finish-load', () => {
      checkForUpdates();
      autoUpdater.checkForUpdatesAndNotify();
    });
  }

});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  //On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (winManager.getMainWindow() === null) {
    createWindow();
  }
});

ipcMain.on('get-device-name', (event) => {
  event.reply('device-name', os.hostname());
});

ipcMain.on('get-app-version', (event) => {
  event.reply('app-version', app.getVersion());
});