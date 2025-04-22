import { api } from './api';

export default async function getMessages(id, offset, limit) {
  const res = await api.get(
    `/13-2/recipients/${id}/messages/?limit=${limit}&offset=${offset}`,
  );
  return res.data;
}
