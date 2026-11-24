import express from "express";
import { lerMensagens, salvarMensagens } from "./store.js";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Servidor da Sprint 04 rodando!");
});

app.get("/status", (req, res) => {
  res.json({ status: "online", sprint: 4 });
});

app.get("/mensagens", async (req, res) => {
  try {
    res.json(await lerMensagens());
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro na leitura" });
  }
});

app.get("/mensagens/:id", async (req, res) => {
  try {
    const lista = await lerMensagens();
    const mensagem = lista.find(m => m.id === Number(req.params.id));
    if (!mensagem) return res.status(404).json({ erro: "Não encontrada" });
    res.json(mensagem);
  } catch (erro) {
    res.status(500).json({ erro: "Erro na consulta" });
  }
});

// Rota didática temporária da Sprint 04 para testar gravação via navegador
app.get("/exemplo-salvar", async (req, res) => {
  try {
    const lista = await lerMensagens();
    lista.push({
      id: Date.now(),
      usuario: "Aluno",
      texto: "Mensagem gravada no disco!"
    });
    await salvarMensagens(lista);
    res.json({ gravado: true, total: lista.length });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Falha ao gravar" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});