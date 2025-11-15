import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'estudiante' | 'profesor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  professorId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole, professorId?: string) => Promise<void>;
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

  const login = async (email: string, password: string) => {
    // Simulate API call
    const storedUsers = localStorage.getItem('conservatorio_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    const foundUser = users.find((u: User & { password: string }) => 
      u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Credenciales inválidas');
    }

    const userWithoutPassword = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      professorId: foundUser.professorId
    };

    setUser(userWithoutPassword);
    localStorage.setItem('conservatorio_user', JSON.stringify(userWithoutPassword));
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: UserRole,
    professorId?: string
  ) => {
    // Validate professor/admin ID
    if ((role === 'profesor' || role === 'admin') && !professorId) {
      throw new Error('El ID es requerido para profesores y administradores');
    }

    const storedUsers = localStorage.getItem('conservatorio_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Check if email already exists
    if (users.some((u: User) => u.email === email)) {
      throw new Error('Este correo ya está registrado');
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role,
      professorId: role !== 'estudiante' ? professorId : undefined
    };

    users.push(newUser);
    localStorage.setItem('conservatorio_users', JSON.stringify(users));

    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      professorId: newUser.professorId
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
