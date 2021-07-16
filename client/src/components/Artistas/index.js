import React from "react";
import { Card } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";
import ItensList from "../ItensList";
import "./style.css";

export default function Artistas() {
  const { artistas } = useGlobalState();
  function handleClick() {
    // setComponent(<ItensList />);
  }
  return (
    <div>
      <h1>Artistas</h1>
      <section id="grid">
        {artistas.map((artista) => (
          <Card className="item-grid" onClick={handleClick}>
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
