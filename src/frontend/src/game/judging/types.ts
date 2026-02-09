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
