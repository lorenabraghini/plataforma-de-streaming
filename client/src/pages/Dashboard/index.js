import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Button, Card } from "@material-ui/core";
import BotoesBarra from "../../components/BotoesBarra";
import { Divider } from "@material-ui/core";


import "./style.css";
import { array } from "prop-types";


export default function Dashboard() {
    
  const itens = ['Playlist','Álbuns','Artistas','Músicas','Podcasts','Configurações']
  return (
    <div
    id="fundo_dashboard"
    >
      <Header />
        <Card id="barra_lateral"> <Divider id="prim_divider"/>
        {itens.map(item =>
        <BotoesBarra item={item}/>
          )}
        </Card>
    </div>
  )}
