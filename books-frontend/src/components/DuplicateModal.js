import * as React from "react";
import { Box, Button, Typography, Modal, Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
};

const DuplicateModal = ({ open, handleClose }) => {
  return (
    <div>
      {" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            There is already a book with this title.
          </Typography>
          <Grid container>
            <Grid item sm={2} sx={{ margin: "10px" }}>
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{ fontSize: "10px" }}
              >
                Okay
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default DuplicateModal;
