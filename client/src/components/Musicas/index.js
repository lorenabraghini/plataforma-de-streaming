import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

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
