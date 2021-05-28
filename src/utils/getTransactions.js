import axios from "axios";

const getTransactions = async (finca) => {
  let resp;
  let url =
    "https://basculapp.basculasyservicios.com/server/api/getTransactions.php?finca=" + finca;
  try {
    await axios.get(url).then((response) => {
      resp = response.data;
    });
  } catch (error) {
    resp = false;
  }
  return resp;
};

export default getTransactions;
