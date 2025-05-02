import { api } from './api';

export default async function getRecipients(sort = '') {
  const teamId = import.meta.env.VITE_TEAM_ID;
  const res = await api.get(
    `/${teamId}/recipients/?limit=8&offset=0&sort=${sort}`,
  );
  return res.data;
}
