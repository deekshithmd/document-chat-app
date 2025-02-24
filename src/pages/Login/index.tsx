import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();

    const onSuccessResponse = (response) => {
        console.log('Login Success!', response);
        navigate('/home'); // Redirect the user to the home page
        // TODO: Store the user token in the application state
        // or redirect the user to a different page
    }

    const onFailureResponse = (response) => {
        console.log('Login Failed!', response);
    }

    return (
        <div className='w-full h-full'>
            <h2>Login with Google</h2>
            <GoogleLogin
                onSuccess={onSuccessResponse}
                onError={onFailureResponse} />
        </div>
    )
}