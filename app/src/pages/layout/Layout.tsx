import { Outlet, NavLink, Link } from "react-router-dom";
import App from '../../components/App';

import github from "../../assets/github.svg";

import styles from "./Layout.module.css";
import { CenterFocusStrong, Padding } from "@mui/icons-material";
import { MidiFilled } from "@fluentui/react-icons";

const Layout = () => {
    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer}>
                    <Link to="/" className={styles.headerTitleContainer}>
                        <h3 className={styles.headerTitle}>Lego Robot Chatbot</h3>
                    </Link>
                    {/* <nav>
                        <ul className={styles.headerNavList}>
                            <li className={styles.headerNavLeftMargin}>
                                <a href="https://github.com/cosmosdb" target={"_blank"} title="Github repository link">
                                    <img
                                        src={github}
                                        alt="Github logo"
                                        aria-label="Link to github repository"
                                        width="20px"
                                        height="20px"
                                        className={styles.githubLogo}
                                    />
                                </a>
                            </li>
                        </ul>
                    </nav> */}
                    <h4 className={styles.headerRightText}>Build a <a href="https://spike.legoeducation.com/" target="_blank">Spike Prime</a> Lego Robot and control it by python!</h4>
                    <App />
                </div>
            </header>
            <Outlet />
            <div style={{padding:20}}>
            <b>Disclaimer:</b> LEGO®, SPIKE™, and Minifigure are trademarks of ©The LEGO® Group. This page isn't affiliated, authorized, or endorsed by The LEGO Group. 
            Web serial port function is created by <a href="https://github.com/edanahy/WebSPIKE/">edanahy's WebSPIKE</a>
            </div>
        </div>
    );
};

export default Layout;
