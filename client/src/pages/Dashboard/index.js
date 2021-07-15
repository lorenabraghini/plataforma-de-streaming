import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Card } from "@material-ui/core";
import BotoesBarra from "../../components/BotoesBarra";
import ItensGrid from "../../components/ItensGrid";
import ItensList from "../../components/ItensList";
import { useGlobalState } from "../../hooks/globalState";
import "./style.css";
import api from "../../services/api";

export default function Dashboard() {
  const { component, setItens } = useGlobalState();
  const itens = [
    "Playlists",
    "Álbuns",
    "Artistas",
    "Músicas",
    "Podcasts",
    "Configurações",
  ];

  useEffect(() => {
    api.get("/getAlbuns").then((response) => {
      setItens(response.data.albuns);
      console.log(response.data.albuns);
    });
  }, []);

  return (
    <div id="fundo_dashboard">
      <Header />
      <div id="elements">
        <Card id="barra_lateral">
          {itens.map((item) => (
            <BotoesBarra item={item} />
          ))}
        </Card>
        {component}
      </div>
    </div>
  );
}
