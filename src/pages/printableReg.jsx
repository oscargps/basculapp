import React, { useState, useEffect } from "react";
import StackedDetailTable from "../components/stackedDetailTable";
import TableRegDetalles from "../components/tableRegDetalles";
import { connect } from "react-redux";
import Logo from "../assets/img/logo.png";
import PrintButton from "../utils/pdfComp/PrintButton";
import Page from "../utils/pdfComp/Page";
import "../styles/pages/printableres.css";
const PrintableReg = (props) => {
  const { printData } = props;
  const [comps, setcomps] = useState([{ id: "print1", p: 0 }]);
  const [dataOk, setDataOk] = useState(false);
  const [allOk, setallOk] = useState(false);
  useEffect(() => {
    if (Object.keys(printData.Encabezado).length === 0) {
      props.history.push("/");
    }
    verifPages();
  }, [printData]);
  const verifPages = () => {
    if (printData.Cantidades.length > 20) {
      let cantPages = Math.ceil(printData.Cantidades.length / 19);
      let temp = comps;
      let chunk = 19;
      let k = 0;
      console.log(cantPages,temp,chunk,k);
      for (let index = 1; index <= cantPages; index++) {
        let j = index + 1;
        let pages = printData.Cantidades.slice(k, k + chunk);
        temp.push({ id: "print" + j, p: pages });
        k = k + chunk + 1;
      }
      console.log('temps',temp);
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
          <h3>Reporte de Lote</h3>
          <StackedDetailTable data={printData.Encabezado} />
          <StackedDetailTable data={printData.Totales} />
        </Page>

        {printData.Cantidades.length > 20 && dataOk
          ? comps.map((comp) => {
              return (
                <Page id={comp.id}>
                  <h3>Pesajes registrados</h3>
                  <TableRegDetalles data={comp.p} />
                </Page>
              );
            })
          : !dataOk && (
              <Page id="print2">
                <h3>Reses en el lote</h3>
                <TableRegDetalles data={printData.Cantidades} />
              </Page>
            )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    printData: state.printData,
  };
};
export default connect(mapStateToProps, null)(PrintableReg);
