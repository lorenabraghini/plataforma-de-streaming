import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../hooks/globalState";
import Avatar from "@material-ui/core/Avatar";
import { Card } from "@material-ui/core";
import { Search, Close } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import MinhasPlaylists from "../MinhasPlaylists";
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
    setUsuario,
    setComponent,
  } = useGlobalState();

  let history = useHistory();
  const [open, setOpen] = useState(false);
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
        <Avatar
          id="avatar"
          alt={usuario?.nome}
          src={usuario?.imagem}
          onClick={(e) => setOpen(!open)}
        />
      </header>
      {open ? (
        <div id="configuracoes">
          <p className="user">{usuario.nome}</p>
          <p
            className="playlists"
            onClick={(e) => {
              setComponent(<MinhasPlaylists />);
              setOpen(!open);
            }}
          >
            Playlists
          </p>
          <p
            className="logout"
            onClick={(e) => {
              history.push("/");
              setUsuario(null);
            }}
          >
            Logout
          </p>
        </div>
      ) : null}
    </div>
  );
}
