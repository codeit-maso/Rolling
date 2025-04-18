import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreatePage.module.scss';
import FormInput from '../../components/common/FormInput';
import Button from '../../components/common/Button';
import getBackgroundImage from '../../api/getBackgroundImage';
import checked from '../../assets/images/checked.svg';
import createPost from '../../api/createPost';

const colors = ['beige', 'purple', 'blue', 'green'];

export default function CreatePage() {
  const [selectedType, setSelectedType] = useState('color');
  const [data, setData] = useState(null);
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [selectedColor, setSelectedColor] = useState('beige');
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  useEffect(function () {
    async function fetch() {
      try {
        const result = await getBackgroundImage();
        setData(result);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      }
    }

    fetch();
  }, []);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleBlur() {
    if (!value) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }

  function handleColorClick(color) {
    setSelectedColor(color);
  }

  function handleImageClick(index) {
    setSelectedImage(index);
  }

  async function handleClick() {
    try {
      const id = await createPost({
        team: '15-7',
        name: value,
        backgroundColor: selectedColor,
        backgroundImageURL: data.imageUrls[selectedImage] ?? null,
      });
      navigate(`/post/${id}`);
    } catch (error) {
      console.error('페이지 생성 중 오류:', error.response.data);
    }
  }

  return (
    <div className={styles.CreatePage}>
      <div className={styles['input-section']}>
        <FormInput
          label="To."
          placeholder="받는 사람 이름을 입력해 주세요"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          isError={isError}
        />
      </div>
      <div className={styles['background-select']}>
        <div className={styles['text-section']}>
          <p>
            <span>배경화면을 선택해 주세요.</span>
          </p>
          <p>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
        </div>
        <div className={styles['toggle-button']}>
          <button
            className={`${styles['select-color']} ${
              selectedType === 'color' ? styles['active'] : ''
            }`}
            onClick={() => setSelectedType('color')}
          >
            컬러
          </button>
          <button
            className={`${styles['select-image']} ${
              selectedType === 'image' ? styles['active'] : ''
            }`}
            onClick={() => setSelectedType('image')}
          >
            이미지
          </button>
        </div>
        {selectedType === 'color' && (
          <ul className={styles['color-list']}>
            {colors.map((color) => (
              <li
                key={color}
                className={`${styles[color]} ${selectedColor === color ? styles.selected : ''}`}
                onClick={() => handleColorClick(color)}
              >
                {selectedColor === color && (
                  <img
                    src={checked}
                    alt="선택됨"
                    className={styles.checkIcon}
                  />
                )}
              </li>
            ))}
          </ul>
        )}

        {selectedType === 'image' && (
          <ul className={styles['image-list']}>
            {data.imageUrls.map((url, index) => (
              <li
                key={index}
                className={`${styles[`image${index + 1}`]} ${selectedImage === index ? styles.selected : ''}`}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={url}
                  alt={`배경이미지${index + 1}`}
                  className={styles['background-img']}
                />
                {selectedImage === index && (
                  <img
                    src={checked}
                    alt="선택됨"
                    className={styles.checkIcon}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        text="생성하기"
        type="create"
        onClick={handleClick}
        disabled={!value.trim()}
      />
    </div>
  );
}
