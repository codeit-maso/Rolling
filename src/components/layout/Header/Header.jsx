import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import logo from '../../../assets/images/rolling-logo.svg';

const showButton = ['/', '/list'];

export default function Header() {
  const location = useLocation();
  const isLocation = showButton.includes(location.pathname);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 767);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile && !isLocation) {
    return null;
  }

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
