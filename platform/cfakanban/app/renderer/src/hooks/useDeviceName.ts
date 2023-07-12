import { useState, useEffect } from 'react';
declare global {
    interface Window {
        electronDeviceInfo: {
            getDeviceName: () => Promise<string>;
        };
    }
}


export function useDeviceName() {
    const [deviceName, setDeviceName] = useState('');

    useEffect(() => {
        window.electronDeviceInfo.getDeviceName()
            .then(setDeviceName);
    }, []);

    return deviceName;
}