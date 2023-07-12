import React from "react";

interface DeviceContextType {
    deviceName: string;
    setDeviceName: React.Dispatch<React.SetStateAction<string>>;
    triggerUpdate: () => void;
}

export const DeviceContext = React.createContext<DeviceContextType>({
    deviceName: "",
    setDeviceName: () => { },
    triggerUpdate: () => { },
});