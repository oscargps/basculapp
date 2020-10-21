import axios from "axios";

const movesell = async (data) => {
    let resp;
    const url = "https://basculapp.000webhostapp.com/api/movesell.php"

    try {
        await axios.post(url, data).then(() => {
            resp = true;
        });
    } catch (error) {
        resp = false;
    }
    return resp;


}

export default movesell