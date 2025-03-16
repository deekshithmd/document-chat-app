export const DocumentViewer = ({ documentURL }: { documentURL: string }) => {
    return (
        <iframe
            src={`https://docs.google.com/gview?url=${documentURL}&embedded=true`}
            style={{ width: '100%', height: '100%' }}
            frameBorder="0"
        />
    )
}