import { api } from './api';

export default async function fetchProfileImages() {
  try {
    const res = await api.get('/profile-images/');
    return res.data.imageUrls;
  } catch {
    return [];
  }
}
