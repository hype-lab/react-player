import React, { useState, useRef, useEffect, ChangeEvent, MouseEventHandler } from 'react';

const useVideoPlayer = () => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
  });

  const videoElement = useRef<HTMLVideoElement | null>(null);

  const videoCallbackRef: React.RefCallback<HTMLVideoElement> = (element: HTMLVideoElement | null) => {
    if (element && videoElement && videoElement.current != element) {
      console.log('executed because the HTML video element was set.');
      videoElement.current = element;
    }
  }

  useEffect(() => {
    if (videoElement.current) {
      console.log('executed because playerState.isPlaying changed.');
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

  const handleOnTimeUpdate = () => {
    if (videoElement.current) {
      const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
      setPlayerState({
        ...playerState,
        progress,
      });
    }
  };

  const handleVideoProgressClick = (event: MouseEventHandler<HTMLInputElement>) => {
    const manualChange = Number();
    if (videoElement.current) {
      videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
      setPlayerState({
        ...playerState,
        progress: manualChange,
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
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };

  useEffect(() => {
    console.log('executed because playerState.isMuted changed.');
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
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    handleVideoProgressClick,
    ref: videoCallbackRef
  };
};

export default useVideoPlayer;
