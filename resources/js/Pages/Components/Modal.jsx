import React from 'react';

function Modal({ show, onClose, children }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all">
            <div className="absolute inset-0 bg-gray-500/75" onClick={onClose} />
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto max-w-md">
                {children}
            </div>
        </div>
    );
}

export default Modal;
