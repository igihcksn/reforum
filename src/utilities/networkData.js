const { BASE_URL } = require("constants");

const getAllThread = async () => {
  const response = await fetch(`${BASE_URL.API}${BASE_URL.THREADS}`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return {
    error: false,
    data: responseJson.data,
  };
};

export { getAllThread };
