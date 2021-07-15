import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";
import ItensList from "../ItensList";
import "./style.css";

export default function ItensGrid() {
  const { selectedCategory, setComponent } = useGlobalState();
  function handleClick() {
    setComponent(<ItensList />);
  }
  return (
    <div>
      <h1>{selectedCategory}</h1>
      <section id="grid">
        <Card className="item-grid" onClick={handleClick}></Card>
        <Card className="item-grid" onClick={handleClick}></Card>
        <Card className="item-grid" onClick={handleClick}></Card>
        <Card className="item-grid" onClick={handleClick}></Card>
        <Card className="item-grid" onClick={handleClick}></Card>
        <Card className="item-grid" onClick={handleClick}></Card>
        <Card className="item-grid" onClick={handleClick}></Card>
        <Card className="item-grid" onClick={handleClick}></Card>
        <Card className="item-grid" onClick={handleClick}></Card>
        <Card className="item-grid"></Card>
        <Card className="item-grid"></Card>
        <Card className="item-grid"></Card>
        <Card className="item-grid"></Card>
        <Card className="item-grid"></Card>
        <Card className="item-grid"></Card>
        <Card className="item-grid"></Card>
      </section>
    </div>
  );
}
