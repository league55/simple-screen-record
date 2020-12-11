import storageManager, {KEYS} from "../storage/local_storage";

export function secured(init) {
  const headers = init.headers || {};
  headers["jwt_token"] = storageManager.getFromStorage(KEYS.LOGIN_TOKEN);
  let assign = Object.assign(init, {headers});
  return assign;
}
