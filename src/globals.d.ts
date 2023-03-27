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