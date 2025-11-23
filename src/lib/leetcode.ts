const username = import.meta.env.VITE_LEETCODE_USERNAME || 'alvagonz';

export interface LeetCodeStats {
  status: string;
  message: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
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

