import React from 'react';
import ServiceButton from './ServiceButton';
import UploadAndDisplayImage from './UploadAndDisplayImage';
import Modal from 'react-modal';
import TaskList from './TaskList';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width:'80%',
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
          contentLabel="Find Similar Lego Blocks"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Find Similar Lego Blocks</h2>
          <UploadAndDisplayImage/>
          <br/>
          <TaskList />
          <br/>
          <button onClick={closeModal}>Close</button>
        </Modal>
    </div>
  );
}

export default App;
