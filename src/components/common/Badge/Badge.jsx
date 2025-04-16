import './Badge.scss';

const relationship = {
  acquaintance: '지인',
  colleague: '동료',
  family: '가족',
  friend: '친구',
};

export default function Badge({ relation }) {
  return <div className={`Badge ${relation}`}>{relationship[relation]}</div>;
}
