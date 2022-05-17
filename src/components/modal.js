import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TheModal(props) {
  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={props.closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <input placeholder="Add the Title" className="add-input" />
          <div className="button-container">
            <button className="add-docs">Add</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default TheModal;
