import React from 'react';
import { IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';

const Modal = ({ open, onClose, children }) => {
  return (
    <div>
      {/* Modal Background Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible  backdrop-blur-sm' : 'invisible pointer-events-none'}`}
        style={{
          zIndex: 999,  // Ensure overlay is above other content
        }}
      >
        {/* Modal Content */}
        <div
          onClick={(e) => e.stopPropagation()} // Prevent clicking inside modal from closing it
          className={`bg-[#d7dbe4] rounded-xl  shadow p-6 transition-all transform ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
          style={{
            zIndex: 1000,  // Ensure modal content is above overlay
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-100 hover:text-gray-700"
          >
            <IonIcon icon={addOutline} size="large" color="danger" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
