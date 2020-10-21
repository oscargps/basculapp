import axios from "axios";

const Login = async (form) => {
  let resp;
  const url =
    "https://basculapp.000webhostapp.com/api/login.php?credenciales=" +
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

export default Login;
