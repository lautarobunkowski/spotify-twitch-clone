import { useRef, useEffect } from "react";
import usePlayerStore from "@/store/playerStore.js";
import { Slider } from "@/components/Slider.tsx";

export const Pause = () => (
  <svg role="img" aria-hidden="true" viewBox="0 0 16 16" height="16" width="16">
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);

export const Play = () => (
  <svg role="img" aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);

const CurrentSong = ({ image, title, artists }) => {
  return (
    <div className="flex items-center gap-5 relative overflow-hidden">
      <picture className="w-14 h-14 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={image} alt={title} />
      </picture>

      <div className="flex flex-col">
        <h3 className="font-semibold text-sm block">{title}</h3>
        <span className="text-xs opacity-80">{artists?.join(", ")}</span>
      </div>
    </div>
  );
};

const Player = () => {
  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } =
    usePlayerStore((state) => state);
  const audioRef = useRef();

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    const { song, playlist, songs } = currentMusic;
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.play();
    }
  }, [currentMusic]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-row justify-between w-full px-2 z-50 items-center">
      <div>
        <CurrentSong {...currentMusic.song} />
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <audio ref={audioRef} />
        </div>
      </div>

      <div className="grid place-content-center">
        <Slider
          defaultValue={[100]}
          max={100}
          min={0}
          className="w-[95px]"
          onValueChange={(value) => {
            const [newVolume] = value;
            audioRef.current.volume = newVolume / 100;
          }}
        />
      </div>
    </div>
  );
};

export default Player;
