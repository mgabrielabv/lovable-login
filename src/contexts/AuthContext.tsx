import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import gateway from '@/api/gateway';
import { AUTH_LOGIN_ENDPOINT, AUTH_LOGOUT_ENDPOINT, AUTH_ME_ENDPOINTS, AUTH_REGISTER_ENDPOINT } from '@/api/config';

export type UserRole = 'estudiante' | 'profesor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  cedula: string;
  cedulaRepresentante?: string;
  esMenor?: boolean;
  professorId?: string;
  fechaNacimiento?: string;
  telefono?: string;
  instrumento?: string;
  nivel?: string;
  horario?: string;
}

interface AuthContextType {
  user: User | null;
  login: (cedula: string, password: string, role: UserRole, professorId?: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const extractUser = (data: any): User | null => {
    if (!data || typeof data !== 'object') return null;
    const candidate = (data.user && typeof data.user === 'object') ? data.user : data;
    if (candidate && candidate.rol && candidate.nombres) {
      return {
        id: candidate.id || candidate.cedula || 'self',
        name: `${candidate.nombres} ${candidate.apellidos || ''}`.trim(),
        email: candidate.email || '',
        role: candidate.rol as UserRole,
        cedula: candidate.cedula || '',
        cedulaRepresentante: candidate.cedulaRepresentante || undefined,
        esMenor: candidate.esMenor || undefined,
        professorId: candidate.professorId || undefined,
        fechaNacimiento: candidate.fechaNacimiento || undefined,
        telefono: candidate.telefono || undefined,
        instrumento: candidate.instrumento || undefined,
        nivel: candidate.nivel || undefined,
        horario: candidate.horario || undefined,
      } as User;
    }
    if (candidate && candidate.id && candidate.role) return candidate as User;
    return null;
  };

  const fetchCurrentUser = async (): Promise<User | null> => {
    for (const ep of AUTH_ME_ENDPOINTS) {
      try {
        const res = await gateway.get(ep);
        if (res.data) {
          const u = extractUser(res.data);
          if (u) return u;
        }
      } catch (_) {
        // try next
      }
    }
    return null;
  };

  useEffect(() => {
    const init = async () => {
      try {
        const u = await fetchCurrentUser();
        if (u) setUser(u);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (cedula: string, password: string, role: UserRole, professorId?: string) => {
    setLoading(true);
    const res = await gateway.login(AUTH_LOGIN_ENDPOINT, { cedula, password });
    if (res.error) {
      setLoading(false);
      throw new Error(res.error || 'Error de autenticación');
    }
    const uFromLogin = extractUser(res.data);
    if (uFromLogin) {
      setUser(uFromLogin);
      setLoading(false);
      return;
    }
    const u = await fetchCurrentUser();
    if (u) {
      setUser(u);
      setLoading(false);
      return;
    }
    setLoading(false);
    throw new Error('No se pudo obtener el usuario');
  };

  const register = async (userData: Partial<User>, password: string) => {
    setLoading(true);
    const res = await gateway.post(AUTH_REGISTER_ENDPOINT, { ...userData, password });
    if (res.error) {
      setLoading(false);
      throw new Error(res.error || 'No se pudo registrar');
    }
    const uFromRegister = extractUser(res.data);
    if (uFromRegister) {
      setUser(uFromRegister);
      setLoading(false);
      return;
    }
    const u = await fetchCurrentUser();
    if (u) {
      setUser(u);
      setLoading(false);
      return;
    }
    setLoading(false);
    throw new Error('No se pudo obtener el usuario registrado');
  };

  const logout = () => {
    setLoading(true);
    gateway.post(AUTH_LOGOUT_ENDPOINT, {}).finally(() => {
      setUser(null);
      setLoading(false);
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};