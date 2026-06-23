import React from 'react';
import Navber from '../Component/Navber';
import Footer from '../Component/Footer';

const layout = ({ children }) => {
    return (
        <>
            <Navber />
            <main className="min-h-full flex flex-col">
                {children}
            </main>
            <Footer/>
        </>
    );
};

export default layout;