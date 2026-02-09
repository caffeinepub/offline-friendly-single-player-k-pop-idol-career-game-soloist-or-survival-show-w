export type CareerPath = 'soloist' | 'survival';

export interface PlayerProfile {
  gender: string;
  nationality: string;
  age: number;
  photoMediaId?: string;
  auditionAudioMediaId?: string;
}

export interface AgencyInfo {
  name: string;
  description: string;
  isCustom: boolean;
}

export interface SubmissionMetadata {
  id: string;
  timestamp: number;
  performanceType: 'vocal' | 'dance' | 'rap' | 'mixed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  selfRating: number;
  videoMediaId: string;
  audioMediaId?: string;
  photoMediaId?: string;
  feedback?: JudgeFeedback;
}

export interface JudgeFeedback {
  overallScore: number;
  categoryScores: {
    technique: number;
    expression: number;
    stage_presence: number;
    creativity: number;
  };
  tips: string[];
  judgePersonas: string[];
}

export interface GameState {
  version: number;
  careerPath?: CareerPath;
  profile?: PlayerProfile;
  agency?: AgencyInfo;
  storyProgress: number;
  submissions: SubmissionMetadata[];
  lastPlayed: number;
}
