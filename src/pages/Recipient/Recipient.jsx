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

export default function Recipient({ showDelete }) {
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
        const limit = offset === 0 ? 5 : 6;
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
    const limit = offset === 0 ? 5 : 6;
    setOffset((prev) => prev + limit);
  };

  async function handleDeleteMessage(messageId, recipientId) {
    try {
      await deleteMessage(messageId);
      const newOffset = offset - 1 < 0 ? 0 : offset - 1;

      const updatedMessages = await getMessages(recipientId, 0, newOffset);
      setMessages(updatedMessages.results);
      setHasNextMessage(updatedMessages.results.length < postData.messageCount);

      setOffset(0);
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

  function handleGoBack() {
    navigate(-1);
  }

  function handleEditClick(id) {
    navigate(`/post/${id}/edit`);
  }

  function handleOpenModal(id) {
    setSelectedCardId(id);
  }

  function handleCloseModal() {
    setSelectedCardId(null);
  }

  const selectedCard = messages.find((card) => card.id === selectedCardId);

  if (!postData || messages.length < 0)
    return (
      <div className={styles['loading-message']}>페이지를 불러오는 중..</div>
    );

  return (
    <>
      <HeaderService recipient={postData} />
      <div
        className={`${styles['post-container']} ${!postData.backgroundImageURL ? styles[`background--${postData.backgroundColor}`] : ''} ${showDelete ? styles[`background--gray`] : ''}`}
        style={
          postData.backgroundImageURL && !showDelete
            ? { backgroundImage: `url(${postData.backgroundImageURL})` }
            : {}
        }
      >
        <div className={styles['button-container']}>
          <div className={styles['back-button-wrapper']}>
            <button className={styles['back-button']} onClick={handleGoBack}>
              ← 뒤로가기
            </button>
          </div>

          <div className={styles['action-button-wrapper']}>
            {showDelete ? (
              <Button type="delete" onClick={() => handleDeleteRecipient(id)}>
                페이지 삭제하기
              </Button>
            ) : (
              <Button type="delete" onClick={() => handleEditClick(id)}>
                편집하기
              </Button>
            )}
          </div>
        </div>
        <div className={styles['card-container']}>
          {!showDelete && (
            <Card recipientId={id} empty={true} showDelete={showDelete} />
          )}
          {messages.map((msg) => (
            <Card
              key={msg.id}
              id={msg.id}
              recipientId={id}
              image={msg.profileImageURL}
              sender={msg.sender}
              relationship={msg.relationship}
              createdAt={msg.createdAt.slice(0, 10).split('-').join('.')}
              onDelete={handleDeleteMessage}
              onClick={() => handleOpenModal(msg.id)}
              font={msg.font}
              showDelete={showDelete}
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
              font={selectedCard.font}
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
