import numeral from 'numeral'
const CalcTotales = (data, idLote) => {
  let result = data.filter((res) => res.lote === idLote);
  let totales;
  let i = 0;
  let valmax = 0;
  let idMax = "";
  let idMin = "";
  let valmin = 100000;
  let total = 0;
  result.map((res) => {
    let peso = parseInt(res["ultimo peso"]);
    i++;
    if (peso > valmax) {
      valmax = peso;
      idMax = res.id;
    }
    if (peso < valmin && peso > 0) {
      valmin = peso;
      idMin = res.id;
    }
    total += peso;
  });
  valmin = 100000 ? (valmin = 0) : null;
 let promedio = numeral(i != 0 ? total / i : 0).format('0,0.0');
  return {
    promedio,
    total,
    valmax,
    idMax,
    valmin,
    idMin,
  };
};

export default CalcTotales;
