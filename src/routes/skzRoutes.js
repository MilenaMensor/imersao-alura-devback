import express from "express";
import multer from "multer";
import cors from "cors";
import { atualizaNovoMeme, listarMemes, postarMemes, uploadMeme } from "../controllers/skzController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
 
const upload = multer({ storage:storage })

const routes = (app) => {
    // Permite que o servidor interprete requisições com corpo JSON
    app.use(express.json());
    // Avisa que vai ter outra porta de localhost
    app.use(cors(corsOptions));
    // Rota para pegar todos os memes
    app.get("/skzmemes", listarMemes);
    // Rota para criar um novo post
    app.post("/skzmemes", postarMemes);
    // Rota para upload de imagem do post (assumindo uma única imagem chamada "imagem")
    app.post("/upload", upload.single("imagem"), uploadMeme);
    // Rota para atualziar um post já feito
    app.put("/upload/:id", atualizaNovoMeme);
}

export default routes;
