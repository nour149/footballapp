import React from "react";

const ModalNotif= ({ onClose, notificationData }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Notification Details</h2>
        
          {/* Add more information to display in the modal */}
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };


  export default ModalNotif;
