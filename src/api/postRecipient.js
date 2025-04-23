import { api } from './api';

export default async function createPost({
  team,
  name,
  backgroundColor,
  backgroundImageURL,
}) {
  const res = await api.post('/15-7/recipients/', {
    team,
    name,
    backgroundColor,
    backgroundImageURL,
  });
  return res.data.id;
}
