import React from "react";
import { Card } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";
import AlbPlayPodDetalhe from "../AlbPlayPodDetalhe";
import Artista from "../Artista";
import "./style.css";

export default function Albuns() {
  const { albuns, setComponent, musicas, artistas } = useGlobalState();
  function handleClick(album) {
    console.log(album);
    const itens = musicas.filter((musica) => musica.nomeAlbum === album.nome);
    setComponent(
      <AlbPlayPodDetalhe
        nome={album.nome}
        autor={album.nomeArtista}
        itens={itens}
        imagem={album.imagem}
        quantidade={`${itens.length} ${
          itens.length === 1 ? "música" : "músicas"
        }`}
        showAlbum={false}
      />
    );
  }
  return (
    <div>
      <h1>Albuns</h1>
      <section id="grid">
        {albuns.map((album) => (
          <Card className="item-grid">
            <img
              src={album.imagem}
              className="imagem"
              onClick={(e) => handleClick(album)}
            />
            <label
              className="info-principal"
              onClick={(e) => handleClick(album)}
            >
              {album.nome.length > 15
                ? album.nome.substring(0, 15) + "..."
                : album.nome}
            </label>
            <label
              className="info"
              onClick={(e) => {
                const artista = artistas.filter(
                  (artista) => artista.nome === album.nomeArtista
                )[0];
                return setComponent(
                  <Artista
                    nomeArtista={artista.nome}
                    imagem={artista.imagem}
                    popularidade={artista.ouvintesMensais}
                  />
                );
              }}
            >
              {album.nomeArtista}
            </label>
          </Card>
        ))}
      </section>
    </div>
  );
}
