import api from './api';

export default async function getRecipient(id) {
  const res = await api.get(`/13-2/recipients/${id}/`);
  return res.data;
}
