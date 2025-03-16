import { useState } from 'react';
import { DocumentType } from '../../types/document';

export const DocInsightSection = ({ document }: { document: DocumentType }) => {
    const [activeTab, setActiveTab] = useState('summary');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    // const getAnswer = async (question: string) => {
    // try {
    //     // TODO: Call the API to get the answer based on the uploaded document and the question
    //     const response = await fetch(`http://localhost:9000/api/v1/chat`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' }
    //         ,
    //         body: JSON.stringify({ baseContent: fileContent, question })
    //     })
    //     const data = await response.json();
    //     setChatHistory(data?.history);
    //     setQuestion('');
    // } catch (error) {
    //     console.error("Error while fetching answer", error);
    // }

    // }

    return (
        <div className='w-full h-full'>
            <div className='w-full flex border-b'>
                <button
                    className={`w-1/2 px-4 py-2 ${activeTab === 'summary' ? 'bg-gray-200 border-b-2 border-blue-500' : ''}`}
                    onClick={() => handleTabClick('summary')}
                >
                    Summary
                </button>
                <button
                    className={`w-1/2 px-4 py-2 ${activeTab === 'chat' ? 'bg-gray-200 border-b-2 border-blue-500' : ''}`}
                    onClick={() => handleTabClick('chat')}
                >
                    Chat
                </button>
            </div>
            {activeTab === 'summary' && <div className='py-4 px-6'>
                <h3 className='text-lg font-semibold mb-4 text-left'>Short summary of your document is here</h3>
                <div className='w-full h-auto text-justify box-border'>{document?.summary}</div>
            </div>}
            {activeTab === 'chat' && <div>
                {/* <div className='w-full h-full'>
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

                </div> */}
            </div>}
        </div>
    )
}
