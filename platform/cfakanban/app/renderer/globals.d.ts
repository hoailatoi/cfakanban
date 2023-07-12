declare global {
  interface Window {
    electronDeviceInfo: {
      getDeviceName: () => Promise<string>;
    };
    electronAppVersion: {
      getVersion: () => Promise<string>;
    };
  }
}