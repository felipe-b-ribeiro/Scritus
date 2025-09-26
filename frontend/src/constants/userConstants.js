// src/constants.js

// Tipos de usuário
const TIPO_USUARIO = {
  LEITOR: "Leitor",
  AUTOR: "Autor",
  EDITORA: "Editora",
};

// Objeto master

const CAMPOS = {
  Leitor: {
    "nomeUsuario": { 'label': 'Nome de Usuário', 'tipo': 'text', required: true },
    "email": { label: 'Email', tipo: 'email', required: true },
    "senha": { label: 'Senha', tipo: 'password', required: true },
    "confirmarSenha": { label: 'Confirme a Senha', tipo: 'password', required: true },
    "dataNascimento": { label: 'Data de Nascimento', tipo: 'date', required: true}
  },
  Autor: {
    "nomeCompleto": { label: 'Nome Completo', tipo: 'text', required: true},
    "pseudonimo": { label: 'Pseudônimo (Opcional)', tipo: 'text', required: false},
    "email": { label: 'Email', tipo: 'email', required: true},
    "senha": { label: 'Senha', tipo: 'password', required: true},
    "confirmarSenha": { label: 'Confirme a Senha', tipo: 'password', required: true},
    "dataNascimento": { label: 'Data de Nascimento', tipo: 'date', required: true}
  },
  Editora: {
    nomeFantasia: { label: "Nome Fantasia", tipo: "text", required: true },
    cnpj: { label: "CNPJ", tipo: "text", required: true },
    siteOficial: { label: "Site Oficial", tipo: "url", required: false },
    email: { label: "Email", tipo: "email", required: true},
    senha: { label: "Senha", tipo: "password", required: true},
    confirmarSenha: { label: "Confirme a Senha", tipo: "password", required: true}
  }
};

const criarFormularioUsuario = (camposObj) =>
  Object.fromEntries(
    Object.keys(camposObj).map(campo => [
      campo,
      { valor: "", erro: false, loading: false }
    ])
  );

const FORMS_POR_USUARIO = {
  Leitor: criarFormularioUsuario(CAMPOS.Leitor),
  Autor: criarFormularioUsuario(CAMPOS.Autor),
  Editora: criarFormularioUsuario(CAMPOS.Editora)
};

export { TIPO_USUARIO, FORMS_POR_USUARIO, CAMPOS };