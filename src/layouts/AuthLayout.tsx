import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store';

export const AuthLayout = () => {
    const authStatus = useAuthStore(state => state.status);
    const checkAuthStatus = useAuthStore(state => state.checkAuthStatus);

    if (authStatus === 'checking') {
        checkAuthStatus();
        return (
            <div className="flex items-center justify-center w-screen h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (authStatus === 'authenticated') {
        return <Navigate to="/dashboard" />
    }

    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen hidden lg:flex lg:flex-col items-center justify-center bg-indigo-700">
                <span className="text-white font-bold text-9xl">Zustand</span>
                {/* <img src="https://placehold.co/1440/667fff/ffffff.png?text=Zustand&font=Montserrat"
          alt="Placeholder Image"
          className="object-cover w-full h-full" /> */}
            </div>
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <Outlet />
            </div>
        </div>
    );
};