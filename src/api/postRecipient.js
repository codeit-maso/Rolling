import { api } from './api';

export default async function createPost({
  team,
  name,
  backgroundColor,
  backgroundImageURL,
}) {
  try {
    const teamId = import.meta.env.VITE_TEAM_ID;
    const res = await api.get(`/${teamId}/recipients/`, {
      team,
      name,
      backgroundColor,
      backgroundImageURL,
    });
    return res.data;
  } catch {
    return null;
  }
}
