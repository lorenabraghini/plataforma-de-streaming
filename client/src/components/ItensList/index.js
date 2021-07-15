import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";
import "./style.css";

export default function ItensList() {
  const { selectedCategory } = useGlobalState();
  return (
    <div>
      <h1>{selectedCategory}</h1>
      <section id="list">
        <Card className="item-list"></Card>
        <Card className="item-list"></Card>
        <Card className="item-list"></Card>
        <Card className="item-list"></Card>
        <Card className="item-list"></Card>
        <Card className="item-list"></Card>
        <Card className="item-list"></Card>
        <Card className="item-list"></Card>
        <Card className="item-list"></Card>
        <Card className="item-list"></Card>
        <Card className="item-list"></Card>
        <Card className="item-list"></Card>
        <Card className="item-list"></Card>
        <Card className="item-list"></Card>
        <Card className="item-list"></Card>
        <Card className="item-list"></Card>
      </section>
    </div>
  );
}
