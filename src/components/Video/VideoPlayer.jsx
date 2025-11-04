import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

function VideoPlayer({ videoData, className, ...props }) {
  // player controllers
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };
  const handleFullScreen = () => {
    playerRef.current.wrapper.requestFullscreen();
  };

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleProgress = (state) => {
    setProgress(state.played);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleSeek = (e) => {
    const seekValue = parseFloat(e.target.value);
    playerRef.current.seekTo(seekValue);
  };

  return (
    <>
      <div
        className={`relative aspect-w-16 aspect-h-9 sm:h-[68vh] sm:max-w-4xl h-64 w-full object-contain rounded-lg overflow-hidden bg-gray-900 ${className}`}
      >
        <ReactPlayer
          ref={playerRef}
          src={videoData.videoFile?.url}
          playing={playing}
          volume={volume}
          muted={muted}
          controls={false}
          width="100%"
          height="100%"
          autoPlay
          light={videoData.thumbnail.url}
          onProgress={handleProgress}
          onReady={handleDuration}
          {...props}
        />
        {/* controllers */}
        <div className="absolute bottom-0 h-14 left-0 w-full bg-gray-700 bg-opacity-95 p-2 flex flex-col justify-between items-center">
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={progress}
            onChange={handleSeek}
            className="w-full h-2"
          />
          <div className="w-full flex justify-between items-center mb-2">
            <button
              onClick={handlePlayPause}
              className="text-white uppercase hover:text-gray-300 p-2 rounded-full hover:bg-gray-800"
            >
              {playing ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <div className="flex items-center">
              <button
                onClick={handleMute}
                className="text-white uppercase hover:text-gray-300 p-2 rounded-full hover:bg-gray-800"
              >
                {muted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20"
              />
            </div>
            <button
              onClick={handleFullScreen}
              className="text-white uppercase hover:text-gray-300 p-2 rounded-full hover:bg-gray-800"
            >
              <FaExpand size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPlayer;
