export type Conference = 'AFC' | 'NFC';

export interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
}

export interface Team {
  id: string;
  name: string;
  city: string;
  conference: Conference;
  players: Player[];
}

export type RootStackParamList = {
  TeamList: undefined;
  TeamDetail: { teamId: string };
};
