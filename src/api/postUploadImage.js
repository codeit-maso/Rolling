import { api } from './api';

export default async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await api.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_KEY}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res.data.data.url;
  } catch (error) {
    console.error('이미지 업로드 실패', error);
    throw error;
  }
}
