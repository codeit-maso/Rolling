// Posts.jsx
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import getRecipient from '../../api/getRecipient';
import Card from '../../components/Card/Card';
import styles from './Posts.module.scss'; // SCSS 파일 import

export default function Posts() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getRecipient(id);
        setPostData(result);
      } catch (error) {
        console.error('데이터 로딩 실패:', error.response.data);
      }
    };

    fetch();
  }, [id]);

  if (!postData) return <div>Loading...</div>;

  return (
    <div
      className={`${styles['post-container']} ${!postData.backgroundImageURL ? styles[`background--${postData.backgroundColor}`] : ''}`}
      style={
        postData.backgroundImageURL
          ? { backgroundImage: `url(${postData.backgroundImageURL})` }
          : {}
      }
    ></div>
  );
}
