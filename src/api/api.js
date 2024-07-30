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

export const fetchSummary = async () => {
    try {
      const usersRef = ref(database, 'users');
      const snapshot = await get(usersRef);
  
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const aggregatedData = {
          userCount: 0,
          totalPushUps: 0,
          totalSquats: 0,
          pushUpsByDate: {},
          squatsByDate: {}
        };
  
        for (const userId in usersData) {
          const user = usersData[userId];
          aggregatedData.userCount += 1;
          const stats = user.stats || {};
  
          for (const date in stats) {
            if (stats[date].pushup) {
              aggregatedData.totalPushUps += stats[date].pushup;
              if (!aggregatedData.pushUpsByDate[date]) {
                aggregatedData.pushUpsByDate[date] = 0;
              }
              aggregatedData.pushUpsByDate[date] += stats[date].pushup;
            }
  
            if (stats[date].squat) {
              aggregatedData.totalSquats += stats[date].squat;
              if (!aggregatedData.squatsByDate[date]) {
                aggregatedData.squatsByDate[date] = 0;
              }
              aggregatedData.squatsByDate[date] += stats[date].squat;
            }
          }
        }
  
        return aggregatedData;
      } else {
        return { error: 'No users found' };
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
      return { error: 'Internal server error' };
    }
  };
