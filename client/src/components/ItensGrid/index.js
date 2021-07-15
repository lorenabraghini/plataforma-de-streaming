import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";
import ItensList from "../ItensList";
import "./style.css";

export default function ItensGrid() {
  const { selectedCategory, setComponent, itens, nome, descricao } =
    useGlobalState();
  function handleClick() {
    setComponent(<ItensList />);
  }
  return (
    <div>
      <h1>{selectedCategory}</h1>
      <section id="grid">
        {itens.map((item) => (
          <Card className="item-grid" onClick={handleClick}>
            <img src={item.imagem} className="imagem" />
            <label className="info-principal">{item[nome]}</label>
            {descricao ? (
              <label className="info">{item[descricao]}</label>
            ) : null}
          </Card>
        ))}
      </section>
    </div>
  );
}
