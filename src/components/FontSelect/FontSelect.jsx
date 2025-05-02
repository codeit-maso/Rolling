import { useRef, useId } from 'react';
import useDetectClose from '../../hooks/useDetectClose';
import styles from './FontSelect.module.scss';

const FONTS = ['Noto Sans', 'Pretendard', '나눔명조', '나눔손글씨 손편지체'];

const fontClassMap = {
  'Noto Sans': styles['font-noto'],
  Pretendard: styles['font-pretendard'],
  나눔명조: styles['font-nanum-myeongjo'],
  '나눔손글씨 손편지체': styles['font-naunm-hand'],
};

export default function FontSelect({ value = 'Noto Sans', onChange }) {
  const dropdownRef = useRef(null);
  const id = useId();
  const [isOpen, setIsOpen] = useDetectClose(dropdownRef);

  const handleSelect = (font) => {
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
          className={`${styles['dropdown__button']} ${fontClassMap[value]}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {value}
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
                {font}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
