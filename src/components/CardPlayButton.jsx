import { Play, Pause } from "@/components/Player";
import usePlayerStore from "@/store/playerStore.js";

const CardPlayButton = ({ id }) => {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    fetch(`api/get-info-playlist.json?id=${id}`)
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

  return (
    <button
      onClick={handleClick}
      className="rounded-full bg-green-500 aspect-square p-4 flex items-center justify-center"
    >
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  );
};

export default CardPlayButton;
