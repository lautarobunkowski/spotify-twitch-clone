import { Play, Pause } from "@/components/Player";
import usePlayerStore from "@/store/playerStore.js";

const CardPlayButton = ({ id, size = "small" }) => {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    fetch(`http://localhost:4321/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;
        setIsPlaying(true);
        setCurrentMusic({
          songs,
          playlist,
          song: songs[0],
        });
      });
  };

  const iconClassName = size === "small"? "w-4 h-4" : "w-5 h-5"

  return (
    <button
      onClick={handleClick}
      className={`rounded-full bg-green-500 aspect-square p-4 flex items-center justify-center hover:scale-105 transition hover:bg-green-400`}
    >
      {isPlayingPlaylist ? <Pause className={iconClassName}/> : <Play className={iconClassName}/>}
    </button>
  );
};

export default CardPlayButton;
