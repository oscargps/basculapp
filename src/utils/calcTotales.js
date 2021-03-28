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
  totales = {
    promedio: (i = 0 ? total / i : 0),
    total,
    max: { valmax, idMax },
    min: { valmin, idMin },
  };
  return totales;
};

export default CalcTotales;
