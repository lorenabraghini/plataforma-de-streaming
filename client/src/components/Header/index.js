import React, { useEffect } from "react";
import { useGlobalState } from "../../hooks/globalState";
import Avatar from "@material-ui/core/Avatar";
import { Card } from "@material-ui/core";

import { Search, Close } from "@material-ui/icons";

import "./style.css";

export default function Header() {
  const {
    musicas,
    search,
    setSearch,
    setMusicasFiltradas,
    playlists,
    setPlaylistsFiltradas,
    albuns,
    setAlbunsFiltrados,
    artistas,
    setArtistasFiltrados,
    usuario,
  } = useGlobalState();

  useEffect(() => {
    if (search !== "") {
      const filteredSongs = musicas.filter(
        (musica) =>
          musica.nome.toLowerCase().includes(search.toLowerCase()) ||
          musica.nomeArtista.toLowerCase().includes(search.toLowerCase())
      );
      setMusicasFiltradas(filteredSongs);
      const filteredPlaylists = playlists.filter((playlist) =>
        playlist.nome.toLowerCase().includes(search.toLowerCase())
      );
      setPlaylistsFiltradas(filteredPlaylists);
      const filteredAlbuns = albuns.filter(
        (album) =>
          album.nome.toLowerCase().includes(search.toLowerCase()) ||
          album.nomeArtista.toLowerCase().includes(search.toLowerCase())
      );
      setAlbunsFiltrados(filteredAlbuns);
      const filteredArtists = artistas.filter((artista) =>
        artista.nome.toLowerCase().includes(search.toLowerCase())
      );
      setArtistasFiltrados(filteredArtists);
    } else {
      setMusicasFiltradas(musicas);
      setPlaylistsFiltradas(playlists);
      setAlbunsFiltrados(albuns);
      setArtistasFiltrados(artistas);
    }
  }, [search]);

  return (
    <div>
      <header id="header">
        <h1>2Hear</h1>
        <Card className="search">
          <div className="icon">
            <Search />
          </div>
          <input value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="close-icon" onClick={(e) => setSearch("")}>
            <Close />
          </div>
        </Card>
        <Avatar id="avatar" alt="Remy Sharp" src={usuario.imagem} />
      </header>
    </div>
  );
}
