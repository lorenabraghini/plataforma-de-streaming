import React from "react";
import { Card } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";
import AlbPlayPodDetalhe from "../AlbPlayPodDetalhe";
import "./style.css";

export default function Playlists() {
  const { playlists, setComponent, musicas } = useGlobalState();
  function handleClick(playlist) {
    const itens = musicas.slice(playlist.nome.length, playlist.nome.length * 2);
    setComponent(
      <AlbPlayPodDetalhe
        nome={playlist.nome}
        autor={playlist.autor}
        itens={itens}
        imagem={playlist.imagem}
        showAlbum={true}
        quantidade={`${itens.length} ${
          itens.length === 1 ? "música" : "músicas"
        }`}
        descricao={playlist.descricao}
      />
    );
  }
  return (
    <div>
      <h1>Playlists</h1>
      <section id="grid">
        {playlists.map((playlist) => (
          <Card className="item-grid" onClick={(e) => handleClick(playlist)}>
            <img src={playlist.imagem} className="imagem" />
            <label className="info-principal">
              {playlist.nome.length > 15
                ? playlist.nome.substring(0, 15) + "..."
                : playlist.nome}
            </label>

            <label className="info">{playlist.autor}</label>
          </Card>
        ))}
      </section>
    </div>
  );
}
