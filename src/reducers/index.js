const reducer = (state, action) => {
  //dependiendo la accion, modifica y returna el estado general de la app
  switch (action.type) {
    case "SET_INFORMATION":
      return {
        ...state, //traigo el estado original
        reses: action.payload.reses, // el elemento que mmodifico
        lotes: action.payload.lotes, // el elemento que mmodifico
        registros: action.payload.registros, // el elemento que mmodifico
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: !action.payload, // el elemento que mmodifico
      };
    case "SET_LOGIN":
      return {
        ...state,
        onLogin: true,
        cliente: action.payload.cliente[0], // el elemento que mmodifico
        usuario: action.payload.usuario[0], // el elemento que mmodifico
        fincas: action.payload.fincas[0], // el elemento que mmodifico
      };
    default:
      return state;
  }
};

export default reducer;
