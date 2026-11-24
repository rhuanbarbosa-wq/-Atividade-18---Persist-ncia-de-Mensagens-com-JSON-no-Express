
const historicoMensagens = [
  { id: 1, usuario: "Rhuan", texto: "Testando serialização JSON!" },
  { id: 2, usuario: "Professor", texto: "Persistência em disco funcionando." }
];

const conteudoSalvar = JSON.stringify(historicoMensagens, null, 2);
console.log(conteudoSalvar);
console.log("Tipo da variável:", typeof conteudoSalvar);

console.log("\n----------------------------------------\n");


const jsonValido = '[{"id": 10, "usuario": "Lucas", "texto": "Teste"}]';
const objetoRecuperado = JSON.parse(jsonValido);
console.log("Texto da mensagem válida:", objetoRecuperado[0].texto);

const jsonQuebrado = '[{ id: 10, quebrado: sim ';
try {
  JSON.parse(jsonQuebrado);
} catch (erro) {
  console.error("Alerta: JSON corrompido! Detalhes:", erro.message);
}