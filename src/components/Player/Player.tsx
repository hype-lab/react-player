import React, { FC, ChangeEvent } from 'react';
import useVideoPlayer from '../../hooks/useVideoPlayer';

import styles from './Player.css' assert { type: 'css' };

document.adoptedStyleSheets = [styles];

const v = "https://file-examples.com/storage/fef1706276640fa2f99a5a4/2017/04/file_example_MP4_1280_10MG.mp4";

// #region class component
// type PlayerPropz = {
//   ComponentName?: string
// };

// type PlayerState = {
//   isPlaying: boolean,
//   progress: number,
//   speed: number,
//   isMuted: boolean,
// };

// class Player extends React.PureComponent<PlayerPropz, PlayerState> {
//   declare private textInput: HTMLVideoElement | null;
//   declare private setTextInputRef: (element: HTMLVideoElement) => void;
//   declare public static defaultProps: PlayerPropz;

//   constructor(props: PlayerPropz) {
//     super(props);

//     this.state = {
//       isPlaying: false,
//       progress: 0,
//       speed: 1,
//       isMuted: false,
//     }

//     this.textInput = null;

//     this.setTextInputRef = (element: HTMLVideoElement) => {
//       this.textInput = element;
//     }

//     this.togglePlay = this.togglePlay.bind(this);
//     this.handleOnTimeUpdate = this.handleOnTimeUpdate.bind(this);
//     this.handleVideoProgress = this.handleVideoProgress.bind(this);
//     this.handleVideoSpeed = this.handleVideoSpeed.bind(this);
//     this.toggleMute = this.toggleMute.bind(this);
//   }

//   componentDidMount(): void {
//     const { ...state } = this.state;
//     if (this.textInput) {
//       state.isPlaying
//         ? this.textInput.play()
//         : this.textInput.pause();

//       state.isMuted
//         ? (this.textInput.muted = true)
//         : (this.textInput.muted = false);
//     }
//   }

//   componentDidUpdate(prevProps: Readonly<PlayerPropz>, prevState: Readonly<PlayerState>, snapshot?: any): void {
//     const { ...state } = this.state;
//     if (this.textInput && state.isPlaying != prevState.isPlaying) {
//       state.isPlaying
//         ? this.textInput.play()
//         : this.textInput.pause();
//     }

//     if (this.textInput && state.isMuted != prevState.isMuted) {
//       state.isMuted
//         ? (this.textInput.muted = true)
//         : (this.textInput.muted = false);
//     }
//   }

//   togglePlay() {
//     this.setState({ isPlaying: !this.state.isPlaying });
//   }

//   handleOnTimeUpdate() {
//     if (this.textInput) {
//       const progress = (this.textInput.currentTime / this.textInput.duration) * 100;
//       this.setState({ progress });
//     }
//   };

//   handleVideoProgress(event: ChangeEvent<HTMLInputElement>) {
//     if (this.textInput) {
//         const manualChange = Number(event.target.value);
//         this.textInput.currentTime = (this.textInput.duration / 100) * manualChange;
//         this.setState({ progress: manualChange });
//     }
//   };

//   handleVideoSpeed(event: ChangeEvent<HTMLSelectElement>) {
//       const speed = Number(event.target.value);
//       if (this.textInput) {
//         this.textInput.playbackRate = speed;
//         this.setState({ speed });
//       }
//   };

//   toggleMute() {
//     this.setState({ isMuted: !this.state.isMuted });
//   };

//   render() {
//     const { ...state } = this.state;
//     return (
//         <div className="container">
//           <div className="video-wrapper">
//             <video
//               src={v}
//               ref={(element: HTMLVideoElement) => this.setTextInputRef(element)}
//               onTimeUpdate={() => this.handleOnTimeUpdate()}
//             />
//             <div className="controls">
//               <div className="actions">
//                 <button onClick={() => this.togglePlay()}>
//                   {!state.isPlaying ? (
//                     <i className="bx bx-play"></i>
//                   ) : (
//                     <i className="bx bx-pause"></i>
//                   )}
//                 </button>
//               </div>
//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 value={state.progress}
//                 onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleVideoProgress(e)}
//               />
//               <select
//                 className="velocity"
//                 value={state.speed}
//                 onChange={(e: ChangeEvent<HTMLSelectElement>) => this.handleVideoSpeed(e)}
//               >
//                 <option value="0.50">0.50x</option>
//                 <option value="1">1x</option>
//                 <option value="1.25">1.25x</option>
//                 <option value="2">2x</option>
//               </select>
//               <button className="mute-btn" onClick={() => this.toggleMute()}>
//                 {!state.isMuted ? (
//                   <i className="bx bxs-volume-full"></i>
//                 ) : (
//                   <i className="bx bxs-volume-mute"></i>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//     );
//   }
// };

// Player.defaultProps = {
//   ComponentName: 'Player'
// };
// #region class component

const Player: FC = () => {
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    ref
  } = useVideoPlayer();
  return (
    <div className="container">
      <div className="video-wrapper">
        <video
          src={v}
          ref={ref}
          onTimeUpdate={handleOnTimeUpdate}
        />
        <div className="controls">
          <div className="actions">
            <button onClick={togglePlay}>
              {!playerState.isPlaying ? (
                <i className="bx bx-play"></i>
              ) : (
                <i className="bx bx-pause"></i>
              )}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleVideoProgress(e)}
          />
          <select
            className="velocity"
            value={playerState.speed}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleVideoSpeed(e)}
          >
            <option value="0.50">0.50x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="2">2x</option>
          </select>
          <button className="mute-btn" onClick={toggleMute}>
            {!playerState.isMuted ? (
              <i className="bx bxs-volume-full"></i>
            ) : (
              <i className="bx bxs-volume-mute"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;