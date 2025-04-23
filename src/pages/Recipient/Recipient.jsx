import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderService from '../../components/recipient/HeaderService/HeaderService';
import fetchRecipient from '../../api/fetchRecipient';

export default function Recipient() {
  const [recipient, setRecipient] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      console.error('Recipient ID가 제공되지 않았습니다');
      return;
    }

    async function loadData() {
      try {
        const recipientData = await fetchRecipient(id);

        setRecipient(recipientData);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    }

    loadData();
  }, [id]);

  return (
    <div>
      <HeaderService recipient={recipient} />
    </div>
  );
}
