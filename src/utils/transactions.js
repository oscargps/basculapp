import axios from "axios";

const getTransactions = async (finca) => {
  let resp;
  let url =
    "https://basculapp.basculasyservicios.com/server/api/transactions.php?finca=" + finca;
  try {
    await axios.get(url).then((response) => {
      resp = response.data;
    });
  } catch (error) {
    resp = false;
  }
  return resp;
};
const setTransactions = async (data) => {
  let resp=false;
  let url =
    "https://basculapp.basculasyservicios.com/server/api/transactions.php";

    try {
        await axios.post(url, data).then(() => {
            resp = true;
        });
    } catch (error) {
        resp = false;
    }
    return resp;
};

export {getTransactions, setTransactions};
