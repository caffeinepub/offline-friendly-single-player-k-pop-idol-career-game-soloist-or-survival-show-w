import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Upload, X } from 'lucide-react';
import { useCamera } from '../camera/useCamera';
import { saveMedia } from '../media/indexedDbMediaStore';
import { toast } from 'sonner';

interface PhotoCaptureOrUploadProps {
  onPhotoCaptured: (mediaId: string) => void;
}

export default function PhotoCaptureOrUpload({ onPhotoCaptured }: PhotoCaptureOrUploadProps) {
  const [showCamera, setShowCamera] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const {
    isActive,
    isSupported,
    error,
    isLoading,
    startCamera,
    stopCamera,
    capturePhoto,
    videoRef,
    canvasRef,
  } = useCamera({ facingMode: 'user' });

  const handleStartCamera = async () => {
    setShowCamera(true);
    const success = await startCamera();
    if (!success) {
      setShowCamera(false);
    }
  };

  const handleCapturePhoto = async () => {
    const file = await capturePhoto();
    if (file) {
      try {
        const mediaId = await saveMedia(file, 'photo');
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        onPhotoCaptured(mediaId);
        await stopCamera();
        setShowCamera(false);
        toast.success('Photo saved locally on your device');
      } catch (err) {
        toast.error('Failed to save photo');
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const mediaId = await saveMedia(file, 'photo');
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        onPhotoCaptured(mediaId);
        toast.success('Photo uploaded and saved locally');
      } catch (err) {
        toast.error('Failed to upload photo');
      }
    }
  };

  const handleCloseCamera = async () => {
    await stopCamera();
    setShowCamera(false);
  };

  return (
    <Card className="p-6 bg-black/40 border-white/10">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Profile Photo</h3>
          <p className="text-xs text-white/60">Stored on your device</p>
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg">
            {error.message}
          </div>
        )}

        {!showCamera && !previewUrl && (
          <div className="flex gap-3">
            {isSupported && (
              <Button
                onClick={handleStartCamera}
                disabled={isLoading}
                className="bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] hover:from-[oklch(0.85_0.25_340)] hover:to-[oklch(0.9_0.2_50)] text-white"
              >
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
            )}

            <Button variant="outline" className="border-[oklch(0.8_0.25_340)] text-[oklch(0.8_0.25_340)] hover:bg-[oklch(0.8_0.25_340)]/10" asChild>
              <label>
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </Button>
          </div>
        )}

        {showCamera && (
          <div className="space-y-3">
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleCapturePhoto}
                disabled={!isActive || isLoading}
                className="flex-1 bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] hover:from-[oklch(0.85_0.25_340)] hover:to-[oklch(0.9_0.2_50)] text-white"
              >
                <Camera className="h-4 w-4 mr-2" />
                Capture
              </Button>
              <Button
                onClick={handleCloseCamera}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        )}

        {previewUrl && (
          <div className="space-y-3">
            <img
              src={previewUrl}
              alt="Profile preview"
              className="w-full aspect-video object-cover rounded-lg"
            />
            <Button
              onClick={() => setPreviewUrl(null)}
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Change Photo
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
