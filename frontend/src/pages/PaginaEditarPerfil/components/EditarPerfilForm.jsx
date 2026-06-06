import BotaoSimples from "../../../components/BotaoSimples";
import DeleteModal from "../../../components/DeleteModal";
import Overlay from "../../../components/Overlay";
import RenderizarInputs from "../../../components/RenderizarInputs";
import Spinner from "../../../components/Spinner";
import TagTipoUsuario from "../../../components/TagTipoUsuario";
import { CAMPOS_EDIT } from "../../../constants/userConstants";
import useEditarPerfil from "../hooks/useEditarPerfil";

const EditarPerfilForm = () => {
  const {
    dados,
    tipoUsuario,
    preview,
    handleSubmit,
    handleImagem,
    handleChange,
    handleBlur,
    verificarErro,
    overlayState,
    openModal,
    deleteModalState,
    handleDeleteAccount,
    handleCancelModal,
  } = useEditarPerfil();

  return (
    <>
      {overlayState !== "closed" && <Overlay state={overlayState} />}
      {deleteModalState !== "closed" && (
        <DeleteModal
          state={deleteModalState}
          msg="Deseja mesmo deletar a sua conta?"
          confirmClick={handleDeleteAccount}
          cancelClick={handleCancelModal}
        />
      )}
      <form onSubmit={handleSubmit} className="editarPerfil">
        {dados && Object.keys(dados).length > 0 ? (
          <>
            <label htmlFor="upload">
              <img
                width="100"
                height="100"
                src={preview}
                alt="Foto de Perfil"
              />
            </label>
            <input
              type="file"
              id="upload"
              accept="image/webp, image/png, image/jpeg, image/gif, image/jpg"
              onChange={handleImagem}
            />
            <TagTipoUsuario className="mb-15" tipo={tipoUsuario} />
            <RenderizarInputs
              tipoUsuario={tipoUsuario}
              camposValues={dados}
              campos={CAMPOS_EDIT[tipoUsuario]}
              handleChange={handleChange}
              handleBlur={handleBlur}
              verificarErro={verificarErro}
            />
          </>
        ) : (
          <Spinner />
        )}
        <button type="button" className="delete-btn" onClick={openModal}>
          Deletar Conta
        </button>
        <div className="flex p-10 gap-8">
          <BotaoSimples type="submit" variant="save" text="Salvar" />
          <BotaoSimples
            type="button"
            onClick={() => history.back()}
            variant="cancel"
            text="Cancelar"
          />
        </div>
      </form>
    </>
  );
};

export default EditarPerfilForm;
