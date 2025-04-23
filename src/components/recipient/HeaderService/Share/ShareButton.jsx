import { useState, useRef, useEffect } from 'react';
import styles from './ShareButton.module.scss';
import shareIcon from '../../../../assets/images/share.svg';

export default function ShareButton({ recipient }) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareButtonRef = useRef(null);

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

  return (
    <div className={styles['share-button-container']} ref={shareButtonRef}>
      <button className={styles['share-button']} onClick={toggleShareOptions}>
        <img src={shareIcon} alt="공유" />
      </button>

      {/* TODO: 공유 옵션 드롭다운은 추후 구현 */}
    </div>
  );
}
