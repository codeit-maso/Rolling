import axios from 'axios';

export default async function createPost({
  team,
  name,
  backgroundColor,
  backgroundImageURL,
}) {
  const response = await axios.post(
    'https://rolling-api.vercel.app/13-2/recipients/',
    {
      team,
      name,
      backgroundColor,
      backgroundImageURL,
    },
  );

  return response.data.id;
}
