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
  const [user, setUser] = useState("usuário");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("Nome");
  const [encryptedText, setEncryptedText] = useState("senha");
  const [mensagem, setMensagem] = useState("");
  const [cadastro, setCadastro] = useState(false);
  function handleClick() {
    api.post("/getUser", { user }).then((result) => {
      setUsuario(result.data.user);
      history.push("/dashboard");
    });
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

  useEffect(() => {
    let encrypted = "";
    if (senha !== "") {
      senha.split(" ").map((word) => {
        encrypted += word.replace(/./gim, "*") + " ";
        return encrypted;
      });
      setEncryptedText(encrypted);
    }
  }, [senha]);

  return (
    <div id="content">
      <Header />
      <Card id="login">
        {cadastro ? (
          <div>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
            ></input>
            <input
              value={encryptedText}
              onChange={(e) => {
                setSenha(e.target.value);
                setEncryptedText(e.target.value);
              }}
            ></input>
            <input
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
              value={user}
              onChange={(e) => setUser(e.target.value)}
            ></input>
            <input
              value={encryptedText}
              onChange={(e) => {
                setSenha(e.target.value);
                setEncryptedText(e.target.value);
              }}
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
