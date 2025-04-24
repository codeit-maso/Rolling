import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ShareButton.module.scss';
import shareIcon from '../../../../assets/images/share.svg';
import { initializeKakaoSDK, shareKakao } from '../../../../utils/share';

export default function ShareButton({ recipient }) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareButtonRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    initializeKakaoSDK();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareButtonRef.current &&
        !shareButtonRef.current.contains(event.target)
      ) {
        setShowShareOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleKakaoShare = () => {
    const currentUrl = window.location.origin + location.pathname;
    shareKakao(recipient, currentUrl);
    setShowShareOptions(false);
  };

  return (
    <div className={styles['share-button-container']} ref={shareButtonRef}>
      <button className={styles['share-button']} onClick={toggleShareOptions}>
        <img src={shareIcon} alt="공유" />
      </button>

      {showShareOptions && (
        <div className={styles['share-options']}>
          <button className={styles['share-option']} onClick={handleKakaoShare}>
            카카오톡 공유
          </button>
          <button className={styles['share-option']}>URL 공유</button>
        </div>
      )}
    </div>
  );
}
