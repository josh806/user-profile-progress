const apiUrl =
  'https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress';

export async function getGroupsData() {
  try {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
}
