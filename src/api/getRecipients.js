import { api } from './api';

const teamId = import.meta.env.VITE_TEAM_ID;

export default async function getRecipients() {
  const res = await api.get(`/${teamId}/recipients/`);
  return res.data;
}
