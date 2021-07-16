import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";
import ReactPlayer from "react-player";
import "./style.css";

export default function Musicas() {
  const { musicasFiltradas, albuns } = useGlobalState();
  const [playing, setPlaying] = useState(false);
  const [url, setUrl] = useState("false");

  function msToHMS(ms) {
    var seconds = ms / 1000;

    seconds = seconds % 3600;

    var minutes = parseInt(seconds / 60);

    seconds = String(parseInt(seconds % 60));
    if (seconds.length === 1) seconds += "0";
    return minutes + ":" + seconds;
  }

  function handleClick(newUrl) {
    // if (newUrl !== url)
    setUrl(newUrl);
    setPlaying(!playing);
  }

  return (
    <div>
      <h1>Musicas</h1>
      <section id="list">
        {musicasFiltradas.map((musica, index) => {
          const album = albuns.filter(
            (album) => album.nome === musica.nomeAlbum
          );

          return (
            <Card
              className="item-list"
              onClick={(e) => handleClick(musica.url)}
            >
              <label id="index">{index + 1}</label>
              <img
                className="album"
                src={
                  album[0]
                    ? album[0].imagem
                    : "https://i.scdn.co/image/ab67616d00001e02c95c25c00914c09bb806b39e"
                }
              />
              <div id="musica-infos">
                <label className="musica-nome">{musica.nome}</label>
                <label>{musica.nomeArtista}</label>
              </div>
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
              <label id="info-duracao">{msToHMS(musica.duracao)}</label>
            </Card>
          );
        })}
      </section>
      <div hidden>
        <ReactPlayer url={url} playing={playing} />
      </div>
    </div>
  );
}
