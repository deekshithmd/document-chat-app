import { useRef, useState } from 'react';

export const DocumentUpload = ({ getDocuments }: { getDocuments: () => void }) => {
    const [isUploading, setIsUploading] = useState(false)
    const uploadRef = useRef<HTMLInputElement>(null)

    const handleSelectedFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e?.target?.files?.[0];
        if (file) {
            setIsUploading(true)
            // TODO: Upload the file to the server
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
            formData.append('folder', 'doc_insight_ai');

            try {
                const res = await fetch(
                    `${import.meta.env.VITE_CLOUDINARY_API_URL}/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                const data = await res.json();
                const docUrl = data?.secure_url;
                if (docUrl) {
                    await fetch('http://localhost:5000/api/v1/document/upload', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ url: docUrl, fileName: file?.name }),
                        credentials: 'include'
                    })
                    setIsUploading(false)
                    getDocuments()
                }

            } catch (err) {
                console.log(err);
            }

        }
    }

    const handleUploadClick = () => {
        uploadRef.current?.click()
    }

    return (
        <div className='w-full h-56 border border-dashed p-4 flex items-center justify-center '>
            <div className='w-fit px-4 py-2 cursor-pointer rounded bg-blue-500 text-white'>
                {isUploading ? <p>Uploading...</p> :
                    <label htmlFor="fileUpload" className='cursor-pointer' onChange={handleUploadClick}>
                        Upload
                        <input type="file" id="fileUpload" accept=".pdf" multiple={false} ref={uploadRef} onChange={handleSelectedFile} className='hidden' />
                    </label>
                }
            </div>
        </div>
    )
}
