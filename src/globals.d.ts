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
    mozRequestFullScreen(): void;
    webkitRequestFullscreen(): void;
    msRequestFullscreen(): void;
    exitFullscreen(): void;
    mozCancelFullScreen(): void;
    webkitExitFullscreen(): void;
    msExitFullscreen(): void;
}

declare interface Document extends Document {
    mozCancelFullScreen(): void;
    webkitExitFullscreen(): void;
    msExitFullscreen(): void;
}

declare type HoursMinutesSeconds = {
    h: number,
    m: number,
    s: number,
}