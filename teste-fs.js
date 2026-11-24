import { mkdir, writeFile, readFile } from "node:fs/promises";

// --- Exercício 2.1: Criando a Pasta data e Salvando Dados em Disco ---
async function salvarHistorico() {
  const lista = [
    { id: 1, usuario: "Rhuan", texto: "Primeira mensagem salva no disco!" },
    { id: 2, usuario: "Ana", texto: "Segunda mensagem no arquivo JSON." }
  ];

  await mkdir(new URL("./data/", import.meta.url), { recursive: true });
  const caminhoArquivo = new URL("./data/mensagens-teste.json", import.meta.url);
  await writeFile(caminhoArquivo, JSON.stringify(lista, null, 2), "utf8");
  console.log("Arquivo mensagens-teste.json salvo com sucesso!");
}

// --- Exercício 2.2: Leitura Resiliente e Tratamento de ENOENT ---
async function lerDadosSeguros(nomeArquivo) {
  try {
    const conteudo = await readFile(nomeArquivo, "utf8");
    return JSON.parse(conteudo);
  } catch (erro) {
    if (erro.code === "ENOENT") {
      return [];
    }
    throw erro;
  }
}

await salvarHistorico();

const dados = await lerDadosSeguros(new URL("./data/arquivo-fantasma.json", import.meta.url));
console.log("Resultado com arquivo ausente:", dados);