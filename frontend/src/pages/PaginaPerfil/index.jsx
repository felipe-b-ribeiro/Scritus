import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from "../../components/Cabecalho";
import Logo from "../../components/LogoScritus";
import ContainerBasico from "../../components/ContainerBasico";
import Linha from "../../components/LinhaDegrade";
import BotaoSimples from '../../components/BotaoSimples';
import InputBasico from "../../components/InputBasico";
import ArrowIcon from "../../components/icons/arrowIcon";
import { CAMPOS } from "../../constants/userConstants";

const PaginaPerfil = () => {

    useEffect(() => {
    const carregarHome = async () => {
      // Espera fontes
      if (document.fonts) await document.fonts.ready;

      // Espera dados iniciais
      const token = localStorage.getItem("accessToken");
      const payload = await decodificarJWT(token) || {};
      const { tipoUsuario, nome, email } = payload;
      setUsuario({"tipoUsuario": tipoUsuario, "nome": nome})
    };

    carregarHome();
    }, []);

    const renderInputs = () => {
         
        if (!tipoUsuario) return null;

        return Object.entries(CAMPOS[tipoUsuario]).map(([campo, meta]) => {

            return (
            <InputBasico
                key={campo}
                name={campo}
                value={
                meta.cnpj
                    ? aplicarMascaraCNPJ(forms[tipoUsuario][campo].valor || "")
                    : forms[tipoUsuario][campo].valor || ""
                }
                onChange={handleChange}
                // onFocus={() => handleFocus(campo)}
                onBlur={campo === 'email' || campo === 'nomeUsuario' || campo === 'cnpj' ? (e) => handleBlur(campo, e.target.value) : undefined}
                onInvalid={(e) => e.preventDefault()}
                text={meta.label}
                type={meta.senha && senhaVisivel[campo] ? 'text' : meta.tipo}
                required={meta.required}
                className={verificarErro(campo) === "Erro" ? "input-error" : verificarErro(campo) === "Sucesso" ? "input-success" : ""}
                max={meta.data ? hoje : undefined}
                minLength={meta.minlength}
                >
                {meta.senha && <EyeIcon aberto={!senhaVisivel[campo]} onClick={() => setSenhaVisivel(prev => ({ ...prev, [campo]: !prev[campo] }))} />}
                {verificarErro(campo) && erroMsg ? <ErrorHelper text={erroMsg}/> : null}
            </InputBasico>
            )
        })
        }

    return (
        <>
        <Cabecalho>
            <CabecalhoEsquerda>
            <BotaoSimples back variant="secondary" className="btn-icone">
                <ArrowIcon />
                <span>Voltar</span>
            </BotaoSimples>
            </CabecalhoEsquerda>
            <CabecalhoCentro>
            <Logo />
            </CabecalhoCentro>
        </Cabecalho>
        <Linha />
        <ContainerBasico text="Seu Perfil">

        </ContainerBasico>
        </>
    );

}

export default PaginaPerfil;