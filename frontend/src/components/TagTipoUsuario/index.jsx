import { SC_Tag } from "./styles";

const TagTipoUsuario = ({ tipo, className }) => {
  return (
    <SC_Tag className={className} $tipo={tipo}>
      {tipo}
    </SC_Tag>
  );
};

export default TagTipoUsuario;
