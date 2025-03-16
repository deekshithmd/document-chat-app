import { DocumentType } from '../../types/document'

export const DocumentList = ({ documents }: { documents: DocumentType[] }) => {

    return (
        <div className='w-full h-auto flex flex-col items-start justify-start gap-2 mt-4'>
            <h3 className='font-semibold text-md mb-2'>Your Documents</h3>
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created On</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {documents?.map((document: DocumentType) => (
                        <tr key={document?.id} className='text-sm text-gray-900'>
                            <td className="px-6 py-4 whitespace-nowrap text-left ">{document?.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{new Date(document?.updatedAt)?.toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left text-blue-600 cursor-pointer">
                                <a href={`/document/${document?.id}`}>View Insights</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}