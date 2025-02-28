import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/v1/user', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });
                if (res.ok) {
                    setIsLoggedIn(true);
                }
                else {
                    setIsLoggedIn(false)
                }

            }
            catch (error) {
                console.log('Error while getting user details', error)
            }
            finally {
                setIsLoading(false);
            }
        }
        checkLoginStatus();
    }, [])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
};
