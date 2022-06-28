import React, { useState, useEffect } from "react";
import { Modal, Box, Typography } from "@material-ui/core";
import { useGlobalState } from "../../hooks/globalState";

import "./style.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function ModalLetra({ open, setOpen }) {
  const { currentSong } = useGlobalState();

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {currentSong && (
          <Typography id="modal-modal-description">
            {Array.from(JSON.parse(currentSong?.lyrics), (o) => o[0]).join(" ")}
          </Typography>
        )}
      </Box>
    </Modal>
  );
}
