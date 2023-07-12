import React, { useState } from 'react';
import '../assets/styles/layout.scss';
import Menu from './Menu';
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/images/fenv_logo.png'; // Thay đường dẫn tới ảnh logo của bạn

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='dashboard-container'>
            <div className='flex items-center justify-between p-4'>
                <img src={logo} alt='Logo' className='h-14 w-auto' />
                <button
                    onClick={toggleMenu}
                    className='inline-flex items-center justify-center p-2 text-gray-400  focus:outline-none z-50'
                >
                    {menuOpen ? (
                        <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                        <Bars3BottomLeftIcon className='block h-6 w-6' aria-hidden='true' />
                    )}
                </button>
            </div>
            {menuOpen && (
                <div
                    className='fixed top-0 right-0 z-40 w-64 h-full bg-white border-l border-gray-200'
                    style={{ width: '250px' }}
                >
                    <Menu />
                </div>
            )}
            <div className='flex-1 dashboard-container__content' style={{ minWidth: 0 }}>
                {children}
            </div>
        </div>
    );
};

export default Layout;