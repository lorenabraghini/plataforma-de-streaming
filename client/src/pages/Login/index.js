import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../hooks/globalState";
import { Button, Card } from "@material-ui/core";
import Header from "../../components/Header";
import api from "../../services/api";

import "./style.css";

export default function Login() {
  const {} = useGlobalState();
  const [usuario, setUsuario] = useState("usuário");
  const [senha, setSenha] = useState("senha");
  useEffect(() => {}, []);

  return (
    <div
      id="content"
      style={{ backgroundImage: `${process.env.PUBLIC_URL}/unknown.png` }}
    >
      <Header />
      <Card id="login">
        <div>
          <input
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          ></input>
          <input
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          ></input>
          <div id="loginbtn">
            <Button variant="contained" color="#621527">
              Entrar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
