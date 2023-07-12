import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface DevicePopupProps {
    open: boolean;
    onClose: () => void;
    deviceNameInput: string;
    onDeviceNameInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDeviceNameSubmit: () => void;
}

const DevicePopup: React.FC<DevicePopupProps> = ({
    open,
    onClose,
    deviceNameInput,
    onDeviceNameInputChange,
    onDeviceNameSubmit
}) => {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Thiết lập khu vực
                                </Dialog.Title>
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        value={deviceNameInput}
                                        onChange={onDeviceNameInputChange}
                                        className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />

                                </div>
                                <div className="mt-4">
                                    <div className="mt-4 flex justify-between">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900  focus:outline-none"
                                            onClick={onDeviceNameSubmit}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900  focus:outline-none"
                                            onClick={onClose}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default DevicePopup;
