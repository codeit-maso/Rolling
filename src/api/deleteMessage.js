import { api } from './api';

export default async function deleteMessage(messageId) {
  const teamId = import.meta.env.VITE_TEAM_ID;
  const res = await api.delete(`/${teamId}/messages/${messageId}/`);
  return res.data;
}
