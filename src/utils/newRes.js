import axios from "axios";

const newRes = async (header, data) => {
  let resp;
  const url = "https://basculapp.basculasyservicios.com/server/api/newRes.php";
  let formData = new FormData();
  formData.append("header", JSON.stringify(header));
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

export default newRes;
