import React, { useState, useRef, useEffect, ChangeEvent, MouseEventHandler } from 'react';

const useVideoPlayer = () => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
    lastVolumeBeforeMute: 100,
    volume: 100,
    fullScreen: false,
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

  const handleFullScreen = () => {
    if (videoElement.current) {
      const isNowFullScreen = !playerState.fullScreen;
      setPlayerState({
        ...playerState,
        fullScreen: !playerState.fullScreen,
      });

      if (isNowFullScreen) {
        videoElement.current.requestFullscreen({ navigationUI: "hide" });
      } else {
        videoElement.current.requestFullscreen({ navigationUI: "show" });
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
    handleVolumeBar,
    handleVideoProgress,
    handleFullScreen,
    handleVideoSpeed,
    toggleMute,
    handleVideoProgressClick,
    ref: videoCallbackRef
  };
};

export default useVideoPlayer;
