import { useState, useEffect, useRef } from 'react';
import styles from './HeaderService.module.scss';
import emojiAdd from '../../../assets/images/emoji-add.svg';
import chevronDown from '../../../assets/images/chevron-down.svg';
import { fetchReactions, addReaction } from '../../../api/emojiReactions';
import ShareButton from './Share/ShareButton';

export default function HeaderService({ recipient }) {
  const [reactions, setReactions] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAllEmojisDropdown, setShowAllEmojisDropdown] = useState(false);
  const emojiPickerRef = useRef(null);
  const emojiMoreRef = useRef(null);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  const commonEmojis = [
    '😆',
    '😉',
    '😎',
    '🥺',
    '🤔',
    '🤗',
    '🤩',
    '🤑',
    '👍',
    '❤️',
    '🎉',
    '👏',
    '😊',
    '🙌',
    '💪',
    '✨',
    '👋',
    '🤙',
    '🙆',
    '🙇',
    '🙌',
    '🙏',
    '🤝',
    '👀',
  ];

  useEffect(() => {
    if (recipient?.id) {
      fetchReactions(recipient.id)
        .then((data) => {
          setReactions(data);
        })
        .catch((error) => {
          console.error('리액션 데이터 로딩 오류:', error);
        });
    }
  }, [recipient?.id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }

      if (
        emojiMoreRef.current &&
        !emojiMoreRef.current.contains(event.target)
      ) {
        setShowAllEmojisDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleAllEmojisDropdown = () => {
    setShowAllEmojisDropdown(!showAllEmojisDropdown);
  };

  const handleAddReaction = async (emoji) => {
    if (!recipient?.id) return;

    try {
      await addReaction(recipient.id, emoji);

      const updatedReactions = await fetchReactions(recipient.id);
      setReactions(updatedReactions);
      setShowEmojiPicker(false);
      setShowAllEmojisDropdown(false);
    } catch (error) {
      console.error('이모지 추가 실패:', error);
    }
  };

  const topReactions = [...reactions]
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className={styles['header-service']}>
      <div className={styles['header-service__container']}>
        <div className={styles['header-service__name-section']}>
          <h1 className={styles['header-service__recipient-name']}>
            To. {recipient?.name || '받는사람 이름'}
          </h1>
        </div>

        <div className={styles['header-service__right-content']}>
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
            <div className={styles['header-service__emojis-left-group']}>
              <div className={styles['header-service__emojis']}>
                {topReactions.length > 0 ? (
                  topReactions.map((reaction) => (
                    <div
                      key={reaction.id}
                      className={styles['header-service__emoji-item']}
                      onClick={() => handleAddReaction(reaction.emoji)}
                    >
                      {reaction.emoji} {reaction.count}
                    </div>
                  ))
                ) : (
                  <span>아직 리액션이 없어요</span>
                )}
              </div>
              <div
                className={styles['header-service__emoji-more-container']}
                ref={emojiMoreRef}
              >
                <button
                  className={styles['header-service__emoji-more']}
                  onClick={toggleAllEmojisDropdown}
                >
                  <img
                    src={chevronDown}
                    alt="이모지 더보기"
                    style={{
                      transform: showAllEmojisDropdown
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                    }}
                  />
                </button>
                {showAllEmojisDropdown && (
                  <div className={styles['header-service__emoji-dropdown']}>
                    <div
                      className={styles['header-service__emoji-dropdown-grid']}
                    >
                      {reactions.length > 0 ? (
                        [...reactions]
                          .sort((a, b) => b.count - a.count)
                          .slice(0, isLargeScreen ? 8 : 6)
                          .map((reaction) => (
                            <div
                              key={reaction.id}
                              className={
                                styles['header-service__emoji-dropdown-item']
                              }
                              onClick={() => handleAddReaction(reaction.emoji)}
                            >
                              {reaction.emoji} {reaction.count}
                            </div>
                          ))
                      ) : (
                        <span>아직 리액션이 없어요</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles['header-service__emojis-right-group']}>
              <div
                className={styles['header-service__emoji-picker-container']}
                ref={emojiPickerRef}
              >
                <button
                  className={styles['header-service__add-button']}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <img src={emojiAdd} alt="이모지 추가" />
                  <span>추가</span>
                </button>
                {showEmojiPicker && (
                  <div className={styles['header-service__emoji-picker']}>
                    {commonEmojis.map((emoji, index) => (
                      <button
                        key={index}
                        className={styles['header-service__emoji-picker-item']}
                        onClick={() => handleAddReaction(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles['header-service__divider--right']}></div>
              <ShareButton recipient={recipient} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
