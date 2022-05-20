import { useState, useEffect, useRef } from "react"
import { addDoc, collection, onSnapshot, deleteDoc, doc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

import TheModal from "./modal"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js'

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
            title: title,
            docsDesc: ''
        })
            .then(() => {
                toast.success('The new document is Saved.', {
                    autoClose: 2000
                })
                closeModal()
            })
            .catch(() => {
                toast.error('Cannot save the new document.', {
                    autoClose: 2000
                })
            })
    }
    const deleteTheDoc = (e, id) => {
        e.stopPropagation()
        const document = doc(collectionRef, id)
        deleteDoc(document).then(() => {
            console.log("remove success")
            toast.success('The document is deleted', {
                autoClose: 2000
            })
        }).catch(() => {
            toast.error('The deleting is failed', {
                autoClose: 2000
            })
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
                        <div onClick={() => { getDocId(doc.id) }} key={doc.id} className="grid-child">
                            <p>{doc.title}</p>
                            <div dangerouslySetInnerHTML={{ __html: doc.docsDesc }} />
                            <Icon
                                onClick={(e) => deleteTheDoc(e, doc.id)}
                                path={mdiDelete}
                                size={1}
                                color="gray" />
                        </div>
                    )
                })}
            </div>
            <TheModal isOpen={isOpen} closeModal={closeModal} title={title} setTitle={setTitle} addData={addData} />
            <ToastContainer />
        </div>
    )
}

export default Docs
