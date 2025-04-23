import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import deleteIcon from '../../assets/images/delete.svg';
import plus from '../../assets/images/plus.svg';
import Badge from '../Badge/Badge';
import styles from './Card.module.scss';

export default function Card({
  id,
  image,
  recipientId,
  sender,
  relationship,
  children,
  createdAt,
  empty = false,
  onDelete,
}) {
  const navigate = useNavigate();
  const sanitizedHTML = DOMPurify.sanitize(children);

  function clickPost() {
    navigate(`/post/${recipientId}/message/`);
  }

  function clickDelete() {
    if (confirm('정말 삭제하시겠어요?')) {
      onDelete?.(id);
    }
  }

  return (
    <article className={`${styles.card} ${empty ? styles['card--empty'] : ''}`}>
      {empty ? (
        <div onClick={clickPost}>
          <img src={plus} alt="추가하기" />
        </div>
      ) : (
        <>
          <header className={styles['card__header']}>
            <div className={styles['card__profile-img']}>
              <img src={image} alt="프로필 이미지" />
            </div>
            <div className={styles['card__user-info']}>
              <div className={styles['card__profile-name']}>
                <p>
                  From. <span>{sender}</span>
                </p>
              </div>
              <div className={styles['card__relation-badge']}>
                <Badge relation={relationship} />
              </div>
            </div>
            <div className={styles['card__delete-button']}>
              <button onClick={clickDelete}>
                <img src={deleteIcon} alt="쓰레기통 아이콘" />
              </button>
            </div>
          </header>
          <div className={styles['card__body']}>
            <div className={styles['card__content']}>
              <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
            </div>
          </div>
          <footer className={styles['card__footer']}>{createdAt}</footer>
        </>
      )}
    </article>
  );
}
