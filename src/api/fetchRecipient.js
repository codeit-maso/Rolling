import { api } from './api';

export default async function fetchRecipient(recipientId) {
  try {
    const teamId = import.meta.env.VITE_TEAM_ID;
    const res = await api.get(`/${teamId}/recipients/${recipientId}/`);
    return res.data;
  } catch {
    return null;
  }
}
