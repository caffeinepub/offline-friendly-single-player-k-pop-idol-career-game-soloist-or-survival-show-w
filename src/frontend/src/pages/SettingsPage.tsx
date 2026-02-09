import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Cloud, Info } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGameState } from '../game/state/useGameState';
import { exportLightweightProgress } from '../game/state/storage';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { identity } = useInternetIdentity();
  const { state } = useGameState();
  const isAuthenticated = !!identity;

  const handleExportProgress = () => {
    const progress = exportLightweightProgress(state);
    console.log('Exportable progress:', progress);
    toast.success('Progress data logged to console');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)]">
          Settings
        </h1>
        <p className="text-lg text-white/70">
          Manage your game data
        </p>
      </div>

      <Card className="p-8 bg-black/40 border-white/10 space-y-6">
        <div className="flex items-start gap-4">
          <Database className="h-6 w-6 text-[oklch(0.8_0.25_340)] mt-1" />
          <div className="flex-1 space-y-2">
            <h2 className="text-xl font-bold text-white">Local Storage</h2>
            <p className="text-white/70">
              All your media (photos, audio, videos) is stored locally on your device using IndexedDB.
              Your game progress is saved in browser localStorage. This data never leaves your device
              unless you explicitly sync it.
            </p>
            <div className="pt-2 space-y-1 text-sm text-white/60">
              <p>• Profile: {state.profile ? '✓ Saved' : '✗ Not set'}</p>
              <p>• Agency: {state.agency ? '✓ Saved' : '✗ Not set'}</p>
              <p>• Performances: {state.submissions.length} recorded</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 bg-black/40 border-white/10 space-y-6">
        <div className="flex items-start gap-4">
          <Cloud className="h-6 w-6 text-[oklch(0.8_0.25_340)] mt-1" />
          <div className="flex-1 space-y-2">
            <h2 className="text-xl font-bold text-white">Cloud Sync (Optional)</h2>
            <p className="text-white/70">
              {isAuthenticated
                ? 'You are signed in. Only lightweight text data (profile, agency, progress metadata) can be synced to your account. Media files always remain local-only.'
                : 'Sign in to optionally sync your lightweight progress data across sessions. Media files will always remain stored locally on your device.'}
            </p>
            {isAuthenticated && (
              <Button
                onClick={handleExportProgress}
                variant="outline"
                className="mt-4 border-[oklch(0.8_0.25_340)] text-[oklch(0.8_0.25_340)] hover:bg-[oklch(0.8_0.25_340)]/10"
              >
                View Syncable Data
              </Button>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-8 bg-black/40 border-white/10 space-y-6">
        <div className="flex items-start gap-4">
          <Info className="h-6 w-6 text-[oklch(0.8_0.25_340)] mt-1" />
          <div className="flex-1 space-y-2">
            <h2 className="text-xl font-bold text-white">About Judge Feedback</h2>
            <p className="text-white/70">
              The judges in this game are fictional characters providing scripted coaching feedback.
              Their evaluations are based on your self-ratings and performance settings, not actual
              analysis of your media content. Use their tips as practice guidance and motivation!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
