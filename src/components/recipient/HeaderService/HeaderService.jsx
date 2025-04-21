import styles from './HeaderService.module.scss';
import emojiAdd from '../../../assets/images/emoji-add.svg';
import shareIcon from '../../../assets/images/share.svg';
import chevronDown from '../../../assets/images/chevron-down.svg';
export default function HeaderService({ recipient }) {
  return (
    <div className={styles['header-service']}>
      <div className={styles['header-service__container']}>
        <div className={styles['header-service__name-section']}>
          <h1 className={styles['header-service__recipient-name']}>
            To. {recipient?.name || '받는사람 이름'}
          </h1>
        </div>

        <div className={styles['header-service__profile-section']}>
          <div className={styles['header-service__profile-images']}>
            {recipient?.recentMessages?.slice(0, 3).map((message, index) => (
              <img
                key={message.id}
                src={message.profileImageURL}
                alt="프로필"
                className={styles['header-service__profile-image']}
                style={{ zIndex: index + 1 }}
              />
            ))}
            {recipient?.messageCount > 3 && (
              <div className={styles['header-service__additional-count']}>
                +{recipient.messageCount - 3}
              </div>
            )}
          </div>
          <span className={styles['header-service__message-count']}>
            {recipient?.messageCount || 0}명이 작성했어요!
          </span>
        </div>

        <div className={styles['header-service__divider--left']}></div>
        <div className={styles['header-service__actions']}>
          <div className={styles['header-service__emojis']}>이모지</div>
          <button className={styles['header-service__emoji-more']}>
            <img src={chevronDown} alt="이모지 더보기" />
          </button>
          <button className={styles['header-service__add-button']}>
            <img src={emojiAdd} alt="이모지 추가" />
            &nbsp;추가
          </button>
          <div className={styles['header-service__divider--right']}></div>
          <button className={styles['header-service__share-button']}>
            <img src={shareIcon} alt="공유" />
          </button>
        </div>
      </div>
    </div>
  );
}
