import React, { useState, useEffect } from "react";
import StackedDetailTable from "../components/stackedDetailTable";
import TablePesajes from "../components/tablePesaje";
import ChartLines from "../components/chartLines";
import { connect } from "react-redux";
import Logo from "../assets/img/logo.png";
import PrintButton from "../utils/pdfComp/PrintButton";
import Page from "../utils/pdfComp/Page";
import '../styles/pages/printableres.css'
const PrintableRes = (props) => {
  const { printRes } = props;
  const [comps, setcomps] = useState([{ id: "print1", p: 0 }]);
  const [dataOk, setDataOk] = useState(false);
  const [allOk, setallOk] = useState(false);
  useEffect(() => {
    if (Object.keys(printRes.actual).length === 0) {
      props.history.push("/");
    }
    verifPages();
  }, [printRes]);
  const verifPages = () => {
    if (printRes.Pesos.length > 25) {
      let cantPages = Math.ceil(printRes.Pesos.length / 24);
      let temp = comps;
      let chunk = 24;
      let k = 0;
      for (let index = 1; index <= cantPages; index++) {
        let j = index + 1;
        let pages = printRes.Pesos.slice(k, k + chunk);
        temp.push({ id: "print" + j, p: pages });
        k = k + chunk + 1;
      }
      setcomps(temp);
      setDataOk(true);
    } else {
      let temp = comps;
      temp.push({ id: "print2", p: 0 });
      setcomps(temp);
    }
    setallOk(true);
  };

  return (
    <div className="PrintableRes text-center">
      <div className="PrintableRes-navbar">
        <h3>Generación de reporte</h3>
      </div>
      <div className="PrintableRes-body">
        {allOk && (
          <PrintButton comps={comps} label={"Print multiplate pages"} />
        )}
        <Page id="print1">
          <img
            className="Login-form__img"
            src={Logo}
            width="100"
            height="100"
          />
          <h3>Reporte histórico de Res</h3>
          <StackedDetailTable data={printRes.actual} />
          <h3>Gráfica de rendimiento</h3>
          <ChartLines
            data={printRes.dataGrafica}
            xlabel="Tiempo"
            ylabel="Peso"
          />
        </Page>

        {printRes.Pesos.length > 25 && dataOk
          ? comps.map((comp) => {
              return (
                <Page id={comp.id}>
                  <h3>Pesajes registrados</h3>
                  <TablePesajes pesos={comp.p} />
                </Page>
              );
            })
          : !dataOk && (
              <Page id="print2">
                <h3>Pesajes registrados</h3>
                <TablePesajes pesos={printRes.Pesos} />
              </Page>
            )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    printRes: state.printRes,
  };
};
export default connect(mapStateToProps, null)(PrintableRes);
