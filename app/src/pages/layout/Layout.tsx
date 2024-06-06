import { Outlet, NavLink, Link } from "react-router-dom";
import Toolbar from '../../components/Toolbar';
import styles from "./Layout.module.css";

const Layout = () => {
    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer}>
                    <Link to="/" className={styles.headerTitleContainer}>
                        <h3 className={styles.headerTitle}>Lego Robot AI</h3>
                    </Link>
                    {/* <nav>
                        <ul className={styles.headerNavList}>
                            <li className={styles.headerNavLeftMargin}>
                                <a href="https://spike.legoeducation.com/" target={"_blank"}>
                                Spike Prime
                                </a>
                            </li>
                        </ul>
                    </nav> */}
                    {/* <div className={styles.headerRightText}>Build a <a href="https://spike.legoeducation.com/" target="_blank">Spike Prime 3</a> Lego Robot and control it by python!</div> */}
                    <Toolbar />
                </div>
            </header>
            <Outlet />
        </div>
    );
};

export default Layout;
