import { api } from './api';

export const fetchReactions = async (recipientId, limit = 8) => {
  try {
    const teamId = import.meta.env.VITE_TEAM_ID;
    const res = await api.get(
      `/${teamId}/recipients/${recipientId}/reactions/?limit=${limit}`,
    );
    return res.data.results;
  } catch (error) {
    console.error('리액션 목록 가져오기 실패:', error);
    return [];
  }
};

export const addReaction = async (recipientId, emoji) => {
  try {
    const teamId = import.meta.env.VITE_TEAM_ID;
    const res = await api.post(
      `/${teamId}/recipients/${recipientId}/reactions/`,
      {
        emoji: emoji,
        type: 'increase',
      },
    );
    return res.data;
  } catch (error) {
    console.error('이모지 리액션 추가 실패:', error);
    throw error;
  }
};

export const decreaseReaction = async (recipientId, emoji) => {
  try {
    const teamId = import.meta.env.VITE_TEAM_ID;
    const res = await api.post(
      `/${teamId}/recipients/${recipientId}/reactions/`,
      {
        emoji: emoji,
        type: 'decrease',
      },
    );
    return res.data;
  } catch (error) {
    console.error('이모지 리액션 감소 실패:', error);
    throw error;
  }
};
