import { useState, useRef, useCallback } from 'react';

interface UseVideoRecorderReturn {
  isRecording: boolean;
  isSupported: boolean;
  error: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<File | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  previewUrl: string | null;
}

export function useVideoRecorder(): UseVideoRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported] = useState(() => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia));
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = useCallback(async () => {
    if (!isSupported) {
      setError('Video recording is not supported in this browser');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: true 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      const mediaRecorder = new MediaRecorder(stream);
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setError(null);
    } catch (err) {
      setError('Failed to access camera/microphone');
      console.error('Video recording error:', err);
    }
  }, [isSupported]);

  const stopRecording = useCallback(async (): Promise<File | null> => {
    return new Promise((resolve) => {
      const mediaRecorder = mediaRecorderRef.current;
      
      if (!mediaRecorder || mediaRecorder.state === 'inactive') {
        resolve(null);
        return;
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const file = new File([blob], `video_${Date.now()}.webm`, { type: 'video/webm' });
        
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        
        setIsRecording(false);
        resolve(file);
      };

      mediaRecorder.stop();
    });
  }, []);

  return {
    isRecording,
    isSupported,
    error,
    startRecording,
    stopRecording,
    videoRef,
    previewUrl,
  };
}
