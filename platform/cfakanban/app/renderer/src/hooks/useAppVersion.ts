import { useState, useEffect } from 'react';
declare global {
    interface Window {
        electronAppVersion: {
            getVersion: () => Promise<string>;
        };
    }
}


export function useAppVersion() {
    const [version, setVersion] = useState('');

    useEffect(() => {
        window.electronAppVersion.getVersion()
            .then(setVersion);
    }, []);

    return version;
}