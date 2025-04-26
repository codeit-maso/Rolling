import styles from './Home.module.scss';
import img01 from '../../assets/images/img_01.svg';
import img02 from '../../assets/images/img_02.png';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.homeWrapper}>
      <section className={styles.sectionBoxes}>
        <article className={`${styles.sectionBox} ${styles.rightImage}`}>
          <div className={styles.textBox}>
            <div className={styles.pointBadge}>Point.01</div>
            <h2 className={styles.title}>
              <span>누구나 손쉽게, 온라인</span> 롤링 페이퍼를 만들 수 있어요
            </h2>
            <p className={styles.subtext}>로그인 없이 자유롭게 만들어요.</p>
          </div>
          <img
            src={img01}
            alt="롤링페이퍼 이미지"
            className={styles.sectionImage}
          />
        </article>
      </section>

      <section className={styles.sectionBoxes}>
        <article className={`${styles.sectionBox} ${styles.leftImage}`}>
          <div className={styles.textBox}>
            <div className={styles.pointBadge}>Point.02</div>
            <h2 className={styles.title}>
              <span>서로에게 이모지로 감정을</span> 표현해보세요
            </h2>
            <p className={styles.subtext}>
              롤링 페이퍼에 이모지를 추가할 수 있어요.
            </p>
          </div>
          <img
            src={img02}
            alt="이모지 이미지"
            className={styles.sectionImage}
          />
        </article>
      </section>
      <Button type="primary" onClick={() => navigate('/list')}>
        구경해보기
      </Button>
    </div>
  );
}
