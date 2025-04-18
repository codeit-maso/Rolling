// src/api/getData.js
import axios from 'axios';

export default function getBackgroundImage() {
  return axios
    .get('https://rolling-api.vercel.app/background-images/')
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error('API 호출 중 오류 발생:', error);
      throw error;
    });
}
