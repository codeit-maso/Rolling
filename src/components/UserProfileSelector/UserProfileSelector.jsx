import { useEffect, useState } from 'react';
import getProfileImages from '../../api/getProfileImages.js';
import DEFAULT_PROFILE_IMAGE from '../../constants/image.js';
import styles from './UserProfileSelector.module.scss';

export default function UserProfileSelector({
  value = DEFAULT_PROFILE_IMAGE,
  onSelect,
}) {
  const [profileImages, setProfileImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      const images = await getProfileImages();
      setProfileImages(images);
    };
    loadImages();
  }, []);

  const handleImageLoad = (url) => {
    setLoadedImages((prev) => ({ ...prev, [url]: true }));
  };

  return (
    <div className={styles['profile-select']}>
      <h2 className={styles['profile-select__title']}>프로필 이미지</h2>
      <div className={styles['profile-select__content']}>
        <img
          src={value}
          alt="선택된 프로필"
          className={styles['profile-select__selected-image']}
        />
        <div className={styles['profile-select__right']}>
          <p className={styles['profile-select__description']}>
            프로필 이미지를 선택해주세요!
          </p>
          <div className={styles['profile-select__image-list']}>
            {profileImages.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`profile-${idx}`}
                className={`${styles['profile-select__image']} ${
                  value === url ? styles['profile-select__image--selected'] : ''
                } ${!loadedImages[url] ? styles['profile-select__image--loading'] : ''}`}
                onClick={() => onSelect?.(url)}
                onLoad={() => handleImageLoad(url)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
