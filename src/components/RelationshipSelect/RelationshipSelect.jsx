import { useState, useRef, useId } from 'react';
import useDetectClose from '../../hooks/useDetectClose';
import styles from './RelationshipSelect.module.scss';

const OPTIONS = ['친구', '지인', '동료', '가족'];

export default function RelationshipSelect({ value = '지인', onChange }) {
  const dropdownRef = useRef(null);
  const id = useId();
  const [isOpen, setIsOpen] = useDetectClose(dropdownRef);

  const handleSelect = (option) => {
    onChange?.(option);
    setIsOpen(false);
  };

  return (
    <div className={styles['dropdown']}>
      <label htmlFor={id} className={styles['dropdown__label']}>
        상대와의 관계
      </label>
      <div ref={dropdownRef} className={styles['dropdown-body']}>
        <button
          id={id}
          type="button"
          className={styles['dropdown__button']}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {value}
          <span
            className={`${styles.dropdown__arrow} ${isOpen ? styles.open : ''}`}
          />
        </button>
        {isOpen && (
          <ul className={styles['dropdown__list']}>
            {OPTIONS.map((option) => (
              <li
                key={option}
                className={styles['dropdown__item']}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
