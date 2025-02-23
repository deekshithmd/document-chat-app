import { useState } from 'react'
import { DocumentUpload } from '../DocumentUpload'

export const Content = () => {
    const [fileContent, setFileContent] = useState('');
    const [question, setQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState([{ question: 'sample quation', answer: 'sample answer' }])

    const handleContentFromDocuemnt = (content: string) => {
        setFileContent(content)
    }

    const getAnswer = async (question: string) => {
        try {
            // TODO: Call the API to get the answer based on the uploaded document and the question
            const response = await fetch(`http://localhost:9000/api/v1/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
                ,
                body: JSON.stringify({ baseContent: fileContent, question })
            })
            const data = await response.json();
            setChatHistory(data?.history);
            setQuestion('');
        } catch (error) {
            console.error("Error while fetching answer", error);
        }

    }

    return (
        <div className='w-full h-screen grid grid-cols-9'>
            <div className='col-span-6 h-full border p-2'>
                <h3>Upload document here</h3>
                <DocumentUpload handleContentFromDocument={handleContentFromDocuemnt} />
                <div className='h-full overflow-y-auto'>
                    {fileContent && <p>{fileContent}</p>}
                </div>
            </div>
            <div className='col-span-3 h-full p-2 border'>
                Chat here
                <div className='w-full h-full'>
                    <div className='w-full h-[85%] border overflow-y-auto'>
                        {chatHistory?.map((message: { question: string, answer: string }, index) => (
                            <div key={index} className={`h-auto flex flex-col justify-start gap-y-2 p-2 relative mb-10`}>
                                <p className='bg-blue-100 rounded py-1 px-2 max-w-3/4 self-end text-right'>{message?.question}</p>
                                <p className='bg-green-100 rounded py-1 px-2 max-w-3/4 self-start text-left'>{message?.answer}</p>
                            </div>
                        ))}
                    </div>
                    <div className='w-full border h-[8%] flex items-center justify-between gap-2 p-3'>
                        <input type='text' value={question} placeholder='Ask a question' onChange={(e) => setQuestion(e.target.value)} className='border rounded p-1 flex-1' />
                        <button className='border rounded bg-green-200 p-1' onClick={() => getAnswer(question)}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}