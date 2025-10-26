import { authUserRepository } from "../repositories/authUserRepository.js";
import { validarEmail } from "../../common/util/validations.js";
import { gerarToken } from "../utils/jwt.js";

export const authUserService = async (emailDigitado, senha) => {
  try {
    if (!validarEmail(emailDigitado)) {
      throw new Error("Formato do e-mail inválido.");
    }

    const payload = await authUserRepository(emailDigitado, senha);

    const { email, tipoUsuario, nome } = payload;

    const token = gerarToken(payload);

    return token;
  } catch (err) {
    console.error("[AUTH USER SERVICE ERROR]: ", err);
    throw err;
  }
};
