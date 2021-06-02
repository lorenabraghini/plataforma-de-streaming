const SpotifyWebApi = require("spotify-web-api-node");
const dataPodcasts = require("./dataPodcasts.json");
const fs = require("fs");

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(
  "BQAMbNmBQ-dvt3234O0f-nUHR5hbFBKuZ_JrIhB5QjMKd6AtWyy8GZeUnBmM0tB6TQcIz6jPo_xsAFme1uX-aKtC2kUY2Wxp4yA-pAx7K4hiaBOgKHa6f5HuuydDQ9QkjuNLOo4via8U19QB2C7bMMnpLCHXD4osjok50wrwjiJG4Vo3GODYS2OiE7nJE6scA9HOaN6k3LpmQQAUfadkj2JjBZ_7UeadHaJnUP6v34sW8gH40_ECUBNwawb3MWn0cky4vQgteyHS5PsBimIP8B9AX6vSTQ"
);

let playlists = {};
let musicas = {};
let albuns = {};
let artistas = {};

let podcasts = dataPodcasts.podcasts;
let episodios = dataPodcasts.episodios;

async function getPodcasts() {
  let shows = await spotifyApi.getMySavedShows();
  for (let showInfo of shows.body.items) {
    if (!podcasts[showInfo.show.name]) savePodcast(showInfo);
    showInfo = await spotifyApi.getShow(showInfo.show.id);
    for (let episode of showInfo.body.episodes.items) {
      if (!episodios[episode.id]) saveEpisode(episode);
    }
  }
  fs.writeFileSync(
    "dataPodcasts.json",
    JSON.stringify({ podcasts, episodios })
  );
}

function saveEpisode(episode) {
  episodios[episode.id] = {};
  episodios[episode.id].nome = episode.name;
  episodios[episode.id].dataPublicacao = episode.release_date;
  episodios[episode.id].descricao = episode.description;
  episodios[episode.id].url = episode.audio_preview_url;
  episodios[episode.id].duracao = episode.duration_ms;
}

function savePodcast(showInfo) {
  podcasts[showInfo.show.name] = {};
  podcasts[showInfo.show.name].descricao = showInfo.show.description;
  podcasts[showInfo.show.name].qtdEps = showInfo.show.total_episodes;
  podcasts[showInfo.show.name].genero = "Podcast";
  podcasts[showInfo.show.name].imagem = showInfo.show.images[1];
  podcasts[showInfo.show.name].idioma = showInfo.show.languages[0];
}

async function main() {
  await getData("12177373955");
  await getData("lorenabraghinim");
  await getData("beatrizgnovais");
  fs.writeFileSync(
    "data.json",
    JSON.stringify({ playlists, musicas, albuns, artistas })
  );
}

async function getData(user) {
  let user_playlists = await spotifyApi.getUserPlaylists(user);
  for (let playlist of user_playlists.body.items) {
    savePlaylist(playlist);
    const tracks = await spotifyApi.getPlaylistTracks(playlist.id);
    for (let track of tracks.body.items) {
      if (!musicas[track.track.id]) {
        const album = await spotifyApi.getAlbum(track.track.album.id);
        saveTrack(track, album);
        saveAlbum(album);
        for (let artist of album.body.artists) {
          let artistInfos = await spotifyApi.getArtist(artist.id);
          saveArtist(artistInfos);
        }
      }
    }
  }
}

function savePlaylist(playlist) {
  playlists[playlist.name] = {};
  playlists[playlist.name].descricao = playlist.description;
  playlists[playlist.name].autor = playlist.owner.id;
}

function saveTrack(track, album) {
  musicas[track.track.id] = {};
  musicas[track.track.id].nome = track.track.name;
  musicas[track.track.id].fonte = track.track.preview_url;
  musicas[track.track.id].duracao = track.track.duration_ms;
  musicas[track.track.id].popularidade = track.track.popularity;
  musicas[track.track.id].genero = album.body.genres[0];
}

function saveAlbum(album) {
  albuns[album.body.name] = {};
  albuns[album.body.name].data = album.body.release_date;
  albuns[album.body.name].qtdMusicas = album.body.tracks.total;
  albuns[album.body.name].genero = album.body.genres[0];
  albuns[album.body.name].imagem = album.body.images[1].url;
}

function saveArtist(artist) {
  artistas[artist.body.id] = {};
  artistas[artist.body.id].nome = artist.body.name;
  artistas[artist.body.id].seguidores = artist.body.followers;
  artistas[artist.body.id].ouvintes = artist.body.popularity;
  artistas[artist.body.id].imagem = artist.body.images[1].url;
  artistas[artist.body.id].genero = artist.body.genres[0];
}

// main();
