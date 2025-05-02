import { api } from './api';

export default async function uploadImage(file, onProgress) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'profile_upload');
  const cloudName = import.meta.env.VITE_CLOUD_NAME;

  try {
    const res = await api.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          if (onProgress) {
            const percent = Math.round((e.loaded * 100) / e.total);
            onProgress(percent);
          }
        },
      },
    );
    return res.data.secure_url;
  } catch (error) {
    console.error('이미지 업로드 실패', error);
    throw error;
  }
}
