import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();


    const handleLogin = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });
            if (!res.ok) {
                throw new Error('Login failed')
            }
            const data = await res.json()
            console.log('Logged in user', data)
            navigate('/home')
        } catch (error) {
            console.log("Error while login", error);
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
            <h2>Signin with social media</h2>
            <div className='w-full flex flex-col items-center justify-start mt-3'>

                <GoogleLogin
                    onSuccess={onSuccessResponse}
                    onError={onFailureResponse}
                    theme='filled_blue'
                    size='large'
                    text="signin_with"
                    shape='pill'
                />

            </div>

            <h2 className='mt-3 mb-2'>Signin with email</h2>
            <div className='flex flex-col items-center justify-start gap-y-3'>
                <input value={email} type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className='border rounded px-3 py-2' />
                <input value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className='border rounded px-3 py-2' />
                <button onClick={handleLogin} className='border rounded bg-green-200 p-1 cursor-pointer'>Login</button>
            </div>
            <p>Don't have account?  <a href="/signup" className="text-blue-500 hover:underline mt-3">Signup</a></p>
        </div >
    )
}