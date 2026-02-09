import { useState, useRef, useCallback } from 'react';

interface UseAudioRecorderReturn {
  isRecording: boolean;
  isSupported: boolean;
  error: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<File | null>;
  audioUrl: string | null;
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported] = useState(() => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia));
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    if (!isSupported) {
      setError('Audio recording is not supported in this browser');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
      setError('Failed to access microphone');
      console.error('Audio recording error:', err);
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
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const file = new File([blob], `audio_${Date.now()}.webm`, { type: 'audio/webm' });
        
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
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
    audioUrl,
  };
}
