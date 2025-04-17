import deleteIcon from '../../../assets/images/delete.svg';
import plus from '../../../assets/images/plus.svg';
import Badge from '../Badge/Badge';
import styles from './Card.module.scss';

export default function Card({
  image,
  sender,
  relationship,
  content,
  createdAt,
  empty,
}) {
  return (
    <article className={`${styles.Card} ${empty ? styles['empty-card'] : ''}`}>
      {empty ? (
        <div className={styles.empty}>
          <img src={plus} alt="추가하기" />
        </div>
      ) : (
        <>
          <header className={styles['Card-Header']}>
            <div className={styles['profile-img']}>
              <img src={image} alt="프로필 이미지" />
            </div>
            <div className={styles['user-info']}>
              <div className={styles['profile-name']}>
                <p>
                  From. <span>{sender}</span>
                </p>
              </div>
              <div className={styles['relation-badge']}>
                <Badge relation={relationship} />
              </div>
            </div>
            <div className={styles['delete-button']}>
              <button>
                <img src={deleteIcon} alt="쓰레기통 아이콘" />
              </button>
            </div>
          </header>
          <div className={styles['Card-Body']}>
            <div className={styles.content}>
              <p>{content}</p>
            </div>
          </div>
          <footer className={styles['Card-Footer']}>{createdAt}</footer>
        </>
      )}
    </article>
  );
}
