import { useState } from 'react'
import { DocumentUpload } from '../DocumentUpload'

export const Content = () => {
    const [fileContent, setFileContent] = useState('')

    const handleContentFromDocuemnt = (content: string) => {
        setFileContent(content)
    }

    return (
        <div className='w-full min-h-screen grid grid-cols-9'>
            <div className='col-span-6 h-full border p-2'>
                <h3>Upload document here</h3>
                <DocumentUpload handleContentFromDocument={handleContentFromDocuemnt} />
                <div className='h-full overflow-y-auto'>
                    {fileContent && <p>{fileContent}</p>}
                </div>
            </div>
            <div className='col-span-3 h-full p-2 border'>
                Chat here
            </div>
        </div>
    )
}