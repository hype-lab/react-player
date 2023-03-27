import React, { FC, ChangeEvent, CSSProperties } from 'react';
import useVideoPlayer from '../../hooks/useVideoPlayer';

import styles from './Player.css' assert { type: 'css' };

import BtnPlay from './assets/btn_play.svg';
import BtnPause from './assets/btn_pause.svg';
import BtnMute from './assets/btn_mute.svg';
import BtnUnmute from './assets/btn_unmute.svg';

document.adoptedStyleSheets = [styles];

const defaultProps: PlayerProps = {
  autoPlay: true,
};

const Player: FC<PlayerProps> = function Player({ ...props }: PlayerProps) {
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleFullScreen,
    handleVideoSpeed,
    handleVolumeBar,
    handleVideoProgressClick,
    toggleMute,
    ref,
    wrapperRef
  } = useVideoPlayer();

  return (
    <div id="hl_player">
      <div ref={wrapperRef} className="video-wrapper">
        <video
          autoPlay={props.autoPlay}
          poster={props.poster}
          ref={ref}
          onTimeUpdate={handleOnTimeUpdate}
        >
          <source src={props.src} />
        </video>
        <div className="controls">
          <div className="actions">
            <div className="play_progress_box">
              <button className="play-btn" onClick={togglePlay}>
                {!playerState.isPlaying ? (
                  <i>
                    <BtnPlay width="0.5em" />
                  </i>
                  // <i className="bx bx-play"></i>
                ) : (
                  <i>
                    <BtnPause width="0.5em" />
                  </i>
                  // <i className="bx bx-pause"></i>
                )}
              </button>
              <input
                id="rng_progress"
                type="range"
                value={playerState.progress}
                min="0"
                max="100"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleVideoProgress(e)}
              />
            </div>
          </div>
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
          <div className="mute_volume_box">
            <button className="mute-btn" onClick={toggleMute}>
              {!playerState.isMuted ? (
                <i>
                  <BtnUnmute />
                </i>
                // <i className="bx bxs-volume-full"></i>
              ) : (
                <i>
                  <BtnMute />
                </i>
                // <i className="bx bxs-volume-mute"></i>
              )}
            </button>
            <input
              id="rng_volume"
              type='range'
              min="0"
              max="100"
              step='10'
              value={playerState.volume}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleVolumeBar(e)}
            />
          </div>
          <div className="fs_p2p_box">
            <button onClick={handleFullScreen}>
              {!playerState.fullScreen ? (
                <i>
                  fullscreen
                </i>
              ) : (
                <i>
                  minscreen
                </i>
              )}
            </button>
          </div>
          {/* <br /><br /> */}
        </div>
      </div>
    </div>
  );
};

Player.defaultProps = defaultProps;

export default Player;


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
//   private textInput: HTMLVideoElement | null;
//   private setTextInputRef: (element: HTMLVideoElement) => void;
//   public static defaultProps: PlayerPropz;

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
type Booleanish = boolean | 'true' | 'false';
// All the WAI-ARIA 1.1 role attribute values from https://www.w3.org/TR/wai-aria-1.1/#role_definitions
type AriaRole =
  | 'alert'
  | 'alertdialog'
  | 'application'
  | 'article'
  | 'banner'
  | 'button'
  | 'cell'
  | 'checkbox'
  | 'columnheader'
  | 'combobox'
  | 'complementary'
  | 'contentinfo'
  | 'definition'
  | 'dialog'
  | 'directory'
  | 'document'
  | 'feed'
  | 'figure'
  | 'form'
  | 'grid'
  | 'gridcell'
  | 'group'
  | 'heading'
  | 'img'
  | 'link'
  | 'list'
  | 'listbox'
  | 'listitem'
  | 'log'
  | 'main'
  | 'marquee'
  | 'math'
  | 'menu'
  | 'menubar'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'navigation'
  | 'none'
  | 'note'
  | 'option'
  | 'presentation'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'region'
  | 'row'
  | 'rowgroup'
  | 'rowheader'
  | 'scrollbar'
  | 'search'
  | 'searchbox'
  | 'separator'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'switch'
  | 'tab'
  | 'table'
  | 'tablist'
  | 'tabpanel'
  | 'term'
  | 'textbox'
  | 'timer'
  | 'toolbar'
  | 'tooltip'
  | 'tree'
  | 'treegrid'
  | 'treeitem'
  | (string & {});

interface AriaAttributes {
  /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
  'aria-activedescendant'?: string | undefined;
  /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
  'aria-atomic'?: Booleanish | undefined;
  /**
   * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
   * presented if they are made.
   */
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both' | undefined;
  /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
  'aria-busy'?: Booleanish | undefined;
  /**
   * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
   * @see aria-pressed @see aria-selected.
   */
  'aria-checked'?: boolean | 'false' | 'mixed' | 'true' | undefined;
  /**
   * Defines the total number of columns in a table, grid, or treegrid.
   * @see aria-colindex.
   */
  'aria-colcount'?: number | undefined;
  /**
   * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
   * @see aria-colcount @see aria-colspan.
   */
  'aria-colindex'?: number | undefined;
  /**
   * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-colindex @see aria-rowspan.
   */
  'aria-colspan'?: number | undefined;
  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current element.
   * @see aria-owns.
   */
  'aria-controls'?: string | undefined;
  /** Indicates the element that represents the current item within a container or set of related elements. */
  'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time' | undefined;
  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  'aria-describedby'?: string | undefined;
  /**
   * Identifies the element that provides a detailed, extended description for the object.
   * @see aria-describedby.
   */
  'aria-details'?: string | undefined;
  /**
   * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
   * @see aria-hidden @see aria-readonly.
   */
  'aria-disabled'?: Booleanish | undefined;
  /**
   * Indicates what functions can be performed when a dragged object is released on the drop target.
   * @deprecated in ARIA 1.1
   */
  'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup' | undefined;
  /**
   * Identifies the element that provides an error message for the object.
   * @see aria-invalid @see aria-describedby.
   */
  'aria-errormessage'?: string | undefined;
  /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
  'aria-expanded'?: Booleanish | undefined;
  /**
   * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
   * allows assistive technology to override the general default of reading in document source order.
   */
  'aria-flowto'?: string | undefined;
  /**
   * Indicates an element's "grabbed" state in a drag-and-drop operation.
   * @deprecated in ARIA 1.1
   */
  'aria-grabbed'?: Booleanish | undefined;
  /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
  'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | undefined;
  /**
   * Indicates whether the element is exposed to an accessibility API.
   * @see aria-disabled.
   */
  'aria-hidden'?: Booleanish | undefined;
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   * @see aria-errormessage.
   */
  'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling' | undefined;
  /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
  'aria-keyshortcuts'?: string | undefined;
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  'aria-label'?: string | undefined;
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  'aria-labelledby'?: string | undefined;
  /** Defines the hierarchical level of an element within a structure. */
  'aria-level'?: number | undefined;
  /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
  'aria-live'?: 'off' | 'assertive' | 'polite' | undefined;
  /** Indicates whether an element is modal when displayed. */
  'aria-modal'?: Booleanish | undefined;
  /** Indicates whether a text box accepts multiple lines of input or only a single line. */
  'aria-multiline'?: Booleanish | undefined;
  /** Indicates that the user may select more than one item from the current selectable descendants. */
  'aria-multiselectable'?: Booleanish | undefined;
  /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
  'aria-orientation'?: 'horizontal' | 'vertical' | undefined;
  /**
   * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
   * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
   * @see aria-controls.
   */
  'aria-owns'?: string | undefined;
  /**
   * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
   * A hint could be a sample value or a brief description of the expected format.
   */
  'aria-placeholder'?: string | undefined;
  /**
   * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-setsize.
   */
  'aria-posinset'?: number | undefined;
  /**
   * Indicates the current "pressed" state of toggle buttons.
   * @see aria-checked @see aria-selected.
   */
  'aria-pressed'?: boolean | 'false' | 'mixed' | 'true' | undefined;
  /**
   * Indicates that the element is not editable, but is otherwise operable.
   * @see aria-disabled.
   */
  'aria-readonly'?: Booleanish | undefined;
  /**
   * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
   * @see aria-atomic.
   */
  'aria-relevant'?: 'additions' | 'additions removals' | 'additions text' | 'all' | 'removals' | 'removals additions' | 'removals text' | 'text' | 'text additions' | 'text removals' | undefined;
  /** Indicates that user input is required on the element before a form may be submitted. */
  'aria-required'?: Booleanish | undefined;
  /** Defines a human-readable, author-localized description for the role of an element. */
  'aria-roledescription'?: string | undefined;
  /**
   * Defines the total number of rows in a table, grid, or treegrid.
   * @see aria-rowindex.
   */
  'aria-rowcount'?: number | undefined;
  /**
   * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
   * @see aria-rowcount @see aria-rowspan.
   */
  'aria-rowindex'?: number | undefined;
  /**
   * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-rowindex @see aria-colspan.
   */
  'aria-rowspan'?: number | undefined;
  /**
   * Indicates the current "selected" state of various widgets.
   * @see aria-checked @see aria-pressed.
   */
  'aria-selected'?: Booleanish | undefined;
  /**
   * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-posinset.
   */
  'aria-setsize'?: number | undefined;
  /** Indicates if items in a table or grid are sorted in ascending or descending order. */
  'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other' | undefined;
  /** Defines the maximum allowed value for a range widget. */
  'aria-valuemax'?: number | undefined;
  /** Defines the minimum allowed value for a range widget. */
  'aria-valuemin'?: number | undefined;
  /**
   * Defines the current value for a range widget.
   * @see aria-valuetext.
   */
  'aria-valuenow'?: number | undefined;
  /** Defines the human readable text alternative of aria-valuenow for a range widget. */
  'aria-valuetext'?: string | undefined;
}

interface HtmlAttributes extends AriaAttributes {
  // React-specific Attributes
  defaultChecked?: boolean | undefined;
  defaultValue?: string | number | ReadonlyArray<string> | undefined;
  suppressContentEditableWarning?: boolean | undefined;
  suppressHydrationWarning?: boolean | undefined;

  // Standard HTML Attributes
  accessKey?: string | undefined;
  className?: string | undefined;
  contentEditable?: Booleanish | "inherit" | undefined;
  contextMenu?: string | undefined;
  dir?: string | undefined;
  draggable?: Booleanish | undefined;
  hidden?: boolean | undefined;
  id?: string | undefined;
  lang?: string | undefined;
  nonce?: string | undefined;
  placeholder?: string | undefined;
  slot?: string | undefined;
  spellCheck?: Booleanish | undefined;
  style?: CSSProperties | undefined;
  tabIndex?: number | undefined;
  title?: string | undefined;
  translate?: 'yes' | 'no' | undefined;

  // Unknown
  radioGroup?: string | undefined; // <command>, <menuitem>
  // WAI-ARIA
  role?: AriaRole | undefined;
  // RDFa Attributes
  about?: string | undefined;
  datatype?: string | undefined;
  inlist?: any;
  prefix?: string | undefined;
  property?: string | undefined;
  resource?: string | undefined;
  typeof?: string | undefined;
  vocab?: string | undefined;
  // Non-standard Attributes
  autoCapitalize?: string | undefined;
  autoCorrect?: string | undefined;
  autoSave?: string | undefined;
  color?: string | undefined;
  itemProp?: string | undefined;
  itemScope?: boolean | undefined;
  itemType?: string | undefined;
  itemID?: string | undefined;
  itemRef?: string | undefined;
  results?: number | undefined;
  security?: string | undefined;
  unselectable?: 'on' | 'off' | undefined;
  // Living Standard
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined;
  /**
   * Specify that a standard HTML element should behave like a defined custom built-in element
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
   */
  is?: string | undefined;
}

interface MediaAttributes extends HtmlAttributes {
  autoPlay?: boolean | undefined;
  controls?: boolean | undefined;
  controlsList?: string | undefined;
  crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
  loop?: boolean | undefined;
  mediaGroup?: string | undefined;
  muted?: boolean | undefined;
  playsInline?: boolean | undefined;
  preload?: string | undefined;
  src?: string | undefined;
}

interface VideoProps extends MediaAttributes {
  height?: number | string | undefined;
  playsInline?: boolean | undefined;
  poster?: string | undefined;
  width?: number | string | undefined;
  disablePictureInPicture?: boolean | undefined;
  disableRemotePlayback?: boolean | undefined;
}

interface PlayerProps extends VideoProps {
  ComponentName?: string,
}
// };

// Player.defaultProps = {
//   ComponentName: 'Player'
// };
// #region class component
