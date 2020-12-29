const SUB_PATH = "/records-manager";
export const SERVER_URL = process.env.NODE_ENV === 'production' ? window.location.origin + SUB_PATH : 'http://localhost:8080';
export const UI_ONLY = process.env.REACT_APP_UI_ONLY;
