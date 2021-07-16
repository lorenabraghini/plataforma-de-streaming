import React from "react";
import { Card } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";
import ItensList from "../ItensList";
import "./style.css";

export default function Albuns() {
  const { albuns } = useGlobalState();
  function handleClick() {
    // setComponent(<ItensList />);
  }
  return (
    <div>
      <h1>Albuns</h1>
      <section id="grid">
        {albuns.map((album) => (
          <Card className="item-grid" onClick={handleClick}>
            <img src={album.imagem} className="imagem" />
            <label className="info-principal">
              {album.nome.length > 15
                ? album.nome.substring(0, 15) + "..."
                : album.nome}
            </label>
            <label className="info">{album.nomeArtista}</label>
          </Card>
        ))}
      </section>
    </div>
  );
}
