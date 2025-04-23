import { api } from './api';

export default async function getRecipients() {
  const teamId = import.meta.env.VITE_TEAM_ID;
  const res = await api.get(`/${teamId}/recipients/`);
  return res.data;
}
