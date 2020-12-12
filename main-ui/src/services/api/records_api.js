import {secured} from "./security";
import {SERVER_URL} from "../../variables/variables";

export async function listFiles() {
  const response = await fetch(SERVER_URL + "/records",
    secured({'method': "GET"}));

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}


export async function uploadRecord(data) {
  const formData = new FormData();
  formData.append('file', data);


  const response = await fetch(SERVER_URL + "/records",
    secured({
      method: 'post',
      body: formData
    }));

  const responseText = await response.text();
  console.log(responseText);
  return responseText;
}
