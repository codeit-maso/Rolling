import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    if (status === 404) {
      alert('요청한 자원을 찾을 수 없습니다.');
    } else if (status === 500) {
      alert('서버에 문제가 발생했습니다.');
    } else {
      alert('문제가 발생했습니다.');
    }
    return Promise.reject(error);
  },
);

export default api;
