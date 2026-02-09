import type { JudgeFeedback } from './types';

type PerformanceType = 'vocal' | 'dance' | 'rap' | 'mixed';
type Difficulty = 'beginner' | 'intermediate' | 'advanced';

const JUDGE_PERSONAS = ['Judge Luna', 'Judge Phoenix', 'Judge Blaze'];

const VOCAL_TIPS = [
  'Focus on breath control - take deeper breaths before long phrases',
  'Work on pitch accuracy by practicing with a piano or tuner',
  'Add more emotion to your delivery - connect with the lyrics',
  'Practice vocal warm-ups daily to improve range and tone',
  'Try varying your dynamics - don\'t sing everything at the same volume',
  'Work on your diction - make sure every word is clear',
];

const DANCE_TIPS = [
  'Sharpen your movements - make each gesture deliberate and precise',
  'Work on your flexibility with daily stretching routines',
  'Practice in front of a mirror to check your form',
  'Focus on hitting the beat exactly - rhythm is everything',
  'Add more energy to your performance - commit fully to each move',
  'Work on your facial expressions while dancing',
];

const RAP_TIPS = [
  'Work on your flow - practice staying on beat consistently',
  'Enunciate clearly - every word should be understood',
  'Add more variation in your delivery - change up your cadence',
  'Practice breath control for longer verses',
  'Work on your stage presence - own the space',
  'Study different rap styles to expand your versatility',
];

const MIXED_TIPS = [
  'Balance your skills - don\'t neglect any aspect of the performance',
  'Work on smooth transitions between singing, rapping, and dancing',
  'Practice stamina - mixed performances are physically demanding',
  'Develop a signature style that showcases all your talents',
  'Focus on storytelling - tie all elements together cohesively',
  'Don\'t try to do too much - quality over quantity',
];

function getTipsForType(type: PerformanceType): string[] {
  switch (type) {
    case 'vocal':
      return VOCAL_TIPS;
    case 'dance':
      return DANCE_TIPS;
    case 'rap':
      return RAP_TIPS;
    case 'mixed':
      return MIXED_TIPS;
  }
}

function calculateBaseScore(difficulty: Difficulty, selfRating: number): number {
  const difficultyMultiplier = {
    beginner: 0.7,
    intermediate: 0.85,
    advanced: 1.0,
  }[difficulty];

  const baseFromRating = (selfRating / 10) * 100;
  const randomVariation = (Math.random() - 0.5) * 15;
  
  return Math.max(40, Math.min(95, baseFromRating * difficultyMultiplier + randomVariation));
}

export function generateJudgeFeedback(
  performanceType: PerformanceType,
  difficulty: Difficulty,
  selfRating: number
): JudgeFeedback {
  const overallScore = calculateBaseScore(difficulty, selfRating);
  
  const variance = () => (Math.random() - 0.5) * 10;
  const categoryScores = {
    technique: Math.max(40, Math.min(100, overallScore + variance())),
    expression: Math.max(40, Math.min(100, overallScore + variance())),
    stage_presence: Math.max(40, Math.min(100, overallScore + variance())),
    creativity: Math.max(40, Math.min(100, overallScore + variance())),
  };

  const allTips = getTipsForType(performanceType);
  const shuffled = [...allTips].sort(() => Math.random() - 0.5);
  const tipCount = Math.floor(Math.random() * 3) + 4; // 4-6 tips
  const tips = shuffled.slice(0, tipCount);

  return {
    overallScore: Math.round(overallScore),
    categoryScores: {
      technique: Math.round(categoryScores.technique),
      expression: Math.round(categoryScores.expression),
      stage_presence: Math.round(categoryScores.stage_presence),
      creativity: Math.round(categoryScores.creativity),
    },
    tips,
    judgePersonas: JUDGE_PERSONAS,
  };
}
