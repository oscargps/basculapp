const reducer = (state, action) => {
  //dependiendo la accion, modifica y returna el estado general de la app
  switch (action.type) {
    case "SET_INFORMATION":
      return {
        ...state, //traigo el estado original
        reses: action.payload.reses, // el elemento que mmodifico
        lotes: action.payload.lotes, // el elemento que mmodifico
        registros: action.payload.registros, // el elemento que mmodifico
        novedades: action.payload.novedades, // el elemento que mmodifico
        terceros: action.payload.terceros, // el elemento que mmodifico
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload, // el elemento que mmodifico
      };
    case "SET_LOGIN":
      return {
        ...state,
        onLogin: true,
        cliente: action.payload.cliente[0], // el elemento que mmodifico
        usuario: action.payload.usuario[0], // el elemento que mmodifico
        fincas: action.payload.fincas, // el elemento que mmodifico
      };
    case "SET_FINCA":
      return {
        ...state,
        selectedFinca:true,
        fincaActual: action.payload // el elemento que mmodifico
      };
    case "SET_MODAL":
      return {
        ...state,
        modal:action.payload,
      };
    case "SET_MODAL2":
      return {
        ...state,
        modal2:action.payload,
      };
    case "SET_DETAIL":
      return {
        ...state,
        onDetail:action.payload,
      };
    case "SET_MOVESELL":
      return {
        ...state,
        onMove:action.payload,
      };
    case "SET_NEWRES":
      return {
        ...state,
        newReses:[...state.newReses,action.payload],
      };
    case "DELETE_NEWRES":
      return {
        ...state,
        newReses: state.newReses.filter((items) => items.numeroRes !== action.payload),
      };
    case "CLEAR_NEWRES":
      return {
        ...state,
        newReses: [],
      };
    case "SET_RESET":
      return {
        ...state,
        newReses: [],
        fincaActual:{},
        modal: false,
        modal2: false
      };
    case "SET_PRINT_DATA":
      return {
        ...state,
        printData: action.payload
      };
    case "SET_PAGES_PRINT":
      return {
        ...state,
        pagesToPrint: [...state.pagesToPrint,action.payload]
      };
    case "DELETE_PAGES_PRINT":
      return {
        ...state,
        pagesToPrint: []
      };
    default:
      return state;
  }
};

export default reducer;
