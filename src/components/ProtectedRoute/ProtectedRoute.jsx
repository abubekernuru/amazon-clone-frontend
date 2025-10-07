import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { DataContext } from '../DataProvider/DataProvider';

function ProtectedRoute({ children, msg, redirect }) {
    const navigate = useNavigate();
    const [{ user }] = useContext(DataContext);

useEffect(() => {
    if (!user) {
        navigate("/auth", { state: { msg, redirect } });
    }
    }, [user, navigate, msg, redirect]); 
    return user ? children : null;
}

export default ProtectedRoute;
