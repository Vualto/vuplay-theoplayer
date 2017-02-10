declare namespace THEOplayer {
    var version: string;

    export type PreloadOptions = "none" | "metadata" | "auto" | "none";

    export type ReadyStateOptions = 1 | 2 | 3 | 4;

    export type VolumeOptions = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.6 | 1;

    export type SourcesOptions = string | string[] | TypedSource | TypedSource[];

    export type TextTrackKinds = "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";

    export type TextTrackModes = "disabled" | "hidden" | "showing";

    export type TextTrackTypes = "emsg" | "eventstream" | "srt" | "ttml" | "webvtt";

    export type MediaTrack = AudioTrack | VideoTrack;

    export class Player {
        constructor(domElement: HTMLElement);
        
        audioTracks: MediaTrackList;
        autoplay: boolean;
        buffered: TimeRanges;
        currentProgramDateTime: Date;
        currentTime: number;
        duration: number;
        ended: boolean;
        error: MediaError;
        source: SourceDescription;
        src: string;
        muted: boolean;
        paused: boolean;
        playbackRate: number;
        played: TimeRanges;
        preload: PreloadOptions;
        readyState: ReadyStateOptions;
        seekable: TimeRanges;
        seeking; boolean;
        textTracks: TextTrackList;
        videoHeight: number;
        videoTracks: MediaTrackList;
        videoWidth: number;
        volume: VolumeOptions;

        play(): void;
        pause(): void;
        setSource(sourceDescription: SourceDescription);
        stop(): void;
        addEventListener(type: string, listener: EventListener);
        removeEventListener(type: string, listener: EventListener);
    }

    export class SourceDescription {
        ads: AdDescription[];
        sources: SourcesOptions;
        textTracks: TextTrackDescription[]
    }

    export class TypedSource {
        src: string;
        type: string;
        drm: DRMDescription;
    }

    export class AdDescription {
        sources: string;
        integration: string;
    }

    export class DRMDescription {
        playready: LicenseAcquisitionDescription;
        widevine: LicenseAcquisitionDescription;
    }

    export class LicenseAcquisitionDescription {
        licenseAcquisitionURL: string;
        headers: {[key: string]: string };
        useCredentials: boolean;
    }

    export class TextTrackDescription {
        label: string;
        src: string;
        srclang: string;
    }

    export class TextrackList {
        length: number;
        [n: number]: TextTrack;

        item(n: number): TextTrack;
        addEventListener(type: string, listener: EventListener);
    }

    export class TextTrack {
        activeCues: TextTrackCueList;
        cues: TextTrackCueList;
        id: string;
        kind: TextTrackKinds;
        label: string;
        language: string;
        mode: TextTrackModes;
        type: TextTrackTypes;
    
        addEventListener(type: string, listener: EventListener);
        removeEventListener(type: string, listener: EventListener);
    }

    export class MediaTrackList {
        length: number;
        [n: number]: MediaTrack;
        
        item(n: number): MediaTrack;
        addEventListener(type: string, listener: EventListener);
        removeEventListener(type: string, listener: EventListener);
    }

    export class AudioTrack {
        archiveQuality: AudioQuality;
        enabled: boolean;
        id: string;
        kind: string;
        label: string;
        targetQuality: AudioQuality;
        language: string;
        qualities: AudioQuality;

        addEventListener(type: string, listener: EventListener);
        removeEventListener(type: string, listener: EventListener);
    }

    export class AudioQuality {
        audioSamplingRate: number;
        bandwidth: number;
        codecs: string;
        id: string;
        name: string;
    }

    export class VideoTrack {
        archiveQuality: VideoQuality;
        enabled: boolean;
        id: string;
        kind: string;
        label: string;
        targetQuality: VideoQuality;
        language: string;
        qualities: VideoQuality;

        addEventListener(type: string, listener: EventListener);
        removeEventListener(type: string, listener: EventListener);
    }

    export class VideoQuality {
        bandwidth: number;
        codecs: string;
        frameRate: number;
        height: number;
        id: string;
        name: string;
        width: number;
    }
}