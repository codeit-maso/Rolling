import { api } from './api';

export default async function getRecipients() {
  const res = await api.get('/13-5/recipients/');
  return res.data;
}
