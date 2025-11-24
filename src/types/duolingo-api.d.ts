declare module 'duolingo-api' {
  interface DuolingoConfig {
    username: string;
  }

  interface ProcessedData {
    streak: number;
    totalXp: number;
    learningLanguage: string;
    courses: Array<{
      title: string;
      xp: number;
      crowns: number;
    }>;
    [key: string]: any;
  }

  class Duolingo {
    constructor(config: DuolingoConfig);
    getProcessedData(): Promise<ProcessedData>;
    getField(field: string): Promise<any>;
  }

  export default Duolingo;
}
