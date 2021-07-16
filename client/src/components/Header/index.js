import React, { useEffect } from "react";
import { useGlobalState } from "../../hooks/globalState";
import Avatar from "@material-ui/core/Avatar";
import { Card } from "@material-ui/core";

import { Search } from "@material-ui/icons";

import "./style.css";

export default function Header() {
  const { musicas, search, setSearch, setMusicasFiltradas } = useGlobalState();
  useEffect(() => {
    if (search !== "") {
      const filteredSongs = musicas.filter(
        (musica) =>
          musica.nome.toLowerCase().includes(search.toLowerCase()) ||
          musica.nomeArtista.toLowerCase().includes(search.toLowerCase())
      );
      setMusicasFiltradas(filteredSongs);
    } else setMusicasFiltradas(musicas);
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
        </Card>
        <Avatar
          id="avatar"
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
      </header>
    </div>
  );
}
