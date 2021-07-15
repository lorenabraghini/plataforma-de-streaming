import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Card } from "@material-ui/core";
import BotoesBarra from "../../components/BotoesBarra";
import ItensGrid from "../../components/ItensGrid";
import ItensList from "../../components/ItensList";
import { useGlobalState } from "../../hooks/globalState";
import "./style.css";

export default function Dashboard() {
  const { component } = useGlobalState();
  const itens = [
    "Playlists",
    "Álbuns",
    "Artistas",
    "Músicas",
    "Podcasts",
    "Configurações",
  ];
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
