import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, RotateCcw, Sparkles } from 'lucide-react';
import { useGameState } from '../game/state/useGameState';

export default function LandingPage() {
  const navigate = useNavigate();
  const { hasExistingGame, resetGame } = useGameState();

  const handleNewGame = () => {
    navigate({ to: '/new-game' });
  };

  const handleContinue = () => {
    navigate({ to: '/career' });
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      resetGame();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: 'url(/assets/generated/kpop-stage-bg.dim_1920x1080.png)' }}
      />
      
      <div className="relative z-10 max-w-2xl w-full space-y-8 px-4">
        <div className="text-center space-y-4">
          <img
            src="/assets/generated/kpop-idol-logo.dim_512x512.png"
            alt="K-pop Idol Game"
            className="w-48 h-48 mx-auto drop-shadow-2xl"
          />
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.8_0.25_340)] via-[oklch(0.85_0.2_50)] to-[oklch(0.8_0.25_340)] animate-pulse">
            IDOL DREAMS
          </h1>
          <p className="text-xl text-white/80 font-light">
            Your journey to stardom begins here
          </p>
        </div>

        <Card className="p-8 bg-black/60 backdrop-blur-md border-white/20 space-y-4">
          <Button
            onClick={handleNewGame}
            size="lg"
            className="w-full text-lg font-bold bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] hover:from-[oklch(0.85_0.25_340)] hover:to-[oklch(0.9_0.2_50)] text-white shadow-lg shadow-[oklch(0.8_0.25_340)]/50"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            New Game
          </Button>

          {hasExistingGame && (
            <>
              <Button
                onClick={handleContinue}
                size="lg"
                variant="outline"
                className="w-full text-lg font-semibold border-[oklch(0.8_0.25_340)] text-[oklch(0.8_0.25_340)] hover:bg-[oklch(0.8_0.25_340)]/10"
              >
                <Play className="h-5 w-5 mr-2" />
                Continue
              </Button>

              <Button
                onClick={handleReset}
                size="lg"
                variant="ghost"
                className="w-full text-lg text-white/60 hover:text-white hover:bg-white/5"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Reset Progress
              </Button>
            </>
          )}
        </Card>

        <p className="text-center text-sm text-white/50">
          All your media stays on your device • No internet required to play
        </p>
      </div>
    </div>
  );
}
