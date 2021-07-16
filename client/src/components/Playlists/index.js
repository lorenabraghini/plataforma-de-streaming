import React from "react";
import { Card } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";
import ItensList from "../ItensList";
import "./style.css";

export default function Playlists() {
  const { playlists } = useGlobalState();
  function handleClick() {
    // setComponent(<ItensList />);
  }
  return (
    <div>
      <h1>Playlists</h1>
      <section id="grid">
        {playlists.map((playlist) => (
          <Card className="item-grid" onClick={handleClick}>
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
