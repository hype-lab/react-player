declare module '\*.css';

declare module '\*.mp4' {
    const src: string;
    export default src;
}

declare module '\*.svg' {
    import React = require('react');
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}

declare interface Element extends Element {
    mozRequestFullScreen(): Promise<void>;
    webkitRequestFullscreen(): Promise<void>;
    msRequestFullscreen(): Promise<void>;
}

declare interface Document extends Document {
    mozCancelFullScreen(): Promise<void>;
    webkitExitFullscreen(): Promise<void>;
    msExitFullscreen(): Promise<void>;
}

declare type HoursMinutesSeconds = {
    h: number,
    m: number,
    s: number,
}

declare type HoursMinutesSecondsStrings = {
    h: string,
    m: string,
    s: string,
}