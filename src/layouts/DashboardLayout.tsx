import { SideMenu } from '../components';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store';

export const DashboardLayout = () => {
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

    if (authStatus === 'unauthenticated') {
        return <Navigate to="/auth/login" />
    }

    return (
        <div className="bg-slate-200 overflow-y-scroll w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white">
            <div className="flex flex-row relative w-screen">
                <SideMenu />
                <div className="w-full p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};