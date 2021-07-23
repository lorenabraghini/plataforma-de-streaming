import React, { useState, useEffect } from "react";
import Artista from "../Artista";
import MinhasPlaylists from "../MinhasPlaylists";
import { Card } from "@material-ui/core";
import {
  Search,
  Close,
  AddCircleOutline,
  RemoveCircleOutline,
  CheckCircleOutline,
} from "@material-ui/icons";
import { useGlobalState } from "../../hooks/globalState";

import "./style.css";

export default function NovaPlaylist() {
  const { musicas, setComponent, artistas, albuns } = useGlobalState();
  const [nome, setNome] = useState("Minha Playlist");
  const [search, setSearch] = useState("");
  const [addedSongs, setAddedSongs] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (search !== "") {
      const filteredSongs = musicas.filter(
        (musica) =>
          musica.nome.toLowerCase().includes(search.toLowerCase()) ||
          musica.nomeArtista.toLowerCase().includes(search.toLowerCase()) ||
          musica.nomeAlbum.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(filteredSongs);
    } else {
      setFiltered(musicas);
    }
  }, [search]);
  function handleAdd(idMusica) {
    if (addedSongs.some((id) => id === idMusica)) {
      setAddedSongs(removeElement(idMusica));
    } else setAddedSongs([...addedSongs, idMusica]);
  }
  function removeElement(element) {
    let updated = [];
    for (let e of addedSongs) {
      if (element !== e) updated.push(e);
    }
    return updated;
  }

  return (
    <div id="novaPlaylist">
      <div className="info">
        <div id="check">
          <input
            className="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoFocus={true}
          />
          <div
            className="send"
            onClick={(e) => setComponent(<MinhasPlaylists />)}
          >
            <CheckCircleOutline className="icon" />
          </div>
        </div>
        <h3>Por que não adicionar algumas músicas à sua playlist?</h3>
        <Card className="search">
          <div className="icon">
            <Search />
          </div>
          <input value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="close-icon" onClick={(e) => setSearch("")}>
            <Close />
          </div>
        </Card>
        <section id="listnewplaylist">
          {filtered.map((musica) => {
            const album = albuns.filter(
              (album) => album.nome === musica.nomeAlbum
            );

            return (
              <Card className="item-list">
                <div id="playbtn">
                  {addedSongs.some((id) => id === musica.idMusica) ? (
                    <RemoveCircleOutline
                      onClick={(e) => handleAdd(musica.idMusica)}
                    />
                  ) : (
                    <AddCircleOutline
                      onClick={(e) => handleAdd(musica.idMusica)}
                    />
                  )}
                </div>
                <img
                  className="album"
                  src={
                    album[0]
                      ? album[0].imagem
                      : "https://i.scdn.co/image/ab67616d00001e02c95c25c00914c09bb806b39e"
                  }
                />

                <div id="musica-infos">
                  <label className="musica-nome">{musica.nome}</label>
                  <label
                    className="musica-artista"
                    onClick={(e) => {
                      const artista = artistas.filter(
                        (artista) => artista.nome === musica.nomeArtista
                      )[0];
                      return setComponent(
                        <Artista
                          nomeArtista={artista.nome}
                          imagem={artista.imagem}
                          popularidade={artista.ouvintesMensais}
                        />
                      );
                    }}
                  >
                    {musica.nomeArtista}
                  </label>
                </div>

                <label
                  id="info-album"
                  style={{
                    marginLeft: 60,
                    marginRight: 60,
                    width: 350,
                    marginTop: musica.nomeAlbum.length > 25 ? 6 : 15,
                  }}
                >
                  {musica.nomeAlbum}
                </label>
              </Card>
            );
          })}
        </section>
      </div>
    </div>
  );
}
