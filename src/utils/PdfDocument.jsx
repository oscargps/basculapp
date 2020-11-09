import React, { useState, useEffect } from "react";
import { BlobProvider } from "@react-pdf/renderer";

const PdfDocument = ({ title, document }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 1000);
  }, []);

  if (!ready) {
    return null;
  } else {
    return (
      <BlobProvider document={document}>
        {({ url, loading, blob }) => {
          if (loading) {
            return (
              <span>
                Generando documento...
              </span>
            );
          }
          if (!loading && url) {
            console.log(url);
            return (
              <a className="btn btn-success" href={url}  target="_blank">
                Descargar {title}.pdf
              </a>
            );
          }
          return null;
        }}
      </BlobProvider>
    );
  }
};

export default PdfDocument;
