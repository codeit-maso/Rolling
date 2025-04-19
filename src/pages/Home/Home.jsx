import './Home.css';
import '../../assets/images/img_01.png';
import '../../assets/images/img_02.png';

export default function Home() {
  return (
    <>
      <div className="header-box"></div>
      <section>
        <div className="intro-box first-section">
          <div className="intro-left">
            <div className="point-badge">Point.01</div>
            <h2 className="intro-title">
              누구나 손쉽게, 온라인
              <br />
              롤링 페이퍼를 만들 수 있어요
            </h2>
            <p className="intro-subtext">로그인 없이 자유롭게 만들어요.</p>
          </div>
          <div>
            <img
              src="/src/assets/images/img_01.png"
              className="intro-image"
              alt="롤링 이미지"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="intro-box second-section">
          <div>
            <div className="point-badge">Point.02</div>
            <h2 className="intro-title">
              서로에게 이모지로 감정을
              <br />
              표현해주세요
            </h2>
            <p className="intro-subtext">
              롤링 페이퍼에 이모지를 추가할 수 있어요.
            </p>
          </div>
          <div>
            <img
              src="/src/assets/images/img_02.png"
              className="intro-image"
              alt="이모지 이미지"
            />
          </div>
        </div>
      </section>
    </>
  );
}
