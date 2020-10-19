import axios from "axios";

const newRes = async (usuario, data) => {
  let resp;
  const url = "http://basculapp.000webhostapp.com/api/newRes.php";
  let formData = new FormData();
  formData.append("usuario", usuario);
  formData.append("data", JSON.stringify(data));
    console.log(data);
  try {
    await axios.post(url, formData).then(() => {
      resp = true;
    });
  } catch (error) {
    resp = false;
  }
  return resp;
};

export default newRes;
