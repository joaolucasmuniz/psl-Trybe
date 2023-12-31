const fetchApi = async (link:string) => {
  try {
    const response = await fetch(link);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchApi;
