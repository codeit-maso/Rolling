import { useState } from 'react';
import DOMPurify from 'dompurify';
import ReactDOM from 'react-dom';
import Badge from '../Badge/Badge';
import Button from '../common/Button';
import styles from './Modal.module.scss';

export default function Modal({
  image,
  sender,
  relationship,
  children,
  font,
  createdAt,
  onClose,
}) {
  const [isClosing, setIsClosing] = useState(false);
  const sanitizedHTML = DOMPurify.sanitize(children);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return ReactDOM.createPortal(
    <div className={styles.backdrop}>
      <article className={`${styles.modal} ${isClosing ? styles.closing : ''}`}>
        <header className={styles['modal__header']}>
          <div className={styles['modal__profile-img']}>
            <img src={image} alt="프로필 이미지" />
          </div>
          <div className={styles['modal__user-info']}>
            <div className={styles['modal__profile-name']}>
              <p>
                From. <span>{sender}</span>
              </p>
            </div>
            <div className={styles['modal__relation-badge']}>
              <Badge relation={relationship} />
            </div>
          </div>
          <div className={styles['modal__date']}>{createdAt}</div>
        </header>
        <div className={styles['modal__body']}>
          <div className={styles['modal__content']}>
            <div
              className={`${styles['modal__content']} font-${font.replace(/\s/g, '')}`}
              dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            />
          </div>
        </div>
        <div className={styles['modal__footer']}>
          <Button
            className={styles['modal__button']}
            type="confirm"
            onClick={handleCloseModal}
          >
            확인
          </Button>
        </div>
      </article>
    </div>,
    document.getElementById('modal-root'),
  );
}
