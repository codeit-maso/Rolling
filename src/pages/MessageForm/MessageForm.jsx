import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../components/common/FormInput';
import UserProfileSelector from '../../components/UserProfileSelector/UserProfileSelector';
import DEFAULT_PROFILE_IMAGE from '../../constants/image';
import RelationshipSelect from '../../components/RelationshipSelect/RelationshipSelect';
import Editor from '../../components/Editor/Editor';
import FontSelect from '../../components/FontSelect/FontSelect';
import Button from '../../components/common/Button';
import postMessage from '../../api/postMessage';
import styles from './MessageForm.module.scss';

export default function MessageForm() {
  const { id } = useParams();
  const [sender, setSender] = useState('');
  const [senderError, setSenderIsError] = useState(false);
  const [messageError, setMessageIsError] = useState(false);
  const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE_IMAGE);
  const [relationship, setRelationship] = useState('지인');
  const [message, setMessage] = useState('');
  const [font, setFont] = useState('Noto Sans');
  const [isRestored, setIsRestored] = useState(false);

  const stripHtml = (html) => html.replace(/<[^>]+>/g, '').trim();
  const isValid = sender.trim() !== '' && stripHtml(message) !== '';

  const navigate = useNavigate();

  function handleInputChange(e) {
    const inputValue = e.target.value.slice(0, 10);
    setSender(inputValue);
  }

  function handleSenderBlur() {
    setSenderIsError(sender.trim() === '');
  }

  function handleMessageBlur() {
    setMessageIsError(stripHtml(message) === '');
  }

  function resetForm() {
    setSender('');
    setProfileImage(DEFAULT_PROFILE_IMAGE);
    setRelationship('지인');
    setMessage('');
    setFont('Noto Sans');
  }

  useEffect(() => {
    try {
      const saved = localStorage.getItem('message-form');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSender(parsed.sender || '');
        setProfileImage(parsed.profileImage || DEFAULT_PROFILE_IMAGE);
        setRelationship(parsed.relationship || '지인');
        setMessage(parsed.message || '');
        setFont(parsed.font || 'Noto Sans');
      }
    } catch (err) {
      console.error('복원 중 에러 발생', err);
      localStorage.removeItem('message-form');
    } finally {
      setIsRestored(true);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        localStorage.removeItem('message-form');
        console.log('하루 뒤 자동 삭제');
      },
      1000 * 60 * 60 * 24,
    );

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isRestored) return;

    const formData = {
      sender,
      profileImage,
      relationship,
      message,
      font,
    };
    localStorage.setItem('message-form', JSON.stringify(formData));
  }, [sender, profileImage, relationship, message, font]);

  async function handleSubmit() {
    if (
      sender.trim() === '' ||
      sender.trim().length > 10 ||
      stripHtml(message) === ''
    ) {
      alert('이름은 최대 10자까지, 메시지를 모두 입력해주세요.');
      return;
    }

    try {
      await postMessage({
        team: import.meta.env.VITE_TEAM_ID,
        recipientId: Number(id),
        sender,
        profileImageURL: profileImage,
        relationship,
        content: message,
        font,
      });

      localStorage.removeItem('message-form');
      resetForm();
      navigate(`/post/${id}`);
    } catch (error) {
      console.error('메세지 전송 실패', error);
    }
  }

  return (
    <div className={styles['message-form']}>
      <div className={styles['message-form__content']}>
        <div className={styles['message-form__input']}>
          <FormInput
            label="From."
            placeholder="이름을 입력해 주세요 (10자 이내)"
            value={sender}
            onChange={handleInputChange}
            onBlur={handleSenderBlur}
            isError={senderError}
          />
        </div>
        <div className={styles['message-form__profile-selector']}>
          <UserProfileSelector
            value={profileImage}
            onSelect={setProfileImage}
          />
        </div>
        <div className={styles['message-form__relationship-select']}>
          <RelationshipSelect value={relationship} onChange={setRelationship} />
        </div>
        <div className={styles['message-form__editor']}>
          <Editor
            value={message}
            onChange={setMessage}
            font={font}
            onBlur={handleMessageBlur}
            isError={messageError}
          />
        </div>
        <div className={styles['message-form__font-select']}>
          <FontSelect value={font} onChange={setFont} />
        </div>
      </div>
      <Button type="button" onClick={handleSubmit} disabled={!isValid}>
        생성하기
      </Button>
    </div>
  );
}
