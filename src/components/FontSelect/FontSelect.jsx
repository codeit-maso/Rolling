import { useState, useRef, useId } from 'react';
import useDetectClose from '../../hooks/useDetectClose';
import styles from './FontSelect.module.scss';

const FONTS = ['Noto Sans', 'Pretendard', 'NanumMyeongjo', 'NanumSonPyeonjiCe'];

const fontClassMap = {
  NotoSans: styles['font-noto'],
  Pretendard: styles['font-pretendard'],
  NanumMyeongjo: styles['font-nanum-myeongjo'],
  NanumSonPyeonjiCe: styles['font-naunm-hand'],
};

const formatFontName = (font) =>
  font
    .replace('NanumMyeongjo', '나눔명조')
    .replace('NanumSonPyeonjiCe', '나눔손글씨 손편지체');

export default function FontSelect({ defaultValue = 'Noto Sans', onChange }) {
  const dropdownRef = useRef(null);
  const id = useId();
  const [selected, setSelected] = useState(defaultValue);
  const [isOpen, setIsOpen] = useDetectClose(dropdownRef);

  const handleSelect = (font) => {
    setSelected(font);
    onChange?.(font);
    setIsOpen(false);
  };

  return (
    <div className={styles['dropdown']}>
      <label htmlFor={id} className={styles['dropdown__label']}>
        폰트 선택
      </label>
      <div ref={dropdownRef} className={styles['dropdown-body']}>
        <button
          id={id}
          type="button"
          className={`${styles['dropdown__button']} ${fontClassMap[selected]}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {formatFontName(selected)}
          <span
            className={`${styles.dropdown__arrow} ${isOpen ? styles.open : ''}`}
          />
        </button>
        {isOpen && (
          <ul className={styles['dropdown__list']}>
            {FONTS.map((font) => (
              <li
                key={font}
                className={`${styles['dropdown__item']} ${fontClassMap[font]}`}
                onClick={() => handleSelect(font)}
              >
                {formatFontName(font)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
