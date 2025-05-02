export const initializeKakaoSDK = () => {
  if (window.Kakao && window.Kakao.isInitialized()) {
    return;
  }

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

  const title = `Rolling - 마음을 실은 종이비행기`;
  const description = `마음을 종이비행기에 담아 전하세요. 부담 없이, 따뜻하게.`;
  const imageUrl = `${window.location.origin}/rolling-meta.png`;

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: title,
      description: description,
      imageUrl: imageUrl,
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

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('클립보드 복사 실패:', err);
    return false;
  }
};
