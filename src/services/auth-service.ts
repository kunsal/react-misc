import baseService from '../config/base-service';
import authService, { refreshToken } from '../config/authenticated-service';
import store from '../store';
import { setTokens, setUserData } from '../store/slices/auth-slice';

export interface LoginRequest {
    email: string,
    password: string
}

export interface IRole {
    id: number | string,
    name: string
}

export interface LoginResponse {
    id: string | number,
    name: string,
    email: string, 
    roleId: number,
    createdAt: Date,
    updatedAt: Date,
    role: IRole,
    refreshToken?: string,
    accessToken?: string
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await baseService.post('auth/login', JSON.stringify(data));
    return response.data.data;

}

export const refresh = async() => {
    try {
        const response = await authService.post('auth/refresh', JSON.stringify({refreshToken}));
        console.log('refresh ran', response);
        // const data = response.data.data;
        // store.dispatch(setTokens({accessToken: data.token, refreshToken}));
    } catch (error) {
        console.log('auth service', error);
    }
    
}