import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Video, Upload, Square, Play } from 'lucide-react';
import { useVideoRecorder } from '../media/useVideoRecorder';
import { saveMedia } from '../media/indexedDbMediaStore';
import { toast } from 'sonner';

interface VideoCaptureOrUploadProps {
  onVideoCaptured: (mediaId: string) => void;
}

export default function VideoCaptureOrUpload({ onVideoCaptured }: VideoCaptureOrUploadProps) {
  const { isRecording, isSupported, error, startRecording, stopRecording, videoRef, previewUrl } = useVideoRecorder();
  const [savedVideoUrl, setSavedVideoUrl] = useState<string | null>(null);

  const handleStartRecording = async () => {
    await startRecording();
  };

  const handleStopRecording = async () => {
    const file = await stopRecording();
    if (file) {
      try {
        const mediaId = await saveMedia(file, 'video');
        setSavedVideoUrl(URL.createObjectURL(file));
        onVideoCaptured(mediaId);
        toast.success('Video saved locally on your device');
      } catch (err) {
        toast.error('Failed to save video');
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const mediaId = await saveMedia(file, 'video');
        setSavedVideoUrl(URL.createObjectURL(file));
        onVideoCaptured(mediaId);
        toast.success('Video uploaded and saved locally');
      } catch (err) {
        toast.error('Failed to upload video');
      }
    }
  };

  const displayUrl = savedVideoUrl || previewUrl;

  return (
    <Card className="p-6 bg-black/40 border-white/10">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Performance Video</h3>
          <p className="text-xs text-white/60">Stored on your device</p>
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          {isRecording || displayUrl ? (
            <video
              ref={displayUrl ? undefined : videoRef}
              src={displayUrl || undefined}
              controls={!!displayUrl}
              autoPlay={isRecording}
              playsInline
              muted={isRecording}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/40">
              <Play className="h-16 w-16" />
            </div>
          )}
        </div>

        <div className="flex gap-3">
          {isSupported && !displayUrl && (
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
                  <Video className="h-4 w-4 mr-2" />
                  Record Video
                </>
              )}
            </Button>
          )}

          {!isRecording && (
            <Button variant="outline" className="border-[oklch(0.8_0.25_340)] text-[oklch(0.8_0.25_340)] hover:bg-[oklch(0.8_0.25_340)]/10" asChild>
              <label>
                <Upload className="h-4 w-4 mr-2" />
                {displayUrl ? 'Change Video' : 'Upload Video'}
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
