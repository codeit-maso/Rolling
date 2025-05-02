import { useRef, useState, useEffect, useCallback } from 'react';
import DOMPurify from 'dompurify';
import ReactDOM from 'react-dom';
import Badge from '../Badge/Badge';
import Button from '../common/Button';
import useModalClose from '../../hooks/useModalClose'; // 경로에 맞게 수정
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
  const modalRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  const sanitizedHTML = DOMPurify.sanitize(children);

  // 닫기 로직 (애니메이션 포함)
  const handleCloseModal = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  // 외부 클릭 감지하여 닫기
  useModalClose(modalRef, handleCloseModal);

  return ReactDOM.createPortal(
    <div className={styles.backdrop}>
      <article
        ref={modalRef}
        className={`${styles.modal} ${isClosing ? styles.closing : ''}`}
      >
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
