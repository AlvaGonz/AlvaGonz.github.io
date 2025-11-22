const username = import.meta.env.VITE_LEETCODE_USERNAME || 'AlvaGonz';

export interface LeetCodeStats {
  status: string;
  message: string;
  data?: {
    userProfile: {
      username: string;
      realName: string;
      avatar: string;
      ranking: number;
      totalProblems: number;
      totalSolved: number;
      easyCount: number;
      mediumCount: number;
      hardCount: number;
      acceptanceRate: number;
    };
  };
}

export async function fetchLeetCodeStats(): Promise<LeetCodeStats | null> {
  try {
    const response = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${username}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as LeetCodeStats;
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    return null;
  }
}

