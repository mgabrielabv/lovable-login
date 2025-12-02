// Configuracion fija (sin .env) segun backend en localhost:3003
export const API_BASE: string = "http://localhost:3003";

// Lista de posibles endpoints para obtener el usuario autenticado
export const AUTH_ME_ENDPOINTS: string[] = [
  "/auth/validate",
];

export const AUTH_LOGOUT_ENDPOINT: string = "/auth/logout";
export const AUTH_LOGIN_ENDPOINT: string = "/auth/login";
// No hay registro en el backend provisto; mantenemos un placeholder
export const AUTH_REGISTER_ENDPOINT: string = "/auth/register";
