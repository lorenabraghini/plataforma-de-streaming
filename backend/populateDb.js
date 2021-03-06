const SpotifyWebApi = require("spotify-web-api-node");
const fs = require("fs");
const request = require("request");
const {
  inserir,
  select,
  inserirLanguage,
} = require("./server/common/Database/helpers");

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(
  "BQBpkwqa6kijXF9e9Fi-rNKLpnzfFcm4GeVUmLgaTyzzaDyvBd5vVTywSJaAnJWYAk9kgaF3y5ShxjeLgjSH4s1oevJ58r7RWjpxefxa1KOf9eW1YveQ8GvTlqr4e0DtCygDSh0CK0GE9Xm3EUq1C2d7oTc4B_Rrg9hUULyhhA4A_PDt8MbV1lCJojmNqc4Cdr-jqRb2hIlmqkqcgE3Tpytd-WeGDgpLpw0h7cXvgLFmRm6p3W8IqE_xfgtBfdSw79CFiTA0PRfku9TtXifHYXg1rTwyXbpshG6OfOXYSBOpmslxqZtR6DpBiPZqJl4"
);

async function getPodcasts() {
  let shows = await spotifyApi.getMySavedShows();
  for (let showInfo of shows.body.items) {
    let pod = savePodcast(showInfo);
    inserir("Podcast", pod).catch((e) => console.log(e));
    showInfo = await spotifyApi.getShow(showInfo.show.id);
    for (let episode of showInfo.body.episodes.items) {
      let ep = saveEpisode(episode, pod.name);
      inserir("EpisodioPodcast", ep).catch((e) => console.log(e));
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
  await getData("lorenabraghinim");
  await getData("beatrizgnovais");
  await getData("12177373955");
}

async function getData(user) {
  let user_playlists = await spotifyApi.getUserPlaylists(user, {
    limit: 50,
    offset: 0,
  });
  for (let playlist of user_playlists.body.items) {
    try {
      const tracks = await spotifyApi.getPlaylistTracks(playlist.id);
      let musicas = [];
      for (let track of tracks.body.items) {
        musicas.push(track.track.id);
        const album = await spotifyApi.getAlbum(track.track.album.id);
        let a = await spotifyApi.getTrack(track.track.id)
        console.log(a)
        // let tr = saveTrack(track, album); callback
        // console.log(tr.nome);
        // inserir("Musica", tr).catch((e) => console.log("DUPLICADO"));
        // let al = saveAlbum(album);
        // console.log(al.name);
        // inserir("Album", al).catch((e) => console.log("DUPLICADO"));
        // for (let artist of album.body.artists) {
        //   let artistInfos = await spotifyApi.getArtist(artist.id);
        //   let art = saveArtist(artistInfos);
        //   console.log(art.nome);
        //   inserir("Artista", art).catch((e) => console.log("DUPLICADO"));
        // }
      }
      // let play = savePlaylist(playlist, musicas);
      // console.log("PLAYLIST", user, play.name);
      // inserir("Playlist", play).catch((e) => console.log("DUPLICADO"));
    } catch (error) {
      continue;
    }
  }
}

function savePlaylist(playlist, musicas) {
  let x = {};
  x.name = playlist.name;
  x.descricao = playlist.description;
  x.autor = playlist.owner.id;
  x.imagem = playlist.images[0].url;
  x.musicas = musicas.join(",");
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

function downloadAudio(url, name) {
  return new Promise((resolve, reject) => {
    const filepath = `${__dirname}/audios/${name.replace(
      /[^A-Za-z]/g,
      ""
    )}.mp3`;
    request
      .get(url)
      .on("error", function (err) {
        console.log("Error downloading audio");
      })
      .pipe(fs.createWriteStream(filepath))
      .on("finish", function () {
        return resolve(filepath);
      });
  });
}

async function saveBlobs() {
  let rows = await select("Musica");
  for (let row of rows) {
    if (row.url && !row.musicaBlob) {
      console.log(row.nome);
      const filepath = await downloadAudio(row.url, row.nome);
      const buffer = fs.readFileSync(filepath);
      await inserirBlob(row.url, buffer);
      fs.unlinkSync(filepath);
    }
  }
}

main();
// getPodcasts();
// saveBlobs();
