import React from "react";
import { Card } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";
import Artista from "../Artista";
import "./style.css";

export default function Artistas() {
  const { artistas, setComponent } = useGlobalState();
  function handleClick(artista) {
    setComponent(
      <Artista
        nomeArtista={artista.nome}
        imagem={artista.imagem}
        popularidade={artista.ouvintesMensais}
      />
    );
  }
  return (
    <div>
      <h1>Artistas</h1>
      <section id="grid">
        {artistas.map((artista) => (
          <Card className="item-grid" onClick={(e) => handleClick(artista)}>
            <img src={artista.imagem} className="imagem" />
            <label className="info-principal">
              {artista.nome.length > 15
                ? artista.nome.substring(0, 15) + "..."
                : artista.nome}
            </label>
            <label className="info">{artista.autor}</label>
          </Card>
        ))}
      </section>
    </div>
  );
}
