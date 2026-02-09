import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGameState } from '../game/state/useGameState';
import PhotoCaptureOrUpload from '../components/PhotoCaptureOrUpload';
import AudioCaptureOrImport from '../components/AudioCaptureOrImport';

const GENDERS = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];
const NATIONALITIES = [
  'Korean', 'Japanese', 'Chinese', 'American', 'British', 'Canadian',
  'Australian', 'Thai', 'Vietnamese', 'Filipino', 'Indonesian', 'Malaysian',
  'Indian', 'Brazilian', 'Mexican', 'French', 'German', 'Italian', 'Spanish', 'Other'
];

export default function CharacterSetupPage() {
  const navigate = useNavigate();
  const { updateProfile } = useGameState();
  
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [age, setAge] = useState('');
  const [photoMediaId, setPhotoMediaId] = useState<string | undefined>();
  const [audioMediaId, setAudioMediaId] = useState<string | undefined>();

  const handleSubmit = () => {
    const ageNum = parseInt(age);
    
    if (!gender || !nationality || !age || ageNum < 13 || ageNum > 99) {
      alert('Please fill in all required fields with valid values (age 13-99)');
      return;
    }

    updateProfile({
      gender,
      nationality,
      age: ageNum,
      photoMediaId,
      auditionAudioMediaId: audioMediaId,
    });

    navigate({ to: '/profile-summary' });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)]">
          Create Your Character
        </h1>
        <p className="text-lg text-white/70">
          Tell us about your idol persona
        </p>
      </div>

      <Card className="p-8 bg-black/40 border-white/10 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-white">Gender *</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger id="gender" className="bg-black/40 border-white/20 text-white">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {GENDERS.map(g => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationality" className="text-white">Nationality *</Label>
          <Select value={nationality} onValueChange={setNationality}>
            <SelectTrigger id="nationality" className="bg-black/40 border-white/20 text-white">
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              {NATIONALITIES.map(n => (
                <SelectItem key={n} value={n}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="age" className="text-white">Age * (13-99)</Label>
          <Input
            id="age"
            type="number"
            min="13"
            max="99"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="bg-black/40 border-white/20 text-white"
            placeholder="Enter your age"
          />
        </div>

        <div className="pt-4 space-y-6">
          <PhotoCaptureOrUpload onPhotoCaptured={setPhotoMediaId} />
          <AudioCaptureOrImport onAudioCaptured={setAudioMediaId} />
        </div>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          size="lg"
          className="px-12 bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] hover:from-[oklch(0.85_0.25_340)] hover:to-[oklch(0.9_0.2_50)] text-white font-bold"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
