import fs from "fs";
import {getTodosMemes, criarMeme, atualizarMeme} from "../models/skzModels.js";


export async function listarMemes(req, res) {
    // Chama a função para buscar os memes
    const memes = await getTodosMemes();
    res.status(200).json(memes);
}

export async function postarMemes(req, res) {
    // Requisição para o cabeçalho enviar um novo meme
    const novoMeme = req.body;
    // Try para realização do novo envio de meme
    try {
        // Espera ocorrer a operação "criarMeme"
        const memeCriado = await criarMeme(novoMeme);
        res.status(200).json(memeCriado); 

    } catch (erro) {
        // Armazena os detalhes do erro e retorna um resultado HTTP status 500
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function uploadMeme(req, res) { 
    const novoMeme = {
        membro: "",
        imgUrl: req.file.originalname,
        alt: ""
    }
    try {
        const memeCriado = await criarMeme(novoMeme);
        const imgAtualizada = `uploads/${memeCriado.insertedId}.png`
        fs.renameSync(req.file.path, imgAtualizada);
        res.status(200).json(memeCriado); 
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function atualizaNovoMeme(req, res) {
    const id = req.params.id;
    const urlImg = `https://localhost:3000/${id}.png`;
    const memeAtualizado = {
        imgUrl: urlImg,
        membro: req.body.membro,
        alt: req.body.alt
    }
    try {
        const memeCriado = await atualizarMeme(id, memeAtualizado);
        res.status(200).json(memeCriado); 

    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}