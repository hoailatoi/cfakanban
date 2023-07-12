import { useState, useContext, useEffect } from 'react';
import fenvLogo from '../assets/images/icon.png'
import '../assets/styles/app.scss'
import { BellIcon, Cog6ToothIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import DevicePopup from './devicepopup/DevicePopup';
import { DeviceContext } from '../contexts/DeviceContext';
import { useAppVersion } from '../hooks/useAppVersion';

const Menu = () => {

    const { deviceName, setDeviceName } = useContext(DeviceContext);
    const [devicePopupOpen, setDevicePopupOpen] = useState(false);
    const [deviceNameInput, setDeviceNameInput] = useState(deviceName || '');
    const [version, setVersion] = useState("");

    useEffect(() => {
        const fetchVersion = async () => {
            if (window.electronAppVersion) {
                let version = await window.electronAppVersion.getVersion();
                setVersion(version);
            }
        };

        fetchVersion();
    }, []);
    const handleDeviceNameSubmit = () => {
        setDevicePopupOpen(false);
        setDeviceName(deviceNameInput);
        localStorage.setItem('deviceName', deviceNameInput);
    }
    return (
        <div className='flex flex-col justify-between h-screen'>
            <div className=' flex-start'>
                <a aria-hidden="true" href='#' className="flex-start items-center text-gray-700 hover:text-gray-900">
                    <div className='logo'>
                        <img src={fenvLogo} className="h-20 w-20" />
                    </div>
                </a>
            </div>
            <div className='flex flex-row items-center justify-start space-x-6 p-1.5'>
                <a aria-hidden="true" href='#' className="text-gray-700 hover:text-gray-900">
                    <BellIcon className="h-6 w-6" />
                </a>
                <a aria-hidden="true" href='#' className="text-gray-700 hover:text-gray-900">
                    <Cog6ToothIcon className="h-6 w-6" />
                </a>
                <a aria-hidden="true" href='#' className="text-gray-700 hover:text-gray-900" onClick={() => setDevicePopupOpen(true)}>
                    <ComputerDesktopIcon className="h-6 w-6" />
                </a>
                <a aria-hidden="true" href='#' className="text-gray-700 text-sm hover:text-gray-900">
                    Version:{version}
                </a>
            </div>
            <DevicePopup
                open={devicePopupOpen}
                deviceNameInput={deviceNameInput}
                onClose={() => setDevicePopupOpen(false)}
                onDeviceNameSubmit={handleDeviceNameSubmit}
                onDeviceNameInputChange={(e) => setDeviceNameInput(e.target.value)}
            />
        </div>
    )
}
export default Menu;