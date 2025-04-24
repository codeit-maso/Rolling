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
  createdAt,
  onClose,
}) {
  const sanitizedHTML = DOMPurify.sanitize(children);

  return ReactDOM.createPortal(
    <article className={styles.modal}>
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
          <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        </div>
      </div>
      <div className={styles['modal__footer']}>
        <Button
          className={styles['modal__button']}
          type="confirm"
          onClick={onClose}
        >
          확인
        </Button>
      </div>
    </article>,
    document.getElementById('modal-root'),
  );
}
