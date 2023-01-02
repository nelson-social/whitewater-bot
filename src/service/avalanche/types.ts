/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Area {
  bbox?: any;
  id: string;
  name: string;
}

export interface Media {
  images: any[];
}

export interface Owner {
  display: string;
  isExternal: boolean;
  url: string;
  value: string;
}

export interface Rating {
  display: string;
  value: string;
}

export interface Confidence {
  rating: Rating;
  statements: string[];
}

export interface Date {
  display: string;
  value: Date;
}

export interface Rating2 {
  display: string;
  value: string;
}

export interface Alp {
  display: string;
  rating: Rating2;
}

export interface Rating3 {
  display: string;
  value: string;
}

export interface Btl {
  display: string;
  rating: Rating3;
}

export interface Rating4 {
  display: string;
  value: string;
}

export interface Tln {
  display: string;
  rating: Rating4;
}

export interface Ratings {
  alp: Alp;
  btl: Btl;
  tln: Tln;
}

export interface DangerRating {
  date: Date;
  ratings: Ratings;
}

export interface Aspect {
  display: string;
  value: string;
}

export interface Elevation {
  display: string;
  value: string;
}

export interface ExpectedSize {
  max: string;
  min: string;
}

export interface Likelihood {
  display: string;
  value: string;
}

export interface Data {
  aspects: Aspect[];
  elevations: Elevation[];
  expectedSize: ExpectedSize;
  likelihood: Likelihood;
}

export interface Graphic {
  alt: string;
  id: string;
  url: string;
}

export interface Type {
  display: string;
  value: string;
}

export interface Factor {
  graphic: Graphic;
  type: Type;
}

export interface Type2 {
  display: string;
  value: string;
}

export interface Problem {
  comment: string;
  data: Data;
  factors: Factor[];
  type: Type2;
}

export interface Type3 {
  display: string;
  value: string;
}

export interface Summary {
  content: string;
  type: Type3;
}

export interface Report {
  comment?: any;
  confidence: Confidence;
  dangerRatings: DangerRating[];
  dateIssued: string;
  forecaster: string;
  highlights: string;
  id: string;
  isFullTranslation: boolean;
  message?: any;
  problems: Problem[];
  season?: any;
  summaries: Summary[];
  terrainAndTravelAdvice: string[];
  title: string;
  validUntil: string;
}

export interface AvalancheAPIResponse {
  area: Area;
  id: string;
  media: Media;
  owner: Owner;
  report: Report;
  slug: string;
  type: string;
  url: string;
  version: number;
}
