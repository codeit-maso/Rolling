import { api } from './api';

export default async function deleteMessage(recipientId) {
  const teamId = import.meta.env.VITE_TEAM_ID;
  const res = await api.delete(`/${teamId}/recipients/${recipientId}/`);
  return res.data;
}
