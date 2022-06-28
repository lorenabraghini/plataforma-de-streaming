import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useGlobalState } from "../../hooks/globalState";
import { Button, Card } from "@material-ui/core";
import Header from "../../components/HeaderLogin";
import api from "../../services/api";

import "./style.css";

export default function Login() {
  const { setUsuario } = useGlobalState();
  let history = useHistory();
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [cadastro, setCadastro] = useState(false);
  function handleClick() {
    api
      .post("/getUser", { user })
      .then((result) => {
        console.log(result);
        setUsuario(result.data.user);
        history.push("/dashboard");
      })
      .catch((e) => console.log(e));
  }
  function createUser() {
    setMensagem("");
    const usuario = {
      id: user,
      login: user,
      nome,
      imagem: null,
      qtdSeguidores: 0,
      qtdSeguindo: 0,
    };
    api.post("/insert", { tabela: "Usuario", elemento: usuario }).then(() => {
      setUsuario(usuario);
      history.push("/dashboard");
    });
  }

  return (
    <div id="content">
      <Header />
      <Card id="login">
        {cadastro ? (
          <div>
            <input
              placeholder="usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            ></input>
            <input
              placeholder="senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
              }}
              type="password"
            ></input>
            <input
              placeholder="nome"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
            ></input>
            <div id="loginbtn" onClick={createUser}>
              <Button variant="contained" color="#621527">
                Entrar
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <input
              placeholder="usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            ></input>
            <input
              placeholder="senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
              }}
              type="password"
            ></input>
            <div id="loginbtn" onClick={handleClick}>
              <Button variant="contained" color="#621527">
                Entrar
              </Button>
            </div>
            <div id="cadastrobtn" onClick={(e) => setCadastro(true)}>
              <Button variant="contained" color="#621527">
                Cadastrar-se
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
