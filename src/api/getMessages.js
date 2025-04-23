import { api } from './api';

export default async function getMessages(id, offset, limit) {
  try {
    const teamId = import.meta.env.VITE_TEAM_ID;
    const res = await api.get(
      `/${teamId}/recipients/${id}/messages/?limit=${limit}&offset=${offset}`,
    );
    return res.data;
  } catch {
    return null;
  }
}
