import React, {useState} from 'react'

const Modal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    return (
      <div>
        <button onClick={handleOpenModal}>Open Modal</button>
  
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span onClick={handleCloseModal} className="close">
                &times;
              </span>
              <p>Welcome to Wizdom portal {username}...</p>
            </div>
          </div>
        )}
      </div>
    );
  };
  

export default Modal