import React from 'react';
import Navber from '../Component/Navber';
import Footer from '../Component/Footer';
import { Toaster } from 'react-hot-toast';

const layout = ({ children }) => {
    return (
        <>
            <Navber />
            <main className="min-h-full flex flex-col">
                {children}
                 <Toaster />
            </main>
            <Footer/>
        </>
    );
};

export default layout;