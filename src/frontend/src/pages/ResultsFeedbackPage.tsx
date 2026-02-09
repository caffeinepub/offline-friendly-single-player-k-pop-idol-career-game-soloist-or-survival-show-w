import { useNavigate, useParams } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Home, History } from 'lucide-react';
import { useGameState } from '../game/state/useGameState';

export default function ResultsFeedbackPage() {
  const navigate = useNavigate();
  const { submissionId } = useParams({ strict: false }) as { submissionId: string };
  const { state } = useGameState();

  const submission = state.submissions.find(s => s.id === submissionId);

  if (!submission || !submission.feedback) {
    navigate({ to: '/career' });
    return null;
  }

  const { feedback } = submission;
  const judgeAvatars = [
    '/assets/generated/judge-avatar-1.dim_512x512.png',
    '/assets/generated/judge-avatar-2.dim_512x512.png',
    '/assets/generated/judge-avatar-3.dim_512x512.png',
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)]">
          Judge Feedback
        </h1>
        <p className="text-lg text-white/70">
          Here's what our in-game judges think
        </p>
      </div>

      <Card className="p-8 bg-black/40 border-white/10 space-y-6">
        <div className="text-center space-y-4">
          <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)]">
            {feedback.overallScore}
          </div>
          <p className="text-xl text-white/80">Overall Score</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Technique</span>
              <span className="text-white font-semibold">{feedback.categoryScores.technique}</span>
            </div>
            <Progress value={feedback.categoryScores.technique} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Expression</span>
              <span className="text-white font-semibold">{feedback.categoryScores.expression}</span>
            </div>
            <Progress value={feedback.categoryScores.expression} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Stage Presence</span>
              <span className="text-white font-semibold">{feedback.categoryScores.stage_presence}</span>
            </div>
            <Progress value={feedback.categoryScores.stage_presence} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Creativity</span>
              <span className="text-white font-semibold">{feedback.categoryScores.creativity}</span>
            </div>
            <Progress value={feedback.categoryScores.creativity} className="h-2" />
          </div>
        </div>
      </Card>

      <Card className="p-8 bg-black/40 border-white/10 space-y-6">
        <h2 className="text-2xl font-bold text-white">Judge Panel</h2>
        <div className="flex justify-center gap-6">
          {judgeAvatars.map((avatar, idx) => (
            <div key={idx} className="text-center space-y-2">
              <img
                src={avatar}
                alt={feedback.judgePersonas[idx]}
                className="w-24 h-24 rounded-full border-2 border-[oklch(0.8_0.25_340)]"
              />
              <p className="text-sm text-white/80">{feedback.judgePersonas[idx]}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-8 bg-black/40 border-white/10 space-y-4">
        <h2 className="text-2xl font-bold text-white">Improvement Tips</h2>
        <p className="text-sm text-white/60 italic">
          These are fictional in-game coaching suggestions to help you practice and improve.
        </p>
        <ul className="space-y-3">
          {feedback.tips.map((tip, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="text-[oklch(0.8_0.25_340)] font-bold">{idx + 1}.</span>
              <span className="text-white/90">{tip}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button
          onClick={() => navigate({ to: '/career' })}
          size="lg"
          className="bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] hover:from-[oklch(0.85_0.25_340)] hover:to-[oklch(0.9_0.2_50)] text-white font-bold"
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Career
        </Button>
        <Button
          onClick={() => navigate({ to: '/history' })}
          variant="outline"
          size="lg"
          className="border-[oklch(0.8_0.25_340)] text-[oklch(0.8_0.25_340)] hover:bg-[oklch(0.8_0.25_340)]/10"
        >
          <History className="h-5 w-5 mr-2" />
          View History
        </Button>
      </div>
    </div>
  );
}
