import { database, ref, get } from '../firebase';

export const getUserInfoAndStats = async () => {
  const usersRef = ref(database, 'users/');
  const snapshot = await get(usersRef);
  const data = snapshot.val();

  if (!data) {
    return [];
  }

  const userStats = [];

  Object.keys(data).forEach(userId => {
    const userInfo = data[userId]?.info;
    const userStatsData = data[userId]?.stats;

    if (!userInfo || !userStatsData) {
      return;
    }

    let pushUpCount = 0;
    let squatCount = 0;

    Object.keys(userStatsData).forEach(date => {
      pushUpCount += userStatsData[date]?.pushup || 0;
      squatCount += userStatsData[date]?.squat || 0;
    });

    userStats.push({
        userId,
        username: userInfo.username,
        birthdate: userInfo.birthdate,
        totalPushUps: pushUpCount,
        totalSquats: squatCount,
        stats: userStatsData
      });
  });

  return userStats;
};
