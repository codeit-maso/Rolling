import { useParams, useNavigate } from 'react-router';
import { useEffect, useState, useRef } from 'react';
import getRecipient from '../../api/getRecipient';
import getMessages from '../../api/getMessages';
import deleteMessage from '../../api/deleteMessage.js';
import deleteRecipient from '../../api/deleteRecipient.js';
import HeaderService from '../../components/recipient/HeaderService/HeaderService';
import Card from '../../components/Card/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/Modal/Modal.jsx';
import styles from './Recipient.module.scss';

export default function Recipient() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasNextMessage, setHasNextMessage] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const observerRef = useRef();
  const navigate = useNavigate();

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
  }, [observerRef.current, hasNextMessage, loading]);

  const loadMoreMessages = () => {
    const limit = offset === 0 ? 8 : 9;
    setOffset((prev) => prev + limit);
  };

  async function handleDeleteMessage(id) {
    try {
      await deleteMessage(id);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== id),
      );
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  }

  async function handleDeleteRecipient(id) {
    try {
      const firstConfirm = confirm('정말 이 페이지를 삭제하시겠어요?');
      if (!firstConfirm) return;
      const secondConfirm = confirm(
        '정말 정말 삭제하시겠어요? 되돌릴 수 없어요!',
      );
      if (!secondConfirm) return;
      await deleteRecipient(id);
      navigate('/');
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  }

  function handleOpenModal(id) {
    setSelectedCardId(id);
  }

  function handleCloseModal() {
    setSelectedCardId(null);
  }

  const selectedCard = messages.find((card) => card.id === selectedCardId);

  if (!postData || messages.length < 0) return <div>Loading...</div>;

  return (
    <>
      <HeaderService />
      <div
        className={`${styles['post-container']} ${!postData.backgroundImageURL ? styles[`background--${postData.backgroundColor}`] : ''}`}
        style={
          postData.backgroundImageURL
            ? { backgroundImage: `url(${postData.backgroundImageURL})` }
            : {}
        }
      >
        <div className={styles['button-container']}>
          <Button
            className={styles['delete-button']}
            type="delete"
            onClick={() => handleDeleteRecipient(id)}
          >
            삭제하기
          </Button>
        </div>
        <div className={styles['card-container']}>
          <Card recipientId={id} empty={true} />
          {messages.map((msg) => (
            <Card
              key={msg.id}
              id={msg.id}
              image={msg.profileImageURL}
              sender={msg.sender}
              relationship={msg.relationship}
              createdAt={msg.createdAt.slice(0, 10).split('-').join('.')}
              onDelete={handleDeleteMessage}
              onClick={() => handleOpenModal(msg.id)}
            >
              {msg.content}
            </Card>
          ))}
          {selectedCardId && (
            <Modal
              key={selectedCard.id}
              image={selectedCard.profileImageURL}
              sender={selectedCard.sender}
              relationship={selectedCard.relationship}
              createdAt={selectedCard.createdAt
                .slice(0, 10)
                .split('-')
                .join('.')}
              onClose={handleCloseModal}
            >
              {selectedCard.content}
            </Modal>
          )}
        </div>
        {hasNextMessage && <div ref={observerRef} className="load"></div>}
      </div>
    </>
  );
}
