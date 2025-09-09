function validarSenha(senha) {
  return senha.length >= 8 && /\d/.test(senha);
}

module.exports = validarSenha;
