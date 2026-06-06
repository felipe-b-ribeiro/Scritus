import { SC_TagGrande } from "./styles";

const Index = ({ variant }) => {
  const texts = {
    likeds: (
      <>
        Suas <strong>Curtidas</strong>
      </>
    ),
    saveds: (
      <>
        Seus <strong>Salvos</strong>
      </>
    ),
    recents: (
      <>
        Seus <strong>Recentes</strong>
      </>
    ),
  };

  return <SC_TagGrande className={variant}>{texts[variant]}</SC_TagGrande>;
};

export default Index;
