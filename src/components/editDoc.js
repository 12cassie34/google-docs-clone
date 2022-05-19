import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { doc, collection, updateDoc } from "firebase/firestore"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function EditDoc({ database }) {
    let params = useParams()
    const [docsDesc, setDocsDesc] = useState('')
    useEffect(() => {
        console.log("hello")
        const updateDocsData = setTimeout(() => {
            console.log("hell0000000o")
            const document = doc(collectionRef, params.id)
            updateDoc(document, {
                docsDesc: docsDesc
            }).then(() => {
            })
            .catch(() => {
            })
        }, 1000)

        return () => clearTimeout(updateDocsData)
    }, [docsDesc])

    const getQuillData = (value) => {
        setDocsDesc(value)
    }

    const collectionRef = collection(database, 'docsData')

    return (
        <div>
            <h1>Editing</h1>
            <ReactQuill value={docsDesc} onChange={getQuillData} />
        </div>
    )
}

export default EditDoc