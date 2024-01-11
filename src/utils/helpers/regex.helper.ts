const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const cpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

const cnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

const cpfOrCnpj =
  /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/;

export const RegExHelper = {
  password,
  cpf,
  cnpj,
  cpfOrCnpj,
};
