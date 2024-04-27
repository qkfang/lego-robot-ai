import React from 'react';
import ServiceButton from './ServiceButton';
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export function App() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div style={{display: "flex", alignItems: "center"}}>
        <ServiceButton
          id={"service_spike"}
          className={""}
        />
        <div style={{display: "inline-block", cursor: "pointer", padding: "5px"}} onClick={openModal}><img style={{width: "60px"}} src='../../../iconquestion.png' /></div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Help"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Help</h2>
          <div>Information</div>
          <p>adsfasdf</p>
          
          <button onClick={closeModal}>close</button>
        </Modal>
    </div>
  );
}

export default App;
