import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../../assets/images/rolling-logo.svg';

const showButton = ['/', '/list'];

export default function Header() {
  const location = useLocation();
  const isLocation = showButton.includes(location.pathname);

  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="rolling logo"></img>
        </Link>
        {isLocation && (
          <Link to="/post" className={styles.button}>
            롤링 페이퍼 만들기
          </Link>
        )}
      </header>
      <div className={styles.underline}></div>
    </>
  );
}
