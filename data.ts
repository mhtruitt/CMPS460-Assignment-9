import teamsData from './data/teams.json';
import { Team } from './types';

/**
 * Data layer. Right now it reads a bundled local JSON file, but it is
 * deliberately async so the screens already handle loading and error states.
 * To switch to a live API, only this function needs to change (see README).
 */
export async function loadTeams(): Promise<Team[]> {
  await new Promise((resolve) => setTimeout(resolve, 400)); // simulate latency
  return teamsData as unknown as Team[];
}
