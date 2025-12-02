import { API_BASE } from './config';

/*
  ApiGateway: capa ligera para llamadas fetch al backend.
  - Por defecto construye URLs con `API_BASE` + endpoint.
  - Si quieres operar en modo "sin backend" usa la estrategia de
    `localStorage` desde `AuthContext` (configurado por `USE_LOCAL_AUTH`).
  - No cambiar este archivo si sólo quieres desarrollar con localStorage;
    en su lugar activa `USE_LOCAL_AUTH` y provee los objetos JSON en localStorage.
*/

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
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {};
    // Only set content-type when we actually send a JSON body
    if (options.body && typeof options.body === 'string') {
      headers['Content-Type'] = 'application/json';
    }

    if (options.headers && typeof options.headers === 'object' && !Array.isArray(options.headers)) {
      Object.assign(headers, options.headers as Record<string, string>);
    }

    const requestOptions: RequestInit = { ...options, headers };
    console.log('Gateway Request:', { url, method: options.method || 'GET', headers, body: options.body });

    try {
      const response = await fetch(url, requestOptions);
      console.log('Gateway Response Status:', response.status);
      const isJson = (response.headers.get('content-type') || '').includes('application/json');
      if (!response.ok) {
        if (response.status === 401) {
          // Intentar leer mensaje del backend
          const errBody = isJson ? await response.json().catch(() => undefined) : await response.text().catch(() => undefined);
          const msg = typeof errBody === 'string' ? errBody : (errBody?.message || 'Unauthorized');
          return { error: msg };
        }
        const errBody = isJson ? await response.json().catch(() => undefined) : await response.text().catch(() => undefined);
        const msg = typeof errBody === 'string' ? errBody : (errBody?.message || `HTTP error! status: ${response.status}`);
        return { error: msg };
      }
      const data = isJson ? await response.json() : await response.text();
      console.log('Gateway Response Data:', data);
      return { data };
    } catch (error) {
      console.error('Gateway Error:', error);
      return { error: (error as Error).message };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', credentials: 'include' });
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      credentials: 'include',
    });
  }

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      credentials: 'include',
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', credentials: 'include' });
  }

  async login(endpoint: string, body: any): Promise<ApiResponse<any>> {
    // Perform login; backend should return token
    const response = await this.post(endpoint, body);
    console.log('Login Response:', response);
    return response;
  }

  logout(): void {
    // Logout is handled by calling the backend endpoint
  }
}

const gateway = new ApiGateway(BASE_URL);

export default gateway;
