import DOMPurify from 'dompurify';
import ReactDOM from 'react-dom';
import Badge from '../Badge/Badge';
import Button from '../common/Button';
import styles from './Modal.module.scss';

const fontFamilyMap = {
  'Noto Sans': '"Noto Sans", sans-serif',
  Pretendard: '"Pretendard", sans-serif',
  나눔명조: '"Nanum Myeongjo", serif',
  '나눔손글씨 손편지체': '"Nanum Sonpyeonji Ce", cursive',
};

export default function Modal({
  image,
  sender,
  relationship,
  children,
  font,
  createdAt,
  onClose,
}) {
  const sanitizedHTML = DOMPurify.sanitize(children);

  return ReactDOM.createPortal(
    <div className={styles.backdrop}>
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
            <div
              style={{ fontFamily: fontFamilyMap[font] }}
              dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            />
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
      </article>
    </div>,
    document.getElementById('modal-root'),
  );
}
