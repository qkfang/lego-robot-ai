import React from 'react';
import ServiceButton from './ServiceButton';
import UploadAndDisplayImage from './UploadAndDisplayImage';
import Modal from 'react-modal';
import TaskList from './TaskList';
import styles from "./Toolbar.module.css";
import { Height } from '@mui/icons-material';
import { height } from '@mui/system';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export function Toolbar() {
  let subtitle;
  const [modalHelp, setModalHelp] = React.useState(false);
  const [modalSearch, setModalSearch] = React.useState(false);
  const [modalChat, setModalChat] = React.useState(false);
  const [userId, setUserId] = React.useState("");

  React.useEffect(() => {
    setUserId(crypto.randomUUID().substring(0,3));
  }, []);


  function modalHelpOpen() {
    setModalHelp(true);
  }

  function modalHelpClose() {
    setModalHelp(false);
  }

  function modalSearchOpen() {
    setModalSearch(true);
  }

  function modalSearchClose() {
    setModalSearch(false);
  }

  function modalChatOpen() {
    setModalChat(true);
  }

  function modalChatClose() {
    setModalChat(false);
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div>
      <div className={styles.toolbarimage} onClick={modalSearchOpen}><img src='iconsearch.png' /></div>
      <div className={styles.toolbarimage} onClick={modalChatOpen}><img src='iconchat.png' /></div>
      <div className={styles.toolbarimage} onClick={modalHelpOpen}><img src='iconquestion.png' /></div>
      <div className={styles.toolbarimage}>
        <ServiceButton
          id={"service_spike"}
          className={""}
        />
      </div>
      </div>
      <Modal
        isOpen={modalSearch}
        onRequestClose={modalSearchClose}
        style={customStyles}
        contentLabel="Find Similar Lego Blocks"
      >
        <div style={{ height: "400px" }}>
          <h2>Find similar Lego blocks</h2>
          <p>Note: Upload a lego block image, we will find a similar one in our library using image vector search. <a href="/block-blue.jpg" target='blank'>Img 1</a> / <a href="/block-red.jpg" target='blank'>Img 2</a> / <a href="/block-white.jpg" target='blank'>Img 3</a> / <a href="/block-yellow.jpg" target='blank'>Img 4</a> </p>
          <UploadAndDisplayImage />
          <br />
        </div>
        {/* <button onClick={modalSearchClose}>Close</button> */}
      </Modal>
      <Modal
        isOpen={modalChat}
        onRequestClose={modalChatClose}
        style={customStyles}
        contentLabel="Chat"
      >
        <h2>Chat with other users</h2>
        <TaskList userId={userId} />
        {/* <button onClick={modalChatClose}>Close</button> */}
      </Modal>
      <Modal
        isOpen={modalHelp}
        onRequestClose={modalHelpClose}
        style={customStyles}
        contentLabel="Help"
      >
        <div style={{ height: "400px" }}>
          <h2>Help</h2>
          <br />
        </div>
        {/* <button onClick={modalHelpClose}>Close</button> */}
        
        <div className={styles.disclaimer}>
                <b>Disclaimer:</b> LEGO®, SPIKE™, and Minifigure are trademarks of ©The LEGO® Group. 
                Web serial port function is created by <a href="https://github.com/edanahy/WebSPIKE/">edanahy's WebSPIKE</a>
            </div>
      </Modal>
    </div>
  );
}

export default Toolbar;
