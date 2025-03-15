import { useNavigate } from 'react-router-dom'

export const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/v1/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })
            if (res?.ok) {
                navigate('/login')
            }
        } catch (error) {
            console.log('Error while logout', error);
        }
    }

    return (
        <div className="w-full flex items-center justify-between px-3 py-2 bg-amber-100">
            <h1 className='font-semibold'>DocInsightAI</h1>
            <div>
                <button className='px-3 py-2 rounded-2xl bg-blue-300 cursor-pointer' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}
