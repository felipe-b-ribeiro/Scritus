import BackButton from "../../components/BackButton";
import ContainerBasico from "../../components/ContainerBasico";
import DeleteModal from "../../components/DeleteModal";
import Header from "../../components/Header";
import Linha from "../../components/LinhaDegrade";
import Logo from "../../components/LogoScritus";
import Overlay from "../../components/Overlay";
import useTitulo from "../../hooks/useTitulo";
import PaginaSplash from "../PaginaSplash";
import PaginaEstanteContent from "./components/PaginaEstanteContent";
import usePaginaEstante from "./hooks/usePaginaEstante";

function PaginaEstante() {
  useTitulo("Minhas Obras - Scritus");

  const {
    overlayState,
    deleteModalState,
    idObraSelecionada,
    handleDeleteObra,
    handleCancelModal,
    loading,
    obras,
    setIdObraSelecionada,
    setOverlayState,
    setDeleteModalState,
  } = usePaginaEstante();

  if (loading) return <PaginaSplash />;

  return (
    <>
      {overlayState !== "closed" && <Overlay state={overlayState} />}
      {deleteModalState !== "closed" && (
        <DeleteModal
          state={deleteModalState}
          msg="Deseja mesmo deletar a sua obra?"
          confirmClick={() => handleDeleteObra(idObraSelecionada)}
          cancelClick={handleCancelModal}
        />
      )}
      <Header left={<BackButton />} center={<Logo />} />
      <Linha />
      <ContainerBasico text="Suas Obras">
        <PaginaEstanteContent
          obras={obras}
          setIdObraSelecionada={setIdObraSelecionada}
          setOverlayState={setOverlayState}
          setDeleteModalState={setDeleteModalState}
        />
      </ContainerBasico>
    </>
  );
}

export default PaginaEstante;
