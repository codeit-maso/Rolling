import { api } from './api';

export default async function fetchReactions(recipientId, limit = 8) {
  try {
    const teamId = import.meta.env.VITE_TEAM_ID;
    const res = await api.get(
      `/${teamId}/recipients/${recipientId}/reactions/?limit=${limit}`,
    );
    return res.data.results;
  } catch {
    return [];
  }
}
