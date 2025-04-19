import api from './api';

export default async function getBackgroundImage() {
  const res = await api.get('/background-images/');
  return res.data.imageUrls;
}
