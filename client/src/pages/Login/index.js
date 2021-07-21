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
  const [encryptedText, setEncryptedText] = useState("senha");
  function handleClick() {
    api.post("/getUser", { user }).then((result) => {
      setUsuario(result.data.user);
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
        <div>
          <input value={user} onChange={(e) => setUser(e.target.value)}></input>
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
        </div>
      </Card>
    </div>
  );
}
