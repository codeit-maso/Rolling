import { api } from './api';

export default async function createMessage({
  team,
  recipientId,
  sender,
  profileImageURL,
  relationship,
  content,
  font,
}) {
  const teamId = import.meta.env.VITE_TEAM_ID;
  const res = await api.post(`/${teamId}/recipients/${recipientId}/messages/`, {
    team,
    recipientId,
    sender,
    profileImageURL,
    relationship,
    content,
    font,
  });

  return res.data;
}
