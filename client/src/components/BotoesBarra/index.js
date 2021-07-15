import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Button, Card } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';

import "./style.css";

export default function BotoesBarra({item}) {
    

  return (
    <Card id="botoes_barra"><p>{item}</p> <Divider id="divider"/></Card>
    
  )}
