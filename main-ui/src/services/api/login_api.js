
export async function login(loginValue) {
  const response = await fetch("http://localhost:8090/login/" + loginValue, {
    method: 'POST'
  })

  let token = await response.text();
  console.log(token);
  return token;
}
