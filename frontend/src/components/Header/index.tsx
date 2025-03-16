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

    const handleNavigateToHome = () => {
        navigate('/home')
    }

    return (
        <div className="w-full h-[8vh] flex items-center justify-between px-3 bg-amber-100 sticky top-0 z-10">
            <h1 className='font-semibold text-2xl cursor-pointer' onClick={handleNavigateToHome}>DocInsightAI</h1>
            <div>
                <button className='px-3 py-2 rounded-2xl bg-blue-300 cursor-pointer' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}
