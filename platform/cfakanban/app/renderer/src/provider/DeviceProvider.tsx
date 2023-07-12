import { useState, ReactNode } from "react";
import { DeviceContext } from "../contexts/DeviceContext";

interface DeviceProviderProps {
    children: ReactNode;
}

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
    const [deviceName, setDeviceName] = useState(localStorage.getItem('deviceName') || '');
    const [triggerRefresh, setTriggerRefresh] = useState(false);

    const triggerUpdate = () => {
        setTriggerRefresh(!triggerRefresh);
    };

    return (
        <DeviceContext.Provider value={{ deviceName, setDeviceName, triggerUpdate }}>
            {children}
        </DeviceContext.Provider>
    );
};