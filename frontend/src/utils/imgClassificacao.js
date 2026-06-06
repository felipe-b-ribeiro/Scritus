import dez from "../assets/classificacao/10.png";
import doze from "../assets/classificacao/12.png";
import catorze from "../assets/classificacao/14.png";
import dezesseis from "../assets/classificacao/16.png";
import dezoito from "../assets/classificacao/18.png";
import livre from "../assets/classificacao/livre.png";

export default function imgClassificacao(idade) {
  let imagem;

  switch (idade) {
    case "Livre":
      imagem = livre;
      break;
    case "10":
      imagem = dez;
      break;
    case "12":
      imagem = doze;
      break;
    case "14":
      imagem = catorze;
      break;
    case "16":
      imagem = dezesseis;
      break;
    case "18":
      imagem = dezoito;
      break;
  }

  return imagem;
}
