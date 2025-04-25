import { api } from './api';

export default async function getRecipient(id) {
  try {
    const teamId = import.meta.env.VITE_TEAM_ID;
    const res = await api.get(`/${teamId}/recipients/${id}/`);
    return res.data;
  } catch {
    return null;
  }
}
