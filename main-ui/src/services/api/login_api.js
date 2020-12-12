import {SERVER_URL} from "../../variables/variables";

export async function login(loginValue) {
  const response = await fetch(SERVER_URL + "/login/" + loginValue, {
    method: 'POST'
  })

  let token = await response.text();
  console.log(token);
  return token;
}
