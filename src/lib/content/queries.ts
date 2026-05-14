import { developmentVaultSpecs, issueOnePreviewPageSpecs, socarengueSeed } from "@/lib/seed/socarengue";
import type {
  Artifact,
  Character,
  Issue,
  LoreEntry,
  MediaAsset,
  Release,
  Scene,
  SoundtrackCue,
  Track,
} from "@/types/content";

const openingExhibitArtifactIds = [
  "artifact_ovi_issue_artwork",
  ...issueOnePreviewPageSpecs.map((page) => page.artifactId),
];

const developmentVaultArtifactIds = developmentVaultSpecs.map((item) => item.artifactId);

export function getProject() {
  return socarengueSeed.project;
}

export function getPrimaryIssue(): Issue {
  return socarengueSeed.issues[0];
}

export function getIssueBySlug(slug: string): Issue | undefined {
  return socarengueSeed.issues.find((issue) => issue.slug === slug);
}

export function getPrimaryRelease(): Release {
  return socarengueSeed.releases[0];
}

export function getIntakeReferenceData() {
  return {
    issues: socarengueSeed.issues,
    scenes: socarengueSeed.scenes,
    loreEntries: socarengueSeed.loreEntries,
    tracks: socarengueSeed.tracks,
  };
}

export function getScenesForIssue(issueId: string): Scene[] {
  return socarengueSeed.scenes
    .filter((scene) => scene.issueId === issueId)
    .sort((a, b) => a.sequenceIndex - b.sequenceIndex);
}

export function getSceneBySlug(slug: string): Scene | undefined {
  return socarengueSeed.scenes.find((scene) => scene.slug === slug);
}

export function getSceneById(id: string): Scene | undefined {
  return socarengueSeed.scenes.find((scene) => scene.id === id);
}

export function getPublicArtifacts(): Artifact[] {
  return [...openingExhibitArtifactIds, ...developmentVaultArtifactIds]
    .map((id) => socarengueSeed.artifacts.find((artifact) => artifact.id === id))
    .filter((artifact): artifact is Artifact => Boolean(artifact));
}

export function getOpeningExhibitArtifacts(): Artifact[] {
  return openingExhibitArtifactIds
    .map((id) => socarengueSeed.artifacts.find((artifact) => artifact.id === id))
    .filter((artifact): artifact is Artifact => Boolean(artifact));
}

export function getDevelopmentVaultArtifacts(): Artifact[] {
  return developmentVaultArtifactIds
    .map((id) => socarengueSeed.artifacts.find((artifact) => artifact.id === id))
    .filter((artifact): artifact is Artifact => Boolean(artifact));
}

export function getArtifactBySlug(slug: string): Artifact | undefined {
  return socarengueSeed.artifacts.find((artifact) => artifact.slug === slug);
}

export function getArtifactsByIds(ids: string[]): Artifact[] {
  return ids
    .map((id) => socarengueSeed.artifacts.find((artifact) => artifact.id === id))
    .filter((artifact): artifact is Artifact => Boolean(artifact));
}

export function getCharactersByIds(ids: string[]): Character[] {
  return ids
    .map((id) => socarengueSeed.characters.find((character) => character.id === id))
    .filter((character): character is Character => Boolean(character));
}

export function getLoreByIds(ids: string[]): LoreEntry[] {
  return ids
    .map((id) => socarengueSeed.loreEntries.find((entry) => entry.id === id))
    .filter((entry): entry is LoreEntry => Boolean(entry));
}

export function getMediaByIds(ids: string[]): MediaAsset[] {
  return ids
    .map((id) => socarengueSeed.mediaAssets.find((asset) => asset.id === id))
    .filter((asset): asset is MediaAsset => Boolean(asset));
}

export function getMediaById(id?: string): MediaAsset | undefined {
  if (!id) {
    return undefined;
  }

  return socarengueSeed.mediaAssets.find((asset) => asset.id === id);
}

export function getIssueOnePreviewPages(): Array<{ artifact: Artifact; media: MediaAsset; label: string }> {
  const pages: Array<{ artifact: Artifact; media: MediaAsset; label: string }> = [];

  for (const page of issueOnePreviewPageSpecs) {
    const artifact = socarengueSeed.artifacts.find((item) => item.id === page.artifactId);
    const media = socarengueSeed.mediaAssets.find((item) => item.id === page.mediaId);

    if (artifact && media) {
      pages.push({
        artifact,
        media,
        label: page.label,
      });
    }
  }

  return pages;
}

export function getScenesByIds(ids: string[]): Scene[] {
  return ids
    .map((id) => socarengueSeed.scenes.find((scene) => scene.id === id))
    .filter((scene): scene is Scene => Boolean(scene))
    .sort((a, b) => a.sequenceIndex - b.sequenceIndex);
}

export function getTracksByIds(ids: string[]): Track[] {
  return ids
    .map((id) => socarengueSeed.tracks.find((track) => track.id === id))
    .filter((track): track is Track => Boolean(track));
}

export function getSoundtrackCuesByIds(ids: string[]): Array<SoundtrackCue & { track: Track }> {
  return ids
    .map((id) => {
      const cue = socarengueSeed.soundtrackCues.find((item) => item.id === id);
      if (!cue) {
        return undefined;
      }

      const track = socarengueSeed.tracks.find((item) => item.id === cue.trackId);
      if (!track) {
        return undefined;
      }

      return { ...cue, track };
    })
    .filter((cue): cue is SoundtrackCue & { track: Track } => Boolean(cue))
    .sort((a, b) => a.sequenceIndex - b.sequenceIndex);
}

export function getStudioOverview() {
  const issue = getPrimaryIssue();
  const scenes = getScenesForIssue(issue.id);

  return {
    project: getProject(),
    release: getPrimaryRelease(),
    issue,
    scenes,
    characters: socarengueSeed.characters,
    loreEntries: socarengueSeed.loreEntries,
    artifacts: socarengueSeed.artifacts,
    mediaAssets: socarengueSeed.mediaAssets,
    tracks: socarengueSeed.tracks,
    soundtrackCues: socarengueSeed.soundtrackCues,
    relationships: socarengueSeed.relationships,
  };
}
