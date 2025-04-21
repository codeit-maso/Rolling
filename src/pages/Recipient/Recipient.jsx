import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import getRecipient from '../../api/getRecipient';
import getMessages from '../../api/getMessages';
import Card from '../../components/Card/Card';
import styles from './Recipient.module.scss';

export default function Recipient() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const fetchRecipient = async () => {
      try {
        const recipient = await getRecipient(id);
        setPostData(recipient);
      } catch (error) {
        console.error('데이터 로딩 실패:', error.response.data);
      }
    };

    fetchRecipient();
  }, [id]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const limit = offset === 0 ? 8 : 9;
        const newMessages = await getMessages(id, offset, limit);
        if (offset === 0) {
          setMessages(newMessages.results);
        } else {
          setMessages((prev) => [...prev, ...newMessages.results]);
        }
      } catch (error) {
        console.error('데이터 로딩 실패:', error.response.data);
      }
    };

    fetchMessages();
  }, [id, offset]);

  const loadMoreMessages = () => {
    const limit = offset === 0 ? 8 : 9;
    setOffset((prev) => prev + limit);
  };

  if (!postData) return <div>Loading...</div>;

  return (
    <div
      className={`${styles['post-container']} ${!postData.backgroundImageURL ? styles[`background--${postData.backgroundColor}`] : ''}`}
      style={
        postData.backgroundImageURL
          ? { backgroundImage: `url(${postData.backgroundImageURL})` }
          : {}
      }
    >
      <div className={styles['card-container']}>
        <Card recipientId={messages[0].recipientId} empty={true} />
        {messages.map((msg) => (
          <Card
            key={msg.id}
            image={msg.profileImageURL}
            sender={msg.sender}
            relationship={msg.relationship}
            createdAt={msg.createdAt.slice(0, 10)}
          >
            {msg.content}
          </Card>
        ))}
      </div>
      <button onClick={loadMoreMessages}>더보기</button>
    </div>
  );
}
