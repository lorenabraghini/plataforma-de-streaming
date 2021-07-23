import React from "react";
import { Card } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";
import AlbPlayPodDetalhe from "../AlbPlayPodDetalhe";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import NovaPlaylist from "../../components/NovaPlaylist";

import "./style.css";
export default function Playlists() {
  const { playlists, setComponent, musicas, usuario } = useGlobalState();
  function handleClick(playlist) {
    const itens = musicas.filter((musica) =>
      playlist.musicas.includes(musica.idMusica)
    );
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
  const minhasPlaylists = playlists.filter(
    (playlist) => playlist.autor === usuario.id
  );
  return (
    <div>
      <div id="playlistsuser">
        <h1>Minhas Playlists</h1>
        <div onClick={(e) => setComponent(<NovaPlaylist />)}>
          <AddCircleOutlineIcon className="add" />
        </div>
      </div>

      <section id="grid">
        {minhasPlaylists.map((playlist) => (
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
