import styles from './RecipientCard.module.scss';
import RecentMessages from './recentMessages';
import TopReactions from './TopReactions';

//아직 작업중
export default function RecipientCard({ Recipient }) {
  const {
    name,
    recentMessages,
    messageCount,
    topReactions,
    backgroundColor,
    backgroundImageURL,
    createdAt,
  } = Recipient;

  return (
    <div
      className={`${styles.cardset__card} ${backgroundImageURL ? '' : styles[backgroundColor]}`}
      style={
        backgroundImageURL
          ? {
              backgroundImage: `linear-gradient(#00000073, #00000073), url(${backgroundImageURL})`,
              color: 'white',
            }
          : {}
      }
    >
      <h3>{`To. ${name}`}</h3>
      <RecentMessages
        messages={recentMessages}
        count={messageCount}
      ></RecentMessages>
      <span>{messageCount}</span>
      <span>명이 작성했어요!</span>
      <hr></hr>
      <TopReactions reactions={topReactions}></TopReactions>

      <h2>{createdAt}</h2>
    </div>
  );
}
