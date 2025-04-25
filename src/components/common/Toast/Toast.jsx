import { useEffect } from 'react';
import styles from './Toast.module.scss';
import successIcon from '../../../assets/images/success.svg';
import closeIcon from '../../../assets/images/close.svg';

export default function Toast({
  isVisible,
  message,
  onClose,
  duration = 5000,
  type = 'success',
}) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  return (
    <div className={`${styles.toast} ${styles[`toast--${type}`]}`}>
      <div className={styles.iconContainer}>
        {type === 'success' && (
          <img src={successIcon} alt="성공" className={styles.icon} />
        )}
      </div>
      <div className={styles.content}>{message}</div>
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="닫기"
      >
        <img src={closeIcon} alt="닫기" />
      </button>
    </div>
  );
}
