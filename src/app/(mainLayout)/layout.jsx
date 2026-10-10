import React from 'react';
import Navber from '../../components/Navber';
import Footer from '../../components/Footer';
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