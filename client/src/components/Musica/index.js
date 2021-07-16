import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import ReactPlayer from "react-player";
import "./style.css";

export default function Musicas({ musica, index, showAlbum }) {
  const { albuns, setUrl, setPlayingSong, playingSong } = useGlobalState();
  const [playing, setPlaying] = useState(false);
  const album = albuns.filter((album) => album.nome === musica.nomeAlbum);

  function msToHMS(ms) {
    var seconds = ms / 1000;

    seconds = seconds % 3600;

    var minutes = parseInt(seconds / 60);

    seconds = String(parseInt(seconds % 60));
    if (seconds.length === 1) seconds += "0";
    return minutes + ":" + seconds;
  }
  function handleClick(newUrl) {
    setUrl(newUrl);
    setPlaying(!playing);
    setPlayingSong(!playingSong);
  }
  return (
    <Card className="item-list">
      <label id="index">{index + 1}</label>
      <div id="playbtn" onClick={(e) => handleClick(musica.url)}>
        {playing ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
      </div>
      {showAlbum ? (
        <img
          className="album"
          src={
            album[0]
              ? album[0].imagem
              : "https://i.scdn.co/image/ab67616d00001e02c95c25c00914c09bb806b39e"
          }
        />
      ) : null}

      <div id="musica-infos">
        <label className="musica-nome">{musica.nome}</label>
        <label>{musica.nomeArtista}</label>
      </div>
      {showAlbum ? (
        <label
          id="info-album"
          style={{
            marginLeft: 60,
            marginRight: 60,
            width: 350,
            marginTop: musica.nomeAlbum.length > 25 ? 6 : 15,
          }}
        >
          {musica.nomeAlbum}
        </label>
      ) : null}
      <label id="info-duracao">{msToHMS(musica.duracao)}</label>
    </Card>
  );
}
