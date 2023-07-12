import { BrowserWindow } from "electron";
import * as path from "path";


export class WindowManager {
  private mainWindow: BrowserWindow | null = null;

  public createMainWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      resizable: true,
      maximizable: true,
      autoHideMenuBar: true,
      show: false,
      icon: path.join(__dirname, '..', 'build', 'icons', 'icon.png'),
      backgroundColor: "#fefefe",
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js"),
      },
    });

    this.mainWindow.loadFile(path.join(__dirname, "", "index.html"));

    this.mainWindow.maximize();

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    // Uncomment the line below if you want to open DevTools by default
    this.mainWindow.webContents.openDevTools();
  }



  public getMainWindow(): BrowserWindow | null {
    return this.mainWindow;
  }
}