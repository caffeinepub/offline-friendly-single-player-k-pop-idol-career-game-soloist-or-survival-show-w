import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Plus } from 'lucide-react';
import { useGameState } from '../game/state/useGameState';
import { PREDEFINED_AGENCIES } from '../game/agency/predefinedAgencies';
import { useGetAllAgencies, useCreateCustomAgency, useSelectPredefinedAgency } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { toast } from 'sonner';

export default function AgencySelectionPage() {
  const navigate = useNavigate();
  const { updateAgency } = useGameState();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const [mode, setMode] = useState<'select' | 'create'>('select');
  const [selectedAgency, setSelectedAgency] = useState<string | null>(null);
  const [customName, setCustomName] = useState('');
  const [customDescription, setCustomDescription] = useState('');

  const { data: backendAgencies } = useGetAllAgencies();
  const createCustomMutation = useCreateCustomAgency();
  const selectPredefinedMutation = useSelectPredefinedAgency();

  const allAgencies = isAuthenticated && backendAgencies ? backendAgencies : PREDEFINED_AGENCIES;

  const handleSelectAgency = async () => {
    if (!selectedAgency) return;

    const agency = allAgencies.find(a => a.name === selectedAgency);
    if (!agency) return;

    updateAgency({
      name: agency.name,
      description: agency.description,
      isCustom: false,
    });

    if (isAuthenticated) {
      try {
        await selectPredefinedMutation.mutateAsync(agency.name);
        toast.success('Agency synced to your account');
      } catch (err) {
        console.error('Failed to sync agency:', err);
      }
    }

    navigate({ to: '/career' });
  };

  const handleCreateAgency = async () => {
    if (!customName.trim()) {
      alert('Please enter an agency name');
      return;
    }

    updateAgency({
      name: customName,
      description: customDescription,
      isCustom: true,
    });

    if (isAuthenticated) {
      try {
        await createCustomMutation.mutateAsync({
          name: customName,
          description: customDescription,
        });
        toast.success('Custom agency synced to your account');
      } catch (err) {
        console.error('Failed to sync custom agency:', err);
      }
    }

    navigate({ to: '/career' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)]">
          Choose Your Agency
        </h1>
        <p className="text-lg text-white/70">
          Every star needs a home
        </p>
      </div>

      <div className="flex gap-4 justify-center">
        <Button
          onClick={() => setMode('select')}
          variant={mode === 'select' ? 'default' : 'outline'}
          className={
            mode === 'select'
              ? 'bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] text-white'
              : 'border-white/20 text-white hover:bg-white/10'
          }
        >
          <Building2 className="h-4 w-4 mr-2" />
          Choose Existing
        </Button>
        <Button
          onClick={() => setMode('create')}
          variant={mode === 'create' ? 'default' : 'outline'}
          className={
            mode === 'create'
              ? 'bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] text-white'
              : 'border-white/20 text-white hover:bg-white/10'
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Custom
        </Button>
      </div>

      {mode === 'select' ? (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {allAgencies.map((agency) => (
              <Card
                key={agency.name}
                className={`p-6 cursor-pointer transition-all ${
                  selectedAgency === agency.name
                    ? 'bg-gradient-to-br from-[oklch(0.8_0.25_340)]/20 to-[oklch(0.85_0.2_50)]/20 border-[oklch(0.8_0.25_340)]'
                    : 'bg-black/40 border-white/10 hover:border-white/30'
                }`}
                onClick={() => setSelectedAgency(agency.name)}
              >
                <h3 className="text-xl font-bold text-white mb-2">{agency.name}</h3>
                <p className="text-sm text-white/70">{agency.description}</p>
              </Card>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleSelectAgency}
              disabled={!selectedAgency || selectPredefinedMutation.isPending}
              size="lg"
              className="px-12 bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] hover:from-[oklch(0.85_0.25_340)] hover:to-[oklch(0.9_0.2_50)] text-white font-bold"
            >
              {selectPredefinedMutation.isPending ? 'Saving...' : 'Continue'}
            </Button>
          </div>
        </div>
      ) : (
        <Card className="p-8 bg-black/40 border-white/10 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="agency-name" className="text-white">Agency Name *</Label>
            <Input
              id="agency-name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="bg-black/40 border-white/20 text-white"
              placeholder="Enter agency name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agency-description" className="text-white">Description (Optional)</Label>
            <Textarea
              id="agency-description"
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              className="bg-black/40 border-white/20 text-white min-h-[100px]"
              placeholder="Describe your agency..."
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleCreateAgency}
              disabled={!customName.trim() || createCustomMutation.isPending}
              size="lg"
              className="px-12 bg-gradient-to-r from-[oklch(0.8_0.25_340)] to-[oklch(0.85_0.2_50)] hover:from-[oklch(0.85_0.25_340)] hover:to-[oklch(0.9_0.2_50)] text-white font-bold"
            >
              {createCustomMutation.isPending ? 'Creating...' : 'Create & Continue'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
