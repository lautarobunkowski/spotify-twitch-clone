import { useRef, useEffect, useState } from "react";
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

const OffVolume = () => (
  <svg height="16" width="16"  role="presentation" aria-label="Volumen apagado" aria-hidden="true"  id="volume-icon" viewBox="0 0 16 16" ><path fill="currentColor" d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path fill="currentColor" d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>
)

const DownVolume = () => (
  <svg height="16" width="16" role="presentation" aria-label="Volumen bajo" aria-hidden="true" id="volume-icon" viewBox="0 0 16 16" ><path fill="currentColor" d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path></svg>
)

const MidVolume = () => (
  <svg height="16" width="16" role="presentation" aria-label="Volumen medio" aria-hidden="true" id="volume-icon" viewBox="0 0 16 16" ><path fill="currentColor" d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path></svg>
)

const HighVolume = () => (
  <svg height="16" width="16" role="presentation" aria-label="Volumen alto" aria-hidden="true" id="volume-icon" viewBox="0 0 16 16" ><path fill="currentColor" d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path fill="currentColor" d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg>
)

const CurrentSong = ({ image, title, artists }) => {
  return (
    <div className="container_currentSong flex items-center gap-5 relative overflow-auto">
      <picture className="w-14 h-14 bg-zinc-800 shadow-lg rounded-md overflow-hidden">
        <img src={image} alt={title} className="aspect-square"/>
      </picture>

      <div className="flex flex-col">
        <h3 className="font-semibold text-sm ">{title}</h3>
        <span className="text-xs opacity-80">{artists?.join(", ")}</span>
      </div>
    </div>
  );
};

const VolumeControl = ({audioRef}) => {
  const [volume, setVolume] = useState({
    volume: 100,
    volumePreviousRef: 100
  })

  const handleClickVolume = () => {
    if (volume.volume > 0) {
      audioRef.current.volume = 0;
      setVolume(prevVolume => ({volume: 0, volumePreviousRef: prevVolume.volume }));
    } else {
      audioRef.current.volume = volume.volumePreviousRef / 100;
      setVolume(prevVolume => ({...prevVolume, volume: volume.volumePreviousRef }));
    }
  }

  return (
    <div className="flex gap-2">
        <button onClick={handleClickVolume} className="opacity-70 hover:opacity-100 transition">
          {
            volume.volume === 0? <OffVolume className="text-zinc-500"/>:
            volume.volume < 35? <DownVolume className="text-zinc-500"/> :
            volume.volume < 75? <MidVolume className="text-zinc-500"/> :
            <HighVolume className="text-zinc-500"/>
          }
        </button>
        <Slider
          defaultValue={[volume.volume]}
          max={100}
          min={0}
          value={[volume.volume]}
          className="w-[95px]"
          onValueChange={(value) => {
            const [newVolume] = value;
            setVolume({...volume, volume:newVolume})
            audioRef.current.volume =newVolume / 100;
          }}
        />
      </div>
  )
}

const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    audio.current.addEventListener("timeupdate", handletTimeUpdate)
    return () => {
      audio.current.removeEventListener("timeupdate", handletTimeUpdate)
    }
  }, [])
  
  const handletTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime)
  }

  const duration = audio?.current?.duration ?? 0

  const formatTime = (time) => {
    if(time == null) return "00:00"

    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)
    const hours = 0

    if (hours === 0) {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  

  return(
    <div className="flex justify-center gap-x-2 text-xs text-zinc-400 pt-2 w-full">
      <span className="opacity-50 w-10 text-right">
        {formatTime(currentTime )}
      </span>
      <Slider
        defaultValue={[0]}
        max={audio?.current?.duration ?? 0}
        min={0}
        value={[currentTime]}
        className="max-w-[445px] flex-1"
        onValueChange={(value) => {
          const [time] = value
          audio.current.currentTime = time
        }}
        />
          <span className="opacity-50 w-10">
          {duration ? formatTime(duration): null}
          </span> 
    </div>
  )
}

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
    <div className="flex flex-row justify-between w-full z-50 items-center">
      <div className="min-w-[180px] w-[30%] pl-1">
        <CurrentSong {...currentMusic.song} />
      </div>


      <div className="flex justify-center items-center flex-col w-[40%] flex-1">
        <div className="flex">
          <button className="bg-white rounded-full p-2 w-fit" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
        <SongControl audio={audioRef}/>
        <audio ref={audioRef}/>
      </div>


      <div className="min-w-[180px] w-[30%] pr-1 flex items-center justify-end">
      <VolumeControl audioRef={audioRef}/>
      </div>
    </div>
  );
};

export default Player;
