import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setPagesToPrint } from "../../actions";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PdfDocument from "../PdfDocument";
import TestDocument from "../TestDocument";

const PrintButton = (props) => {
  const { comps, label, pagesToPrint } = props;

  const styles = {
    downloadBtn: {
      color: "white",
      height: "2em",
      width: "50%",
      padding:'0.5em',
      fontSize: "1.5em",
      'background-color':'#f44336',
      'border-radius':'10px',
      'text-decoration': 'none',
      underline:'none',
    },
  };

  const pxToMm = (px) => {
    return Math.floor(px / document.getElementById("myMm").offsetHeight);
  };

  const mmToPx = (mm) => {
    return document.getElementById("myMm").offsetHeight * mm;
  };

  const range = (start, end) => {
    return Array(end - start)
      .join(0)
      .split(0)
      .map(function (val, id) {
        return id + start;
      });
  };
  const print = async (id) => {
    const input = document.getElementById(id);
    const AlturaInput_mm = pxToMm(input.offsetHeight);
    const a4WidthMm = 210;
    const a4HeightMm = 297;
    const a4HeightPx = mmToPx(a4HeightMm);
    const numPages =
      AlturaInput_mm <= a4HeightMm
        ? 1
        : Math.floor(AlturaInput_mm / a4HeightMm) + 1;
    let imgData = await html2canvas(input).then((canvas) => {
      return canvas.toDataURL("image/jpg");
    });
    props.setPagesToPrint({ id, img: imgData });
  };
  const goPrint = () => {
    comps.map((comp) => {
      print(comp.id);
    });
  };
  useEffect(() => {
    goPrint();
  }, [comps]);

  return (
    <div className="tc mb4 mt2">
      <div id="myMm" style={{ height: "1mm" }} />
      {pagesToPrint.length > 1 ? (
        <div>
          <PdfDocument
            title="reporte de res"
            document={<TestDocument pages={pagesToPrint} />} // aqui le estoy pasando el generador del pdf como prop
          />
        </div>
      ) : (
        <button className="btn btn-primary" onClick={goPrint}>
          Generar
        </button>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  setPagesToPrint,
};
const mapStateToProps = (state) => {
  return {
    pagesToPrint: state.pagesToPrint,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PrintButton);
