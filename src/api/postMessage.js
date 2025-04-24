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
  const res = await api.post(`/${team}/recipients/${recipientId}/messages/`, {
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
