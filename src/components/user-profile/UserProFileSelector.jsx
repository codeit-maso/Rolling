import { useEffect, useState } from 'react';
import fetchProfileImages from '../../api/fetchProfileImages.js';
import DEFAULT_PROFILE_IMAGE from '../../constants/image.js';
import styles from './UserProFileSelector.module.scss';

export default function UserProfileSelector({ onSelect }) {
  const [profileImages, setProfileImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(DEFAULT_PROFILE_IMAGE);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = await fetchProfileImages();
        setProfileImages(images);
      } catch (_) {
        setProfileImages([]);
      }
    };
    loadImages();
  }, []);

  const handleSelect = (url) => {
    setSelectedImage(url);
    onSelect?.(url);
  };

  return (
    <div className={styles['profile-select']}>
      <h2 className={styles['profile-select__title']}>프로필 이미지</h2>
      <div className={styles['profile-select__content']}>
        <img
          src={selectedImage}
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
                  selectedImage === url
                    ? styles['profile-select__image--selected']
                    : ''
                }`}
                onClick={() => handleSelect(url)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
