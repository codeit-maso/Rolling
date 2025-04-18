import { useState } from 'react';
import styles from './CreatePage.module.scss';

export default function CreatePage() {
  const [selectedType, setSelectedType] = useState('color');

  return (
    <div className={styles.CreatePage}>
      <div className={styles['input-section']}>
        <p>To.</p>
        <input type="text" />
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
            <li className={styles.beige}></li>
            <li className={styles.purple}></li>
            <li className={styles.blue}></li>
            <li className={styles.green}></li>
          </ul>
        )}

        {selectedType === 'image' && (
          <ul className={styles['image-list']}>
            <li className={styles.image1}>
              <img alt="배경이미지1" />
            </li>
            <li className={styles.image2}>
              <img alt="배경이미지2" />
            </li>
            <li className={styles.image3}>
              <img alt="배경이미지3" />
            </li>
            <li className={styles.image4}>
              <img alt="배경이미지4" />
            </li>
          </ul>
        )}
      </div>
      <button>생성하기</button>
    </div>
  );
}
