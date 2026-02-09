import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import VideoCaptureOrUpload from '../components/VideoCaptureOrUpload';
import { useGameState } from '../game/state/useGameState';
import { generateJudgeFeedback } from '../game/judging/judgeRules';
import type { SubmissionMetadata } from '../game/state/types';

export default function SubmitPerformancePage() {
  const navigate = useNavigate();
  const { addSubmission, updateSubmissionFeedback } = useGameState();

  const [performanceType, setPerformanceType] = useState<'vocal' | 'dance' | 'rap' | 'mixed'>('vocal');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [selfRating, setSelfRating] = useState([5]);
  const [videoMediaId, setVideoMediaId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!videoMediaId) {
      alert('Please record or upload a performance video');
      return;
    }

    const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const submission: SubmissionMetadata = {
      id: submissionId,
      timestamp: Date.now(),
      performanceType,
      difficulty,
      selfRating: selfRating[0],
      videoMediaId,
    };

    const feedback = generateJudgeFeedback(performanceType, difficulty, selfRating[0]);
    submission.feedback = feedback;

    addSubmission(submission);
    updateSubmissionFeedback(submissionId, feedback);

    navigate({ to: `/results/${submissionId}` });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)]">
          Submit Performance
        </h1>
        <p className="text-lg text-white/70">
          Show us what you've got!
        </p>
      </div>

      <Card className="p-8 bg-black/40 border-white/10 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="performance-type" className="text-white">Performance Type *</Label>
          <Select value={performanceType} onValueChange={(v: any) => setPerformanceType(v)}>
            <SelectTrigger id="performance-type" className="bg-black/40 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vocal">Vocal</SelectItem>
              <SelectItem value="dance">Dance</SelectItem>
              <SelectItem value="rap">Rap</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty" className="text-white">Difficulty *</Label>
          <Select value={difficulty} onValueChange={(v: any) => setDifficulty(v)}>
            <SelectTrigger id="difficulty" className="bg-black/40 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-white">Self-Rating: {selfRating[0]}/10</Label>
          <Slider
            value={selfRating}
            onValueChange={setSelfRating}
            min={1}
            max={10}
            step={1}
            className="py-4"
          />
          <p className="text-xs text-white/60">
            How confident are you in this performance?
          </p>
        </div>

        <div className="pt-4">
          <VideoCaptureOrUpload onVideoCaptured={setVideoMediaId} />
        </div>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={!videoMediaId}
          size="lg"
          className="px-12 bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] hover:from-[oklch(0.85_0.25_340)] hover:to-[oklch(0.9_0.2_50)] text-white font-bold"
        >
          Submit & Get Feedback
        </Button>
      </div>
    </div>
  );
}
