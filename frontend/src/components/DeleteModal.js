import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this event? This action cannot be undone.</p>
      <div className="modal-actions">
        <button onClick={onConfirm} className="btn danger">Delete</button>
        <button onClick={onClose} className="btn">Cancel</button>
      </div>
    </Modal>
  );
};

export default DeleteModal;