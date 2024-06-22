import React from 'react';
import ServiceButton from './ServiceButton';
import UploadAndDisplayImage from './UploadAndDisplayImage';
import Modal from 'react-modal';
import LiveChatList from './LiveChatList';
import styles from "./Toolbar.module.css";
import { Height } from '@mui/icons-material';
import { height } from '@mui/system';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '80%',
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
    setUserId(crypto.randomUUID().substring(0, 3));
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
        contentLabel="Lego Blocks Images"
        ariaHideApp={false}
      >
        <div style={{ height: "500px" }}>
          <h2>Lego Blocks Images</h2>
          <p>Upload a Lego block image, we will find a similar one in our library using image vector search.</p>
          <p>You can use one of the sample image. <a href="/block-blue.jpg" target='blank'>Blue</a> / <a href="/block-red.jpg" target='blank'>Red</a> / <a href="/block-white.jpg" target='blank'>White</a> / <a href="/block-yellow.jpg" target='blank'>Yellow</a> </p>
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
        ariaHideApp={false}
      >
        <h2>Chat with other users</h2>
        <LiveChatList userId={userId} />
        {/* <button onClick={modalChatClose}>Close</button> */}
      </Modal>
      <Modal
        isOpen={modalHelp}
        onRequestClose={modalHelpClose}
        style={customStyles}
        contentLabel="Help"
        ariaHideApp={false}
      >
        <div style={{ height: "500px" }}>
          <h2>Help</h2>
          <p>
            Our girls' First Lego League team (Year 6 girls) started to write Python code for <a target='_blank' href='https://spike.legoeducation.com'>Spike Prime 3</a> Lego Robot last year in preparation of <a target='_blank' href='https://www.firstlegoleague.org/'>First Lego League</a> competition but struggled to get the program running. One of them turned to ChatGPT for help. These young learners need an innovative approach to support their coding education.
          </p>
          <p>
            The Lego Robot AI can write Python code using the Spike Prime 3 API, with the generated code executed directly in the browser via a web serial port. This seamless experience helps young kids learn coding while watching their robots in action.
          </p>
          <p>
            Check out this <a target='_blank' href='https://youtu.be/1URVErLXnMk'>video tutorial</a> for the app.
          </p>
          <p>
            <b>Note:</b>
            <ul>
              <li>Spike Prime robot required to see Python code running. Above video demo (second half) includes robot in action.</li>
              <li>Chat response might take time as all SKU has been reduced to reduce spend.</li>
            </ul>
          </p>
          <p>
            <b>Features:</b>
            <ul>
              <li>ChatBot with Knowledge of Lego Spike Prime</li>
              <li>ChatBot with Knowledge of Spike Prime 3 Python API / Function / Execution</li>
              <li>Translate chat response to French</li>
              <li>Search similar Lego brick via Image Vector Search</li>
              <li>Describe Lego brick image in text</li>
              <li>Generate Lego brick image by description</li>
              <li>Receive Chat prompt via voice</li>
              <li>Read Chat responses by voice</li>
              <li>Python code chat response syntax highlighting</li>
              <li>Live chat with other users via browse</li>
              <li>Lego Spike Prime Web Serial Port integration in browser</li>
              <li>Execute python code directly from Browser</li>
            </ul>
          </p>
          <p>
            <b>Disclaimer:</b>
            <ul>
              <li>LEGO®, SPIKE™, and Minifigure are trademarks of ©The LEGO® Group.</li>
              <li>Web serial port function is created by <a href="https://github.com/edanahy/WebSPIKE/">edanahy's WebSPIKE</a></li>
            </ul>
          </p>
          <br />
        </div>
      </Modal>
    </div>
  );
}

export default Toolbar;
