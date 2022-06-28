import React, { useState } from "react";

import { useGlobalState } from "../../hooks/globalState";
import Artista from "../Artista";
import Modal from "../Modal";
import ReactPlayer from "react-player";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import Mic from "@material-ui/icons/Mic";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";

import "./style.css";

export default function Player() {
  const {
    url,
    playingSong,
    setPlayingSong,
    currentSong,
    artistas,
    setComponent,
    albuns,
  } = useGlobalState();
  const [volume, setVolume] = useState(0.5);
  const [open, setOpen] = useState(false);
  const album = currentSong
    ? albuns.filter((album) => album.nome === currentSong.nomeAlbum)
    : null;

  const handleChange = (event, newValue) => {
    setVolume(newValue);
  };

  return (
    <div id="currentSong">
      {currentSong ? (
        <div>
          <img id="currentSongImg" src={album[0].imagem} />
          <div id="labels">
            <label>
              {currentSong.nome.length > 25
                ? currentSong.nome.substring(0, 25) + "..."
                : currentSong.nome}
            </label>
            <label
              className="artista"
              onClick={(e) => {
                const artista = artistas.filter(
                  (artista) => artista.nome === currentSong.nomeArtista
                )[0];
                return artista
                  ? setComponent(
                      <Artista
                        nomeArtista={artista.nome}
                        imagem={artista.imagem}
                        popularidade={artista.ouvintesMensais}
                      />
                    )
                  : null;
              }}
            >
              {currentSong.nomeArtista}
            </label>
          </div>
          <div id="controls">
            <div>
              <SkipPreviousIcon color="action" fontSize="large" />
            </div>
            <div onClick={(e) => setPlayingSong(!playingSong)}>
              {playingSong ? (
                <PauseCircleOutlineIcon color="action" fontSize="large" />
              ) : (
                <PlayCircleOutlineIcon color="action" fontSize="large" />
              )}
            </div>
            <div>
              <SkipNextIcon color="action" fontSize="large" />
            </div>
            <div onClick={() => setOpen(true)}>
              <Mic color="action" fontSize="medium" />
            </div>
          </div>
          <Grid container spacing={2}>
            <Grid item>
              <VolumeDown color="action" />
            </Grid>
            <Grid item xs>
              <Slider
                value={volume}
                onChange={handleChange}
                aria-labelledby="continuous-slider"
                min={0}
                max={1}
                step={0.00000001}
              />
            </Grid>
            <Grid item>
              <VolumeUp color="action" />
            </Grid>
          </Grid>
        </div>
      ) : null}
      <div hidden>
        <ReactPlayer
          url={url}
          playing={playingSong}
          volume={volume}
          onEnded={(e) => setPlayingSong(false)}
        />
      </div>
      <Modal open={open} setOpen={setOpen} />
    </div>
  );
}
