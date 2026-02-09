import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGameState } from '../game/state/useGameState';
import { User, Globe, Calendar } from 'lucide-react';

export default function ProfileSummaryPage() {
  const navigate = useNavigate();
  const { state } = useGameState();

  const handleContinue = () => {
    navigate({ to: '/agency-selection' });
  };

  if (!state.profile) {
    navigate({ to: '/character-setup' });
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)]">
          Your Profile
        </h1>
        <p className="text-lg text-white/70">
          Looking good! Ready to choose your agency?
        </p>
      </div>

      <Card className="p-8 bg-black/40 border-white/10 space-y-6">
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
          <User className="h-6 w-6 text-[oklch(0.8_0.25_340)]" />
          <div>
            <p className="text-sm text-white/60">Gender</p>
            <p className="text-lg font-semibold text-white">{state.profile.gender}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
          <Globe className="h-6 w-6 text-[oklch(0.8_0.25_340)]" />
          <div>
            <p className="text-sm text-white/60">Nationality</p>
            <p className="text-lg font-semibold text-white">{state.profile.nationality}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
          <Calendar className="h-6 w-6 text-[oklch(0.8_0.25_340)]" />
          <div>
            <p className="text-sm text-white/60">Age</p>
            <p className="text-lg font-semibold text-white">{state.profile.age}</p>
          </div>
        </div>

        {state.profile.photoMediaId && (
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-white/60 mb-2">Profile Photo</p>
            <p className="text-sm text-[oklch(0.8_0.25_340)]">✓ Photo saved</p>
          </div>
        )}

        {state.profile.auditionAudioMediaId && (
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-white/60 mb-2">Audition Audio</p>
            <p className="text-sm text-[oklch(0.8_0.25_340)]">✓ Audio saved</p>
          </div>
        )}
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={handleContinue}
          size="lg"
          className="px-12 bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] hover:from-[oklch(0.85_0.25_340)] hover:to-[oklch(0.9_0.2_50)] text-white font-bold"
        >
          Choose Agency
        </Button>
      </div>
    </div>
  );
}
