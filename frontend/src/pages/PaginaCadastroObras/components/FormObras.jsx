import BotaoSimples from "../../../components/BotaoSimples";
import Folder from "../../../components/Folder";
import RenderizarInputs from "../../../components/RenderizarInputs";
import { CAMPOS_OBRA } from "../../../constants/userConstants";
import useCadastroObras from "../hooks/useCadastroObras";
import "choices.js/public/assets/styles/choices.min.css";
import "../styles/choicesChoices.css";
import "../styles/selectEstilization.css";

const FormObras = () => {
  const {
    dados,
    preview,
    tags,
    selectRef,
    handleChange,
    handleImagem,
    verificarErro,
    handleSubmit,
    setPdf,
  } = useCadastroObras();

  return (
    <form onSubmit={handleSubmit} className="flex booksForm">
      <div className="relative flex r-30">
        <label htmlFor="capa">
          <img width="200" height="300" src={preview} alt="Capa da Obra" />
        </label>
        <Folder size={1.5} color="#cb8446" setPdf={setPdf} />
        <input
          type="file"
          id="capa"
          accept="image/png, image/jpg, image/jpeg, image/webp"
          className="hidden"
          onChange={handleImagem}
        />
      </div>
      <RenderizarInputs
        campos={CAMPOS_OBRA}
        camposValues={dados}
        verificarErro={verificarErro}
        handleChange={handleChange}
      />
      <label htmlFor="tags">Quais as tags da sua Obra?</label>
      <select ref={selectRef} id="tags" name="tags" multiple>
        {tags.map((tag) => (
          <option key={tag.nome_tag} value={tag.nome_tag}>
            {tag.nome_tag}
          </option>
        ))}
      </select>
      <label htmlFor="privaObra">Qual a privacidade da sua obra?</label>
      <select name="privaObra" id="privaObra">
        <option value="Rascunho">Rascunho</option>
        <option value="Privado">Privado</option>
        <option value="Público">Público</option>
      </select>
      <label className="text-center text-balance" htmlFor="classInd">
        Qual a classificação indicativa da sua obra?
      </label>
      <select name="classInd" id="classInd">
        <option value="Livre">Livre</option>
        <option value="10">10 Anos</option>
        <option value="12">12 Anos</option>
        <option value="14">14 Anos</option>
        <option value="16">16 Anos</option>
        <option value="18">18 Anos</option>
      </select>
      <div className="flex gap-16 m-20">
        <BotaoSimples type="submit" variant="primary" text="Cadastrar" />
        <BotaoSimples
          type="button"
          variant="cancel"
          onClick={() => history.back()}
          text="Cancelar"
        />
      </div>
    </form>
  );
};

export default FormObras;
