import {secured} from "./security";

export async function uploadRecord(data) {
  const response = await fetch("http://localhost:8090/records",
    secured({
      method: 'post',
      body: data
    }));

  const responseText = await response.text();
  console.log(responseText);
  return responseText;
}
