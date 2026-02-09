import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Trophy, TrendingUp } from 'lucide-react';
import { useGameState } from '../game/state/useGameState';

export default function CareerModePage() {
  const navigate = useNavigate();
  const { state } = useGameState();

  if (!state.careerPath || !state.profile || !state.agency) {
    navigate({ to: '/' });
    return null;
  }

  const careerTitle = state.careerPath === 'soloist' ? 'Solo Artist Career' : 'Survival Show Journey';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)]">
          {careerTitle}
        </h1>
        <p className="text-lg text-white/70">
          {state.agency.name} • {state.profile.nationality} {state.profile.gender}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6 bg-black/40 border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-white/60">Progress</p>
              <p className="text-2xl font-bold text-white">{state.storyProgress}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-black/40 border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-white/60">Performances</p>
              <p className="text-2xl font-bold text-white">{state.submissions.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-black/40 border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-white/60">Avg Score</p>
              <p className="text-2xl font-bold text-white">
                {state.submissions.length > 0
                  ? Math.round(
                      state.submissions.reduce((sum, s) => sum + (s.feedback?.overallScore || 0), 0) /
                        state.submissions.length
                    )
                  : '-'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-8 bg-black/40 border-white/10 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Next Challenge</h2>
          <p className="text-white/70">
            {state.careerPath === 'soloist'
              ? 'Record a new performance to showcase your talent and receive feedback from the judges.'
              : 'Complete your next survival show challenge. Impress the judges to advance to the next round.'}
          </p>
        </div>

        <Button
          onClick={() => navigate({ to: '/submit-performance' })}
          size="lg"
          className="w-full bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] hover:from-[oklch(0.85_0.25_340)] hover:to-[oklch(0.9_0.2_50)] text-white font-bold"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          Submit Performance
        </Button>
      </Card>
    </div>
  );
}
