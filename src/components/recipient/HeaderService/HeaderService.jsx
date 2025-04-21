import styles from './HeaderService.module.scss';

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
          <span className={styles['header-service__message-count']}>
            {recipient?.messageCount || 0}명이 작성했어요!
          </span>
        </div>

        <div className={styles['header-service__divider']}></div>

        <div className={styles['header-service__actions']}>
          <div className={styles['header-service__emojis']}>이모지</div>
          <button className={styles['header-service__add-button']}>추가</button>
          <button className={styles['header-service__share-button']}>
            공유
          </button>
        </div>
      </div>
    </div>
  );
}
