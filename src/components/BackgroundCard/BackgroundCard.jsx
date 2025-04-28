import { useState } from 'react';
import styles from './BackgroundCard.module.scss';
import uploadImage from '../../api/postUpload';
import checked from '../../assets/images/checked.svg';
import upload from '../../assets/images/upload.svg';

export default function BackgroundCard({
  type, // 'color' 또는 'image' 또는 'upload'
  color,
  url,
  isSelected,
  onClick,
  isLoading,
  onLoad,
  onSelect,
}) {
  const [imageUrl, setImageUrl] = useState(url);

  const getClassName = () => {
    if (type === 'color') {
      return `${styles[`background-card__color--${color}`]} ${isSelected ? styles['background-card__color--selected'] : ''}`;
    }
    if (type === 'image') {
      return `${styles[`background-card__image--${color}`]} ${isSelected ? styles['background-card__image--selected'] : ''}`;
    }
    if (type === 'upload') {
      return `${styles['background-card__upload']} ${imageUrl ? '' : styles['background-card__upload--no-image']} ${isSelected ? styles['background-card__image--selected'] : ''}`;
    }
    return '';
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadedUrl = await uploadImage(file);
      setImageUrl(uploadedUrl);
      onSelect?.(uploadedUrl);
    } catch {
      alert('이미지 업로드 실패했습니다.');
    }
  };

  return (
    <li className={getClassName()} onClick={onClick}>
      {type === 'image' && (
        <>
          {isLoading && <div className={styles['background-card__skeleton']} />}
          <img
            src={url}
            alt="배경이미지"
            className={`${
              styles['background-card__background-img']
            } ${isLoading ? styles['background-card__background-img--hidden'] : ''}`}
            onLoad={onLoad}
          />
        </>
      )}
      {type === 'upload' && (
        <>
          {imageUrl ? (
            <>
              {isLoading && (
                <div className={styles['background-card__skeleton']} />
              )}
              <img
                src={imageUrl}
                alt="배경이미지"
                className={`${
                  styles['background-card__background-img']
                } ${isLoading ? styles['background-card__background-img--hidden'] : ''}`}
                onLoad={onLoad}
              />
              <button
                type="button"
                className={styles['background-card__remove-btn']}
                onClick={(e) => {
                  e.stopPropagation();
                  setImageUrl(null);
                  onSelect?.(null);
                }}
              >
                ✕
              </button>
            </>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="upload-input"
              />
              <label
                htmlFor="upload-input"
                className={styles['background-card__upload-btn']}
              >
                <img
                  src={upload}
                  alt="업로드된 이미지"
                  className={styles['background-card__upload-img']}
                />
                <span>이미지 업로드</span>
              </label>
            </>
          )}
        </>
      )}
      {isSelected && (
        <img
          src={checked}
          alt="선택됨"
          className={styles['background-card__check-icon']}
        />
      )}
    </li>
  );
}
