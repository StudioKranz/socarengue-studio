export type Visibility = "private" | "review" | "public" | "hidden";

export type ContentStatus =
  | "draft"
  | "in_review"
  | "canonical"
  | "scheduled"
  | "published"
  | "archived";

export interface BaseRecord {
  id: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  logline: string;
  description: string;
  tone: string[];
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Issue extends BaseRecord {
  title: string;
  slug: string;
  issueNumber: number;
  summary: string;
  status: ContentStatus;
  visibility: Visibility;
  coverMediaId?: string;
  sceneIds: string[];
}

export interface Scene extends BaseRecord {
  issueId: string;
  title: string;
  slug: string;
  sequenceIndex: number;
  summary: string;
  scriptText: string;
  visualNotes: string;
  emotionalBeat: string;
  status: ContentStatus;
  visibility: Visibility;
  characterIds: string[];
  artifactIds: string[];
  mediaAssetIds: string[];
  soundtrackCueIds: string[];
}

export interface Character extends BaseRecord {
  name: string;
  slug: string;
  publicDescription: string;
  privateNotes?: string;
  roleInStory: string;
  resonanceProfile: string;
  portraitMediaId?: string;
  status: ContentStatus;
  visibility: Visibility;
}

export type LoreCategory =
  | "place"
  | "faction"
  | "symbol"
  | "event"
  | "myth"
  | "technology"
  | "ritual"
  | "object"
  | "phrase"
  | "timeline";

export interface LoreEntry extends BaseRecord {
  title: string;
  slug: string;
  category: LoreCategory;
  publicText: string;
  privateNotes?: string;
  canonicalStatus: ContentStatus;
  visibility: Visibility;
}

export interface Artifact extends BaseRecord {
  title: string;
  slug: string;
  classification: string;
  publicDescription: string;
  privateNotes?: string;
  transcript?: string;
  primaryMediaId?: string;
  linkedSceneIds: string[];
  linkedLoreIds: string[];
  linkedTrackIds: string[];
  status: ContentStatus;
  visibility: Visibility;
}

export type MediaAssetType =
  | "image"
  | "audio"
  | "video"
  | "document"
  | "reference"
  | "cover"
  | "panel"
  | "loop"
  | "storyboard"
  | "frame"
  | "concept";

export interface MediaAsset extends BaseRecord {
  title: string;
  type: MediaAssetType;
  source: string;
  credit: string;
  rightsStatus: string;
  altText?: string;
  transcript?: string;
  durationSeconds?: number;
  status: ContentStatus;
  visibility: Visibility;
}

export interface Track extends BaseRecord {
  title: string;
  slug: string;
  artist: string;
  durationSeconds?: number;
  coverMediaId?: string;
  audioMediaId?: string;
  moodTags: string[];
  publicNotes: string;
  privateNotes?: string;
  status: ContentStatus;
  visibility: Visibility;
}

export interface SoundtrackCue extends BaseRecord {
  trackId: string;
  targetType: "scene" | "artifact" | "issue" | "release";
  targetId: string;
  cueLabel: string;
  sequenceIndex: number;
  startAtSeconds?: number;
  endAtSeconds?: number;
  instruction: string;
  mood: string;
  required: false;
}

export interface Release extends BaseRecord {
  title: string;
  slug: string;
  releaseType: "issue" | "chapter" | "transmission" | "dossier" | "soundtrack" | "collection";
  summary: string;
  status: ContentStatus;
  visibility: Visibility;
  publishedAt?: string;
  coverMediaId?: string;
}

export interface ReleaseItem {
  id: string;
  releaseId: string;
  itemType: "issue" | "scene" | "artifact" | "track" | "lore";
  itemId: string;
  sequenceIndex: number;
  presentationMode: "reader" | "artifact" | "track" | "dossier" | "interlude" | "note";
  publicNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Relationship extends BaseRecord {
  fromType: "issue" | "scene" | "character" | "lore" | "artifact" | "media" | "track" | "release";
  fromId: string;
  toType: "issue" | "scene" | "character" | "lore" | "artifact" | "media" | "track" | "release";
  toId: string;
  relationshipType:
    | "appears_in"
    | "references"
    | "reveals"
    | "contradicts"
    | "foreshadows"
    | "belongs_to"
    | "derived_from"
    | "soundtracks"
    | "depicts"
    | "unlocks";
  publicLabel: string;
  privateNote?: string;
  visibility: Visibility;
}

export interface Note extends BaseRecord {
  targetType: "issue" | "scene" | "character" | "lore" | "artifact" | "media" | "track" | "release";
  targetId: string;
  body: string;
  status: ContentStatus;
  visibility: Visibility;
}

export interface SocarengueSeedData {
  project: Project;
  issues: Issue[];
  scenes: Scene[];
  characters: Character[];
  loreEntries: LoreEntry[];
  artifacts: Artifact[];
  mediaAssets: MediaAsset[];
  tracks: Track[];
  soundtrackCues: SoundtrackCue[];
  releases: Release[];
  releaseItems: ReleaseItem[];
  relationships: Relationship[];
  notes: Note[];
}
