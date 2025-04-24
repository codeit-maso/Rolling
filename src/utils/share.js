export const initializeKakaoSDK = () => {
  if (window.Kakao && window.Kakao.isInitialized()) {
    return;
  }

  // 카카오 SDK 로드
  const script = document.createElement('script');
  script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js';
  script.async = true;
  script.onload = () => {
    if (window.Kakao) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY);
      console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
    }
  };
  document.head.appendChild(script);
};

export const shareKakao = (recipient, url) => {
  if (!window.Kakao || !window.Kakao.Share) {
    console.error('Kakao SDK not loaded');
    return;
  }

  const title = `${recipient?.name || '누군가'}에게 롤링페이퍼 보내기`;
  const description = `${recipient?.messageCount || 0}명이 작성한 롤링페이퍼입니다. 지금 확인 해보세요!`;

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: title,
      description: description,
      imageUrl: `${window.location.origin}/rolling-logo.svg`,
      link: {
        mobileWebUrl: url,
        webUrl: url,
      },
    },
    buttons: [
      {
        title: '롤링페이퍼 작성하기',
        link: {
          mobileWebUrl: `${url}/message`,
          webUrl: `${url}/message`,
        },
      },
    ],
  });
};
