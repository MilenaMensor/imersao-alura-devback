import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco utilizando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os memes no banco de dados
export async function getTodosMemes() {
    // seleciona o banco de dados criado
    const db = conexao.db("straykids-instamemes");
    // seleciona a coleção criada no banco de dados
    const colecao = db.collection("memes");
    // retorna um array com todos os documentos da coleção "memes"
    return colecao.find().toArray();
}

// Função assíncrona  para criar um novo post/meme e jogar no banco de dados
export async function criarMeme(novoMeme) {
    const db = conexao.db("straykids-instamemes");
    const colecao = db.collection("memes");
    return colecao.insertOne(novoMeme);
}

export async function atualizarMeme(id, novoMeme) {
    const db = conexao.db("straykids-instamemes");
    const colecao = db.collection("memes");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoMeme});
}
