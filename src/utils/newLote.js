import axios from "axios";

const newLote = async (usuario, data) => {
  let resp;
  const url = "https://basculapp.000webhostapp.com/api/addLote.php";
  let formData = new FormData();
  formData.append('usuario',usuario);
  formData.append("data", JSON.stringify(data));
  try {
    await axios.post(url, formData).then(() => {
      resp = true;
    });
  } catch (error) {
    resp = false;
  }
  return resp;
};

export default newLote;
