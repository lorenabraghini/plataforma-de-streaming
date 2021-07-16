import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";
import AlbPlayPodDetalhe from "../AlbPlayPodDetalhe";
import "./style.css";

export default function Artista({ nomeArtista, imagem, popularidade }) {
  const { albuns, musicas, setComponent } = useGlobalState();

  function handleClick(album) {
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
      <div id="album-infos">
        <img src={imagem} />
        <div>
          <label>{nomeArtista}</label>
          <p>Popularidade: {popularidade}</p>
        </div>
      </div>
      <section id="grid">
        {albuns
          .filter((album) => album.nomeArtista === nomeArtista)
          .map((item) => {
            console.log(item);
            return (
              <Card className="item-grid" onClick={(e) => handleClick(item)}>
                <img src={item.imagem} className="imagem" />
                <label className="info-principal">{item.nome}</label>
              </Card>
            );
          })}
      </section>
    </div>
  );
}
