import axios from "axios";
const getInfo = async (cliente, finca) => {
  const url =
    "https://basculapp.basculasyservicios.com/server/api/getInfoCliente.php?cliente=" +
    cliente +
    "&finca=" +
    finca;
  try {
    let resp = await axios
      .get(url)
      .then((response) => {
        return response.data[0];
      })
      .catch((er) => {
        return {};
      });
    return resp;
  } catch (error) {
    return {};
  }
};

export default getInfo;
