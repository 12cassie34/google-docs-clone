import { useState, useEffect, useRef } from "react"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

import TheModal from "./modal"

function Docs({ database }) {
    const [isOpen, setOpen] = useState(false)
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    const [title, setTitle] = useState('')

    const [docsData, setDocsDate] = useState([])
    let navigate = useNavigate()
    const getDocId = (docId) => {
        navigate(`/editDoc/${docId}`)
    }

    const collectionRef = collection(database, 'docsData')
    const getData = () => {
        onSnapshot(collectionRef, (data) => {
            setDocsDate(data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            }))
        })
    }
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

    const isMounted = useRef()
    useEffect(() => {
        if (isMounted.current) return
        isMounted.current = true
        getData()
    }, [])

    return (
        <div className="docs-main">
            <button onClick={openModal} className="add-docs">
                Add a Document
            </button>
            <div className="grid-main">
                {docsData.map((doc) => {
                    return (
                        <div onClick={() => {getDocId(doc.id)}} key={doc.id} className="grid-child">
                            <p>{doc.title}</p>
                        </div>
                    )
                })}
            </div>
            <TheModal isOpen={isOpen} closeModal={closeModal} title={title} setTitle={setTitle} addData={addData} />
        </div>
    )
}

export default Docs
