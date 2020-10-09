import { setInformation, setLoading } from "../actions";
import axios from "axios";
import { connect } from "react-redux";
const getInfo = (props) => {
    props.setLoading(true);
    const {cliente,fincaActual} = props;
    const url =
      'http://basculapp.000webhostapp.com/api/getInfoCliente.php?cliente='+cliente.id+'&finca='+fincaActual;
    axios.get(url).then((response) => {
      props.setLoading(false);
      props.setInformation(response.data[0]);
    });
  };

  const mapDispatchToProps = {
    setInformation,
    setLoading,
  };
  const mapStateToProps = (state) => {
    return {
      cliente: state.cliente,
      fincaActual: state.fincaActual,
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(getInfo);
