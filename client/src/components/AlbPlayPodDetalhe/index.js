import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";
import ReactPlayer from "react-player";
import Musica from "../Musica";
import "./style.css";

export default function AlbPlayPodDetalhe({
  nome,
  autor,
  itens,
  imagem,
  quantidade,
  showAlbum,
  descricao,
}) {
  return (
    <div>
      <div id="album-infos">
        <img src={imagem} />
        <div>
          <label>{nome}</label>
          {descricao ? <p id="descricao">{descricao}</p> : null}
          <p>
            {autor} - {quantidade}
          </p>
        </div>
      </div>
      <section id="list">
        {itens.map((musica, index) => (
          <Musica musica={musica} index={index} showAlbum={showAlbum} />
        ))}
      </section>
    </div>
  );
}
