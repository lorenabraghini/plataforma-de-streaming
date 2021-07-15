import React from "react";
import { useGlobalState } from "../../hooks/globalState";
import Avatar from '@material-ui/core/Avatar';

import "./style.css";

export default function Header() {
  return (
    <div>
      <header id="header">
        <h1>2Hear</h1>
        <Avatar id="avatar" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </header>
    </div>
  );
}
