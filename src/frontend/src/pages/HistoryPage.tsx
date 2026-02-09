import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp } from 'lucide-react';
import { useGameState } from '../game/state/useGameState';

export default function HistoryPage() {
  const navigate = useNavigate();
  const { state } = useGameState();

  const sortedSubmissions = [...state.submissions].sort((a, b) => b.timestamp - a.timestamp);

  const getPerformanceTypeColor = (type: string) => {
    switch (type) {
      case 'vocal':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'dance':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      case 'rap':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/50';
      case 'mixed':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)]">
          Performance History
        </h1>
        <p className="text-lg text-white/70">
          {sortedSubmissions.length} performance{sortedSubmissions.length !== 1 ? 's' : ''} recorded
        </p>
      </div>

      {sortedSubmissions.length === 0 ? (
        <Card className="p-12 bg-black/40 border-white/10 text-center space-y-4">
          <p className="text-xl text-white/60">No performances yet</p>
          <Button
            onClick={() => navigate({ to: '/submit-performance' })}
            className="bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] hover:from-[oklch(0.85_0.25_340)] hover:to-[oklch(0.9_0.2_50)] text-white"
          >
            Submit Your First Performance
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedSubmissions.map((submission) => (
            <Card
              key={submission.id}
              className="p-6 bg-black/40 border-white/10 hover:border-[oklch(0.8_0.25_340)]/50 transition-colors cursor-pointer"
              onClick={() => navigate({ to: `/results/${submission.id}` })}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge className={getPerformanceTypeColor(submission.performanceType)}>
                      {submission.performanceType.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="border-white/20 text-white/70">
                      {submission.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(submission.timestamp).toLocaleDateString()}
                    </div>
                    {submission.feedback && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Score: {submission.feedback.overallScore}
                      </div>
                    )}
                  </div>
                </div>

                {submission.feedback && (
                  <div className="text-right">
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)]">
                      {submission.feedback.overallScore}
                    </div>
                    <p className="text-xs text-white/60">Overall</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
