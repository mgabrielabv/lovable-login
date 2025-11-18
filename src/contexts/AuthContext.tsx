import React, { createContext, useContext, useState, useEffect } from 'react';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('conservatorio_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (cedula: string, password: string, role: UserRole, professorId?: string) => {
    const storedUsers = localStorage.getItem('conservatorio_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    const foundUser = users.find((u: User & { password: string }) => 
      u.cedula === cedula && u.password === password && u.role === role
    );

    if (!foundUser) {
      throw new Error('Credenciales inválidas o rol incorrecto');
    }

    // Validar ID de profesor/admin si es necesario
    if ((role === 'profesor' || role === 'admin') && professorId) {
      if (foundUser.professorId !== professorId) {
        throw new Error('ID de ' + (role === 'profesor' ? 'profesor' : 'administrador') + ' incorrecto');
      }
    }

    const userWithoutPassword = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      cedula: foundUser.cedula,
      cedulaRepresentante: foundUser.cedulaRepresentante,
      esMenor: foundUser.esMenor,
      professorId: foundUser.professorId,
      fechaNacimiento: foundUser.fechaNacimiento,
      telefono: foundUser.telefono,
      instrumento: foundUser.instrumento,
      nivel: foundUser.nivel,
      horario: foundUser.horario
    };

    setUser(userWithoutPassword);
    localStorage.setItem('conservatorio_user', JSON.stringify(userWithoutPassword));
  };

  const register = async (userData: Partial<User>, password: string) => {
    const storedUsers = localStorage.getItem('conservatorio_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Check if cedula already exists
    if (users.some((u: User) => u.cedula === userData.cedula)) {
      throw new Error('Esta cédula ya está registrada');
    }

    // Check if email already exists
    if (users.some((u: User) => u.email === userData.email)) {
      throw new Error('Este correo ya está registrado');
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      password
    };

    users.push(newUser);
    localStorage.setItem('conservatorio_users', JSON.stringify(users));

    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      cedula: newUser.cedula,
      cedulaRepresentante: newUser.cedulaRepresentante,
      esMenor: newUser.esMenor,
      professorId: newUser.professorId,
      fechaNacimiento: newUser.fechaNacimiento,
      telefono: newUser.telefono,
      instrumento: newUser.instrumento,
      nivel: newUser.nivel,
      horario: newUser.horario
    };

    setUser(userWithoutPassword);
    localStorage.setItem('conservatorio_user', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('conservatorio_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
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
