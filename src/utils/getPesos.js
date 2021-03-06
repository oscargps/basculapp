import axios from "axios";

const getPesos = async (id, cliente) => {
  let resp;
  let url =
    "https://basculapp.basculasyservicios.com/server/api/getPesos.php?cliente=" +
    cliente +
    "&res=" +
    id;
  try {
    await axios.get(url).then((response) => {
      resp = response.data;
    });
  } catch (error) {
    resp = false;
  }
  return resp;
};

export default getPesos;
