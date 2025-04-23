import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../components/common/FormInput';
import UserProfileSelector from '../../components/UserProfileSelector/UserProfileSelector';
import DEFAULT_PROFILE_IMAGE from '../../constants/image';
import RelationshipSelect from '../../components/RelationshipSelect/RelationshipSelect';
import Editor from '../../components/Editor/Editor';
import FontSelect from '../../components/FontSelect/FontSelect';
import Button from '../../components/common/Button';
import createMessage from '../../api/createMessage';
import styles from './MessageForm.module.scss';

export default function MessageForm() {
  const { id } = useParams();
  const [sender, setSender] = useState('');
  const [isError, setIsError] = useState(false);
  const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE_IMAGE);
  const [relationship, setRelationship] = useState('지인');
  const [message, setMessage] = useState('');
  const [font, setFont] = useState('Noto Sans');

  const stripHtml = (html) => html.replace(/<[^>]+>/g, '').trim();
  const isValid = sender.trim() !== '' && stripHtml(message) !== '';

  const navigate = useNavigate();

  function handleInputChange(e) {
    setSender(e.target.value);
  }

  function handleBlur() {
    setIsError(sender.trim() === '');
  }

  useEffect(() => {
    const saved = localStorage.getItem('quill-content');
    if (saved) {
      setMessage(saved);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        localStorage.removeItem('quill-content');
        console.log('하루 뒤 자동 삭제');
      },
      1000 * 60 * 60 * 24,
    );

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    localStorage.setItem('quill-content', message);
  }, [message]);

  async function handleSubmit() {
    try {
      const res = await createMessage({
        team: '15-7',
        recipientId: Number(id),
        sender,
        profileImageURL: profileImage,
        relationship,
        content: message,
        font,
      });

      localStorage.removeItem('quill-content');
      setMessage('');
      navigate(`/post/${res.id}`);
    } catch (error) {
      console.error('메세지 전송 실패', error);
    }
  }

  return (
    <div className={styles['message-form']}>
      <div className={styles['message-form__content']}>
        <div className={styles['message-form__input']}>
          <FormInput
            label="Form."
            placeholder="이름을 입력해 주세요."
            value={sender}
            onChange={handleInputChange}
            onBlur={handleBlur}
            isError={isError}
          />
        </div>
        <div className={styles['message-form__profile-selector']}>
          <UserProfileSelector onSelect={setProfileImage} />
        </div>
        <div className={styles['message-form__relationship-select']}>
          <RelationshipSelect
            defaultValue={relationship}
            onChange={setRelationship}
          />
        </div>
        <div className={styles['message-form__editor']}>
          <Editor value={message} onChange={setMessage} font={font} />
        </div>
        <div className={styles['message-form__font-select']}>
          <FontSelect value={font} onChange={setFont} />
        </div>
      </div>
      <Button type="create" onClick={handleSubmit} disabled={!isValid}>
        생성하기
      </Button>
    </div>
  );
}
