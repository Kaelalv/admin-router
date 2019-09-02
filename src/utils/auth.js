import Cookie from "./cookies";

const TokenKey = "Token";
export function getToken() {
  return Cookie.get(TokenKey) || sessionStorage.getItem(TokenKey);
}

export function setToken(token) {
  Cookie.set(TokenKey, token);
  sessionStorage.setItem(TokenKey, token);
}

export function removeToken() {
  Cookie.remove(TokenKey);
  sessionStorage.removeItem(TokenKey);
}
