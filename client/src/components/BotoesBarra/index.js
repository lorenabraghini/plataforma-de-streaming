import React from "react";
import { Paper } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";
import ItensGrid from "../ItensGrid";
import ItensList from "../ItensList";
import Playlists from "../Playlists";
import Musicas from "../Musicas";
import Artistas from "../Artistas";
import Albuns from "../Albuns";
import Podcasts from "../Podcasts";
import "./style.css";

export default function BotoesBarra({ item }) {
  const { setComponent } = useGlobalState();

  const itens = {
    Playlists: <Playlists />,
    Álbuns: <Albuns />,
    Artistas: <Artistas />,
    Músicas: <Musicas />,
    Podcasts: <Podcasts />,
    Configurações: <ItensList />,
  };
  return (
    <Paper
      elevation={0}
      className="botoes_barra"
      onClick={(e) => {
        setComponent(itens[item]);
      }}
    >
      {item}
    </Paper>
  );
}
