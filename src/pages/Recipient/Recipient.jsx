import { useParams } from 'react-router';
import { useEffect, useState, useRef } from 'react';
import getRecipient from '../../api/getRecipient';
import getMessages from '../../api/getMessages';
import Card from '../../components/Card/Card';
import styles from './Recipient.module.scss';

export default function Recipient() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasNextMessage, setHasNextMessage] = useState(false);
  const observerRef = useRef();

  useEffect(() => {
    const fetchRecipient = async () => {
      try {
        const recipient = await getRecipient(id);
        setPostData(recipient);
        setHasNextMessage(recipient.messageCount > 0);
        setLoading(false);
      } catch (error) {
        console.error('데이터 로딩 실패:', error.response.data);
      }
    };

    fetchRecipient();
  }, [id]);

  useEffect(() => {
    setLoading(true);
    const fetchMessages = async () => {
      try {
        const limit = offset === 0 ? 8 : 9;
        const newMessages = await getMessages(id, offset, limit);
        offset === 0
          ? setMessages(newMessages.results)
          : setMessages((prev) => [...prev, ...newMessages.results]);
        if (!postData) return;
        setHasNextMessage(offset < postData.messageCount);
        setLoading(false);
      } catch (error) {
        console.error(
          '데이터 로딩 실패:',
          error.response?.data || error.message,
        );
      }
    };

    fetchMessages();
  }, [id, offset]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasNextMessage && !loading) {
        loadMoreMessages();
      }
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextMessage, loading]);

  const loadMoreMessages = () => {
    const limit = offset === 0 ? 8 : 9;
    setOffset((prev) => prev + limit);
  };

  if (!postData || messages.length === 0) return <div>Loading...</div>;

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
      {hasNextMessage && <div ref={observerRef} className="load"></div>}
    </div>
  );
}
