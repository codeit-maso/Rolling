import { useEffect, useState, useRef } from 'react';
import getProfileImages from '../../api/getProfileImages.js';
import uploadImage from '../../api/postUpload.js';
import DEFAULT_PROFILE_IMAGE from '../../constants/image.js';
import UploadProgressBar from '../common/UploadProgressBar.jsx';
import styles from './UserProfileSelector.module.scss';

export default function UserProfileSelector({
  value = DEFAULT_PROFILE_IMAGE,
  onSelect,
  isUploading,
  setIsUploading,
}) {
  const [profileImages, setProfileImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInput = useRef(null);

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

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    e.target.value = null;

    setIsUploading(true);

    try {
      const uploadedUrl = await uploadImage(file, (percent) => {
        setUploadProgress(percent);
      });

      onSelect?.(uploadedUrl);
    } catch (error) {
      alert('이미지 업로드 실패했습니다.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const triggerFileSeletor = () => {
    fileInput.current?.click();
  };

  return (
    <div className={styles['profile-select']}>
      <h2 className={styles['profile-select__title']}>프로필 이미지</h2>
      <div className={styles['profile-select__content']}>
        <div className={styles['profile-select__selected-wrapper']}>
          <img
            src={value}
            alt="선택된 프로필 및 업로드 이미지"
            className={styles['profile-select__selected-image']}
            onClick={triggerFileSeletor}
          />

          {isUploading && <UploadProgressBar progress={uploadProgress} />}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          ref={fileInput}
          style={{ display: 'none' }}
        />
        <div className={styles['profile-select__right']}>
          <p className={styles['profile-select__description']}>
            프로필을 클릭해 업로드해 주세요!
          </p>
          <div className={styles['profile-select__image-list']}>
            {profileImages.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`profile-${idx}`}
                className={`${styles['profile-select__image']} ${
                  value === url ? styles['profile-select__image--selected'] : ''
                } ${!loadedImages[url] ? styles['profile-select__image--loading'] : ''}
                ${isUploading ? styles['profile-select__image--disabled'] : ''}`}
                onClick={() => {
                  if (!isUploading) onSelect?.(url);
                }}
                onLoad={() => handleImageLoad(url)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
