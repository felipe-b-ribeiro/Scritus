import { validarEmail } from "../../common/util/validations.js";
import { authUserRepository } from "../repositories/authUserRepository.js";
import { gerarToken } from "../utils/jwt.js";

export const authUserService = async (emailDigitado, senha) => {
  try {
    let email = emailDigitado;

    if (!emailDigitado.includes("@")) {
      email = `${emailDigitado}@gmail.com`;
    }

    if (!validarEmail(email)) {
      throw new Error("Formato do e-mail inválido.");
    }

    const payload = await authUserRepository(emailDigitado, senha);

    if (!payload) {
      throw new Error("Email ou senha inválidos.");
    }

    const token = gerarToken(payload);

    return token;
  } catch (err) {
    console.error("[AUTH USER SERVICE ERROR]: ", err);
    throw err;
  }
};
