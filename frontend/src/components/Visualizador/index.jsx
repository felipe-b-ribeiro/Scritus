import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PDFTurnViewer = ({ pdfUrl, capaUrl }) => {
  const turnRef = useRef(null);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const carregarPDF = async () => {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      const numPages = pdf.numPages;

      const canvases = [];

      // Primeira página = capa
      canvases.push(
        <div key="capa">
          <img src={capaUrl} alt="Capa do livro" style={{ width: "100%" }} />
        </div>
      );

      // Renderizar demais páginas do PDF
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;

        canvases.push(
          <div key={`page_${i}`}>
            <img src={canvas.toDataURL()} alt={`Página ${i}`} style={{ width: "100%" }} />
          </div>
        );
      }

      setPages(canvases);
    };

    carregarPDF();
  }, [pdfUrl, capaUrl]);

  useEffect(() => {
    if (turnRef.current && pages.length > 0 && window.jQuery) {
      window.jQuery(turnRef.current).turn({
        width: 800,
        height: 600,
        autoCenter: true,
      });
    }
  }, [pages]);

  return (
    <div ref={turnRef} style={{ width: "800px", height: "600px" }}>
      {pages.map((page) => page)}
    </div>
  );
};

export default PDFTurnViewer;
