import axios from "axios";

const getRegistro = async (id) => {
  let resp;
  let url =
    "https://basculapp.000webhostapp.com/api/getRegistro.php?reporte=" + id;
  try {
    await axios.get(url).then((response) => {
      resp = response.data;
    });
  } catch (error) {
    resp = false;
  }
  return resp;
};

export default getRegistro;
