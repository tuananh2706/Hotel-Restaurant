import React from 'react';

const Modal = ({ isOpen, onClose, width = 'w-1/3', height = 'h-auto' }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
      <div className={`bg-white rounded-lg shadow-lg p-5 ${width} ${height} transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-xl font-bold mb-4">Title</h2>
        <p>This is a modal message.</p>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
