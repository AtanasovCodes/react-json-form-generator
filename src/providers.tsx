import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            {children}
        </>
    );
};

export default Providers;
