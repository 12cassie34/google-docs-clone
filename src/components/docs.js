import { useState } from "react";

import TheModal from "./modal";

function Docs() {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className="docs-main">
      <button onClick={openModal} className="add-docs">
        Add a Document
      </button>
      <TheModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}

export default Docs;
