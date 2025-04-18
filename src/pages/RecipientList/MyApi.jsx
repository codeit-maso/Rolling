import axios from 'axios';

export default async function getList() {
  const response = await axios.get(
    'https://rolling-api.vercel.app/13-5/recipients/',
  );
  const { data } = response;
  return data;
}
