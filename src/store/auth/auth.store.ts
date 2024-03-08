import { StateCreator, create } from 'zustand';
import type { AuthStatus, User } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { devtools, persist } from 'zustand/middleware';

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    loginUser: (email: string, password: string) => Promise<void>;
    checkAuthStatus: () => Promise<void>;
    logoutUser: () => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
    status: 'checking',
    token: undefined,
    user: undefined,
    loginUser: async (email: string, password: string) => {
        try {
            const { token, ...user } = await AuthService.login(email, password);
            set({ status: 'authenticated', token, user });
        } catch (error) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            throw 'Unauthenticated';
        }
    },
    checkAuthStatus: async () => {
        try {
            const { token, ...user } = await AuthService.checkStatus();
            set({ status: 'authenticated', token, user });
        } catch (error) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
        }
    },
    logoutUser: () => {
        set({ status: 'unauthenticated', token: undefined, user: undefined });
    }
});

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            storeApi,
            { name: 'auth-store'}
        )
    )
);