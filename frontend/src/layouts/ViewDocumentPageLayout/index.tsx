import { useEffect, useState } from 'react'
import { DocInsightSection } from '../../components/DocInsightSection'
import { DocumentViewer } from '../../components/DocumentViewer'
import { DocumentType } from '../../types/document'
import { useParams } from 'react-router-dom'

export const ViewDocumentPageLayout = () => {
    const [document, setDocument] = useState<DocumentType>({ title: '', docUrl: '', summary: '', id: 0, userId: 0, updatedAt: '' })
    const { docId } = useParams()

    useEffect(() => {
        getDocument()
    }, [])

    const getDocument = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/v1/document/${docId}`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await res.json();
            setDocument(data?.document)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='w-full h-[92vh] overflow-y-auto grid grid-cols-10'>
            <div className='col-span-6'>
                <DocumentViewer documentURL={document?.docUrl} />
            </div>
            <div className='col-span-4 border-l'>
                <DocInsightSection document={document} />
            </div>
        </div>
    )
}