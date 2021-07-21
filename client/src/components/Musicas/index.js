import React from "react";

import { useGlobalState } from "../../hooks/globalState";

import Musica from "../Musica";
import "./style.css";

export default function Musicas() {
  const { musicasFiltradas } = useGlobalState();

  return (
    <div>
      <h1>Musicas</h1>
      <section id="list">
        {musicasFiltradas.map((musica, index) => (
          <Musica musica={musica} index={index} showAlbum={true} />
        ))}
      </section>
    </div>
  );
}
