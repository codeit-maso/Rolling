import styles from './BackgroundCard.module.scss';
import checked from '../../assets/images/checked.svg';

export default function BackgroundCard({
  type, // 'color' 또는 'image'
  color,
  url,
  isSelected,
  onClick,
  isLoading,
  onLoad,
}) {
  const getClassName = () => {
    if (type === 'color') {
      return `${styles[`background-card__color--${color}`]} ${isSelected ? styles['background-card__color--selected'] : ''}`;
    }
    if (type === 'image') {
      return `${styles[`background-card__image--${color}`]} ${isSelected ? styles['background-card__image--selected'] : ''}`;
    }
    return '';
  };

  return (
    <li className={getClassName()} onClick={onClick}>
      {type === 'image' && (
        <>
          {isLoading && <div className={styles['background-card__skeleton']} />}
          <img
            src={url}
            alt="배경이미지"
            className={`
              ${styles['background-card__background-img']} 
              ${isLoading ? styles['background-card__background-img--hidden'] : ''}
            `}
            onLoad={onLoad}
          />
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
