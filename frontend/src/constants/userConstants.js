// src/constants.js

// Tipos de usuário
const TIPO_USUARIO = {
  LEITOR: "Leitor",
  AUTOR: "Autor",
  EDITORA: "Editora",
};

// Campos por tipo de usuário
const CAMPOS_POR_TIPO = {
  Leitor: ["nomeUsuario", "email", "senha", "confirmarSenha", "dataNascimento"],
  Autor: ["nomeCompleto", "pseudonimo", "email", "senha", "confirmarSenha", "dataNascimento"],
  Editora: ["nomeFantasia", "email", "senha", "confirmarSenha", "cnpj", "siteOficial"],
};

// Labels para os campos
const LABELS = {
  nomeUsuario: "Nome de Usuário",
  nomeCompleto: "Nome Completo",
  nomeFantasia: "Nome Fantasia",
  pseudonimo: "Pseudônimo (Opcional)",
  email: "Email",
  senha: "Senha",
  confirmarSenha: "Confirme a Senha",
  dataNascimento: "Data de Nascimento",
  cnpj: "CNPJ",
  siteOficial: "Site Oficial (Opcional)",
};

// Tipos de input
const TIPOS_INPUT = {
  nomeUsuario: "text",
  nomeCompleto: "text",
  nomeFantasia: "text",
  pseudonimo: "text",
  email: "email",
  senha: "password",
  confirmarSenha: "password",
  dataNascimento: "date",
  cnpj: "text",
  siteOficial: "url",
};

const criarFormularioUsuario = (campos) =>
  Object.fromEntries(
    campos.map(campo => [campo, { valor: '', erro: false, loading: false }])
  );

const FORMS_POR_USUARIO = {
  Leitor: criarFormularioUsuario(CAMPOS_POR_TIPO.Leitor),
  Autor: criarFormularioUsuario(CAMPOS_POR_TIPO.Autor),
  Editora: criarFormularioUsuario(CAMPOS_POR_TIPO.Editora)
};

export { TIPO_USUARIO, LABELS, TIPOS_INPUT, FORMS_POR_USUARIO, CAMPOS_POR_TIPO };