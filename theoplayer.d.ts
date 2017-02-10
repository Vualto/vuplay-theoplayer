declare namespace THEOplayer {
    export type PreloadOptions = "none" | "metadata" | "auto" | "none";

    export type ReadyStateOptions = 1 | 2 | 3 | 4;

    export type VolumeOptions = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.6 | 1
    
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
        textTracks: TextTracksList;
        videoHeight: number;
        videoTracks: MediaTrackList;
        videoWidth: number;
        volume: VolumeOptions;

        play(): void;
        pause(): void;
        setSource(sourceDescription: SourceDescription);
        stop(): void;
        

    }

}