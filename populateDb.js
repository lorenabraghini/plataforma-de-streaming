const SpotifyWebApi = require("spotify-web-api-node");
const fs = require("fs");
const { inserir } = require("./server/common/Database/helpers");

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(
  "BQAi_HqptysHRfc8n0ac9Fh2CvwOuaTBL3genGwmcNxGBiWV3GBWU6xQXB7hLYbZJDY2cZJef4oDCrVWJRyrY6_cMJKfxszrbyA4IMeIeGKbI67R_YgUlf192PS5DZ8u2M-0TH_VmyNnkvmJCnOTGLlYl5AmMitDiazsWQ50po1Ex_uUE6mDvCQmuGMBllVQ0Zbd5MNS9BmLXnfrA5Vc6d28Qxfcr75v3pkzqtxCRaN6t4IO--z6sHWgBoL1PvddLbx4EY-ZZFmkh1x5zAAMdibc9WJjJ-s"
);

async function getPodcasts() {
  let shows = await spotifyApi.getMySavedShows();
  for (let showInfo of shows.body.items) {
    let pod = savePodcast(showInfo);
    inserir("Podcast", pod).catch((e) => console.log("DUPLICADO"));
    showInfo = await spotifyApi.getShow(showInfo.show.id);
    for (let episode of showInfo.body.episodes.items) {
      let ep = saveEpisode(episode, showInfo.show.name);
      inserir("EpisodioPodcast", ep).catch((e) => console.log("DUPLICADO"));
    }
  }
}

function saveEpisode(episode, podcast) {
  let x = {};
  x.id = episode.id;
  x.nome = episode.name;
  x.dataPublicacao = episode.release_date;
  x.descricao = episode.description;
  x.url = episode.audio_preview_url;
  x.duracao = episode.duration_ms;
  x.podcast = podcast;
  return x;
}

function savePodcast(showInfo) {
  let x = {};
  x.name = showInfo.show.name;
  x.descricao = showInfo.show.description;
  x.genero = "Podcast";
  x.imagem = showInfo.show.images[1];
  x.idioma = showInfo.show.languages[0];
  x.qtdEps = showInfo.show.total_episodes;

  return x;
}

async function main() {
  await getData("12177373955");
  await getData("lorenabraghinim");
  await getData("beatrizgnovais");
}

async function getData(user) {
  let user_playlists = await spotifyApi.getUserPlaylists(user);
  for (let playlist of user_playlists.body.items) {
    let play = savePlaylist(playlist);
    console.log(play.name);
    inserir("Playlist", play).catch((e) => console.log("DUPLICADO"));
    // const tracks = await spotifyApi.getPlaylistTracks(playlist.id);
    // for (let track of tracks.body.items) {
    //   const album = await spotifyApi.getAlbum(track.track.album.id);
    //   let tr = saveTrack(track, album);
    //   console.log(tr.nome);
    //   inserir("Musica", tr).catch((e) => console.log("DUPLICADO"));
    //   let al = saveAlbum(album);
    //   console.log(al.name);
    //   inserir("Album", al).catch((e) => console.log("DUPLICADO"));
    //   for (let artist of album.body.artists) {
    //     let artistInfos = await spotifyApi.getArtist(artist.id);
    //     let art = saveArtist(artistInfos);
    //     console.log(art.nome);
    //     inserir("Artista", art).catch((e) => console.log("DUPLICADO"));
    //   }
    // }
  }
}

function savePlaylist(playlist) {
  let x = {};
  x.name = playlist.name;
  x.descricao = playlist.description;
  x.autor = playlist.owner.id;
  x.imagem = playlist.images[0].url;
  return x;
}

function saveTrack(track, album) {
  let x = {};
  x.id = track.track.id;
  x.nome = track.track.name;
  x.fonte = track.track.preview_url;
  x.duracao = track.track.duration_ms;
  x.popularidade = track.track.popularity;
  x.genero = album.body.genres[0];
  x.artista = album.body.artists[0].name;
  x.album = album.body.name;
  return x;
}

function saveAlbum(album) {
  let x = {};
  x.name = album.body.name;
  x.data = album.body.release_date;
  x.qtdMusicas = album.body.tracks.total;
  x.genero = album.body.genres[0];
  x.imagem = album.body.images[1].url;
  x.artista = album.body.artists[0].name;

  return x;
}

function saveArtist(artist) {
  let x = {};
  x.id = artist.body.id;
  x.nome = artist.body.name;
  x.seguidores = artist.body.followers;
  x.ouvintes = artist.body.popularity;
  x.imagem = artist.body.images[1].url;
  x.genero = artist.body.genres[0];

  return x;
}

main();
//getPodcasts();
