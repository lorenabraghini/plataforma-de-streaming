import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Button, Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { useGlobalState } from "../../hooks/globalState";
import ItensGrid from "../ItensGrid";
import ItensList from "../ItensList";
import "./style.css";

export default function BotoesBarra({ item }) {
  const { setSelectedCategory, setComponent } = useGlobalState();
  return (
    <Paper
      elevation={0}
      className="botoes_barra"
      onClick={(e) => {
        item === "Músicas"
          ? setComponent(<ItensList />)
          : setComponent(<ItensGrid />);
        setSelectedCategory(item);
      }}
    >
      {item}
    </Paper>
  );
}
