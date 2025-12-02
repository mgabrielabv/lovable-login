// Configuracion fija (sin .env) segun backend en localhost:3003
// Base URL del backend. Cambia esto si tu backend corre en otro host/puerto.
export const API_BASE: string = "http://localhost:3003";

// Si `USE_LOCAL_AUTH` está `true`, la app usará datos de `localStorage`
// para autenticación y no intentará llamar al backend. Esto facilita
// el desarrollo cuando el backend no está disponible. Pónlo `false`
// para forzar llamadas reales al backend.
export const USE_LOCAL_AUTH: boolean = true;

// Lista de posibles endpoints para obtener el usuario autenticado
export const AUTH_ME_ENDPOINTS: string[] = [
  "/auth/validate",
];

export const AUTH_LOGOUT_ENDPOINT: string = "/auth/logout";
export const AUTH_LOGIN_ENDPOINT: string = "/auth/login";
// No hay registro en el backend provisto; mantenemos un placeholder
export const AUTH_REGISTER_ENDPOINT: string = "/auth/register";
