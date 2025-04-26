import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ShareButton.module.scss';
import shareIcon from '../../../../assets/images/share.svg';
import {
  initializeKakaoSDK,
  shareKakao,
  copyToClipboard,
} from '../../../../utils/share';
import Toast from '../../../common/Toast/Toast';

export default function ShareButton({ recipient }) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
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

  const handleUrlCopy = async () => {
    const currentUrl = window.location.origin + location.pathname;
    const success = await copyToClipboard(currentUrl);

    if (success) {
      setToastMessage('URL이 복사되었습니다.');
      setShowToast(true);
    } else {
      setToastMessage('URL 복사에 실패했습니다.');
      setShowToast(true);
    }

    setShowShareOptions(false);
  };

  const handleCloseToast = () => {
    setShowToast(false);
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
          <button className={styles['share-option']} onClick={handleUrlCopy}>
            URL 공유
          </button>
        </div>
      )}

      <Toast
        isVisible={showToast}
        message={toastMessage}
        onClose={handleCloseToast}
        duration={5000}
        type="success"
      />
    </div>
  );
}
