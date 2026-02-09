import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, Users } from 'lucide-react';
import { useGameState } from '../game/state/useGameState';
import type { CareerPath } from '../game/state/types';

export default function NewGameModePage() {
  const navigate = useNavigate();
  const { startNewGame } = useGameState();
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);

  const handleStart = () => {
    if (selectedPath) {
      startNewGame(selectedPath);
      navigate({ to: '/character-setup' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)]">
          Choose Your Path
        </h1>
        <p className="text-lg text-white/70">
          How will you rise to stardom?
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card
          className={`p-8 cursor-pointer transition-all ${
            selectedPath === 'soloist'
              ? 'bg-gradient-to-br from-[oklch(0.8_0.25_340)]/20 to-[oklch(0.85_0.2_50)]/20 border-[oklch(0.8_0.25_340)] shadow-lg shadow-[oklch(0.8_0.25_340)]/30'
              : 'bg-black/40 border-white/10 hover:border-white/30'
          }`}
          onClick={() => setSelectedPath('soloist')}
        >
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] flex items-center justify-center">
              <Mic className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Solo Artist</h2>
            <p className="text-white/70">
              Build your career as an independent artist. Showcase your unique style and become a solo superstar.
            </p>
          </div>
        </Card>

        <Card
          className={`p-8 cursor-pointer transition-all ${
            selectedPath === 'survival'
              ? 'bg-gradient-to-br from-[oklch(0.8_0.25_340)]/20 to-[oklch(0.85_0.2_50)]/20 border-[oklch(0.8_0.25_340)] shadow-lg shadow-[oklch(0.8_0.25_340)]/30'
              : 'bg-black/40 border-white/10 hover:border-white/30'
          }`}
          onClick={() => setSelectedPath('survival')}
        >
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Survival Show</h2>
            <p className="text-white/70">
              Compete in a high-stakes survival show. Prove yourself against other trainees and earn your debut.
            </p>
          </div>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleStart}
          disabled={!selectedPath}
          size="lg"
          className="px-12 bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] hover:from-[oklch(0.85_0.25_340)] hover:to-[oklch(0.9_0.2_50)] text-white font-bold"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
