import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, Upload, Square, Play, Pause } from 'lucide-react';
import { useAudioRecorder } from '../media/useAudioRecorder';
import { saveMedia } from '../media/indexedDbMediaStore';
import { toast } from 'sonner';

interface AudioCaptureOrImportProps {
  onAudioCaptured: (mediaId: string) => void;
}

export default function AudioCaptureOrImport({ onAudioCaptured }: AudioCaptureOrImportProps) {
  const { isRecording, isSupported, error, startRecording, stopRecording, audioUrl } = useAudioRecorder();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const handleStartRecording = async () => {
    await startRecording();
  };

  const handleStopRecording = async () => {
    const file = await stopRecording();
    if (file) {
      try {
        const mediaId = await saveMedia(file, 'audio');
        onAudioCaptured(mediaId);
        toast.success('Audio saved locally on your device');
      } catch (err) {
        toast.error('Failed to save audio');
      }
    }
  };

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const mediaId = await saveMedia(file, 'audio');
        onAudioCaptured(mediaId);
        toast.success('Audio imported and saved locally');
      } catch (err) {
        toast.error('Failed to import audio');
      }
    }
  };

  const togglePlayback = () => {
    if (!audioUrl) return;
    
    if (!audioElement) {
      const audio = new Audio(audioUrl);
      audio.onended = () => setIsPlaying(false);
      setAudioElement(audio);
      audio.play();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <Card className="p-6 bg-black/40 border-white/10">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Audio Recording</h3>
          <p className="text-xs text-white/60">Stored on your device</p>
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          {isSupported && (
            <Button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] hover:from-[oklch(0.85_0.25_340)] hover:to-[oklch(0.9_0.2_50)] text-white'
              }
            >
              {isRecording ? (
                <>
                  <Square className="h-4 w-4 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4 mr-2" />
                  Record Audio
                </>
              )}
            </Button>
          )}

          <Button variant="outline" className="border-[oklch(0.8_0.25_340)] text-[oklch(0.8_0.25_340)] hover:bg-[oklch(0.8_0.25_340)]/10" asChild>
            <label>
              <Upload className="h-4 w-4 mr-2" />
              Import File
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>
          </Button>
        </div>

        {audioUrl && (
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <Button
              size="icon"
              variant="ghost"
              onClick={togglePlayback}
              className="text-[oklch(0.8_0.25_340)] hover:bg-[oklch(0.8_0.25_340)]/10"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <span className="text-sm text-white/80">Audio preview available</span>
          </div>
        )}
      </div>
    </Card>
  );
}
