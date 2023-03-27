import React, { useState, useRef, useEffect, ChangeEvent, MouseEventHandler } from 'react';
import { toHoursMinutesSecondsString } from '../helpers/timeHelper';

const useVideoPlayer = () => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
    lastVolumeBeforeMute: 100,
    volume: 100,
    fullScreen: false,
    currentTempo: '00:00',
    totalTempo: '00:00',
  });

  const videoElement = useRef<HTMLVideoElement | null>(null);

  const videoCallbackRef: React.RefCallback<HTMLVideoElement> = (element: HTMLVideoElement | null) => {
    if (element && videoElement && videoElement.current !== element) {

      videoElement.current = element;
    }
  }

  const videoWrapperElement = useRef<HTMLDivElement | null>(null);

  const videoWrapperCallBackRef: React.RefCallback<HTMLDivElement> = (element: HTMLDivElement | null) => {
    if (element && videoWrapperElement && videoWrapperElement.current !== element) {
      videoWrapperElement.current = element;
    }
  }

  useEffect(() => {
    if (videoElement.current) {

      playerState.isPlaying
        ? videoElement.current?.play()
        : videoElement.current?.pause();
    }

  }, [playerState.isPlaying]);

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  const handleFullScreen = () => {
    if (videoElement.current && videoWrapperElement.current) {
      setPlayerState({
        ...playerState,
        fullScreen: !playerState.fullScreen,
      });

      // PERCHE' PER METTERE FULLSCREEN SI LAVORA SULL'ELEMENTO MENTRE INVECE PER TOGLIERLO SI LAVORA SU DOCUMENT?!?!?!
      // PERCHE' CAZZO PERCHEEEEEE'''
      if (!playerState.fullScreen) {
        if (videoWrapperElement.current.requestFullscreen) {
          videoWrapperElement.current.requestFullscreen();
        } else if (videoWrapperElement.current.mozRequestFullScreen) { /* Firefox */
          videoWrapperElement.current.mozRequestFullScreen();
        } else if (videoWrapperElement.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          videoWrapperElement.current.webkitRequestFullscreen();
        } else if (videoWrapperElement.current.msRequestFullscreen) { /* IE/Edge */
          videoWrapperElement.current.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
          document.msExitFullscreen();
        }
      }
    }
  }

  const handleVolumeBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoElement.current) {
      const valumValue = Number(e.target.value) / 100;
      setPlayerState({
        ...playerState,
        volume: Number(e.target.value),
        lastVolumeBeforeMute: Number(e.target.value),
      });
      videoElement.current.volume = Number(valumValue.toFixed(1));
    }
  }

  const handleOnTimeUpdate = () => {
    if (videoElement.current) {
      const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
      const currentTime = toHoursMinutesSecondsString(videoElement.current.currentTime);
      const duration = toHoursMinutesSecondsString(videoElement.current.duration);
      setPlayerState({
        ...playerState,
        progress,
        currentTempo: currentTime.h !== '00' ? `${currentTime.h}:${currentTime.m}:${currentTime.s}` : `${currentTime.m}:${currentTime.s}`,
        totalTempo: duration.h !== '00' ? `${duration.h}:${duration.m}:${duration.s}` : `${duration.m}:${duration.s}`,
      });
    }
  };

  const handleVideoProgress = (event: ChangeEvent<HTMLInputElement>) => {
    const manualChange = Number(event.target.value);
    if (videoElement.current) {
      videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
      setPlayerState({
        ...playerState,
        progress: manualChange,
      });
    }
  };

  const handleVideoSpeed = (event: ChangeEvent<HTMLSelectElement>) => {
    const speed = Number(event.target.value);
    if (videoElement.current) {
      videoElement.current.playbackRate = speed;

      setPlayerState({
        ...playerState,
        speed,
      });
    }
  };

  const toggleMute = () => {
    const isNowMuted = !playerState.isMuted;
    let vol = playerState.volume;
    if (isNowMuted) {
      vol = 0
    } else {
      vol = playerState.lastVolumeBeforeMute;
    }

    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
      volume: vol,
    });
  };

  useEffect(() => {
    if (videoElement.current) {
      playerState.isMuted
        ? (videoElement.current.muted = true)
        : (videoElement.current.muted = false);
    }
  }, [playerState.isMuted]);

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVolumeBar,
    handleVideoProgress,
    handleFullScreen,
    handleVideoSpeed,
    toggleMute,
    ref: videoCallbackRef,
    wrapperRef: videoWrapperCallBackRef
  };
};

export default useVideoPlayer;
