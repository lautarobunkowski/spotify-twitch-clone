import { allPlaylists, songs as allSongs } from "@/lib/data.ts";

export async function GET({ params, request }) {
  const { url } = request;
  console.log(url)
  const urlObject = new URL(url);
  const id = urlObject.searchParams.get("id");

  const playlist = allPlaylists.find((playlist) => playlist.id === id);
  const songs = allSongs.filter((song) => song.albumId === playlist?.albumId);

  return new Response(JSON.stringify({ playlist, songs }));
}
