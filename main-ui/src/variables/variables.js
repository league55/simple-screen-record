
const SUB_PATH = "/records-manager";
export const SERVER_URL = process.env.NODE_ENV === 'production' ? window.location.origin + SUB_PATH : 'http://localhost:8080';
