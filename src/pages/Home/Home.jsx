import styles from './Home.module.scss';
import img01 from '../../assets/images/img_01.png';
import img02 from '../../assets/images/img_02.png';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.homeWrapper}>
      <section className={`${styles.sectionBox} ${styles.rightImage}`}>
        <img
          src={img01}
          alt="롤링페이퍼 이미지"
          className={styles.sectionImage}
        />
        <div className={styles.textBox}>
          <div className={styles.pointBadge}>Point.01</div>
          <h2 className={styles.title}>
            누구나 손쉽게, 온라인
            <br />
            롤링 페이퍼를 만들 수 있어요
          </h2>
          <p className={styles.subtext}>로그인 없이 자유롭게 만들어요.</p>
        </div>
      </section>

      <section className={`${styles.sectionBox} ${styles.leftImage}`}>
        <img src={img02} alt="이모지 이미지" className={styles.sectionImage} />
        <div className={styles.textBox}>
          <div className={styles.pointBadge}>Point.02</div>
          <h2 className={styles.title}>
            서로에게 이모지로 감정을
            <br />
            표현해주세요
          </h2>
          <p className={styles.subtext}>
            롤링 페이퍼에 이모지를 추가할 수 있어요.
          </p>
        </div>
      </section>

      <div className={styles.buttonWrapper}>
        <Button onClick={() => navigate('/list')}>구경해보기</Button>
      </div>
    </div>
  );
}
