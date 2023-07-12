import React, { useState, useEffect, useContext } from 'react';
import { DeviceContext } from '../../contexts/DeviceContext';
import CFADataGrid from '../../components/cfadatagrid/CFADatagrid';
import { getdatacfadashboardapi } from '../../coreapi/getdatacfadashboardapi';
import DevicePopup from '../../components/devicepopup/DevicePopup';

interface CFADashboardData {
    // your interface definitions
}

const CFADashboard = () => {
    const { deviceName, setDeviceName, triggerUpdate } = useContext(DeviceContext);

    const [datacfa, setDataCFA] = useState<Array<CFADashboardData>>([]);
    const [openDevicePopup, setOpenDevicePopup] = useState(false);
    const [deviceNameInput, setDeviceNameInput] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [sortable, setSortable] = useState(true);
    const [searchable, setSearchable] = useState(false);
    const [filterable, setFilterable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCFAData = async () => {
        if (deviceName) {
            let dataJson = await getdatacfadashboardapi.GetCFADashboardData("vi", deviceName);
            setDataCFA(JSON.parse(dataJson.data));
            setIsLoading(false)
        }
    };
    const refreshData = () => {
        setIsLoading(true);
        fetchCFAData();
    }
    useEffect(() => {
        const storedDeviceName = localStorage.getItem('deviceName');
        if (storedDeviceName) {
            setDeviceName(storedDeviceName);
        } else {
            setOpenDevicePopup(true);
        }
        fetchCFAData();
        const intervalId = setInterval(fetchCFAData, 180000);
        return () => {
            clearInterval(intervalId);
        }
    }, [deviceName, triggerUpdate]);

    const closeDevicePopup = () => {
        setOpenDevicePopup(false);
    }

    const onDeviceNameSubmit = () => {
        deviceNameInput.trim() === '' ? alert('Please enter a device name.') : localStorage.setItem('deviceName', deviceNameInput); setDeviceName(deviceNameInput); triggerUpdate(); closeDevicePopup();
    }

    const columns = [
        { title: 'Batch Number', field: 'BatchNumber' },
        { title: 'Line Name', field: 'LineName' },
        { title: 'FEPOCode', field: 'FEPOCode' },
        { title: 'PO Quantity', field: 'POQuantity' },
        { title: 'POSampleSize', field: 'POSampleSize' },
        { title: 'POSampleSize Rate', field: 'POSampleSizeRate' },
        { title: 'Batch Quantity', field: 'BatchQuantity' },
        { title: 'PickUp Quantity', field: 'PickUpQuantity' },
        { title: 'Folding Scan Time', field: 'BatchCreateDate' },
        { title: 'CFA Result', field: 'CFAResult' },
        { title: 'CFA Scan Time', field: 'CFAConfirmTime' }
    ];

    return (
        <div>
            <button
                onClick={refreshData}
                className='p-2 m-2 border-2 border-solid border-zinc-200 focus:outline-none absolute top-3.5 right-14'
            >{isLoading ? "Loading..." : "Refresh"} </button>
            <DevicePopup
                open={openDevicePopup}
                deviceNameInput={deviceNameInput}
                onClose={closeDevicePopup}
                onDeviceNameSubmit={onDeviceNameSubmit}
                onDeviceNameInputChange={(e) => setDeviceNameInput(e.target.value)}
            />
            <CFADataGrid
                data={datacfa}
                columns={columns}
                searchable={searchable}
                filterable={filterable}
                sortable={sortable}
            />
        </div>
    );
};

export default CFADashboard;