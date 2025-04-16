import deleteIcon from '../../../assets/images/delete.svg';
import plus from '../../../assets/images/plus.png';
import Badge from '../Badge/Badge';
import './Card.scss';

export default function Card({ image, name, relation, content, date, empty }) {
  return (
    <article className={`Card empty-${empty}`}>
      {empty ? (
        <div className="empty">
          <img src={plus} alt="추가하기" />
        </div>
      ) : (
        <>
          <header className="Card-Header">
            <div className="profile-img">
              <img src={image} alt="프로필 이미지" />
            </div>
            <div className="user-info">
              <div className="profile-name">
                <p>
                  From. <span>{name}</span>
                </p>
              </div>
              <div className="relation-badge">
                <Badge relation={relation} />
              </div>
            </div>
            <div className="delete-button">
              <button>
                <img src={deleteIcon} alt="쓰레기통 아이콘" />
              </button>
            </div>
          </header>
          <div className="Card-Body">
            <div className="content">
              <p>{content}</p>
            </div>
          </div>
          <footer className="Card-footer">{date}</footer>
        </>
      )}
    </article>
  );
}
