import axios from "axios";

const ChangePasswordScript = async (form) => {
  let resp;
  const url =
    "https://basculapp.basculasyservicios.com/server/api/changePassword.php?credenciales=" +
    JSON.stringify(form);
  try {
    await axios.get(url).then((response)=>{
        resp = response.data[0]
    });
  } catch (error) {
    resp = false;
  }
  return resp;
};

export default ChangePasswordScript;
