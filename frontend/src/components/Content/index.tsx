import { useState } from 'react'
import { DocumentUpload } from '../DocumentUpload'

export const Content = () => {
    const [file, setFile] = useState<File>();
    const [question, setQuestion] = useState('');
    const [chatHistory] = useState([])

    const handleContentFromDocuemnt = async (file: File) => {
        setFile(file)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', 'document_chat');


        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }

    }

    const getAnswer = async (question: string) => {
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

    }

    return (
        <div className='w-full h-screen grid grid-cols-9'>
            <div className='col-span-6 h-full border p-2'>
                <h3>Upload document here</h3>
                <DocumentUpload handleContentFromDocument={handleContentFromDocuemnt} />
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

/*
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Upload extends React.Component {
  processFile = async (e) => {
    var file = e.target.files[0];
    var formdata = new FormData();

    formdata.append("file", file);
    formdata.append("cloud_name", "cloud_name");
    formdata.append("upload_preset", "my_preset");

    let res = await fetch(
      "https://api.cloudinary.com/v1_1/cloud_name/auto/upload",
      {
        method: "post",
        mode: "cors",
        body: formdata
      }
    );

    let json = await res.json();
    console.log(JSON.stringify(json.secure_url));
  };

  render() {
    return (
      <div>
        <h3>Upload</h3>
        <input type="file" onChange={this.processFile} />
      </div>
    );
  }
}
ReactDOM.render(<Upload />, document.getElementById("container"));
*/