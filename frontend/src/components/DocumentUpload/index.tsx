
export const DocumentUpload = ({ handleContentFromDocument }: { handleContentFromDocument: (file: File) => void }) => {

    const handleSelectedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File = e?.target?.files?.[0];
        // TODO: Upload the file to the server
        handleContentFromDocument(file)
    }

    return (
        <div className='border rounded w-fit'>
            <input type="file" id="fileUpload" accept=".pdf,.docx" onChange={handleSelectedFile} multiple={false} />
        </div>
    )
}