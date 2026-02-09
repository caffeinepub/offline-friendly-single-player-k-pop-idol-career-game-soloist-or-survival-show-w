import type { GameState } from './types';

const STORAGE_KEY = 'kpop_idol_game_state';
const CURRENT_VERSION = 1;

export function loadGameState(): GameState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const state = JSON.parse(stored) as GameState;
    if (state.version !== CURRENT_VERSION) {
      console.warn('Game state version mismatch, resetting');
      return null;
    }
    
    return state;
  } catch (error) {
    console.error('Failed to load game state:', error);
    return null;
  }
}

export function saveGameState(state: GameState): void {
  try {
    const toSave = {
      ...state,
      version: CURRENT_VERSION,
      lastPlayed: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
}

export function resetGameState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to reset game state:', error);
  }
}

export function createEmptyGameState(): GameState {
  return {
    version: CURRENT_VERSION,
    storyProgress: 0,
    submissions: [],
    lastPlayed: Date.now(),
  };
}

export function exportLightweightProgress(state: GameState) {
  return {
    careerPath: state.careerPath,
    profile: state.profile ? {
      gender: state.profile.gender,
      nationality: state.profile.nationality,
      age: state.profile.age,
    } : undefined,
    agency: state.agency,
    storyProgress: state.storyProgress,
    submissionCount: state.submissions.length,
  };
}
