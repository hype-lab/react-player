import React, { useState, useRef, useEffect, ChangeEvent } from 'react';

const useVideoPlayer = () => {
    const [playerState, setPlayerState] = useState({
      isPlaying: false,
      progress: 0,
      speed: 1,
      isMuted: false,
    });
  
    const videoElement = useRef<HTMLVideoElement | null>(null);
  
    const videoCallbackRef: React.RefCallback<HTMLVideoElement> = (element: HTMLVideoElement | null) => {
      if (element) {
        console.log('executed because the HTML video element was set.');
        /* do stuff that requires the element. */
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
      const progress = ((videoElement.current?.currentTime ?? 1) / (videoElement.current?.duration ?? 1)) * 100;
      setPlayerState({
        ...playerState,
        progress,
      });
    };
  
    const handleVideoProgress = (event: ChangeEvent<HTMLInputElement>) => {
      const manualChange = Number(event.target.value);
      if (videoElement.current) {
        videoElement.current.currentTime = ((videoElement.current?.duration ?? 0) / 100) * manualChange;
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
      ref: videoCallbackRef
    };
};

export default useVideoPlayer;
