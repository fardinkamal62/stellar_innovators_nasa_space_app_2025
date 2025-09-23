export type PollutionLevel = 'none' | 'mild' | 'moderate' | 'heavy' | 'severe';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LightPollutionData {
  region: string;
  coordinates: Coordinates;
  pollutionLevel: PollutionLevel;
  value: number;
  suggestions: string[];
  trends: number[];
}
