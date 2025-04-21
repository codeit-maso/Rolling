import HeaderService from '../../components/recipient/HeaderService/HeaderService';
import checkedSvg from '../../assets/images/checked.svg';

export default function Recipient() {
  // 임시 목데이터 : 프로필 UI 확인용 기능 구현 후 삭제예정
  const mockRecipient = {
    name: 'Chan Ho',
    messageCount: 6,
    recentMessages: [
      {
        id: 1,
        profileImageURL: checkedSvg,
      },
      {
        id: 2,
        profileImageURL: checkedSvg,
      },
      {
        id: 3,
        profileImageURL: checkedSvg,
      },
    ],
  };

  return (
    <div>
      <HeaderService recipient={mockRecipient} />
    </div>
  );
}
