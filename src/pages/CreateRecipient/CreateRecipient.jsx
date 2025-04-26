import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateRecipient.module.scss';
import FormInput from '../../components/common/FormInput';
import Button from '../../components/common/Button';
import getBackgroundImage from '../../api/getBackgroundImage';
import checked from '../../assets/images/checked.svg';
import postRecipient from '../../api/postRecipient';

const colors = ['beige', 'purple', 'blue', 'green'];

export default function CreateRecipient() {
  const [data, setData] = useState(null);
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [selectedType, setSelectedType] = useState('color');
  const [selectedColor, setSelectedColor] = useState('beige');
  const [selectedImage, setSelectedImage] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getBackgroundImage();
        setData(result);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      }
    };

    fetch();
  }, []);

  function handleInputChange(e) {
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

  async function handleButtonClick() {
    try {
      const id = await postRecipient({
        team: '15-7',
        name: value,
        backgroundColor: selectedColor,
        backgroundImageURL: data[selectedImage] ?? null,
      });
      navigate(`/post/${id}`);
    } catch (error) {
      console.error('페이지 생성 중 오류:', error.response.data);
    }
  }

  return (
    <div className={styles['create-page']}>
      <div className={styles['create-page__input-section']}>
        <FormInput
          label="To."
          placeholder="받는 사람 이름을 입력해 주세요"
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          maxLength={40}
          isError={isError}
        />
      </div>
      <div className={styles['create-page__background-select']}>
        <div className={styles['create-page__text-section']}>
          <p>
            <span>배경화면을 선택해 주세요.</span>
          </p>
          <p>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
        </div>
        <div className={styles['create-page__toggle-button']}>
          <button
            className={`${styles['create-page__select-color']} ${
              selectedType === 'color'
                ? styles['create-page__select-color--active']
                : ''
            }`}
            onClick={() => {
              setSelectedType('color');
              setSelectedImage(-1);
            }}
          >
            컬러
          </button>
          <button
            className={`${styles['create-page__select-image']} ${
              selectedType === 'image'
                ? styles['create-page__select-image--active']
                : ''
            }`}
            onClick={() => {
              setSelectedType('image');
              setSelectedImage(0);
            }}
          >
            이미지
          </button>
        </div>
        {selectedType === 'color' && (
          <ul className={styles['create-page__color-list']}>
            {colors.map((color) => (
              <li
                key={color}
                className={`${styles[`create-page__color--${color}`]} ${
                  selectedColor === color
                    ? styles['create-page__color--selected']
                    : ''
                }`}
                onClick={() => handleColorClick(color)}
              >
                {selectedColor === color && (
                  <img
                    src={checked}
                    alt="선택됨"
                    className={styles['create-page__check-icon']}
                  />
                )}
              </li>
            ))}
          </ul>
        )}

        {selectedType === 'image' && (
          <ul className={styles['create-page__image-list']}>
            {data.map((url, index) => (
              <li
                key={index}
                className={`${styles[`create-page__image--${index + 1}`]} ${
                  selectedImage === index
                    ? styles['create-page__image--selected']
                    : ''
                }`}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={url}
                  alt={`배경이미지${index + 1}`}
                  className={styles['create-page__background-img']}
                />
                {selectedImage === index && (
                  <img
                    src={checked}
                    alt="선택됨"
                    className={styles['create-page__check-icon']}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles['create-page__create-button']}>
        <Button
          type="button"
          onClick={handleButtonClick}
          disabled={!value.trim()}
        >
          생성하기
        </Button>
      </div>

    </div>
  );
}
