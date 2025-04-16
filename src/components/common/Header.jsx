import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./Header.module.scss"; 

function Header(){
    const location = useLocation();
    const showButton = ['/', '/list'];
    const isLocation = showButton.includes(location.pathname);

    return(
        <header className={styles.header}>
            <Link to="/">
                <img className={styles.logo} src="/src/assets/images/rolling-logo.png" alt="rolling logo"></img>
            </Link>
            <Link to="/post">
                {isLocation && <button className={styles.button}>롤링 페이퍼 만들기</button>}
            </Link>
        </header>
    )       
}

export default Header;