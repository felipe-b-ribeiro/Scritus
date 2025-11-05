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
    nomeUsuario: { label: 'Nome de Usuário', tipo: 'text', required: true, minlength: 6 },
    email: { label: 'Email', tipo: 'email', required: true, minlength: 4},
    senha: { label: 'Senha', tipo: 'password', required: true, senha: true, minlength: 8 },
    confirmarSenha: { label: 'Confirme a Senha', tipo: 'password', required: true, senha: true, minlength: 8 },
    dataNascimento: { label: 'Data de Nascimento', tipo: 'date', required: true, data: true}
  },
  Autor: {
    nomeCompleto: { label: 'Nome Completo', tipo: 'text', required: true, minlength: 10},
    pseudonimo: { label: 'Pseudônimo (Opcional)', tipo: 'text', required: false, minlength: 4},
    email: { label: 'Email', tipo: 'email', required: true, minlength: 4},
    senha: { label: 'Senha', tipo: 'password', required: true, senha: true, minlength: 8},
    confirmarSenha: { label: 'Confirme a Senha', tipo: 'password', required: true, senha: true, minlength: 8},
    dataNascimento: { label: 'Data de Nascimento', tipo: 'date', required: true, data: true}
  },
  Editora: {
    nomeFantasia: { label: "Nome Fantasia", tipo: "text", required: true, minlength: 8 },
    cnpj: { label: "CNPJ", tipo: "text", required: true, cnpj: true },
    siteOficial: { label: "Site Oficial", tipo: "url", required: false, minlength: 5 },
    email: { label: "Email", tipo: "email", required: true, minlength: 4},
    senha: { label: "Senha", tipo: "password", required: true, senha: true, minlength: 8},
    confirmarSenha: { label: "Confirme a Senha", tipo: "password", required: true, senha: true, minlength: 8}
  }
};

const CAMPOS_EDIT = {
  Leitor: {
    apelido: { label: 'Nome de Usuário', tipo: 'text', required: true, minlength: 6 },
    bio: {label: 'Biografia', tipo: 'textarea', required: false, maxlength: 400},
    data_nascimento: { label: 'Data de Nascimento', tipo: 'date', required: true, data: true},
  },
  Autor: {
    nome_autor: { label: 'Nome Completo', tipo: 'text', required: true, minlength: 10},
    pseudonimo: { label: 'Pseudônimo (Opcional)', tipo: 'text', required: false, minlength: 4},
    bio: { label: 'Biografia', tipo: 'textarea', required: false, maxlength: 400},
    data_nascimento: { label: 'Data de Nascimento', tipo: 'date', required: true, data: true}
  },
  Editora: {
    nome_fantasia: { label: "Nome Fantasia", tipo: "text", required: true, minlength: 8 },
    bio: { label: 'Biografia', tipo: 'textarea', required: false, maxlength: 400},
    site_oficial: { label: "Site Oficial", tipo: "url", required: false, minlength: 5 }
  }
}

const criarFormularioUsuario = (camposObj) =>
  Object.fromEntries(
    Object.keys(camposObj).map(campo => [
      campo,
      { valor: "", erro: false, erroMsg: "", loading: false }
    ])
  );

const FORMS_POR_USUARIO = {
  Leitor: criarFormularioUsuario(CAMPOS.Leitor),
  Autor: criarFormularioUsuario(CAMPOS.Autor),
  Editora: criarFormularioUsuario(CAMPOS.Editora)
};

const FORMS_POR_USUARIO_EDIT = {
  Leitor: criarFormularioUsuario(CAMPOS_EDIT.Leitor),
  Autor: criarFormularioUsuario(CAMPOS_EDIT.Autor),
  Editora: criarFormularioUsuario(CAMPOS_EDIT.Editora)
}

export { TIPO_USUARIO, FORMS_POR_USUARIO, FORMS_POR_USUARIO_EDIT, CAMPOS, CAMPOS_EDIT};