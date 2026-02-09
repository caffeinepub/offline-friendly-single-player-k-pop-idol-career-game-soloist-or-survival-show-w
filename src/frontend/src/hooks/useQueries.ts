import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, Agency, AgencySelection } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetAllAgencies() {
  const { actor, isFetching } = useActor();

  return useQuery<Agency[]>({
    queryKey: ['agencies'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAgencies();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateCustomAgency() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, description }: { name: string; description: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createCustomAgency(name, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agencies'] });
      queryClient.invalidateQueries({ queryKey: ['agencySelection'] });
    },
  });
}

export function useSelectPredefinedAgency() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (agencyName: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.selectPredefinedAgency(agencyName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agencySelection'] });
    },
  });
}

export function useGetCallerAgencySelection() {
  const { actor, isFetching } = useActor();

  return useQuery<AgencySelection | null>({
    queryKey: ['agencySelection'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerAgencySelection();
    },
    enabled: !!actor && !isFetching,
  });
}
