import { useEffect } from 'react';

export default function useDetectClose(ref, onClose) {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose(); // 바로 닫기 말고 외부에서 애니메이션 포함한 onClose 실행
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, onClose]);
}
