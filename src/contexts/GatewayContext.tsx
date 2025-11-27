import React, { createContext, useContext, ReactNode } from 'react';
import { ApiGateway, ApiResponse } from '../api/gateway'; // Importa la clase y la interfaz

const BASE_URL = 'http://localhost:3003';

interface GatewayContextType {
  get: <T>(endpoint: string, token?: string) => Promise<ApiResponse<T>>;
  post: <T>(endpoint: string, body: any, token?: string) => Promise<ApiResponse<T>>;
  put: <T>(endpoint: string, body: any, token?: string) => Promise<ApiResponse<T>>;
  delete: <T>(endpoint: string, token?: string) => Promise<ApiResponse<T>>;
  login: (endpoint: string, body: any) => Promise<ApiResponse<any>>;
  logout: () => void;
}

const GatewayContext = createContext<GatewayContextType | undefined>(undefined);

export const useGateway = () => {
  const context = useContext(GatewayContext);
  if (!context) {
    throw new Error('useGateway must be used within a GatewayProvider');
  }
  return context;
};

interface GatewayProviderProps {
  children: ReactNode;
}

export const GatewayProvider: React.FC<GatewayProviderProps> = ({ children }) => {
  const gateway = new ApiGateway(BASE_URL);

  const value = {
    get: gateway.get.bind(gateway),
    post: gateway.post.bind(gateway),
    put: gateway.put.bind(gateway),
    delete: gateway.delete.bind(gateway),
    login: gateway.login.bind(gateway),
    logout: gateway.logout.bind(gateway),
  };

  return <GatewayContext.Provider value={value}>{children}</GatewayContext.Provider>;
};
