// src/constants.js

// Tipos de usuário
const TIPO_USUARIO = {
  LEITOR: "leitor",
  AUTOR: "autor",
  EDITORA: "editora",
};

// Campos por tipo de usuário
const CAMPOS_POR_TIPO = {
  leitor: ["nomeUsuario", "email", "senha", "confirmarSenha", "dataNascimento"],
  autor: ["nomeCompleto", "pseudonimo", "email", "senha", "confirmarSenha", "dataNascimento"],
  editora: ["nomeFantasia", "email", "senha", "confirmarSenha", "cnpj", "siteOficial"],
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
  cnpj: "number",
  siteOficial: "url",
};

const FORMS_INICIAIS = {
  leitor: Object.fromEntries(CAMPOS_POR_TIPO.leitor.map(c => [c, ""])), // c significa campo
  autor: Object.fromEntries(CAMPOS_POR_TIPO.autor.map(c => [c, ""])),
  editora: Object.fromEntries(CAMPOS_POR_TIPO.editora.map(c => [c, ""]))
};

export { TIPO_USUARIO, LABELS, TIPOS_INPUT, FORMS_INICIAIS, CAMPOS_POR_TIPO };