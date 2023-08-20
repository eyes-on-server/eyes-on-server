const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const porta = 5000;

// Chamada de rotas --------------------
const servidorRota = require("./src/routers/servidor")
const empresaRota = require("./src/routers/empresa")
const userRota = require("./src/routers/user");
const indexRota = require("./src/routers/index")


// Configurações -----------------------
app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());


// Criação de Rotas --------------------
app.use("/", indexRota);
app.use("/user", userRota);
app.use("/empresa", empresaRota);
app.use("/servidor", servidorRota);


// Iniciar servidor --------------------
app.listen(porta, () => {
    console.log(`http://localhost:${porta}/`)
})

