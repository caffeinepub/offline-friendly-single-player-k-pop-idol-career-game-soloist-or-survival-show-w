import { useState, useEffect, useCallback } from 'react';
import type { GameState, CareerPath, PlayerProfile, AgencyInfo, SubmissionMetadata } from './types';
import { loadGameState, saveGameState, resetGameState, createEmptyGameState } from './storage';

export function useGameState() {
  const [state, setState] = useState<GameState>(() => {
    return loadGameState() || createEmptyGameState();
  });

  useEffect(() => {
    saveGameState(state);
  }, [state]);

  const startNewGame = useCallback((careerPath: CareerPath) => {
    const newState = createEmptyGameState();
    newState.careerPath = careerPath;
    setState(newState);
  }, []);

  const resetGame = useCallback(() => {
    resetGameState();
    setState(createEmptyGameState());
  }, []);

  const updateProfile = useCallback((profile: PlayerProfile) => {
    setState(prev => ({ ...prev, profile }));
  }, []);

  const updateAgency = useCallback((agency: AgencyInfo) => {
    setState(prev => ({ ...prev, agency }));
  }, []);

  const addSubmission = useCallback((submission: SubmissionMetadata) => {
    setState(prev => ({
      ...prev,
      submissions: [...prev.submissions, submission],
      storyProgress: prev.storyProgress + 1,
    }));
  }, []);

  const updateSubmissionFeedback = useCallback((submissionId: string, feedback: SubmissionMetadata['feedback']) => {
    setState(prev => ({
      ...prev,
      submissions: prev.submissions.map(sub =>
        sub.id === submissionId ? { ...sub, feedback } : sub
      ),
    }));
  }, []);

  const hasExistingGame = !!(state.careerPath);

  return {
    state,
    hasExistingGame,
    startNewGame,
    resetGame,
    updateProfile,
    updateAgency,
    addSubmission,
    updateSubmissionFeedback,
  };
}
