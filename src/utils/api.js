export const baseURL = "http://localhost:8080/api";

export const postRequest = async (url, body) => {
  console.log("body", body);
  const res = await fetch(url, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  // incase of fetch we check .ok for error
  if (!res.ok) {
    let msg;
    if (data?.msg) msg = data.msg;
    else msg = data; // no msg it has error
    return { error: true, msg: msg };
  }

  return data;
};

//get req

export const getRequest = async (url) => {
  const response = await fetch(url);
  console.log("response getapi from getreq function", response);
  const data = await response.json();
  console.log("data from api", data);
  // if (!response.ok) {
  //   let msg = "error occured";
  //   if (data?.error) msg = data.msg;
  //   return { error: true, msg };
  // }
  return data;
};
