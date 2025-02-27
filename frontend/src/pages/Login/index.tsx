import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userName, setUserName] = useState<string>('')
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/v1/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name: userName })
            });
            if (!res.ok) {
                throw new Error("Signup Failed");
            }
            const data = await res.json();
            console.log("User created successfully", data);
            //navigate('/home'); // Redirect the user to the home page
        }
        catch (error) {
            console.error("Error while signup", error);
        }
    }

    const onSuccessResponse = (response: CredentialResponse) => {
        console.log('Login Success!', response);
        navigate('/home'); // Redirect the user to the home page
        // TODO: Store the user token in the application state
        // or redirect the user to a different page
    }

    const onFailureResponse = () => {
        console.log('Login Failed!');
    }

    return (
        <div className='w-full h-full'>
            <h2>Signup with social media</h2>
            <div className='w-full flex flex-col items-center justify-start mt-3'>

                <GoogleLogin
                    onSuccess={onSuccessResponse}
                    onError={onFailureResponse}
                    theme='filled_blue'
                    size='large'
                    text="signup_with"
                    shape='pill'
                />

            </div>

            <h2 className='mt-3 mb-2'>Signup with email</h2>
            <div className='flex flex-col items-center justify-start gap-y-3'>
                <input value={userName} type="text" placeholder="FullName" onChange={(e) => setUserName(e.target.value)} className='border rounded px-3 py-2' />
                <input value={email} type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className='border rounded px-3 py-2' />
                <input value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className='border rounded px-3 py-2' />
                <button onClick={handleSignup} className='border rounded bg-green-200 p-1 cursor-pointer'>Signup</button>
            </div>
        </div>
    )
}