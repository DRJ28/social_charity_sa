export const fetchGet = async url => {
  const response = await fetch(url);
  return await response.json();
};

export const fetchPost = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "loggedin-user": localStorage.getItem("liu"),
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const fetchFileUpload = async (url, formData) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};
