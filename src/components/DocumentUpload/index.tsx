import pdfToText from 'react-pdftotext';

export const DocumentUpload = ({ handleContentFromDocument }: { handleContentFromDocument: (content: string) => void }) => {

    const handleSelectedFile = (e) => {
        const file = e.target.files[0];
        // TODO: Upload the file to the server
        pdfToText(file)
            .then(data => handleContentFromDocument(data))
            .catch(error => console.error("Error while extracting", error));
    }

    return (
        <div className='border rounded w-fit'>
            <input type="file" id="fileUpload" accept=".pdf,.docx" onChange={handleSelectedFile} multiple={false} />
        </div>
    )
}