const apiUrl = import.meta.env.VITE_API_URL;

export async function getGroupsData() {
  try {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
    return { errorMsg: 'Failed to fetch data' };
  }
}
