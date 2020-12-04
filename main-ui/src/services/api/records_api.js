import {secured} from "./security";

export async function uploadRecord(data) {
  const formData = new FormData();
  formData.append('file', data);


  const response = await fetch("http://localhost:8090/records",
    secured({
      method: 'post',
      body: formData
    }));

  const responseText = await response.text();
  console.log(responseText);
  return responseText;
}
