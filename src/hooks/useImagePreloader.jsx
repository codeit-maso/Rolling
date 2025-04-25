import { useEffect, useState } from 'react';

export const useImagePreloader = (data) => {
  const [isLoading, setIsLoading] = useState(true);

  //받아올 이미지URL에 대한 배열 생성
  useEffect(() => {
    const urls = data.flatMap((item) => {
      const bg = item.backgroundImageURL ? [item.backgroundImageURL] : [];
      const recents =
        item.recentMessages?.map((msg) => msg.profileImageURL) || [];
      return [...bg, ...recents];
    });
    const nonDuplicatedUrls = [...new Set(urls)];

    //방어 코드 *_* //useEffect라서 첫 렌더링 시 빈 배열일때, 뒤의 setIsLoading(false)가 실행되지 않도록
    if (nonDuplicatedUrls.length === 0) {
      return;
    }

    //이미지 preloading
    Promise.all(
      nonDuplicatedUrls.map((imagePath) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = imagePath;
          img.onload = () => {
            console.log('✅ 이미지 로딩 완료:', imagePath);
            resolve();
          };
          img.onerror = (err) => {
            console.warn('❌ 이미지 로딩 실패:', imagePath);
            reject(err);
          };
          //   img.onload = resolve; //콘솔 생략
          //   img.onerror = reject; //콘솔 생략
        });
      }),
    ).then(() => {
      console.log('🟢 모든 이미지 로딩 완료');
      setIsLoading(false);
    });
  }, [data]);

  return isLoading;
};
