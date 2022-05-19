import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { doc, collection, updateDoc, onSnapshot } from "firebase/firestore"

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditDoc({ database }) {
    let params = useParams()
    const [docsTitle, setDocsTitle] = useState('')
    const [docsDesc, setDocsDesc] = useState('')
    useEffect(() => {
        const updateDocsData = setTimeout(() => {
            const document = doc(collectionRef, params.id)
            updateDoc(document, {
                docsDesc: docsDesc
            }).then(() => {
                toast.success('Document Saved', {
                    autoClose: 2000
                })
            })
            .catch(() => {
                toast.error('Cannot Save Document', {
                    autoClose: 2000
                })
            })
        }, 1000)

        return () => clearTimeout(updateDocsData)
    }, [docsDesc])

    const isMounted = useRef()
    useEffect(() => {
        if (isMounted.current) return

        isMounted.current = true
        getData()
    }, [])

    const getQuillData = (value) => {
        setDocsDesc(value)
    }

    const collectionRef = collection(database, 'docsData')

    const getData = () => {
        const document = doc(collectionRef, params.id)
        onSnapshot(document, (docs) => {
            const docsData = docs.data()
            setDocsTitle(docsData.title)
            setDocsDesc(docsData.docsDesc)
        })
    }

    return (
        <div className='editDocs-container'>
            <h1>{docsTitle}</h1>
            <div className='editDocs-inner'>
                <ReactQuill value={docsDesc} onChange={getQuillData} className='react-quill' />
            </div>
            <ToastContainer />
        </div>
    )
}

export default EditDoc