import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Team } from './types';
import { loadTeams } from './data';

type Status = 'loading' | 'error' | 'ready';

interface TeamsContextValue {
  teams: Team[];
  status: Status;
  error: string;
  reload: () => void;
}

const TeamsContext = createContext<TeamsContextValue | undefined>(undefined);

export function TeamsProvider({ children }: { children: React.ReactNode }) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    setStatus('loading');
    setError('');
    try {
      setTeams(await loadTeams());
      setStatus('ready');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <TeamsContext.Provider value={{ teams, status, error, reload }}>{children}</TeamsContext.Provider>
  );
}

export function useTeams() {
  const ctx = useContext(TeamsContext);
  if (!ctx) throw new Error('useTeams must be used inside TeamsProvider');
  return ctx;
}
