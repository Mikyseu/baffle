import React, { useRef, useState, useEffect } from 'react';

function Footer({ onSongComplete, songsList, songIndex }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songToPlay, setSongToPlay] = useState();
  const [selectedSongIndex, setSelectedSongIndex] = useState(songIndex);

  useEffect(() => {
    setSelectedSongIndex(songIndex);

    if (songIndex === -1) return;

    const song = songsList[songIndex];

    setSongToPlay(song);
    setPlaying(true);
  }, [songIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      handleNextSong();
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef.current, onSongComplete, selectedSongIndex]);
  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  const handlePlay = () => {
    const audio = audioRef.current;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      if (selectedSongIndex === -1) return;

      const song = songsList[selectedSongIndex];

      setSongToPlay(song);
      audio.play();
      setPlaying(true);
    }
  };

  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const handleNextSong = () => {
    let nextSongIndex = 0;

    if (selectedSongIndex < songsList.length - 1) {
      nextSongIndex = selectedSongIndex + 1;
    }

    const nextSong = songsList[nextSongIndex];
    setSongToPlay(nextSong);
    setSelectedSongIndex(nextSongIndex);
  };

  const handlePreviousSong = () => {
    let prevSongIndex = 0;

    if (selectedSongIndex > 0) {
      prevSongIndex = selectedSongIndex - 1;
    }

    const prevSong = songsList[prevSongIndex];
    setSongToPlay(prevSong);
    setSelectedSongIndex(prevSongIndex);
  };

  return (
    <div className="fixed bottom-0 w-full h-[140px] flex justify-center items-center p-4 box-border bg-[#1B1F47] ">
      <div className="flex flex-col items-start">
        <img
          src={
            songToPlay
              ? `https://cdn1.suno.ai/image_${songToPlay?.sunoId}.png`
              : `../../public/Vinyl.png`
          }
          className="w-16 h-16 rounded-full animate-spin animate-infinite animate-duration-[4000ms]"
          alt="Image song"
        />
        <img
          src="../../public/aguja-lp.png "
          className="absolute top-10 left-7 w-16 h-16 "
          alt="Imagen superior"
        />
        <img
          src="../../public/vinilo-interior.png"
          className="absolute top-[59px] left-[85px] w-6 h-6"
          alt="Imagen superior"
        />
      </div>

      <div className="flex flex-col items-start ml-4 ">
        {
          <>
            <p className="font-bold text-white text-center">
              {songToPlay?.title}
            </p>
            <audio
              ref={audioRef}
              src={`https://cdn1.suno.ai/${songToPlay?.sunoId}.mp3`}
              autoPlay={playing}
            />
            <div className="relative w-[180px] h-2 bg-[#ffffff] rounded-full mt-4">
              <div
                className="absolute h-full bg-[#6E8BB3] rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between w-full mt-2">
              <p className="text-white font-semibold">
                {formatTime(currentTime)}
              </p>
              <p className="text-white font-semibold">{formatTime(duration)}</p>
            </div>
          </>
        }
        <div className="flex w-full justify-between mt-2">
          <button onClick={handlePreviousSong}>
            <img
              src="../public/backward.png"
              alt="previous"
              className="w-4 h-4"
            />
          </button>
          <button onClick={skipBackward}>
            <img
              src="../public/rewind-left.png"
              alt="backward"
              className="w-4 h-4"
            />
          </button>
          <button
            onClick={() => {
              handlePlay();
            }}
          >
            {playing ? (
              <img src="../public/pause.png" alt="pause" className="w-5 h-5" />
            ) : (
              <img src="../public/play.png" alt="play" className="w-5 h-5 " />
            )}
          </button>
          <button onClick={skipForward}>
            <img
              src="../public/rewind-right.png"
              alt="next"
              className="w-4 h-4"
            />
          </button>
          <button onClick={handleNextSong}>
            <img src="../public/next.png" alt="next" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default Footer;
