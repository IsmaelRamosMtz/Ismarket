export interface AuthResponse {
    ok: boolean; 
    id?: string;
    name?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    idUsersStatus?: any;
    idRole ?: any;
    token?: string;
    msg?: string;
    error?: any
}