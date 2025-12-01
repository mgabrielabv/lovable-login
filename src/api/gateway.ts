import { API_BASE } from './config';
const BASE_URL = API_BASE; 

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

export class ApiGateway {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    token?: string
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    // Cookie-based auth: no localStorage/token; rely on HttpOnly cookie
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (options.headers && typeof options.headers === 'object' && !Array.isArray(options.headers)) {
      Object.assign(headers, options.headers as Record<string, string>);
    }

    // Always send credentials so cookies travel with requests
    const requestOptions: RequestInit = { ...options, headers, credentials: 'include' };
    console.log('Gateway Request:', { url, method: options.method || 'GET', headers, body: options.body });

    try {
      const response = await fetch(url, requestOptions);
      console.log('Gateway Response Status:', response.status);
      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized, e.g., redirect to login
          console.error('Unauthorized access');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Gateway Response Data:', data);
      return { data };
    } catch (error) {
      console.error('Gateway Error:', error);
      return { error: (error as Error).message };
    }
  }

  async get<T>(endpoint: string, token?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' }, token);
  }

  async post<T>(endpoint: string, body: any, token?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }, token);
  }

  async put<T>(endpoint: string, body: any, token?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }, token);
  }

  async delete<T>(endpoint: string, token?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' }, token);
  }

  async login(endpoint: string, body: any): Promise<ApiResponse<any>> {
    // Perform login; backend should set HttpOnly cookie via Set-Cookie
    const response = await this.post(endpoint, body);
    console.log('Login Response:', response);
    return response;
  }

  logout(): void {
    // For cookie-based auth, logout should be performed by calling backend endpoint
    // Left as a no-op here; use an explicit API call from AuthContext
  }
}

const gateway = new ApiGateway(BASE_URL);

export default gateway;
