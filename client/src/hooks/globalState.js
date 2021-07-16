import React, { useContext, useState, createContext } from "react";
import Playlists from "../components/Playlists";
const GlobalStateContext = createContext({});

export default function GlobalStateProvider({ children }) {
  //declare variables
  const [selectedCategory, setSelectedCategory] = useState("Playlists");
  const [selectedItem, setSelectedItem] = useState();
  const [musicas, setMusicas] = useState([]);
  const [musicasFiltradas, setMusicasFiltradas] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [users, setUsers] = useState([]);
  const [albuns, setAlbuns] = useState([]);
  const [itens, setItens] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [episodios, setEpisodios] = useState([]);
  const [component, setComponent] = useState(<Playlists />);
  const [search, setSearch] = useState("");
  const [url, setUrl] = useState("");
  const [playingSong, setPlayingSong] = useState(false);

  return (
    <GlobalStateContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedItem,
        setSelectedItem,
        component,
        setComponent,
        musicas,
        setMusicas,
        playlists,
        setPlaylists,
        artistas,
        setArtistas,
        users,
        setUsers,
        albuns,
        setAlbuns,
        podcasts,
        setPodcasts,
        episodios,
        setEpisodios,
        itens,
        setItens,
        search,
        setSearch,
        musicasFiltradas,
        setMusicasFiltradas,
        url,
        setUrl,
        playingSong,
        setPlayingSong,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }

  return context;
}
