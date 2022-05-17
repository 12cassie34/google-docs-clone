import { useState } from "react"
import { addDoc, collection } from "firebase/firestore"

import TheModal from "./modal"

function Docs({ database }) {
    const [isOpen, setOpen] = useState(false)
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    const [title, setTitle] = useState('')

    const collectionRef = collection(database, 'docsData')
    const addData = () => {
        addDoc(collectionRef, {
            title: title
        })
            .then(() => {
                alert('Data Added')
                closeModal()
            })
            .catch(() => {
                alert('Cannot add data')
            })
    }

    return (
        <div className="docs-main">
            <button onClick={openModal} className="add-docs">
                Add a Document
            </button>
            <TheModal isOpen={isOpen} closeModal={closeModal} title={title} setTitle={setTitle} addData={addData} />
        </div>
    )
}

export default Docs
