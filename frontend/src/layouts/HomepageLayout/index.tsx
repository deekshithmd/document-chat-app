import { useEffect, useState } from 'react'
import { DocumentList } from '../../components/DocumentList'
import { DocumentUpload } from '../../components/DocumentUpload'
import { DocumentType } from '../../types/document'


export const HomepageLayout = () => {
    const [documents, setDocuments] = useState<DocumentType[]>([])


    useEffect(() => {
        getDocuments()
    }, [])


    const getDocuments = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/v1/document', {
                method: 'GET',
                credentials: 'include'
            })
            const data = await res.json();
            setDocuments(data?.documents)
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='w-full h-[92vh] grid grid-cols-9'>
            <div className='col-span-7 h-full p-2'>
                <DocumentUpload getDocuments={getDocuments} />
                <DocumentList documents={documents} />
            </div>
            <div className='col-span-2 h-full p-2 border-l'>

            </div>
        </div>
    )
}