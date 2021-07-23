import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Card } from "@material-ui/core";
import BotoesBarra from "../../components/BotoesBarra";
import Player from "../../components/Player";
import { useGlobalState } from "../../hooks/globalState";
import { useHistory } from "react-router-dom";

import "./style.css";
import api from "../../services/api";

export default function Dashboard() {
  const {
    component,
    setItens,
    setMusicas,
    setMusicasFiltradas,
    setPlaylists,
    setArtistas,
    setAlbuns,
    setPlaylistsFiltradas,
    setArtistasFiltrados,
    setAlbunsFiltrados,
    setPodcasts,
    setEpisodios,
    usuario,
  } = useGlobalState();

  let history = useHistory();
  const itens = ["Playlists 2Hear", "Álbuns", "Artistas", "Músicas"];

  useEffect(() => {
    if (!usuario) history.push("/");
  }, []);

  useEffect(() => {
    api.get("/getPlaylists").then((response) => {
      setItens(response.data.playlists);
      setPlaylists(response.data.playlists);
      setPlaylistsFiltradas(response.data.playlists);
      console.log(response.data.playlists);
    });
    api.get("/getAlbuns").then((response) => {
      setAlbuns(response.data.albuns);
      setAlbunsFiltrados(response.data.albuns);
      console.log(response.data.albuns);
    });
    api.get("/getMusic").then((response) => {
      setMusicas(response.data.musicas);
      setMusicasFiltradas(response.data.musicas);
      console.log(response.data.musicas);
    });
    api.get("/getArtists").then((response) => {
      setArtistas(response.data.artistas);
      setArtistasFiltrados(response.data.artistas);
      console.log(response.data.artistas);
    });
    api.get("/getPodcasts").then((response) => {
      setPodcasts(response.data.podcasts);
      console.log(response.data.podcasts);
    });
    api.get("/getEpisodes").then((response) => {
      setEpisodios(response.data.episodios);
      console.log(response.data.episodios);
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
          <Player />
        </Card>
        {component}
      </div>
    </div>
  );
}
